'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function GenerateQR() {
  const [tableNumber, setTableNumber] = useState('')
  const [adultCount, setAdultCount] = useState('1')
  const [childCount, setChildCount] = useState('0')
  const [qrUrl, setQrUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateSession = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('sessions')
      .insert([{ 
        table_number: parseInt(tableNumber), 
        adult_count: parseInt(adultCount), 
        child_count: parseInt(childCount),
        status: 'open'
      }])
      .select()

    if (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message)
    } else {
      const baseUrl = window.location.origin
      const generatedLink = `${baseUrl}/order/${tableNumber}`
      const googleQr = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(generatedLink)}`
      setQrUrl(googleQr)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ color: '#4A3B32' }}>☕ Drip & Dwell - เปิดโต๊ะ / บาร์</h2>
      <form onSubmit={handleCreateSession} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>หมายเลขโต๊ะ/บาร์:</label>
          <input type="number" required value={tableNumber} onChange={e => setTableNumber(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
        </div>
        <div>
          <label>จำนวนผู้ใหญ่:</label>
          <input type="number" required value={adultCount} onChange={e => setAdultCount(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
        </div>
        <div>
          <label>จำนวนเด็ก:</label>
          <input type="number" required value={childCount} onChange={e => setChildCount(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#6F4E37', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {loading ? 'กำลังบันทึก...' : 'เปิดโต๊ะและสร้าง QR Code'}
        </button>
      </form>

      {qrUrl && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3>QR Code สำหรับโต๊ะ {tableNumber}</h3>
          <img src={qrUrl} alt="QR Code" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }} />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>ให้ลูกค้าสแกนเพื่อสั่งเครื่องดื่ม/เบเกอรี่</p>
        </div>
      )}
    </div>
  )
}
