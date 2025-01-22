import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/public/globals.css";

const font = localFont({ 
  src: [
    {
      path: '../public/fonts/MinecraftRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/MinecraftItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/MinecraftBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/MinecraftBoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

export const metadata: Metadata = {
  title: "PaceMan Events",
  description: "Browser sources for the PaceMan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
