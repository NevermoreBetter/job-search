import WorkerCard from "@/components/worker/WorkerCard";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const WorkCardPage = () => {
  return (
    <AuthProvider>
      <WorkerCard />
    </AuthProvider>
  );
};

export default WorkCardPage;
