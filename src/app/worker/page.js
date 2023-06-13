import "regenerator-runtime/runtime";
import { AuthProvider } from "@/context/AuthContext";
import WorkerPosts from "@/components/worker/WorkerPosts";

const WorkerPage = () => {
  return (
    // <AuthProvider>
    <div>
      <WorkerPosts />
    </div>
    /* </AuthProvider> */
  );
};

export default WorkerPage;
