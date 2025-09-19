"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Contcat from "@/components/contact"; // your booking form component

export default function Hero() {
  const heroRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [closing, setClosing] = useState(false);

  // Slider state
  const images = ["/2hero.png", "/3hero.png", "/4hero.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide (run once)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Animations observer (keep original)
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

  // Modal functions
  const openModal = () => {
    setShowForm(true);
    setClosing(false);
  };
  const startClose = () => setClosing(true);

  // Close on ESC
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => e.key === "Escape" && startClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden">
      {/* Slider */}
      <div className="relative w-full h-[700px] overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-full h-[700px] sm:h-[400px] md:h-[600px] lg:h-[700px]"
            >
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Content */}
      <div
        data-animate="animate-fadeIn"
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 opacity-0"
      >
        <div
          data-animate="animate-bounce"
          className="relative mb-2 -mt-[20px] opacity-0"
        >
          <Image
            src="/smile.png"
            alt="Smiles Guaranteed"
            width={200}
            height={100}
            className="relative sm:left-[-125px] sm:top-[25px] sm:w-[200px] left-[-60px] top-[10px] w-[120px]"
          />
        </div>

        <h1
          data-animate="animate-slideDown"
          className="text-3xl sm:text-6xl font-[Cinzel] mb-4 leading-tight -mt-[10px] opacity-0"
        >
          WELCOME TO MOTI <br /> PARADISE VILLA
        </h1>

        <p
          data-animate="animate-fadeUp"
          className="text-base sm:text-xl font-[Oswald] mb-8 opacity-0"
        >
          Where serenity meets luxury — in the heart of Udaipur
        </p>

        <button
          onClick={openModal}
          data-animate="animate-slideUp"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 font-[Oswald] text-lg tracking-wide rounded shadow-lg transition-all opacity-0"
        >
          Book Your Stay Now!
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
            closing ? "backdrop-out" : "backdrop-in"
          }`}
          onClick={startClose}
        >
          <div
            className={`relative bg-white w-full max-w-4xl rounded-lg shadow-xl modal-base ${
              closing ? "modal-out" : "modal-in"
            }`}
            style={{ maxHeight: "90vh", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={(e) => {
              if (closing && e.animationName === "modalOut") {
                setShowForm(false);
                setClosing(false);
              }
            }}
          >
            <button
              onClick={startClose}
              className="absolute top-3 right-3 text-white text-3xl font-bold z-50 hover:text-red-500 transition"
            >
              ✕
            </button>
            <Contcat />
          </div>
        </div>
      )}

      {/* Modal animations */}
      <style jsx>{`
        .backdrop-in {
          animation: backdropIn 300ms ease forwards;
        }
        .backdrop-out {
          animation: backdropOut 300ms ease forwards;
        }
        @keyframes backdropIn {
          from {
            opacity: 0;
            background-color: rgba(0, 0, 0, 0);
          }
          to {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
        @keyframes backdropOut {
          from {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.7);
          }
          to {
            opacity: 0;
            background-color: rgba(0, 0, 0, 0);
          }
        }
        .modal-base {
          will-change: transform, opacity;
        }
        .modal-in {
          animation: modalIn 300ms cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
        }
        .modal-out {
          animation: modalOut 300ms cubic-bezier(0.4, 0.2, 0.2, 1) forwards;
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes modalOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.96);
          }
        }
      `}</style>
    </section>
  );
}
