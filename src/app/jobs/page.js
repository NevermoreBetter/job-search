import Jobs from "@/components/Jobs";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const JobsPage = () => {
  return (
    <AuthProvider>
      <div>
        <Jobs />
      </div>
    </AuthProvider>
  );
};

export default JobsPage;
