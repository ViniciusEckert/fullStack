"use client"

import Link from "next/link";
import { Trash } from "lucide-react";
import { deleteAluno } from "@/app/alunos/actions";

interface Props {
  id: number;
  nome: string;
}

export default function AlunoItem({ id, nome }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Link href={`/aluno/${id}`} className="flex-1">
        <li className="w-full px-4 py-3 rounded-xl font-medium text-blue-100 bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-400/30 backdrop-blur-md transition-all duration-200 shadow-[0_0_10px_rgba(80,120,255,0.15)] hover:shadow-[0_0_20px_rgba(80,120,255,0.35)] hover:scale-[1.02]">{nome}</li>
      </Link>
      <button 
        onClick={() => deleteAluno(id)}
        className="relative p-2.5 text-cyan-300 hover:text-cyan-200 transition-all duration-300 group"
        title="Deletar aluno"
      >
        <style>{`
          @keyframes pulseDelete {
            0%, 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
            50% { box-shadow: 0 0 0 6px rgba(34, 211, 238, 0); }
          }
          .delete-pulse:hover { animation: pulseDelete 1.5s ease-in-out infinite; }
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 3px rgba(34, 211, 238, 0.4)); }
            50% { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)); }
          }
          .delete-glow:hover { animation: glow 1.5s ease-in-out infinite; }
        `}</style>
        
        {/* Background glow container */}
        <div className="absolute inset-0 rounded-lg bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-300 delete-pulse" />
        
        {/* Icon with glow effect */}
        <div className="relative delete-glow">
          <Trash size={20} strokeWidth={2} />
        </div>

        {/* Hover tooltip */}
        <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-slate-950/90 border border-cyan-400/30 text-cyan-300 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm pointer-events-none">
          Deletar
        </span>
      </button>
    </div>
  );
}