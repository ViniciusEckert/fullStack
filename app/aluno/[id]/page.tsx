"use client";
import { Aluno } from "@/interfaces/alunos";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getAluno } from "./actions";

function UniverseCanvas() {
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

    const STAR_COUNT = 220;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3,
      alpha: Math.random(),
      delta: (Math.random() * 0.012 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
      color: ["#ffffff", "#c8d8ff", "#ffd6a5", "#d0f0ff"][
        Math.floor(Math.random() * 4)
      ],
    }));

    const GALAXY_COUNT = 4;
    const galaxies = Array.from({ length: GALAXY_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rx: Math.random() * 80 + 50,
      ry: Math.random() * 30 + 18,
      angle: Math.random() * Math.PI,
      hue: [210, 260, 190, 300][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.18 + 0.06,
      pulse: 0,
      pulseDir: Math.random() * 0.003 + 0.001,
    }));

    interface Meteor {
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
      active: boolean;
      timer: number;
      angle: number;
    }
    const METEOR_COUNT = 6;
    const createMeteor = (): Meteor => ({
      x: Math.random() * window.innerWidth * 1.4 - window.innerWidth * 0.2,
      y: -30,
      len: Math.random() * 120 + 80,
      speed: Math.random() * 6 + 5,
      alpha: Math.random() * 0.6 + 0.4,
      active: true,
      timer: 0,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
    });
    const meteors: Meteor[] = Array.from({ length: METEOR_COUNT }, () => {
      const m = createMeteor();
      m.y = Math.random() * window.innerHeight; // stagger initial positions
      m.timer = Math.random() * 180;
      m.active = false;
      return m;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bg = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.4,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.85,
      );
      bg.addColorStop(0, "#0d1b3e");
      bg.addColorStop(0.55, "#060d1f");
      bg.addColorStop(1, "#02060f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const g of galaxies) {
        g.pulse += g.pulseDir;
        if (g.pulse > 0.04 || g.pulse < 0) g.pulseDir *= -1;
        const grd = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.rx);
        grd.addColorStop(0, `hsla(${g.hue},80%,80%,${g.alpha + g.pulse})`);
        grd.addColorStop(
          0.35,
          `hsla(${g.hue},60%,55%,${(g.alpha + g.pulse) * 0.5})`,
        );
        grd.addColorStop(1, `hsla(${g.hue},40%,20%,0)`);
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.angle);
        ctx.scale(1, g.ry / g.rx);
        ctx.beginPath();
        ctx.arc(0, 0, g.rx, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
      }

      for (const s of stars) {
        s.alpha += s.delta;
        if (s.alpha >= 1 || s.alpha <= 0.05) s.delta *= -1;
        s.alpha = Math.max(0.05, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();

        if (s.r > 1.2) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(200,220,255,${s.alpha * 0.35})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      for (const m of meteors) {
        if (!m.active) {
          m.timer++;
          if (m.timer > 90 + Math.random() * 120) {
            Object.assign(m, createMeteor());
            m.active = true;
          }
          continue;
        }
        const dx = Math.cos(m.angle) * m.len;
        const dy = Math.sin(m.angle) * m.len;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - dx, m.y - dy);
        grad.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        grad.addColorStop(0.3, `rgba(200,225,255,${m.alpha * 0.5})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - dx, m.y - dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${m.alpha})`;
        ctx.fill();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        if (m.x > canvas.width + 150 || m.y > canvas.height + 150) {
          m.active = false;
          m.timer = 0;
        }
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

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "#7eb8f7" }}
      >
        {label}
      </span>
      <p className="mt-1 text-base font-medium text-white">{value ?? "—"}</p>
    </div>
  );
}

export default function AlunoPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState({} as Aluno);

  useEffect(() => {
    getAluno(Number(id)).then((response) => setAluno(response));
  }, [id]);

  const initial = aluno.nome?.charAt(0) ?? "?";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-6"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <UniverseCanvas />

      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 flex flex-col gap-6"
        style={{
          background: "rgba(8, 18, 45, 0.65)",
          border: "1px solid rgba(100,160,255,0.2)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 60px rgba(60,120,255,0.15), 0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #3b6fd4 0%, #6a3de8 100%)",
              boxShadow: "0 0 24px rgba(100,80,240,0.55)",
              border: "2px solid rgba(160,140,255,0.4)",
            }}
          >
            {initial}
          </div>

          <div className="text-center">
            <h1
              className="text-2xl font-bold text-white tracking-tight"
              style={{ textShadow: "0 0 20px rgba(100,160,255,0.4)" }}
            >
              {aluno.nome}
            </h1>
            <p
              className="text-sm mt-0.5"
              style={{ color: "rgba(140,180,255,0.7)" }}
            ></p>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(100,160,255,0.3), transparent)",
          }}
        />

        <div className="flex flex-col gap-3">
          <InfoRow label="Idade" value={aluno.idade} />
          <InfoRow label="CPF" value={aluno.cpf} />
          <InfoRow label="Email" value={aluno.email} />
        </div>
      </div>
    </div>
  );
}
