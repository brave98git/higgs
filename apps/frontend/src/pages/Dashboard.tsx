import React from "react";
import { useNavigate } from "react-router";
import { Sparkles, Video, User, ArrowRight } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-100 font-mono flex flex-col justify-center items-center overflow-hidden px-4">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1D4ED8]/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-5000" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-7000" />

      
      <div className="w-full max-w-5xl z-10 text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-400">
            <Sparkles className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span>Select Your Creator Suite</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            What will you create today?
          </h1>
          <p className="text-neutral-450 text-sm md:text-base max-w-xl mx-auto">
            Choose between generating high-fidelity digital twins and characters, or rendering high-resolution dynamic video sequences.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Avatar Creator Card */}
          <button
            onClick={() => navigate("/avatar")}
            className="group relative flex flex-col items-start text-left p-8 rounded-2xl border border-neutral-800 bg-neutral-900 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden cursor-pointer"
          >
            
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/5 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-950 border border-neutral-800 text-blue-400 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-500">
              <User className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-2 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
              AI Avatar Creator
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </h3>
            
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Create hyper-realistic digital character sheets and avatars using multi-seed diffusion engines.
            </p>

            <div className="mt-auto w-full pt-4 border-t border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
              <span>Multi-angle • High fidelity</span>
              <span className="text-blue-400 font-bold group-hover:text-blue-300 group-hover:underline">Launch Suite →</span>
            </div>
          </button>

          {/* Video Creator Card */}
          <button
            onClick={() => navigate("/video")}
            className="group relative flex flex-col items-start text-left p-8 rounded-2xl border border-neutral-800 bg-neutral-900 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden cursor-pointer"
          >
            
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/5 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-950 border border-neutral-800 text-blue-400 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-500">
              <Video className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-2 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
              AI Video Creator
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Render dynamic cinematic scenes, motions, and stories directly from your custom prompts.
            </p>

            <div className="mt-auto w-full pt-4 border-t border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
              <span>HD Video • Custom duration</span>
              <span className="text-blue-400 font-bold group-hover:text-blue-300 group-hover:underline">Launch Suite →</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
