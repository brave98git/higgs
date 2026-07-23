import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // Return children if token exists
  return <>{children}</>;
}

export default ProtectedRoute;
