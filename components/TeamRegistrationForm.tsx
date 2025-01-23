"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TeamMember = {
  name: string;
  phoneNumber: string;
  collegeName: string;
  yearOfLearning: string;
  courseSelected: string;
};

type FormData = {
  teamName: string;
  members: TeamMember[];
  abstract: FileList;
};

const yearOptions = ["1st", "2nd", "3rd", "4th", "5th"];

export default function TeamRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      members: [{}] as TeamMember[],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsLoading(false);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary-blue/25 via-primary-purple/25  to-transparent animate-gradient-y opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="bg-black/30 backdrop-blur-xl border-primary-blue/20 shadow-lg shadow-primary-purple/10">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x">
              Team Registration
            </CardTitle>
            <CardDescription className="text-gray-300">
              Register your team for the upcoming event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-gray-200">
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  {...register("teamName", {
                    required: "Team name is required",
                  })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-purple/50 transition-colors"
                />
                {errors.teamName && (
                  <p className="text-red-500 text-sm">
                    {errors.teamName.message}
                  </p>
                )}
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">
                      Team Member {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`members.${index}.name`}
                        className="text-gray-200"
                      >
                        Name
                      </Label>
                      <Input
                        {...register(`members.${index}.name` as const, {
                          required: "Name is required",
                        })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-purple/50 transition-colors"
                      />
                      {errors.members?.[index]?.name && (
                        <p className="text-red-500 text-sm">
                          {errors.members[index]?.name?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`members.${index}.phoneNumber`}
                        className="text-gray-200"
                      >
                        Phone Number
                      </Label>
                      <Input
                        {...register(`members.${index}.phoneNumber` as const, {
                          required: "Phone number is required",
                        })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-purple/50 transition-colors"
                      />
                      {errors.members?.[index]?.phoneNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.members[index]?.phoneNumber?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`members.${index}.collegeName`}
                        className="text-gray-200"
                      >
                        College Name
                      </Label>
                      <Input
                        {...register(`members.${index}.collegeName` as const, {
                          required: "College name is required",
                        })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-purple/50 transition-colors"
                      />
                      {errors.members?.[index]?.collegeName && (
                        <p className="text-red-500 text-sm">
                          {errors.members[index]?.collegeName?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`members.${index}.yearOfLearning`}
                        className="text-gray-200"
                      >
                        Year of Learning
                      </Label>
                      <Controller
                        name={`members.${index}.yearOfLearning` as const}
                        control={control}
                        rules={{ required: "Year of learning is required" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#f9fcff09] backdrop-blur-md border-[#4d415296]  text-white">
                              {yearOptions.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.members?.[index]?.yearOfLearning && (
                        <p className="text-red-500 text-sm">
                          {errors.members[index]?.yearOfLearning?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`members.${index}.courseSelected`}
                        className="text-gray-200"
                      >
                        Course Selected
                      </Label>
                      <Input
                        {...register(
                          `members.${index}.courseSelected` as const,
                          { required: "Course is required" }
                        )}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-purple/50 transition-colors"
                        placeholder="e.g., BTech CSE, Mechanical Engineering"
                      />
                      {errors.members?.[index]?.courseSelected && (
                        <p className="text-red-500 text-sm">
                          {errors.members[index]?.courseSelected?.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  {index > 0 && (
                    <CardFooter>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        className="w-full border-red-500 text-primary-red/50 font-semibold text-red-500 bg-red-500/10 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Member
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}

              {fields.length < 4 && (
                <Button
                  type="button"
                  onClick={() => append({} as TeamMember)}
                  className="w-full bg-primary-blue/20 hover:bg-primary-blue/30  font-semibold text-[#98bed8]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              )}

              <div className="space-y-2">
                <Label htmlFor="abstract" className="text-gray-200">
                  Abstract (PDF, max 2MB)
                </Label>
                <Input
                  id="abstract"
                  type="file"
                  accept=".pdf"
                  {...register("abstract", {
                    required: "Abstract is required",
                    validate: {
                      fileType: (value) =>
                        value[0]?.type === "application/pdf" ||
                        "File must be a PDF",
                      fileSize: (value) =>
                        value[0]?.size <= 2 * 1024 * 1024 ||
                        "File size must be less than 2MB",
                    },
                  })}
                  className="bg-white/5 h-16 border-white/10 text-white pt-4 file:bg-primary-blue file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-primary-purple transition-all  cursor-pointer duration-200"
                />
                {errors.abstract && (
                  <p className="text-red-500 text-sm">
                    {errors.abstract.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r font-semibold from-primary-blue via-primary-purple to-primary-blue hover:opacity-90 transition-opacity animate-gradient-x"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Register Team"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
