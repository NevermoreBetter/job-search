import Inbox from "@/components/Inbox";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

const InboxPage = () => {
  return (
    <AuthProvider>
      <div>
        <Inbox />
      </div>
    </AuthProvider>
  );
};

export default InboxPage;
