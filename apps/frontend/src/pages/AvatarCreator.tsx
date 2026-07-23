import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Sparkles, ArrowLeft, Loader2, Download, User } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface AvatarGeneration {
  id: string;
  name: string;
  prompt: string;
  imageUrls: string[];
  date: string;
}

export function AvatarCreator() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generations, setGenerations] = useState<AvatarGeneration[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("higgs_avatars");
    if (saved) {
      try {
        setGenerations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveGenerations = (newGens: AvatarGeneration[]) => {
    setGenerations(newGens);
    localStorage.setItem("higgs_avatars", JSON.stringify(newGens));
  };

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
        name,
        prompt,
      });

      if (response.data && response.data.success) {
        const newGen: AvatarGeneration = {
          id: response.data.id || String(Date.now()),
          name: response.data.name,
          prompt: response.data.prompt,
          imageUrls: response.data.imageUrls || [],
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        saveGenerations([newGen, ...generations]);
        setName("");
        setPrompt("");
      } else {
        throw new Error("Failed to generate avatar images");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "An error occurred during generation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-100 font-mono p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-neutral-400 hover:text-white hover:bg-neutral-900 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-[#1D4ED8] animate-pulse" />
                AI Avatar Creator
              </h1>
              <p className="text-sm text-neutral-400 mt-1">Generate multi-angle hyper-realistic headshots of your custom character</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator panel */}
          <div className="lg:col-span-1 bg-neutral-900/40 border border-neutral-900 rounded-xl p-6 relative overflow-hidden h-fit">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D4ED8]/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <User className="h-4 w-4 text-[#1D4ED8]" /> Configuration
            </h2>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-neutral-300">
                  Character Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Neo-Noir Detective, Kaelen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-neutral-950 border-neutral-850 text-white placeholder-neutral-600 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-semibold text-neutral-300">
                  Avatar Prompt Description
                </Label>
                <textarea
                  id="prompt"
                  rows={4}
                  placeholder="A detailed prompt describing appearance, expression, clothing, lighting..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 text-xs">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-all font-bold py-6 h-auto flex items-center justify-center gap-2 rounded-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin animate-infinite" />
                    Generating 3 Avatars...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Avatars (3 Seeds)
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-neutral-900 pb-3">
              Generations History
            </h2>

            {generations.length === 0 ? (
              <div className="border border-dashed border-neutral-850 rounded-xl p-12 text-center text-neutral-500">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-30 text-[#1D4ED8]" />
                <p className="font-semibold text-neutral-400">No avatars generated yet</p>
                <p className="text-xs mt-1">Fill out the configuration form to create your first set of character avatars.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {generations.map((gen) => (
                  <div key={gen.id} className="bg-neutral-900/20 border border-neutral-900 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                      <div>
                        <h3 className="font-bold text-white">{gen.name}</h3>
                        <p className="text-xs text-neutral-450 mt-1 line-clamp-1 italic">"{gen.prompt}"</p>
                      </div>
                      <span className="text-[10px] text-neutral-500">{gen.date}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {gen.imageUrls.map((url, index) => {
                        const fullUrl = url.startsWith("http") ? url : `${BACKEND_URL}${url}`;
                        return (
                          <div key={index} className="group relative aspect-square rounded-lg border border-neutral-850 bg-neutral-950 overflow-hidden">
                            <img
                              src={fullUrl}
                              alt={`${gen.name} seed ${index + 1}`}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <a
                                href={fullUrl}
                                download={`${gen.name.replace(/\s+/g, "_")}_${index + 1}.png`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-[#1D4ED8] hover:bg-[#1e40af] text-white rounded-md transition-colors"
                              >
                                <Download className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarCreator;
