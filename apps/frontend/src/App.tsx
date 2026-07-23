import { BrowserRouter, Routes, Route } from "react-router";
import AppBar from "./components/AppBar";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AvatarCreator from "./pages/AvatarCreator";
import VideoCreator from "./pages/VideoCreator";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-center" />
      <BrowserRouter>
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans antialiased">
          <AppBar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/avatar" element={<ProtectedRoute><AvatarCreator /></ProtectedRoute>} />
              <Route path="/video" element={<ProtectedRoute><VideoCreator /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
