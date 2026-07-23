import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import { TrainFront, LogOut } from "lucide-react";

export function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]); // Re-evaluate whenever route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <TrainFront className="h-6 w-6 text-white" />
            <span className="text-white text-2xl font-black tracking-wider transition-opacity hover:opacity-90">
              HIGGS
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-semibold transition-colors shadow-sm flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/signin")}
                className="text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-[#1D4ED8] text-white font-semibold hover:bg-[#1e40af] transition-colors shadow-sm"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppBar;
