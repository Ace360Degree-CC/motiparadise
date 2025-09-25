// app/components/location.js
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Location() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const animated = root.querySelectorAll("[data-animate]");
    const wavy = root.querySelectorAll("[data-wave]");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          // Scroll-in/out for fade/slide keyframes
          const anim = el.getAttribute("data-animate");
          if (anim) {
            if (entry.isIntersecting) {
              el.classList.add(anim);
              el.classList.remove("opacity-0");
            } else {
              el.classList.remove(anim);
              el.classList.add("opacity-0");
            }
          }

          // Start/stop ocean wave only when visible
          if (el.hasAttribute("data-wave")) {
            if (entry.isIntersecting) {
              el.classList.add("animate-wave");
            } else {
              el.classList.remove("animate-wave");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    [...animated, ...wavy].forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 pt-30 bg-white">
      <div className="text-center mb-12">
        <h4
          data-animate="animate-slideDown"
          className="font-[Oswald] text-[#6E8628] font-bold tracking-wide uppercase text-lg opacity-0"
        >
          At the Heart of Udaipur’s Charm
        </h4>
        <h2
          data-animate="animate-fadeUp"
          className="font-[Cinzel] text-[#202020] text-[64px] font-bold mt-2 opacity-0"
        >
          Location Advantage
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center">
        {/* Udaipur City */}
        <div
          data-animate="animate-fadeUp"
          className="flex flex-col items-center px-6 py-6 relative opacity-0"
        >
          {/* Wave on image + caption as a group */}
          <div
            data-wave
            style={{ animationDelay: "0ms" }} // wave phase 1
            className="flex flex-col items-center"
          >
            <Image
              src="/udaipur.png"
              alt="Udaipur City"
              width={80}
              height={80}
              className="mb-6"
            />
            <p className="font-[Oswald] text-[20px] text-[#202020]">
              Just 3 km from Udaipur City
            </p>
          </div>

          {/* Right Divider */}
          <span className="hidden md:block absolute bottom-8 right-0 h-30 w-[1px] bg-[#202020]"></span>
        </div>

        {/* City Palace */}
        <div
          data-animate="animate-fadeUp"
          className="flex flex-col items-center px-6 py-6 relative opacity-0"
        >
          <div
            data-wave
            style={{ animationDelay: "200ms" }} // wave phase 2 (stagger)
            className="flex flex-col items-center"
          >
            <Image
              src="/city-palace.png"
              alt="City Palace"
              width={80}
              height={80}
              className="mb-6"
            />
            <p className="font-[Oswald] text-[20px] text-[#202020]">
              10 mins to City Palace, Fateh Sagar Lake & Lake Pichola
            </p>
          </div>

          {/* Right Divider */}
          <span className="hidden md:block absolute bottom-8 right-0 h-30 w-[1px] bg-[#202020]"></span>
        </div>

        {/* Hotel / Scenic */}
        <div
          data-animate="animate-fadeUp"
          className="flex flex-col items-center px-6 py-6 opacity-0"
        >
          <div
            data-wave
            style={{ animationDelay: "400ms" }} // wave phase 3 (stagger)
            className="flex flex-col items-center"
          >
            <Image
              src="/hotel.png"
              alt="Hotel & Scenic Views"
              width={80}
              height={80}
              className="mb-6"
            />
            <p className="font-[Oswald] text-[20px] text-[#202020]">
              Scenic drives, local food joints & peaceful sunsets
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
