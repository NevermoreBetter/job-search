import Home from "@/components/Home";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import "regenerator-runtime/runtime";
const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
