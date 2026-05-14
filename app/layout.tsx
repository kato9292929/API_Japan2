import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "API Japan — Japan Data APIs for AI Agents",
    template: "%s | API Japan",
  },
  description:
    "x402対応の日本データAPI。天気・為替・株価をAIエージェントに提供。APIキー不要・USDC決済。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={outfit.variable}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
