import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "ReceiptBox - Track every purchase. Household, business, life.",
  description: "Upload receipts. AI extracts data. Writes directly to your Google Sheet. Zero manual entry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#581c87" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <BottomNav />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
