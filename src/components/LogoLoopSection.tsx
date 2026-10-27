import LogoLoop, { LogoItem } from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiDocker, SiPostgresql } from 'react-icons/si';

const R = SiReact as any;
const N = SiNextdotjs as any;
const T = SiTypescript as any;
const Tw = SiTailwindcss as any;
const Node = SiNodedotjs as any;
const Py = SiPython as any;
const Doc = SiDocker as any;
const Pg = SiPostgresql as any;

const techLogos: LogoItem[] = [
  { node: <R className="w-10 h-10 text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <N className="w-10 h-10 text-[#F0EEE8]" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <T className="w-10 h-10 text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <Tw className="w-10 h-10 text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <Node className="w-10 h-10 text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <Py className="w-10 h-10 text-[#3776AB]" />, title: "Python", href: "https://www.python.org" },
  { node: <Doc className="w-10 h-10 text-[#2496ED]" />, title: "Docker", href: "https://www.docker.com" },
  { node: <Pg className="w-10 h-10 text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
];

export default function LogoLoopSection() {
  return (
    <section className="relative w-full py-8 bg-[#08090A] border-b border-[#1F2225] overflow-hidden">
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#08090A"
        ariaLabel="Technology partners"
      />
    </section>
  );
}
