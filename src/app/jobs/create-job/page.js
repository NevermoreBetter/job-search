import JobCard from "@/components/job/JobCard";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const JobCardPage = () => {
  return (
    <AuthProvider>
      <JobCard />
    </AuthProvider>
  );
};

export default JobCardPage;
