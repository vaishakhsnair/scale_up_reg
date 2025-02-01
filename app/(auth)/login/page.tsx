"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/utils/supabase/server";
import toast, { Toaster } from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (Formdata: FormData) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: Formdata.email,
      password: Formdata.password,
    });
    console.log(data);
    if (error) {
      console.log("Login failed:", error.message);
      toast.error(`Login failed: ${error.message}`);
    } else {
      console.log("User logged in successfully:", data);
      window.location.href = "/";
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    //get current domain base
    const currentDomain = window.location.origin;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${currentDomain}/register`,
      },
    });
    if (error) {
      console.log("Google login failed:", error.message);
      toast.error(`Google login failed: ${error.message}`);
    } else {
      console.log("User logged in with Google successfully:", data);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary-blue/25 via-primary-purple/25 to-transparent animate-gradient-y opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-black/30 backdrop-blur-xl border-primary-blue/20 shadow-lg shadow-primary-purple/10">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x">
              Login
            </CardTitle>
            <CardDescription className="text-gray-300">
              Login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-purple/50 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-purple/50 transition-colors"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary-purple">
                  Sign Up
                </a>{" "}
              </p>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r font-semibold from-primary-blue/60 via-primary-purple to-primary-blue/60 hover:opacity-90 transition-opacity animate-gradient-x"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />{" "}
                  {/* Lighter border for contrast */}
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/30 text-gray-400">OR</span>{" "}
                  {/* Matches the card's background */}
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-gradient-to-r from-primary-blue/60 via-primary-purple to-primary-blue/60 hover:opacity-90 transition-opacity animate-gradient-x font-semibold text-white border border-white/10 hover:border-white/20"
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                Login with Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
