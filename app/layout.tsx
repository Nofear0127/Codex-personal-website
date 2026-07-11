import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkFlow — Signals into action",
  description: "Shape scattered signals into meaningful outcomes via AI-driven workflows.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "LinkFlow — Signals into action",
    description: "Shape scattered signals into meaningful outcomes via AI-driven workflows.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "LinkFlow — Signals into action" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkFlow — Signals into action",
    description: "Shape scattered signals into meaningful outcomes via AI-driven workflows.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/6e47ef470dd19698c911332a9b4d1cf4?family=Neue+Haas+Grotesk+Text+Pro" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/dec0d9b4e22ca588dc20e1e2e09a59b5?family=Neue+Haas+Grotesk+Display+Pro+55+Roman" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
