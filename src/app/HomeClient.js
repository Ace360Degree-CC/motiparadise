"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import PrivateEscapeSection from "@/components/escape";
import Gallery from "@/components/gallery";
import Features from "@/components/features";
import Location from "@/components/location";
import Virtual from "@/components/virtual";
import Guest from "@/components/guest";
import Contcat from "@/components/contact";
import Footer from "@/components/footer";
import Blog from "@/components/blog";

export default function HomeClient() {
  const [showForm, setShowForm] = useState(false);
  const [closing, setClosing] = useState(false);

  const openModal = () => {
    setShowForm(true);
    setClosing(false);
  };

  const startClose = () => {
    setClosing(true);
  };

  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => e.key === "Escape" && startClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  return (
    <main className="relative min-h-screen text-white">
      <Navbar openModal={openModal} />
      <Hero openModal={openModal} />

      <section id="about">
        <PrivateEscapeSection />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="location">
        <Location />
      </section>

      <section id="tour">
        <Virtual />
      </section>

      <section id="guest">
        <Guest />
      </section>

      <section id="contact">
        <Contcat />
      </section>

      <section id="blog">
        <Blog />
      </section>

      <Footer />

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
    </main>
  );
}
