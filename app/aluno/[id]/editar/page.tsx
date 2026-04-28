"use client";
import { Aluno } from "@/interfaces/alunos";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getAluno } from "../actions";

function MinimalStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Minimal stars only
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 0.8 + 0.3,
      alpha: Math.random() * 0.3 + 0.2,
      delta: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Simple gradient background
      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "#051535");
      bg.addColorStop(1, "#020810");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with subtle twinkle
      for (const s of stars) {
        s.alpha += s.delta;
        if (s.alpha >= 0.5 || s.alpha <= 0.1) s.delta *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function AlunoPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState({} as Aluno);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getAluno(Number(id)).then((response) => setAluno(response));
  }, [id]);

  function handleChange(value: string, key: keyof Aluno) {
    setAluno(oldState => ({ ...oldState, [key]: value }));
    setIsSaved(false);
  }

  const handleSave = async () => {
    // TODO: implement save logic
    console.log("Saving:", aluno);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const initial = aluno.nome?.charAt(0) ?? "?";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">


      <MinimalStarfield />

      {/* Main edit container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Outer prism glow */}
        <div className="absolute -inset-6 bg-linear-to-r from-cyan-500/10 via-blue-500/5 to-indigo-500/10 rounded-3xl blur-2xl pointer-events-none" />

        {/* Main card */}
        <div
          className="relative rounded-2xl p-10 backdrop-blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(5, 21, 53, 0.85) 0%, rgba(10, 26, 63, 0.75) 100%)",
            border: "2px solid rgba(100,180,255,0.2)",
            boxShadow: "0 0 60px rgba(59,130,246,0.15), inset 0 0 40px rgba(100,180,255,0.08)",
          }}
        >
          {/* Header section */}
          <div className="flex items-start gap-6 mb-10 pb-8 border-b border-cyan-400/20">
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shrink-0"
              style={{
                background: "linear-gradient(135deg, #3b6fd4 0%, #6a3de8 100%)",
                boxShadow: "0 0 30px rgba(100,80,240,0.6), inset 0 0 20px rgba(160,140,255,0.3)",
                border: "2px solid rgba(160,140,255,0.5)",
              }}
            >
              {initial}
            </div>

            {/* Title */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-300 mb-2">
                {aluno.nome}
              </h1>
              <p className="text-cyan-300/60 text-sm uppercase tracking-widest font-medium">
                Editar Informações
              </p>
            </div>
          </div>

          {/* Edit fields */}
          <div className="space-y-6 mb-8">
            {/* Nome */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-cyan-300/80 font-bold mb-3">
                Nome Completo
              </label>
              <input
                value={aluno.nome || ""}
                onChange={(e) => handleChange(e.target.value, "nome")}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-400/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
                type="text"
              />
            </div>

            {/* Idade */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-cyan-300/80 font-bold mb-3">
                Idade
              </label>
              <input
                value={aluno.idade || ""}
                onChange={(e) => handleChange(e.target.value, "idade")}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-400/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
                type="number"
              />
            </div>

            {/* CPF */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-cyan-300/80 font-bold mb-3">
                CPF
              </label>
              <input
                value={aluno.cpf || ""}
                onChange={(e) => handleChange(e.target.value, "cpf")}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-400/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
                type="text"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-cyan-300/80 font-bold mb-3">
                Email
              </label>
              <input
                value={aluno.email || ""}
                onChange={(e) => handleChange(e.target.value, "email")}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-400/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
                type="email"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-8 border-t border-cyan-400/20">
            <button
              onClick={handleSave}
              className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 ${
                isSaved
                  ? "bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-green-500/40 scale-105"
                  : "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/40 hover:shadow-cyan-400/60 hover:scale-105"
              }`}
            >
              {isSaved ? "✓ Salvo" : "Salvar Alterações"}
            </button>

            <button
              onClick={() => window.history.back()}
              className="flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-cyan-300 border-2 border-cyan-400/40 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}