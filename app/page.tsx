import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center bg-linear-to-b from-slate-950 to-indigo-950 overflow-hidden">

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes pulseBlackHole {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(168,85,247,0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(168,85,247,0.8)); }
        }
        @keyframes orbitStar {
          from { transform: rotate(0deg) translateX(12px); }
          to { transform: rotate(360deg) translateX(12px); }
        }
        .star-twinkle { animation: twinkle var(--duration, 2s) ease-in-out infinite; }
        .black-hole-pulse { animation: pulseBlackHole 2.5s ease-in-out infinite; }
        .orbit { animation: orbitStar 8s linear infinite; }
      `}</style>

      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {[
          [5, 10], [12, 25], [18, 8], [25, 35], [32, 15], [40, 28], [48, 12],
          [55, 32], [62, 18], [70, 30], [78, 10], [85, 27], [92, 15], [8, 50],
          [15, 55], [22, 60], [35, 65], [45, 58], [58, 62], [72, 55], [88, 60],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={i % 3 === 0 ? 1.2 : 0.6}
            fill="white"
            className="star-twinkle"
            style={{
              "--duration": `${2 + (i % 4)}s`,
            } as React.CSSProperties}
          />
        ))}
      </svg>

      <nav className="relative z-20 w-full h-20 flex justify-evenly items-center bg-linear-to-r from-slate-950/80 via-indigo-950/80 to-slate-950/80 backdrop-blur-md border-b border-cyan-400/20 shadow-lg shadow-cyan-500/10">

        <div className="absolute left-8 flex items-center gap-2">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-linear-to-br from-purple-600 to-purple-900 rounded-full black-hole-pulse" />
            <div className="absolute inset-1 bg-linear-to-br from-purple-900 to-black rounded-full" />
            <div className="absolute inset-2 bg-black rounded-full" />
            <div className="orbit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-1 h-1 bg-yellow-300 rounded-full absolute" style={{ transform: "translateX(12px)" }} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="relative text-white font-semibold uppercase tracking-wide transition-all duration-200 group"
          >
            <span className="relative z-10">Home</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            <div className="absolute -top-3 -right-2 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-yellow-300/60" />
          </Link>

          <Link 
            href="/alunos" 
            className="relative text-white font-semibold uppercase tracking-wide transition-all duration-200 group"
          >
            <span className="relative z-10">Alunos</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            <div className="absolute -top-3 -right-2 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-yellow-300/60" />
          </Link>

          <Link href="/login"
            className="relative text-white font-semibold uppercase tracking-wide transition-all duration-200 group cursor-pointer"
          >
            <span className="relative z-10">Sair</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
  
            <div className="absolute -top-3 -right-2 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-yellow-300/60" />
          </Link>
        </div>

        <div className="absolute right-8 flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-lg shadow-cyan-400/70 star-twinkle"
              style={{
                "--duration": `${2 + i}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </nav>


      <div className="relative z-10 flex-1 w-full" />
    </div>
  );
}
