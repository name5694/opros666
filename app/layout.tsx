import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin", "latin-ext"],
// });

export const metadata: Metadata = {
  title: "Opros666",
  description: "lutiy Opros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${roboto.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <nav>
            <Button variant="text">
              <Link href="/">Opros666</Link>
            </Button>
          </nav>
          <div className="container m-auto">
            <div className="px-2">{children}</div>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
