import JobList from "@/components/job/JobList";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const JobListPage = () => {
  return (
    <AuthProvider>
      <JobList />
    </AuthProvider>
  );
};

export default JobListPage;