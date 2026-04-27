"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({ onSend }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmite() {
    const response = await onSend(email, password);
    console.log(response)

    if (response) {
      alert(response);
      return;
    }
    router.push("/");
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">

      <style>{`
        @keyframes pulseCore {
          0%, 100% { box-shadow: 0 0 20px rgba(100,200,255,0.3), 0 0 40px rgba(59,130,246,0.2); }
          50% { box-shadow: 0 0 40px rgba(100,200,255,0.6), 0 0 80px rgba(59,130,246,0.4); }
        }
        @keyframes waveRipple {
          0%, 100% { r: 25; opacity: 0.7; }
          100% { r: 90; opacity: 0; }
        }
        @keyframes orbitRing {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-60vh); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes energyFlow {
          0%, 100% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 100; }
        }
        .pulse-core { animation: pulseCore 2.5s ease-in-out infinite; }
        .ripple { animation: waveRipple 2s ease-out infinite; }
        .orbit { animation: orbitRing 15s linear infinite; }
        .float { animation: floatParticle 12s ease-in linear infinite; }
        .star-twinkle { animation: twinkle var(--duration, 2s) ease-in-out infinite; }
        .energy { animation: energyFlow 1.5s ease-in infinite; stroke-dasharray: 100; }
      `}</style>

      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {[
          [8, 12], [18, 75], [25, 38], [35, 90], [42, 5], [55, 60], [63, 28], [70, 82],
          [78, 14], [85, 50], [92, 70], [96, 33], [3, 55], [12, 90], [30, 18], [48, 44],
          [60, 95], [74, 5], [88, 38], [15, 62], [50, 10], [67, 72], [82, 25], [9, 40],
          [37, 68], [57, 85], [72, 42], [91, 58], [21, 8], [44, 30],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r={i % 5 === 0 ? 1.4 : i % 3 === 0 ? 1 : 0.6}
            fill="white"
            className="star-twinkle"
            style={{
              "--duration": `${2 + (i % 5)}s`,
            } as React.CSSProperties}
          />
        ))}

        {[1, 2, 3].map((i) => (
          <circle
            key={`ripple-${i}`}
            cx="50%"
            cy="50%"
            r="25"
            fill="none"
            stroke="rgba(100,150,255,0.5)"
            strokeWidth="1.5"
            className="ripple"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </svg>

      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none z-0 bg-blue-600/20 blur-3xl opacity-60" />

      <div className="fixed -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none z-0 bg-indigo-600/15 blur-3xl opacity-50" />

      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="float fixed pointer-events-none z-0"
          style={{
            left: `${15 + i * 10}%`,
            top: "100%",
            animationDelay: `${i * 1.5}s`,
          }}
        >
          <div className="w-1 h-1 bg-cyan-300 rounded-full blur-sm shadow-lg shadow-cyan-400/50" />
        </div>
      ))}

      <div className="relative z-10">
        
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/10 via-blue-500/5 to-indigo-500/10 rounded-2xl blur-xl pulse-core pointer-events-none" />

        <svg className="absolute -inset-6 w-full h-full pointer-events-none" viewBox="0 0 400 500">
          <circle cx="200" cy="250" r="180" fill="none" stroke="rgba(100,200,255,0.1)" strokeWidth="1" className="orbit" />
          <circle cx="200" cy="250" r="150" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" className="orbit" style={{ animationDirection: "reverse", animationDuration: "20s" }} />
        </svg>

        <div className="relative bg-linear-to-br from-slate-950/80 via-blue-950/40 to-indigo-950/60 rounded-2xl p-10 w-96 shadow-2xl shadow-cyan-500/20 border border-cyan-400/25 backdrop-blur-xl">

          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-2 border-cyan-400/60 rounded-full pulse-core" />
              <div className="absolute inset-2 border border-blue-500/40 rounded-full" style={{ animation: "spin 4s linear infinite reverse" }} />
              <div className="absolute inset-3 bg-linear-to-br from-cyan-300/40 to-blue-400/30 rounded-full pulse-core" />
              <div className="absolute inset-4 bg-linear-to-br from-cyan-200 to-blue-300 rounded-full shadow-lg shadow-cyan-400/70" />
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-300 mt-10 mb-10 uppercase tracking-tight drop-shadow-lg">
            Entrar
          </h1>

          <div className="mb-6">
            <div className="flex items-center text-lg">
              <svg className="absolute ml-3 w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
              <input
                className="bg-white/5 border border-cyan-400/30 text-white rounded pl-12 py-2 md:py-3 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 w-full transition-all placeholder-slate-400"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3 w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>
            <input
              className="bg-white/5 border border-cyan-400/30 rounded pl-12 py-2 md:py-3 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 w-full transition-all text-white placeholder-slate-400"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 font-medium p-2 md:p-3 text-white uppercase w-full rounded transition-all hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 tracking-wide"
            onClick={handleSubmite}
          >
            Cadastrar
          </button>

          <svg className="w-full h-8 mt-6 opacity-40" viewBox="0 0 380 20" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path
              d="M 0 15 Q 95 5 190 15 T 380 15"
              stroke="url(#arcGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none z-0" />
    </div>
  );
}