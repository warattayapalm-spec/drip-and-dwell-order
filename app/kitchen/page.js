'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function KitchenPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    setOrders(data || [])
  }

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    fetchOrders()
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
      <h1 style={{ color: '#3D2E24' }}>☕ Barista Display (จอบาริสต้า/ครัว)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {orders.map(order => (
          <div key={order.id} style={{ backgroundColor: 'white', border: '2px solid #D9C8B4', borderRadius: '10px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>โต๊ะ {order.table_number}</span>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(order.created_at).toLocaleTimeString('th-TH')}</span>
            </div>
            <ul style={{ paddingLeft: '20px', margin: '15px 0' }}>
              {order.items.map((item, idx) => (
                <li key={idx} style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name} x {item.qty}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => updateStatus(order.id, 'done')} style={{ flex: 1, padding: '8px', backgroundColor: order.status === 'done' ? '#4CAF50' : '#E0E0E0', color: order.status === 'done' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {order.status === 'done' ? 'เสร็จสิ้น ✓' : 'ทำเสร็จแล้ว'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
