'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function OrderPage({ params }) {
  const tableNumber = params.tableNumber
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    const { data: catData } = await supabase.from('menu_categories').select('*').order('sort_order')
    const { data: itemData } = await supabase.from('menu_items').select('*')
    setCategories(catData || [])
    setItems(itemData || [])
    setLoading(false)
  }

  const addToCart = (item) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id)
      if (exist) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const submitOrder = async () => {
    if (cart.length === 0) return alert('กรุณาเลือกรายการอาหารก่อนครับ')

    const { data: session } = await supabase
      .from('sessions')
      .select('id')
      .eq('table_number', tableNumber)
      .eq('status', 'open')
      .order('id', { ascending: false })
      .limit(1)
      .single()

    const sessionId = session ? session.id : null

    const { error } = await supabase.from('orders').insert([{
      session_id: sessionId,
      table_number: parseInt(tableNumber),
      items: cart,
      status: 'received'
    }])

    if (error) {
      alert('เกิดข้อผิดพลาดในการส่งออเดอร์: ' + error.message)
    } else {
      alert('ส่งออเดอร์เรียบร้อยแล้วครับ!')
      setCart([])
    }
  }

  if (loading) return <div style={{ padding: '20px' }}>กำลังโหลดเมนู...</div>

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ backgroundColor: '#6F4E37', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>☕ Drip & Dwell</h2>
        <p style={{ margin: '5px 0 0 0' }}>โต๊ะ/บาร์ หมายเลข: <strong>{tableNumber}</strong></p>
      </header>

      {categories.map(cat => (
        <div key={cat.id} style={{ marginBottom: '25px' }}>
          <h3 style={{ borderBottom: '2px solid #D9C8B4', paddingBottom: '5px', color: '#4A3B32' }}>{cat.name}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.filter(i => i.category_id === cat.id).map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#FDFBF7', borderRadius: '6px', border: '1px solid #EFEBE4' }}>
                <span>{item.name}</span>
                <button onClick={() => addToCart(item)} style={{ padding: '6px 12px', backgroundColor: '#6F4E37', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  + เพิ่ม
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '550px', backgroundColor: '#3D2E24', color: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <h4>รายการที่เลือก ({cart.reduce((a, b) => a + b.qty, 0)})</h4>
          <ul>
            {cart.map(c => <li key={c.id}>{c.name} x {c.qty}</li>)}
          </ul>
          <button onClick={submitOrder} style={{ width: '100%', padding: '12px', backgroundColor: '#D9C8B4', color: '#3D2E24', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }}>
            ยืนยันส่งออเดอร์
          </button>
        </div>
      )}
    </div>
  )
}
