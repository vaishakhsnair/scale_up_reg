import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ralewway = Raleway({
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <div
          className={` ${ralewway.className}  flex flex-col xl:flex-row min-h-screen bg-black`}
        >
          {/* Fixed Banner Section */}
          <div className="hidden xl:block xl:w-[40%] fixed left-0 h-screen border-r border-gray-700/50">
            <div className="relative h-full w-full">
              <img
                src="/banner2.jpg"
                alt="Registration Banner"
                className="object-cover w-full h-full opacity-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-6">
                <h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x">
                  Scale Up
                </h1>
                <p className="text-3xl text-white/90 font-semibold tracking-wide bg-gradient-to-r from-primary-blue/60 via-primary-purple/60 to-primary-blue/60 px-6 py-2 rounded-full backdrop-blur-sm">
                  LaunchPad to Success
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="w-full xl:w-[60%] xl:ml-[40%] min-h-screen overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
