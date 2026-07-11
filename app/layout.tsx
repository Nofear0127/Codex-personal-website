import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "雾崎 — 技术型 AI 产品经理",
  description: "雾崎的个人网站：AI 产品、项目实践与行业思考。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "雾崎 — 技术型 AI 产品经理",
    description: "AI 产品、数据运营、项目经历与行业思考。",
    images: [{ url: "/assets/room-v2-front.png", width: 1672, height: 939, alt: "雾崎的 AI 产品工作室" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "雾崎 — 技术型 AI 产品经理",
    description: "AI 产品、数据运营、项目经历与行业思考。",
    images: ["/assets/room-v2-front.png"],
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
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
