import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("clinic_token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);
};
