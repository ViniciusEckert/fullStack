"use client";

import AlunoItem from "@/components/AlunosItem";
import { getAlunos } from "./actions";
import { useEffect, useState } from "react";
import Link from "next/link";

function StarField() {
  const stars = [
    { cx: "8%", cy: "12%", r: 1.4, delay: "0s", dur: "3s" },
    { cx: "18%", cy: "75%", r: 0.6, delay: "0.4s", dur: "4s" },
    { cx: "25%", cy: "38%", r: 1, delay: "0.8s", dur: "2s" },
    { cx: "35%", cy: "90%", r: 0.6, delay: "1.2s", dur: "5s" },
    { cx: "42%", cy: "5%", r: 1.4, delay: "0.3s", dur: "3s" },
    { cx: "55%", cy: "60%", r: 0.6, delay: "1.5s", dur: "4s" },
    { cx: "63%", cy: "28%", r: 1, delay: "0.7s", dur: "2s" },
    { cx: "70%", cy: "82%", r: 1.4, delay: "0.9s", dur: "5s" },
    { cx: "78%", cy: "14%", r: 0.6, delay: "0.2s", dur: "3s" },
    { cx: "85%", cy: "50%", r: 1, delay: "1.1s", dur: "4s" },
    { cx: "92%", cy: "70%", r: 1.4, delay: "0.6s", dur: "2s" },
    { cx: "3%", cy: "55%", r: 1, delay: "0.4s", dur: "3s" },
    { cx: "12%", cy: "90%", r: 1.4, delay: "1.3s", dur: "4s" },
    { cx: "30%", cy: "18%", r: 0.6, delay: "0.5s", dur: "2s" },
    { cx: "48%", cy: "44%", r: 1, delay: "1.6s", dur: "5s" },
    { cx: "60%", cy: "95%", r: 1.4, delay: "0.1s", dur: "3s" },
    { cx: "74%", cy: "5%", r: 0.6, delay: "1.9s", dur: "4s" },
    { cx: "88%", cy: "38%", r: 1, delay: "0.8s", dur: "2s" },
    { cx: "15%", cy: "62%", r: 1.4, delay: "1.4s", dur: "5s" },
    { cx: "50%", cy: "10%", r: 0.6, delay: "0.2s", dur: "3s" },
    { cx: "67%", cy: "72%", r: 1, delay: "1.7s", dur: "4s" },
    { cx: "82%", cy: "25%", r: 1.4, delay: "0.6s", dur: "2s" },
    { cx: "9%", cy: "40%", r: 0.6, delay: "1.0s", dur: "5s" },
    { cx: "37%", cy: "68%", r: 1, delay: "0.3s", dur: "3s" },
    { cx: "57%", cy: "85%", r: 1.4, delay: "1.2s", dur: "4s" },
    { cx: "72%", cy: "42%", r: 0.6, delay: "0.9s", dur: "2s" },
    { cx: "44%", cy: "30%", r: 0.6, delay: "1.8s", dur: "4s" },
    { cx: "96%", cy: "33%", r: 0.6, delay: "1.8s", dur: "5s" },
    { cx: "21%", cy: "8%", r: 1.4, delay: "0.7s", dur: "3s" },
    { cx: "91%", cy: "58%", r: 1, delay: "1.5s", dur: "5s" },
  ];

  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-1">
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="white"
          style={{
            animation: `twinkle ${s.dur} ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </svg>
  );
}

export default function Alunos() {
  const [alunos, setAlunos] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    getAlunos().then(setAlunos);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-[#02060f]">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.05); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-18px, 20px) scale(1.04); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulsate {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes meteor {
          0% { transform: translateX(-150px); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
        .nebula-drift   { animation: drift  28s ease-in-out infinite; }
        .nebula-drift2  { animation: drift2 34s ease-in-out infinite; }
        .nebula-drift3  { animation: drift  22s ease-in-out infinite reverse; }
        .galaxy-spin    { animation: rotateSlow 55s linear infinite; }
        .galaxy-spin-r  { animation: rotateSlow 70s linear infinite reverse; }
        .gal-pulse      { animation: pulsate 6s ease-in-out infinite; }
        .gal-pulse-2    { animation: pulsate 8s ease-in-out infinite 3s; }
        .meteor-1       { animation: meteor 10s linear infinite 1s; }
        .meteor-2       { animation: meteor 14s linear infinite 6s; }
        .meteor-3       { animation: meteor 18s linear infinite 11s; }
      `}</style>

      <StarField />

      <div className="nebula-drift  fixed -top-32 -left-32 w-150 h-150 rounded-full pointer-events-none z-2 bg-blue-700/20 blur-[80px]" />
      <div className="nebula-drift2 fixed -bottom-40 -right-40 w-175 h-175 rounded-full pointer-events-none z-2 bg-purple-700/15 blur-[90px]" />
      <div className="nebula-drift3 fixed top-1/2 -right-20 w-100 h-100 rounded-full pointer-events-none z-2 bg-teal-500/10 blur-[70px]" />
      <div className="nebula-drift  fixed top-1/3 -left-24 w-87.5 h-87.5 rounded-full pointer-events-none z-2 bg-rose-700/10 blur-[60px]" />

      <div className="gal-pulse fixed top-8 right-16 pointer-events-none z-3 w-32 h-32">
        <svg className="galaxy-spin w-full h-full" viewBox="0 0 120 120">
          <defs>
            <radialGradient id="gal1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff8c0" stopOpacity="0.95" />
              <stop offset="20%" stopColor="#c080ff" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#4040c0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="60" rx="58" ry="18" fill="url(#gal1)" />
          <ellipse
            cx="60"
            cy="60"
            rx="16"
            ry="16"
            fill="#fffbe0"
            fillOpacity="0.6"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="6"
            ry="6"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      </div>

      <div className="gal-pulse-2 fixed bottom-10 left-10 pointer-events-none z-3 w-24 h-24">
        <svg className="galaxy-spin-r w-full h-full" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="gal2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#80fff0" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#2080d0" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#102060" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="48" ry="15" fill="url(#gal2)" />
          <ellipse
            cx="50"
            cy="50"
            rx="13"
            ry="13"
            fill="#b0fff8"
            fillOpacity="0.55"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="5"
            ry="5"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      </div>

      <div className="gal-pulse fixed top-1/2 right-8 pointer-events-none z-3 w-16 h-16 opacity-70">
        <svg className="galaxy-spin w-full h-full" viewBox="0 0 80 80">
          <defs>
            <radialGradient id="gal3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb0e0" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#c040a0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="40" cy="40" rx="38" ry="12" fill="url(#gal3)" />
          <ellipse
            cx="40"
            cy="40"
            rx="10"
            ry="10"
            fill="#ffd0f0"
            fillOpacity="0.6"
          />
          <ellipse
            cx="40"
            cy="40"
            rx="4"
            ry="4"
            fill="white"
            fillOpacity="0.9"
          />
        </svg>
      </div>

      <div className="meteor-1 fixed top-[20%] left-0 pointer-events-none z-4">
        <svg width="130" height="10" viewBox="0 0 130 10">
          <defs>
            <linearGradient id="m1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c8e0ff" stopOpacity="0" />
              <stop offset="100%" stopColor="#c8e0ff" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="5"
            x2="120"
            y2="5"
            stroke="url(#m1)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="125" cy="5" r="3.5" fill="#c8e0ff" />
        </svg>
      </div>

      <div className="meteor-2 fixed top-[55%] left-0 pointer-events-none z-4">
        <svg width="100" height="10" viewBox="0 0 100 10">
          <defs>
            <linearGradient id="m2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8c8ff" stopOpacity="0" />
              <stop offset="100%" stopColor="#e8c8ff" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="5"
            x2="90"
            y2="5"
            stroke="url(#m2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="95" cy="5" r="3" fill="#e8c8ff" />
        </svg>
      </div>

      <div className="meteor-3 fixed top-[80%] left-0 pointer-events-none z-4">
        <svg width="115" height="10" viewBox="0 0 115 10">
          <defs>
            <linearGradient id="m3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c8fff8" stopOpacity="0" />
              <stop offset="100%" stopColor="#c8fff8" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="5"
            x2="105"
            y2="5"
            stroke="url(#m3)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="110" cy="5" r="3" fill="#c8fff8" />
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pb-16">
        <div className="mt-12 mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(120,160,255,0.6)]">
            Lista de Alunos
          </h1>
          <p className="mt-2 text-xs tracking-widest uppercase font-medium text-blue-300/70">
            {alunos.length} aluno{alunos.length !== 1 ? "s" : ""} cadastrado
            {alunos.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="w-[90%] max-w-2xl rounded-2xl p-6 bg-blue-950/50 border border-blue-400/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(40,80,200,0.12),0_8px_40px_rgba(0,0,0,0.55)]">
          <div className="w-full h-px mb-5 rounded-full bg-linear-to-r from-transparent via-blue-400/40 to-transparent" />

          <ul className="flex flex-col gap-3">
            {alunos.map((aluno) => (
              <li
                key={aluno.id}
                className="rounded-xl border border-white/5 bg-white/3 hover:bg-blue-500/10 hover:border-blue-400/25 transition-all duration-200"
              >
                <AlunoItem nome={aluno.nome} id={aluno.id} />
              </li>
            ))}
          </ul>

          <div className="w-full h-px mt-5 rounded-full bg-linear-to-r from-transparent via-blue-400/25 to-transparent" />
        </div>
      </div>

      <Link href="/aluno/cadastro" className="px-5 py-2 bg-white text-black mt-5 rounded-lg">Cadastrar  aluno</Link>

    </div>
  );
}
