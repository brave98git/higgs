import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Sparkles, ArrowLeft, Loader2, Download, User } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Avatar {
  id: string;
  name: string;
  imageUrls: string[];
  createdAt: string;
}

async function createAvatar({ name, url }: { name: string; url: string }) {
  const response = await axios.post(`${BACKEND_URL}/api/v1/avatar`, { name, image: url });
  return response.data;
}

async function getAvatars() {
  const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
  return response.data;
}

export function AvatarCreator() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const { data: avatars = [], isLoading } = useQuery({
    queryKey: ["avatars"],
    queryFn: getAvatars,
  });

  const mutation = useMutation({
    mutationFn: createAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatars"] });
      setName("");
      setUrl("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    await mutation.mutateAsync({ name, url });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-100 font-mono p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex items-center gap-4 border-b border-neutral-900 pb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-neutral-400 hover:text-white hover:bg-neutral-900 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#1D4ED8]" />
            AI Avatar Manager
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator panel */}
          <div className="lg:col-span-1 bg-neutral-900/40 border border-neutral-900 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <User className="h-4 w-4 text-[#1D4ED8]" /> Configuration
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-neutral-300">
                  Character Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-neutral-950 border-neutral-850 text-white"
                />
              </div>

              <div>
                <Label htmlFor="url" className="text-sm font-semibold text-neutral-300">
                  Avatar Image URL
                </Label>
                <Input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="bg-neutral-950 border-neutral-850 text-white"
                />
              </div>

              {mutation.isError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 text-xs">
                  {(mutation.error as any)?.response?.data?.error || "Error saving avatar"}
                </div>
              )}

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-[#1D4ED8] text-white font-bold py-3 hover:bg-[#1e40af] rounded-md"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Avatar"
                )}
              </Button>
            </form>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-neutral-900 pb-3">
              Saved Avatars
            </h2>

            {isLoading ? (
              <p className="text-neutral-400">Loading avatars...</p>
            ) : avatars.length === 0 ? (
              <p className="text-neutral-400">No avatars saved yet</p>
            ) : (
              avatars.map((gen: Avatar) => (
                <div key={gen.id} className="bg-neutral-900/20 border border-neutral-900 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                    <h3 className="font-bold text-white">{gen.name}</h3>
                    <span className="text-[10px] text-neutral-500">
                      {new Date(gen.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {gen.imageUrls.map((url, index) => (
                      <div key={index} className="group relative aspect-square rounded-lg border border-neutral-850 bg-neutral-950 overflow-hidden">
                        <img
                          src={url.startsWith("http") ? url : `${BACKEND_URL}${url}`}
                          alt={`${gen.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                          <a
                            href={url}
                            download={`${gen.name.replace(/\s+/g, "_")}_${index + 1}.png`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#1D4ED8] text-white rounded-md"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarCreator;
