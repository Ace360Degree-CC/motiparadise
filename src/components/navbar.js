"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Contcat from "@/components/contact"; // your contact form

export default function Navbar() {
  const [active, setActive] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [closing, setClosing] = useState(false);

  const menuItems = [
    { href: "/#about", label: "About Us" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#features", label: "Features" },
    { href: "/#location", label: "Location Advantage" },
    { href: "/#tour", label: "Virtual Tour" },
    { href: "/#guest", label: "Testimonials" },
    { href: "/#contact", label: "Contact" },
  ];

  // Modal handlers
  const openModal = () => {
    setShowForm(true);
    setClosing(false);
  };
  const startClose = () => setClosing(true);

  // ESC key closes modal
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => e.key === "Escape" && startClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  // Highlight active section
  useEffect(() => {
    setLoaded(true);

    const sectionIds = menuItems.map((item) => item.href.replace("#", ""));
    const sections = sectionIds.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 xl:px-20 py-4 shadow-sm bg-white transition-all duration-700 ease-in-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Moti Paradise Logo"
            width={130}
            height={80}
            className="md:w-[150px] md:h-[70px] cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 xl:space-x-8 text-gray-800 font-oswald text-[15px] lg:text-[17px] xl:text-[18px]">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:text-[#6E8628] transition-colors ${
                  active === item.href ? "text-[#6E8628] font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden ml-6 lg:flex gap-4">
          <Link
            href="/blogs"
            className="border border-[#6E8628] bg-[#6E8628] text-white px-5 py-2 rounded font-oswald flex justify-center items-center text-[18px] hover:bg-white hover:text-black"
          >
            BLOGS
          </Link>
          <button
            onClick={openModal}
            className="cursor-pointer border border-[#6E8628] text-[#202020] px-5 py-2 rounded font-oswald text-[18px] hover:bg-[#6E8628] hover:text-white animate-pulse hover:scale-105"
          >
            BOOK NOW!
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center space-y-[5px] w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-7 h-[2px] bg-[#202020] transition-all ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-[2px] bg-[#202020] transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-[2px] bg-[#202020] transition-all ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Booking Modal */}
      {showForm && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${
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
            {/* Close Button */}
            <button
              onClick={startClose}
              className="absolute top-3 right-3 text-gray-800 text-3xl font-bold hover:text-red-500 transition"
            >
              ✕
            </button>

            {/* Booking Form */}
            <Contcat />
          </div>
        </div>
      )}

      {/* Animations */}
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
    </>
  );
}
