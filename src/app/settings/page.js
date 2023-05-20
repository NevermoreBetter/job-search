import Settings from "@/components/Settings";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

const SettingsPage = () => {
  return (
    <AuthProvider>
      <div>
        <Settings />
      </div>
    </AuthProvider>
  );
};

export default SettingsPage;
