"use client";

import { usePathname } from "next/navigation";

type LayoutWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function LayoutWrapper({
  children,
  className,
}: LayoutWrapperProps) {
  const excludeBannerPaths = ["/home"];
  const pathname = usePathname();
  const showBanner = !excludeBannerPaths.includes(pathname);

  return (
    <div
      className={`${className} flex flex-col xl:flex-row min-h-screen bg-black`}
    >
      {/* Conditional Banner Section */}
      {showBanner && (
        <div className="hidden xl:block xl:w-[45%] fixed left-0 h-screen border-r border-gray-700/30">
          <div className="relative h-full w-full">
            <img
              src="/banner2.jpg"
              alt="Registration Banner"
              className="object-cover w-full h-full opacity-75"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-6">
              <div>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="/scaleup.png"
                    alt="Scale Up Logo"
                    className="w-32 h-32 object-contain -translate-y-8 drop-shadow-lg"
                  />
                  <span className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x">
                    LaunchPad
                  </span>
                </div>
                <p className="text-3xl text-white/90 font-semibold tracking-wide bg-gradient-to-r from-primary-blue/60 via-primary-purple/60 to-primary-blue/60 px-6 py-2 rounded-xl animate-gradient-x backdrop-blur-sm">
                  <span className="font-bold tracking-wider">SCALEUP</span>
                  <span className="px-3 font-thin">|</span>
                  <span className="font-semibold">2025</span>
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
          </div>
        </div>
      )}

      {/* Adjust content width based on banner visibility */}
      <div
        className={`w-full ${
          showBanner ? "xl:w-[55%] xl:ml-[45%]" : ""
        } min-h-screen overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
}
