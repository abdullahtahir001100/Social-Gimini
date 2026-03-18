import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "@/styles/globals.scss";
import AuthWrapper from "@/components/ClientLayout";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "SocialGemini Platform",
  description: "Unified Social Media Management",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
           <SmoothScroll>
             <AuthWrapper>{children}</AuthWrapper>
           </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}