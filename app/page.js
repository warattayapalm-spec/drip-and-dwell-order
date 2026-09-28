import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#FDFBF7',
      color: '#4A3B32',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: '40px 30px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(74, 59, 50, 0.08)',
        textAlign: 'center',
        border: '1px solid #EFEBE4'
      }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: '#3D2E24', fontWeight: '700' }}>
          ☕ Drip & Dwell
        </h1>
        <p style={{ color: '#8C7A6B', marginBottom: '32px', fontSize: '1rem' }}>
          Slow Bar & Artisanal Coffee Display
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/generate-qr" style={{
            display: 'block',
            padding: '14px',
            backgroundColor: '#6F4E37',
            color: '#FFFFFF',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem'
          }}>
            📋 หน้าพนักงาน (เปิดโต๊ะ / สร้าง QR Code)
          </Link>

          <Link href="/kitchen" style={{
            display: 'block',
            padding: '14px',
            backgroundColor: '#D9C8B4',
            color: '#3D2E24',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem'
          }}>
            ☕ จอบาริสต้า (Barista Display)
          </Link>
        </div>
      </div>
    </div>
  )
}
