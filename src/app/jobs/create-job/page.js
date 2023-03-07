import JobCard from "@/components/JobCard";
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
