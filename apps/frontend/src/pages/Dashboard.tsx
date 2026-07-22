import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Image as ImageIcon, LayoutDashboard, Plus, Sparkles, User, Settings } from "lucide-react";

export function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [generations, setGenerations] = useState([
    {
      id: "1",
      prompt: "Cinematic portrait of a futuristic astronaut in deep space, photorealistic",
      type: "Avatar",
      status: "Ready",
      ratio: "1:1",
      date: "2 mins ago",
    },
    {
      id: "2",
      prompt: "Close up portrait of a cyberpunk mechanic in a neon-lit workshop, retro-futuristic style",
      type: "Image",
      status: "Ready",
      ratio: "1:1",
      date: "1 hour ago",
    },
    {
      id: "3",
      prompt: "Digital render of a Victorian traveler holding an old brass compass, high details",
      type: "Avatar",
      status: "Generating (45%)",
      ratio: "1:1",
      date: "Just now",
    },
  ]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const newGen = {
      id: String(generations.length + 1),
      prompt: prompt,
      type: "Avatar",
      status: "Pending",
      ratio: "1:1",
      date: "Just now",
    };

    setGenerations([newGen, ...generations]);
    setPrompt("");

    // Simulate progress
    setTimeout(() => {
      setGenerations(prev =>
        prev.map(g => (g.id === newGen.id ? { ...g, status: "Generating (12%)" } : g))
      );
    }, 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-100 font-mono">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-neutral-900 bg-neutral-950 p-6 space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Navigation</p>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-neutral-900 text-white font-medium border-l-2 border-[#1D4ED8]"
            >
              <LayoutDashboard className="h-4 w-4 text-[#1D4ED8]" />
              Overview
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors"
            >
              <User className="h-4 w-4" />
              Avatar Creator
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors"
            >
              <ImageIcon className="h-4 w-4" />
              Image Creator
            </a>
          </nav>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Preferences</p>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        {/* Workspace Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Workspace</h1>
            <p className="text-sm text-neutral-400 mt-1">Create and manage your AI avatar generations</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-850 text-xs">
              <span className="text-neutral-500">Credits Remaining:</span>{" "}
              <span className="text-white font-bold">120 / 150</span>
            </div>
          </div>
        </div>

        {/* Prompt Input Box */}
        <section className="bg-neutral-900/40 border border-neutral-900 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D4ED8]/5 rounded-full blur-3xl pointer-events-none" />
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-neutral-350">
              <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
              <span>What avatar or image do you want to generate today?</span>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                type="text"
                placeholder="A high tech android explorer in deep jungle, photorealistic profile picture..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 bg-neutral-950 border-neutral-850 text-white placeholder-neutral-600 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
              />
              <Button
                type="submit"
                className="bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors font-bold px-6 py-6 h-auto flex items-center justify-center gap-2 rounded-lg shrink-0"
              >
                <Plus className="h-4 w-4" />
                Generate
              </Button>
            </div>
          </form>
        </section>

        {/* Recent Generations Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Generations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {generations.map((gen) => (
              <div
                key={gen.id}
                className="group relative border border-neutral-900 bg-neutral-900/20 rounded-xl p-5 hover:border-neutral-800 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Visual Preview Placeholder */}
                  <div className="aspect-square w-full bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-900 overflow-hidden relative">
                    {gen.status === "Ready" ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 group-hover:bg-neutral-900/60 transition-colors">
                        <User className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="h-2 w-24 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1D4ED8] transition-all"
                            style={{ width: gen.status.includes("%") ? gen.status.match(/\d+/)?.[0] + "%" : "15%" }}
                          />
                        </div>
                        <span className="text-xs text-neutral-500">{gen.status}</span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-neutral-900/80 border border-neutral-800 rounded text-[10px] text-neutral-300">
                      {gen.type}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-neutral-900/80 border border-neutral-800 rounded text-[10px] text-neutral-300">
                      {gen.ratio}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-neutral-200 line-clamp-2 h-10 group-hover:text-white transition-colors">
                    {gen.prompt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-900 pt-4 mt-4 text-[11px] text-neutral-500">
                  <span>{gen.date}</span>
                  <span
                    className={`font-semibold ${
                      gen.status === "Ready" ? "text-emerald-500" : "text-amber-500 animate-pulse"
                    }`}
                  >
                    {gen.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
