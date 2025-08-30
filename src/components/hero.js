"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Contcat from "@/components/contact"; // your booking form component

export default function Hero() {
  const heroRef = useRef(null);
  const [showForm, setShowForm] = useState(false); // mounted or not
  const [closing, setClosing] = useState(false);   // drive reverse animation

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

  const openModal = () => {
    setShowForm(true);
    setClosing(false);
  };

  const startClose = () => {
    setClosing(true); // play reverse animation; unmount happens on animationend
  };

  // Close on ESC
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => e.key === "Escape" && startClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

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
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div
        data-animate="animate-fadeIn"
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 opacity-0"
      >
        <div data-animate="animate-bounce" className="relative mb-2 -mt-[20px] opacity-0">
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

      {/* Modal with true reverse animation */}
      {showForm && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4
                      ${closing ? "backdrop-out" : "backdrop-in"}`}
          onClick={startClose} // close by clicking outside
        >
          <div
            className={`relative bg-white w-full max-w-4xl rounded-lg shadow-xl
                        modal-base ${closing ? "modal-out" : "modal-in"}`}
            style={{ maxHeight: "90vh", overflow: "hidden" }} // ✅ no scrollbar inside popup
            onClick={(e) => e.stopPropagation()} // avoid closing when clicking inside
            onAnimationEnd={(e) => {
              // Only unmount when our modal-out animation finishes
              if (closing && e.animationName === "modalOut") {
                setShowForm(false);
                setClosing(false);
              }
            }}
          >
            {/* Close Button (white, hover red) */}
            <button
              onClick={startClose}
              className="absolute top-3 right-3 text-white text-3xl font-bold z-50 hover:text-red-500 transition"
            >
              ✕
            </button>

            {/* Booking Form */}
            <Contcat />
          </div>
        </div>
      )}

      {/* Modal animations */}
      <style jsx>{`
        /* Backdrop */
        .backdrop-in {
          animation: backdropIn 300ms ease forwards;
        }
        .backdrop-out {
          animation: backdropOut 300ms ease forwards;
        }
        @keyframes backdropIn {
          from { opacity: 0; background-color: rgba(0,0,0,0.0); }
          to   { opacity: 1; background-color: rgba(0,0,0,0.7); }
        }
        @keyframes backdropOut {
          from { opacity: 1; background-color: rgba(0,0,0,0.7); }
          to   { opacity: 0; background-color: rgba(0,0,0,0.0); }
        }

        /* Modal panel */
        .modal-base { will-change: transform, opacity; }
        .modal-in   { animation: modalIn 300ms cubic-bezier(.2,.7,.3,1) forwards; }
        .modal-out  { animation: modalOut 300ms cubic-bezier(.4,.2,.2,1) forwards; }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.96); }
        }
      `}</style>
    </section>
  );
}
