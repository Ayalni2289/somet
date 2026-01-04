import "../styles/globals.css";
import React from "react";
import Header from "../components/Header";

export const metadata = {
  title: "sometzihinsel.org",
  description: "Somet zihinsel - Next.js migration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        {/* 🔹 Bootstrap'in sadece JS'i çalışacak, CSS'i değil */}
      </head>
      <body>
  <Header />
        <main>{children}</main>
        <footer
          style={{
            padding: 20,
            borderTop: "1px solid #eee",
            justifyContent: "center",
            textAlign: "center",
            opacity: 0.5,
            fontSize: 11,
          }}
        >
          Copyright © {new Date().getFullYear()} Somet Vakfı — Tüm hakları
          saklıdır.
        </footer>
        {/* Bootstrap JS removed - using React-controlled modal instead */}
      </body>
    </html>
  );
}
