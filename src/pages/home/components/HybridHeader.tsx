import { useEffect, useState } from "react";
import bethelLogo from "../../../assets/bethellogo.png";
import bethelGymLogo from "../../../assets/bethelgymlogo.png";

interface HybridHeaderProps {
  sessionTitle: string;
  className: string;
  coach: string;
  date: string;
}

export default function HybridHeader({
  sessionTitle,
  className,
  coach,
  date,
}: HybridHeaderProps) {
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-col items-center pt-[2.5vh] pb-[1.5vh] px-[2vw] relative">
      {/* Date top-left / Time top-right */}
      <div className="absolute top-[1.5vh] left-[2vw] flex items-center gap-[0.3vw]">
        <span className="w-[0.5vw] h-[0.5vw] rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-[1.1vw] font-light tracking-widest text-zinc-500 uppercase">
          {date}
        </span>
      </div>
      <div className="absolute top-[1.5vh] right-[2vw] flex items-center gap-[0.3vw]">
        <span className="text-[1.1vw] font-light tracking-widest text-zinc-500">
          Actualizado
        </span>
        <span className="text-[1.1vw] font-semibold tracking-widest text-zinc-300">
          {currentTime}
        </span>
      </div>

      {/* Main Title with logos */}
      <div className="flex items-center gap-[12vw]">
        <img
          src={bethelGymLogo}
          alt="Bethel Logo"
          className="h-[3.5vw] w-auto object-contain select-none"
          draggable={false}
        />
        <h1
          className="text-[6.5vw] font-black tracking-[0.25em] text-white leading-none select-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            textShadow: "0 0 6vw rgba(255,255,255,0.06)",
          }}
        >
          {sessionTitle}
        </h1>
        <img
          src={bethelGymLogo}
          alt="Bethel Gym Logo"
          className="h-[3.5vw] w-auto object-contain select-none"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div className="flex items-center gap-[0.5vw] mt-[0.5vh] mb-[0.8vh] w-full max-w-[35vw]">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
        <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-zinc-500"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
      </div>

      {/* Subtitle row
      <div className="flex items-center gap-[1vw]">
        <span
          className="text-[1.15vw] font-medium tracking-[0.2em] uppercase text-zinc-400"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {className}
        </span>
        <span className="w-[0.25vw] h-[0.25vw] rounded-full bg-zinc-600"></span>
        <span
          className="text-[1.15vw] font-light tracking-[0.15em] uppercase text-zinc-500"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {coach}
        </span>
      </div> */}
    </header>
  );
}
