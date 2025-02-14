import { Button } from "@/components/ui/button";
import { SignInPage } from "@/core/pages";
import { SignIn, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md">
      <img src="/logo.svg" width={100} height={100} />
      {isSignedIn && user ? (
        <div className="flex gap-3 items-center">
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
