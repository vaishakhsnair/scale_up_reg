"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User, LogIn, UserPlus } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [loggedin, setLoggedin] = useState(false);

  // Check if the user is logged in and check with every route change
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    };
    checkSession();
  }, [router]);

  return (
    <header className="w-full bg-black/50 backdrop-blur-xl border-b border-primary-blue/20 fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div
          className="text-white text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="text-primary-purple">Launchpad</span> 2025
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          {loggedin ? (
            // If logged in, show the user's profile or dashboard
            <Button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 bg-primary-purple hover:bg-primary-purple/80 transition-all"
            >
              <User className="w-5 h-5" />
              Dashboard
            </Button>
          ) : (
            // If not logged in, show Login and Signup buttons
            <>
              <Button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 bg-primary-purple hover:bg-primary-purple/80 transition-all"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
