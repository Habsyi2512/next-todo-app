import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { TodoProvider } from "@/context/TodoContext";
import { LoadingProvider } from "@/context/LoadingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To Do App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <LoadingProvider>
          <ModalProvider>
            <TodoProvider>
              <main className="w-full max-w-5xl py-16 mx-auto">
                <Navbar />
                {children}
              </main>
            </TodoProvider>
          </ModalProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
