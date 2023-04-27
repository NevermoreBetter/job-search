import { AuthProvider } from "@/context/AuthContext";
import WorkerDetail from "@/components/worker/WorkerDetail";

const WorkerDetailPage = ({ params }) => {
  return (
    <AuthProvider>
      <div>
        <WorkerDetail params={params} />
      </div>
    </AuthProvider>
  );
};

export default WorkerDetailPage;
