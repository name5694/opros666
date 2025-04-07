import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import Footer from "@/app/_reusable/Footer";
import { AuthProvider } from "@/app/_reusable/AuthProvider";
import dynamic from "next/dynamic";

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
  title: "Oprosru",
  description: "Система опроса",
};

const DynamicNavigation = dynamic(() => import("./_reusable/Navigation"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="ru">
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          className={`${roboto.variable} antialiased`}
        >
          <AppRouterCacheProvider>
            <div className="flex flex-col min-h-screen">
              <DynamicNavigation />
              <div className="container m-auto flex-1">
                <div className="px-2">{children}</div>
              </div>
              <Footer />
            </div>
          </AppRouterCacheProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
