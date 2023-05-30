import Worker from "@/components/worker/Worker";
import "regenerator-runtime/runtime";
import { AuthProvider } from "@/context/AuthContext";

const WorkerPage = () => {
  return (
    // <AuthProvider>
    <div>
      <Worker />
    </div>
    /* </AuthProvider> */
  );
};

export default WorkerPage;
