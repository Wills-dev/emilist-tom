import type { Metadata } from "next";

import "../styles/globals.css";

import { Toaster } from "react-hot-toast";

import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Emilist",
  applicationName: "Emilist",
  description: "Discover Your Project Dream Team Here",
  keywords: [
    "Artisans",
    "Artisan",
    "Handymen",
    "Labourers",
    "Experts",
    "Projects",
  ],
  // openGraph: {
  //   images: ["/assets/images/hero-img.png"],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app">
        <ReactQueryProvider>
          <Providers>
            <main>
              <Toaster />
              {children}
            </main>
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
