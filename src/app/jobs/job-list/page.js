import JobList from "@/components/job/JobList";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const JobCardPage = () => {
  return (
    <AuthProvider>
      <JobList />
    </AuthProvider>
  );
};

export default JobCardPage;
