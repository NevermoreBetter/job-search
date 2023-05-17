import JobEdit from "@/components/job/JobEdit";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const JobEditPage = ({ params }) => {
  return (
    <AuthProvider>
      <JobEdit params={params} />
    </AuthProvider>
  );
};

export default JobEditPage;
