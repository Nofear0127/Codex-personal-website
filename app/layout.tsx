import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NO FEAR — Creative Developer",
  description: "走进一间属于创意开发者的数字工作室，探索项目、能力与实验。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "NO FEAR — Creative Developer",
    description: "走进一间属于创意开发者的数字工作室。",
    images: [{ url: "/assets/codex-room.png", width: 1672, height: 939, alt: "NO FEAR 数字工作室" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NO FEAR — Creative Developer",
    description: "走进一间属于创意开发者的数字工作室。",
    images: ["/assets/codex-room.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
