import JobDetail from "@/components/job/JobDetail";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const JobDetailPage = ({ params }) => {
  console.log(params);
  return (
    // <AuthProvider>
    <div>
      <JobDetail params={params} />
    </div>
    /* </AuthProvider> */
  );
};

export default JobDetailPage;
