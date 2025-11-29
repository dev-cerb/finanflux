export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>FinanFlux | Dashboard</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
