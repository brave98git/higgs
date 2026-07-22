import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { TrainFront, Sparkles, Image as ImageIcon, Shield, Zap, ArrowRight, User } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-100 font-mono flex flex-col items-center overflow-x-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1D4ED8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-5xl w-full px-6 pt-20 pb-16 flex flex-col items-center text-center space-y-8 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-450 hover:border-neutral-700 transition-colors">
          <Sparkles className="h-3.5 w-3.5 text-[#1D4ED8]" />
          <span>Higgs v2.0 Avatar Engine is now in Public Beta</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
          Unleash Photorealistic AI Avatar & Image Generation
        </h1>

        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          The ultimate open-access avatar and image diffusion engine. Turn raw concepts or text prompts into high-fidelity custom digital personas instantly.
        </p>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            onClick={() => navigate("/signup")}
            className="h-12 px-8 bg-[#1D4ED8] text-white font-bold text-base hover:bg-[#1e40af] transition-colors flex items-center gap-2 rounded-lg shadow-lg shadow-[#1D4ED8]/10"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/signin")}
            className="h-12 px-8 border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors rounded-lg"
          >
            Enter Dashboard
          </Button>
        </div>
      </section>

      {/* Showcase / Image Preview Box */}
      <section className="max-w-xl w-full px-6 pb-24 z-10">
        <div className="relative group rounded-2xl border border-neutral-900 bg-neutral-900/10 p-2 backdrop-blur-md">
          <div className="aspect-square w-full bg-neutral-950 border border-neutral-800/60 rounded-xl overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors flex items-center justify-center">
              <div className="h-16 w-16 bg-[#1D4ED8] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                <User className="h-6 w-6" />
              </div>
            </div>
            {/* Minimal mockup lines simulating avatar frame */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-500 font-semibold bg-neutral-950/80 px-3 py-2 rounded border border-neutral-900">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1D4ED8]" />
                Prompt: "Futuristic digital avatar, cyberpunk mechanic..."
              </span>
              <span>Avatar • 2K Resolution</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 z-10 border-t border-neutral-900 pt-16">
        <div className="space-y-4">
          <div className="h-10 w-10 bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Ultra Fast Rendering</h3>
          <p className="text-sm text-neutral-450 leading-relaxed">
            Highly optimized diffusion loops generate beautiful images and custom avatars in seconds, decreasing your workflow loop cycle.
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-10 w-10 bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] rounded-lg flex items-center justify-center">
            <ImageIcon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Custom Styles & Avatars</h3>
          <p className="text-sm text-neutral-450 leading-relaxed">
            Gain fine-grained structural control. Custom-train styles or load your own seed portraits to render realistic digital twins.
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-10 w-10 bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Safe & Secure</h3>
          <p className="text-sm text-neutral-450 leading-relaxed">
            Automated guardrails and content filters protect output assets. Full ownership rights on all generated images.
          </p>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full bg-neutral-900/30 border-t border-neutral-900 py-12 text-center text-xs text-neutral-500 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrainFront className="h-4 w-4 text-[#1D4ED8]" />
            <span className="font-bold text-white">HIGGS</span>
          </div>
          <p>© 2026 Higgs. All rights reserved. Creative tools under MIT License.</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
