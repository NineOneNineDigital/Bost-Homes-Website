import { Archivo, Geist_Mono } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        archivo.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SiteHeader />
          <main className="pt-20">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
