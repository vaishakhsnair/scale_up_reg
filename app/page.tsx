"use client";
import TeamRegistrationForm from "@/components/TeamRegistrationForm";
import { supabase } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const cheksession = async () => {
    //function to check if the user is logged in or not it will be null if not logged in
    try {
      const { data } = await supabase.auth.getSession();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    cheksession().then((data) => {
      console.log(data);
      if (!data!.session) {
        redirect("/Login");
      }
    });
  }, []);

  return (
    <div>
      <TeamRegistrationForm />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
