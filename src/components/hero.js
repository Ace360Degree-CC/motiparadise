"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const root = heroRef.current;
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
    <section ref={heroRef} className="relative w-full overflow-hidden">
      {/* Hero Image */}
      <div
        data-animate="animate-zoomOut"
        className="relative w-full h-[500px] sm:h-auto opacity-0"
      >
        <Image
          src="/hero2.png"
          alt="Moti Paradise Villa"
          width={1920}
          height={800}
          priority
          className="w-full h-[500px] object-cover sm:h-auto sm:object-fill"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Wrapper */}
      <div
        data-animate="animate-fadeIn"
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 opacity-0"
      >
        {/* Smile image (different anim) */}
        <div
          data-animate="animate-bounce"
          className="relative mb-2 -mt-[20px] opacity-0"
        >
          <Image
            src="/smile.png"
            alt="Smiles Guaranteed"
            width={200}
            height={100}
            className="
              relative 
              sm:left-[-125px] sm:top-[25px] sm:w-[200px]
              left-[-60px] top-[10px] w-[120px]
            "
          />
        </div>

        {/* Heading */}
        <h1
          data-animate="animate-slideDown"
          className="text-3xl sm:text-6xl font-[Cinzel] mb-4 leading-tight -mt-[10px] opacity-0"
        >
          WELCOME TO MOTI <br /> PARADISE VILLA
        </h1>

        {/* Subheading */}
        <p
          data-animate="animate-fadeUp"
          className="text-base sm:text-xl font-[Oswald] mb-8 opacity-0"
        >
          Where serenity meets luxury — in the heart of Udaipur
        </p>

        {/* Booking Form */}
        <div
          data-animate="animate-slideUp"
          className="bg-white text-black flex flex-wrap items-center justify-between rounded-md shadow-lg max-w-3xl mx-auto overflow-hidden mb-[20px] opacity-0"
        >
          <div className="p-3 text-center flex-1 min-w-[140px]">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Checkin
            </p>
            <p className="text-sm">Add Date</p>
          </div>

          <div className="p-3 text-center flex-1 min-w-[140px] border-l border-gray-300">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Checkout
            </p>
            <p className="text-sm">Add Date</p>
          </div>

          <div className="p-3 text-center flex-1 min-w-[140px] border-l border-gray-300">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Guests
            </p>
            <p className="text-sm">Adults 0 . Child 0 . Rooms 0</p>
          </div>

          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-4 font-[Oswald] text-sm tracking-wide w-full sm:w-auto">
            BOOK NOW!
          </button>
        </div>
      </div>
    </section>
  );
}
