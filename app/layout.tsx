export const metadata = {
  title: 'Sakura AI - Your AI Girlfriend',
  description: 'Chat with your virtual girlfriend',
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}