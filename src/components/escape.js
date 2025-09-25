"use client";

import { useEffect, useRef } from "react";

export default function PrivateEscapeSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const els = root.querySelectorAll("[data-animate]");
    els.forEach((el) => el.classList.add("opacity-0"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const anim = el.getAttribute("data-animate") || "";
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0");
            el.classList.add(anim);
          } else {
            el.classList.add("opacity-0");
            el.classList.remove(anim);
          }
        });
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#6E8628] py-12 sm:py-16 md:py-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-12"
    >
      {/* Heading */}
      <h2
        data-animate="animate-fadeDown"
        className="text-white -mt-[30px] font-[Cinzel] font-bold 
          text-3xl sm:text-4xl md:text-5xl lg:text-[64px] 
          mb-4 sm:mb-6 leading-snug sm:leading-tight 
          transition-all duration-1000 opacity-0"
      >
        Your Private Escape Awaits
      </h2>

      {/* Subheading / Description */}
      <p
        data-animate="animate-fadeUp"
        className="text-white font-[Oswald] 
          text-base sm:text-lg md:text-xl lg:text-xl 
          max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl 
          transition-all duration-1000 delay-300 opacity-0"
      >
        Nestled amidst the peaceful location on Tiger Hills, just 20 minutes from Udaipur city, Moti Paradise Villa offers you an exclusive retreat that blends comfort, privacy, and nature.
        <br />
        With a lush green lawn, a private pool, and cozy interiors — it’s the perfect getaway for families, couples, and close-knit groups.
      </p>
    </section>
  );
}
