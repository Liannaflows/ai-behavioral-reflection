import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reflective Patterns",
  description: "AI-assisted emotional reflection for behavioural insight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
