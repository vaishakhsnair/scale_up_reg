"use client";

import { supabase } from "@/utils/supabase/server";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast"; // import toast and Toaster
// modal for confirmation

type Registration = {
  id: number;
  created_at: string;
  team_name: string;
  team_memebers: {
    name: string;
    phone_number: string;
    college_name: string;
    year_of_learning: string;
    course_selected: string;
  }[];
  abstract: string;
  user_id: string;
  accepted: boolean | null;
};

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [admin, setIsAdmin] = useState(false);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from("registration")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations"); // Display error toast
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  };

  async function toggleAcceptance(id: number, accept: boolean) {
    //accept the registration
    const { data, error } = await supabase
      .from("registration")
      .update({ accepted: accept })
      .eq("id", id);

    if (error) {
      console.error("Error updating registration:", error);
      toast.error("Failed to accept registration"); // Display error toast
    } else {
      toast.success(
        `Registration ${accept ? "Accepted" : "Rejected"} successfully`,
      ); // Display

      // update the registrations list
      fetchRegistrations();
    }
  }

  useEffect(() => {
    const checkAdminAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/";
        return;
      }

      setIsAuthorized(true);

      const { data: userData, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || userData?.role !== "admin") {
        return;
      }

      setIsAdmin(true);
    };

    checkAdminAuth();
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const downloadAbstract = (url: string, teamName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${teamName}_abstract.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-purple" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-black/30 backdrop-blur-xl border-primary-blue/20 shadow-lg shadow-primary-purple/10">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x">
              Registration Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary-purple" />
              </div>
            ) : registrations.length === 0 ? (
              <div className="flex flex-col items-center justify-center  space-y-4">
                <p className="text-xl text-gray-400">No registrations yet</p>
                <p className="text-sm text-gray-500">
                  Registration entries will appear here
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-primary-purple/10">
                      <TableHead className="text-gray-200">Accept</TableHead>
                      <TableHead className="text-gray-200">Team Name</TableHead>
                      <TableHead className="text-gray-200">Members</TableHead>
                      <TableHead className="text-gray-200">
                        College Details
                      </TableHead>
                      <TableHead className="text-gray-200">Abstract</TableHead>
                      <TableHead className="text-gray-200">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg) => (
                      <TableRow
                        key={reg.id}
                        className={`border-b border-primary-blue/10
                          hover:bg-primary-purple/5
                          ${reg.accepted == null ? " " : reg.accepted ? "bg-green-950 hover:bg-green-950" : "bg-red-950 hover:bg-red-950"}
                          `}
                      >
                        <TableCell
                          className="text-gray-300 font-medium flex flex-col
                          gap-2 items-center justify-center  "
                        >
                          <Button
                            onClick={() => {
                              //accept the registration
                              //show a confirmation
                              const ok = window.confirm(
                                "Do you really want to accept this registration?",
                              );
                              if (ok) {
                                toggleAcceptance(reg.id, true);
                              }
                            }}
                            className="bg-primary-blue/20 hover:bg-primary-blue/30"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => {
                              //reject the registration

                              //show a confirmation
                              const ok = window.confirm(
                                "Do you really want to reject this registration?",
                              );

                              if (ok) {
                                toggleAcceptance(reg.id, false);
                              }
                            }}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Reject
                          </Button>
                        </TableCell>
                        <TableCell className="text-gray-300 font-medium">
                          {reg.team_name}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {reg.team_memebers.map((member, idx) => (
                            <div key={idx} className="mb-2">
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-400">
                                {member.phone_number}
                              </p>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {reg.team_memebers.map((member, idx) => (
                            <div key={idx} className="mb-2">
                              <p className="font-medium">
                                {member.college_name}
                              </p>
                              <p className="text-sm text-gray-400">
                                {member.course_selected} •{" "}
                                {member.year_of_learning} Year
                              </p>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              downloadAbstract(reg.abstract, reg.team_name)
                            }
                            className="bg-primary-blue/20 hover:bg-primary-blue/30"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      <Toaster /> {/* Toaster component to show the toast messages */}
    </div>
  );
}
