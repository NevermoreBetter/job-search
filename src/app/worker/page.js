import Worker from "@/components/Worker";
import { AuthProvider } from "@/context/AuthContext";

const WorkerPage = () => {
  return (
    <AuthProvider>
      <div>
        <Worker />
      </div>
    </AuthProvider>
  );
};

export default WorkerPage;
