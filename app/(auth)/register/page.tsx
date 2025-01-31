"use client";
import TeamRegistrationForm from "@/components/TeamRegistrationForm";
import { supabase } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Register() {
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        redirect("/login");
      }
    };
    checkSession();
  }, []);

  return (
    <div>
      <TeamRegistrationForm />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
