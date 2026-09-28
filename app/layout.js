export const metadata = {
  title: 'Drip & Dwell',
  description: 'Slow Bar & Artisanal Coffee Display',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
