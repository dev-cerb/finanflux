import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>FinanFlux</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
