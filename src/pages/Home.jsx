import { useEffect } from "react";
import { useAuth } from "../providers/AuthContext";

const Home = () => {
  const { validateSession } = useAuth();

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
        
        <section className="flex items-center justify-between border-gray-300 border-b-2 pb-4">
          <h1 className="text-center text-3xl font-bold text-gray-600">
            Home Page
          </h1>
        </section>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat odit sapiente, omnis saepe consequatur totam eaque unde. Sint fuga ut aliquid dolorem unde necessitatibus voluptates quod iusto, molestias porro temporibus.</p>

      </div>
    </div>
  );
}

export default Home;
