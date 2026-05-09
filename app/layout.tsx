import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "API Japan — Japan & APAC Data APIs for AI Agents",
    template: "%s | API Japan",
  },
  description:
    "x402対応 APAC データAPI。天気・為替・暗号資産・地震・企業情報をAIエージェントに提供。APIキー不要・USDC決済。",
  openGraph: {
    title: "API Japan — Japan & APAC Data APIs for AI Agents",
    description: "APIキー不要。x402プロトコルでUSDCを送るだけ。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
