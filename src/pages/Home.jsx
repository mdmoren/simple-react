import { useEffect } from "react";
import { useAuth } from "../providers/AuthContext";

function Home() {
  const { validateSession } = useAuth();

  useEffect(() => {
    validateSession("home");
  }, [validateSession]);

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-center">Home Page</h1>
    </div>
  );
}

export default Home;
