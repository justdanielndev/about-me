import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cascadiaCode = localFont({
  src: [
    {
      path: "../../public/fonts/CascadiaCode-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/CascadiaCode-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-cascadia-code",
});

export const metadata: Metadata = {
  title: "about://me",
  description: "My personal space on the vast, empty, AI-full web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cascadiaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
