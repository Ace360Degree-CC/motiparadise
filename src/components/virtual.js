"use client";
// app/components/virtual.js
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Virtual() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-active");
          } else {
            entry.target.classList.remove("animate-active");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#202020] py-16 sm:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Image (on top in mobile, right side in desktop) */}
        <div className="relative order-1 md:order-2 md:col-span-8">
          <Image
            src="/1vr-tour.png"
            alt="Villa Tour"
            width={1200}
            height={700}
            className="w-full h-auto animate-on-scroll slide-in-right opacity-0 transition-all duration-1000 ease-out delay-300 rounded-md shadow-lg"
          />

          {/* Overlay Play Button + Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {/* Ripple + Play Button */}
            <div className="relative animate-on-scroll opacity-0 transition-all duration-700 ease-out delay-500">
              {/* Ripple Circles */}
              <span className="absolute inset-0 rounded-full border-2 border-white/70 animate-ripple"></span>
              <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ripple delay-200"></span>

              {/* Main Play Button */}
              <button
                type="button"
                className="w-10 h-10 sm:w-14 sm:h-14 
                  flex items-center justify-center rounded-full 
                  bg-white/90 text-black 
                  text-xl sm:text-2xl 
                  shadow-lg relative z-10"
              >
                <span className="translate-x-[1px]">▶</span>
              </button>
            </div>

            {/* Caption */}
            <p className="animate-on-scroll opacity-0 font-[Oswald] text-white text-2xl sm:text-3xl md:text-[40px] leading-snug transition-all duration-700 ease-out delay-700 mt-4">
              Enjoy the Taste of Life
            </p>
          </div>
        </div>

        {/* Text (below image in mobile, left side in desktop) */}
        <div className="order-2 md:order-1 text-left md:col-span-4">
          <h4 className="animate-on-scroll opacity-0 font-[Oswald] text-white text-[20px] sm:text-[24px] tracking-wide uppercase mb-4 transition-all duration-700 ease-out">
            Experience It Virtually
          </h4>
          <h2
            className="animate-on-scroll opacity-0 font-[Cinzel] text-white 
              text-4xl sm:text-5xl md:text-[64px] 
              leading-tight transition-all duration-1000 ease-out delay-200"
          >
            Watch Our Full Villa Tour
          </h2>
        </div>
      </div>
    </section>
  );
}
