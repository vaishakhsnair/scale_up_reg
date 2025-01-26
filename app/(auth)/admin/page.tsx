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
};

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const { data, error } = await supabase
        .from("registration")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
      } else {
        setRegistrations(data || []);
      }
      setLoading(false);
    };

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

  return (
    <div className="min-h-screen bg-black p-8">
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
            ) : (
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-primary-purple/10">
                      <TableHead className="text-gray-200">Team Name</TableHead>
                      <TableHead className="text-gray-200">Members</TableHead>
                      <TableHead className="text-gray-200">College</TableHead>
                      <TableHead className="text-gray-200">Abstract</TableHead>
                      <TableHead className="text-gray-200">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg) => (
                      <TableRow
                        key={reg.id}
                        className="border-b border-primary-blue/10 hover:bg-primary-purple/5"
                      >
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
                          {reg.team_memebers[0].college_name}
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
    </div>
  );
}
