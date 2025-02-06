"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User, LogIn } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    checkSession();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setLoggedin(!!session);
    });

    // Cleanup subscription
    return () => subscription?.unsubscribe();
  }, []);

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    setLoggedin(!!data.session); // Boolean Converion aan
  };

  return (
    <header className="w-full bg-black/95 backdrop-blur-xl border-b border-primary-blue/10 fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo with enhanced styling */}
        <div
          onClick={() => router.push("/")}
          className="text-xl font-bold cursor-pointer"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
            Launchpad
          </span>{" "}
          <span className="text-gray-300">2025</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          {loggedin ? (
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-black/50 hover:bg-primary-blue/20 text-gray-300 hover:text-white transition-all border border-primary-blue/10 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-primary-blue/60 via-primary-purple to-primary-blue/60 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
