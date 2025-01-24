"use client";
import TeamRegistrationForm from "@/components/TeamRegistrationForm";
import { supabase } from "@/utils/supabase/server";
import { div } from "framer-motion/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const cheksession = async () => {
    //function to check if the user is logged in or not it will be null if not logged in
    try {
      const { data, error } = await supabase.auth.getSession();
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
    </div>
  );
}
