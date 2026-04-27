"use client";
import { useState, SubmitEvent } from "react";
import { createAluno } from "./actions";
import { useRouter } from "next/navigation";

interface Particle {
  id: number;
  left: string;
  delay: string;
}

function generateParticles(): Particle[] {
  return [...Array(12)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${i * 1.2}s`,
  }));
}

export default function AlunoCadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [particles] = useState<Particle[]>(generateParticles());

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const response = await createAluno({
      nome,
      idade: Number(idade),
      cpf: Number(cpf),
      email,
    });

    if(!response) {
      setNome("");
      setIdade("");
      setCpf("");
      setEmail("");
      router.push("/alunos");
      return;
    }

    alert(response)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-b from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-80vh) translateX(40px); opacity: 0; }
        }
        @keyframes auroraWave {
          0%, 100% { transform: translateX(-100%) rotate(0deg); }
          50% { transform: translateX(0%) rotate(2deg); }
        }
        @keyframes orbitPlanet1 {
          from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes orbitPlanet2 {
          from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(40px) rotate(360deg); }
        }
        @keyframes cometTrail {
          0% { transform: translateX(-200px) translateY(-100px) rotate(-45deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateX(200px) translateY(100px) rotate(-45deg); opacity: 0; }
        }
        .star-twinkle { animation: twinkle var(--duration, 2s) ease-in-out infinite; }
        .float-particle { animation: floatParticle 15s ease-in linear infinite; }
        .aurora { animation: auroraWave 6s ease-in-out infinite; }
        .planet-orbit-1 { animation: orbitPlanet1 20s linear infinite; }
        .planet-orbit-2 { animation: orbitPlanet2 28s linear infinite; }
        .comet { animation: cometTrail 12s ease-in-out infinite; }
      `}</style>

      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {[
          [10, 15], [25, 35], [40, 8], [55, 50], [70, 20], [85, 60], [15, 75],
          [38, 85], [62, 42], [80, 75], [18, 45], [92, 15], [12, 60], [48, 12],
          [73, 88], [28, 22], [65, 68], [35, 90], [88, 35], [22, 70],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={i % 4 === 0 ? 1.5 : 0.8}
            fill="white"
            className="star-twinkle"
            style={{
              "--duration": `${2 + (i % 4)}s`,
            } as React.CSSProperties}
          />
        ))}
      </svg>

      <div className="aurora fixed top-0 left-0 w-full h-64 pointer-events-none z-0 opacity-40">
        <div className="w-full h-full bg-linear-to-b from-cyan-500/30 via-teal-500/10 to-transparent blur-3xl" />
      </div>


      <div className="aurora fixed bottom-0 right-0 w-full h-48 pointer-events-none z-0 opacity-30" style={{ animationDelay: "1s" }}>
        <div className="w-full h-full bg-linear-to-t from-purple-500/20 via-indigo-500/10 to-transparent blur-3xl" />
      </div>


      {particles.map((p) => (
        <div
          key={p.id}
          className="float-particle fixed pointer-events-none z-0"
          style={{
            left: p.left,
            top: "100%",
            animationDelay: p.delay,
          }}
        >
          <div className="w-1 h-1 bg-cyan-300 rounded-full blur-sm shadow-lg shadow-cyan-400/50" />
        </div>
      ))}

      <div className="planet-orbit-1 fixed top-20 right-20 pointer-events-none z-1">
        <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full shadow-lg shadow-blue-500/60 border border-blue-300/40" />
      </div>

      <div className="planet-orbit-2 fixed bottom-32 left-16 pointer-events-none z-1">
        <div className="w-6 h-6 bg-linear-to-br from-violet-400 to-violet-600 rounded-full shadow-lg shadow-violet-500/50 border border-violet-300/30" />
      </div>

      {/* Comet 1 */}
      <div className="comet fixed top-1/3 left-0 pointer-events-none z-1">
        <svg width="200" height="40" viewBox="0 0 200 40">
          <defs>
            <linearGradient id="cometGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0" />
              <stop offset="40%" stopColor="#a5b4fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <line x1="10" y1="20" x2="180" y2="20" stroke="url(#cometGrad1)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="185" cy="20" r="4" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)" />
        </svg>
      </div>

      <div className="comet fixed top-2/3 right-0 pointer-events-none z-1" style={{ animationDelay: "3s" }}>
        <svg width="180" height="40" viewBox="0 0 180 40">
          <defs>
            <linearGradient id="cometGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0fdfa" stopOpacity="0" />
              <stop offset="50%" stopColor="#5eead4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <line x1="10" y1="20" x2="160" y2="20" stroke="url(#cometGrad2)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="165" cy="20" r="3.5" fill="#06b6d4" filter="drop-shadow(0 0 8px #06b6d4)" />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-300 mb-12">
          Cadastrar Aluno
        </h1>

        <form
          className="px-10 py-8 flex flex-col gap-4 bg-slate-950/60 rounded-2xl border border-cyan-400/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/20"
          onSubmit={handleSubmit}
        >
          <input
            className="border border-cyan-400/30 text-white bg-white/5 pl-4 py-3 rounded-lg placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className="border border-cyan-400/30 text-white bg-white/5 pl-4 py-3 rounded-lg placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <input
            className="border border-cyan-400/30 text-white bg-white/5 pl-4 py-3 rounded-lg placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            type="number"
            placeholder="Cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            className="border border-cyan-400/30 text-white bg-white/5 pl-4 py-3 rounded-lg placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3 rounded-lg font-semibold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}