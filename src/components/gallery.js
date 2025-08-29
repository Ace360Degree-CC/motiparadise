"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Gallery() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
          } else {
            setInView(false); // 👈 reset so animation replays
          }
        });
      },
      { root: null, threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // helper to hide before animate
  const hidden = "opacity-0";

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 px-6 md:px-12 lg:px-20 bg-white"
    >
      {/* Heading + Subheading */}
      <div className="text-center mb-12">
        <p
          className={`text-[24px] font-[Oswald] text-[#6E8628] tracking-wide uppercase ${
            inView ? "animate-slideUp" : hidden
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          Discover Moti Paradise
        </p>
        <h2
          className={`text-[40px] md:text-[64px] font-[Cinzel] text-[#202020] font-bold mt-2 leading-tight ${
            inView ? "animate-slideDown" : hidden
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          Gallery Sneak Peek
        </h2>
      </div>

      {/* Split layout: one image on left, 2x2 grid on right */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 items-stretch">
        {/* Left big image */}
        <div
          className={`relative overflow-hidden rounded-lg shadow-md min-h-[320px] md:min-h-[520px] ${
            inView ? "animate-fadeIn" : hidden
          }`}
          style={{ animationDelay: "0.25s" }}
        >
          <Image
            src="/gallery1.png"
            alt="Main gallery image"
            fill
            className="object-cover transition duration-500 hover:scale-105"
            priority
          />
        </div>

        {/* Right 2x2 grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
          {["/gallery2.png", "/gallery3.png", "/gallery4.png", "/gallery5.png"].map(
            (src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-lg shadow-md min-h-[150px] md:min-h-0 ${
                  inView ? "animate-fadeUp" : hidden
                }`}
                style={{ animationDelay: `${0.35 + i * 0.12}s` }}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${i + 2}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
