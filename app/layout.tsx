import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "孙晨曦（雾崎）— 技术型 AI 产品经理",
  description: "近 3 年阿里巴巴与智谱 AI 产品经历。淘天 AI 购物助手 3C 品类产品负责人，参与 CogView 系列数据构建与效果迭代，关注低复杂度、可验证的 AI 产品落地。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "孙晨曦（雾崎）— 技术型 AI 产品经理",
    description: "近 3 年阿里巴巴与智谱 AI 产品经历，覆盖淘天 3C 商品对比推荐与 CogView 数据构建、效果迭代。",
    images: [{ url: "/assets/room-v2-front.png", width: 1672, height: 939, alt: "雾崎的 AI 产品工作室" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "孙晨曦（雾崎）— 技术型 AI 产品经理",
    description: "近 3 年阿里巴巴与智谱 AI 产品经历，覆盖淘天 3C 商品对比推荐与 CogView 数据构建、效果迭代。",
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
