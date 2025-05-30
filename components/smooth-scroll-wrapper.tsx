// "use client";
// import { ReactNode, useRef, useEffect } from "react";

// export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
    
//     let current = 0;
//     let target = 0;
//     const ease = 0.075;
    
//     const updateScroll = () => {
//       target = window.scrollY;
//       current += (target - current) * ease;
//       el.style.transform = `translateY(${-current}px)`;
//       requestAnimationFrame(updateScroll);
//     };
    
//     requestAnimationFrame(updateScroll);
//   }, []);
  
//   return (
//     <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
//       <div ref={containerRef} style={{ willChange: "transform" }}>
//         {children}
//       </div>
//     </div>
//   );
// }