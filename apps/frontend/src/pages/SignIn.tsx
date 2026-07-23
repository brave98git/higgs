import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { TrainFront } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useMutation } from "@tanstack/react-query";

async function signin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
    username,
    password,
  });
  return response.data;
}

export function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/dashboard");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (username.length < 3 || username.length > 20) {
      setError("Username must be between 3 and 20 characters.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    await mutation.mutateAsync({ username, password });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-neutral-950 font-mono">
      <div className="flex w-full flex-col items-center justify-center p-8 text-center md:w-1/2 bg-[#1D4ED8]">
        <div className="flex flex-col items-center justify-center space-y-6 max-w-md">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-[#1D4ED8] shadow-md">
            <TrainFront className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-relaxed">
            Build an Avatar, get the Job done
          </h2>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 bg-neutral-950 md:w-1/2">
        <Card className="w-full max-w-md bg-neutral-900 border-neutral-800 text-white p-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold tracking-tight text-white">
                Login to your account
              </CardTitle>
              <Link
                to="/signup"
                className="text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
            </div>
            <CardDescription className="text-neutral-450 text-sm">
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-md p-3 text-xs mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-neutral-300"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-neutral-800 bg-neutral-950 text-white placeholder-neutral-600 focus:border-[#1D4ED8] focus:ring-[#1D4ED8] rounded-md"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-neutral-300"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs text-neutral-400 hover:text-white hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-neutral-800 bg-neutral-950 text-white placeholder-neutral-600 focus:border-[#1D4ED8] focus:ring-[#1D4ED8] rounded-md"
                />
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-[#1D4ED8] text-white font-bold py-3 hover:bg-[#1e40af] transition-colors rounded-md mt-4"
              >
                {mutation.isPending ? "Logging in..." : "Login"}
              </Button>
              {mutation.isError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-md p-3 text-xs mb-4">
                  {(mutation.error as any)?.response?.data?.error ||
                    "Invalid username or password"}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
