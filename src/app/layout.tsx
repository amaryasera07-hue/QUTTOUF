import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { BirdCursor } from "@/components/ui/BirdCursor";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "قطوف - QOUTTOUF",
  description: "الرائدة في الاستثمار الزراعي المستدام وزراعة النخيل.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      {/* ... inside RootLayout */}
      <body className={cairo.className}>
        <BirdCursor />
        {children}
      </body>
    </html>
  );
}
