import JobEdit from "@/components/job/JobEdit";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const JobEditPage = () => {
  return (
    <AuthProvider>
      <JobEdit />
    </AuthProvider>
  );
};

export default JobEditPage;
