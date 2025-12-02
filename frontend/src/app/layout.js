import "./globals.css";

export const metadata = {
  title: "FinanFlux",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br" className="dark">
            <body className="bg-nubank-dark text-white">
            {children}
            </body>
        </html>
    );
}