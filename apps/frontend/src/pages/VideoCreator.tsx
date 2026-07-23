import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Film, ArrowLeft, Loader2, Download, Play, Video } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface VideoGeneration {
  id: string;
  prompt: string;
  url: string;
  duration: number;
  width: number;
  height: number;
  status: string;
}

export function VideoCreator() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(10);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoGeneration[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/video/s`);
      if (Array.isArray(response.data)) {
        setVideos(response.data.reverse()); // Show newest first
      }
    } catch (err) {
      console.error("Failed to load videos:", err);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/video`, {
        prompt,
        duration: Number(duration),
        width: Number(width),
        height: Number(height),
      });

      if (response.data && response.data.success) {
        setPrompt("");
        await fetchVideos();
      } else {
        throw new Error("Failed to generate video");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "An error occurred during video generation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-100 font-mono p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top bar */}
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
                <Video className="h-6 w-6 text-[#1D4ED8] animate-pulse" />
                AI Video Creator
              </h1>
              <p className="text-sm text-neutral-400 mt-1">Transform prompt concepts into dynamic cinematic video sequences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator form */}
          <div className="lg:col-span-1 bg-neutral-900/40 border border-neutral-900 rounded-xl p-6 relative overflow-hidden h-fit">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D4ED8]/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Film className="h-4 w-4 text-[#1D4ED8]" /> Video Settings
            </h2>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-semibold text-neutral-300">
                  Video Prompt Description
                </Label>
                <textarea
                  id="prompt"
                  rows={4}
                  placeholder="Describe the action, scene, lighting, camera movement..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-sm font-semibold text-neutral-300">
                    Width (px)
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="bg-neutral-950 border-neutral-850 text-white placeholder-neutral-600 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-semibold text-neutral-300">
                    Height (px)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="bg-neutral-950 border-neutral-850 text-white placeholder-neutral-600 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-semibold text-neutral-300">
                  Duration (seconds)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="bg-neutral-950 border-neutral-850 text-white placeholder-neutral-600 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
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
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Rendering Video (Takes ~10-20s)...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-white" />
                    Generate Video
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Video history */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-neutral-900 pb-3">
              Generated Videos
            </h2>

            {videos.length === 0 ? (
              <div className="border border-dashed border-neutral-850 rounded-xl p-12 text-center text-neutral-500">
                <Film className="h-12 w-12 mx-auto mb-4 opacity-30 text-[#1D4ED8]" />
                <p className="font-semibold text-neutral-400">No videos generated yet</p>
                <p className="text-xs mt-1">Configure and generate your first AI video sequence.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((vid) => {
                  const fullUrl = vid.url.startsWith("http") ? vid.url : `${BACKEND_URL}${vid.url}`;
                  return (
                    <div key={vid.id} className="bg-neutral-900/20 border border-neutral-900 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-neutral-800 transition-colors">
                      <div className="space-y-3">
                        <div className="aspect-video w-full rounded-lg border border-neutral-850 bg-neutral-950 overflow-hidden relative group">
                          <video
                            src={fullUrl}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-bold text-white line-clamp-2 h-10 italic">
                          "{vid.prompt}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-neutral-900 pt-4 text-[11px] text-neutral-500">
                        <span>{vid.duration}s • {vid.width}x{vid.height}</span>
                        <a
                          href={fullUrl}
                          download={`${vid.id}.mp4`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-[#1D4ED8] hover:text-[#2563EB] font-bold"
                        >
                          <Download className="h-3.5 w-3.5" /> Download
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCreator;
