"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Features() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setInView(e.isIntersecting);
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = "opacity-0";

  const bullets = [
    "2 Spacious Bedrooms (1 King, 1 Double + Extra Mattress)",
    "Private Swimming Pool",
    "Fully Equipped Kitchen & Dining Space",
    "Bonfire & Barbecue Setup",
    "High-Speed Wi-Fi & Smart TV",
    "Caretaker & Daily Housekeeping",
    "Free Parking",
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-20 bg-center bg-cover"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch relative">
        
        {/* Left: black panel */}
        <div
          className="bg-[#202020] text-white p-8 md:p-10 flex flex-col relative 
          -mb-10 md:-mb-16 z-10"
        >
          {/* Mobile-only top image */}
          <div
            className={`mb-6 md:hidden ${inView ? "animate-zoomOut" : hidden}`}
            style={{ animationDelay: "0.15s" }}
          >
            <Image
              src="/exclusive.png"
              alt="Exclusive villa feature"
              width={1200}
              height={800}
              className="w-full h-auto object-cover rounded-md shadow-lg"
              sizes="100vw"
            />
          </div>

          <p
            className={`text-[16px] md:text-[18px] font-[Oswald] tracking-wider mb-3 uppercase ${
              inView ? "animate-slideUp" : hidden
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Exclusive Features
          </p>

          <h2
            className={`text-[36px] md:text-[48px] lg:text-[56px] font-[Cinzel] font-bold leading-tight mb-6 ${
              inView ? "animate-slideDown" : hidden
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            What You’ll Love
          </h2>

          <ul className="space-y-3 text-[16px] md:text-[18px] font-[Oswald] leading-relaxed mb-8">
            {bullets.map((text, i) => (
              <li
                key={text}
                className={`${inView ? "animate-fadeUp" : hidden}`}
                style={{ animationDelay: `${0.35 + i * 0.08}s` }}
              >
                • {text}
              </li>
            ))}
          </ul>

          {/* Building icon bottom right */}
          <div
            className={`mt-auto pt-4 flex justify-end ${
              inView ? "animate-fadeIn" : hidden
            }`}
            style={{ animationDelay: `${0.35 + bullets.length * 0.08 + 0.1}s` }}
          >
            <Image
              src="/building-icon.png"
              alt="Building icon"
              width={120}
              height={120}
              className="h-[72px] w-auto md:h-[96px]"
            />
          </div>
        </div>

        {/* Right: feature image (desktop only) */}
        <div
          className={`relative hidden md:flex items-center justify-center ${inView ? "animate-zoomOut" : hidden}`}
          style={{ animationDelay: "0.25s" }}
        >
          <div className="w-[90%] shadow-lg">
            <Image
              src="/exclusive.png"
              alt="Exclusive villa feature"
              width={1200}
              height={800}
              className="w-full h-auto object-cover rounded-md"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
