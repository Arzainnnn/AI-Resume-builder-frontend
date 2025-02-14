import "./App.css";
import { Toaster } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Header } from "./core/components";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) return <Navigate to="/auth/sign-in" />;
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
