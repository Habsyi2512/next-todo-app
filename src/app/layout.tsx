import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { LoadingProvider } from "@/context/LoadingContext";
import { Suspense } from "react";
import LoadTodoTemplate from "@/components/templates/LoadTodoTemplate";
import EditFormProvider from "@/context/EditFormContext";
import ModalContainer from "@/components/templates/ModalContainer";

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
  navbar,
}: Readonly<{
  children: React.ReactNode;
  navbar: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <LoadingProvider>
          <ModalProvider>
            <EditFormProvider>
              <ModalContainer />
              <main className="w-full max-w-5xl py-16 mx-auto">
                <div>{navbar}</div>
                <Suspense fallback={<LoadTodoTemplate />}>{children}</Suspense>
              </main>
            </EditFormProvider>
          </ModalProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
