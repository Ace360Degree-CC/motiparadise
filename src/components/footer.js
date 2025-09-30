"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Footer() {
  const labelsRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    const animateGroup = (root) => {
      if (!root) return;
      const items = root.querySelectorAll(".reveal");

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
              el.classList.add("in-view");
            } else {
              el.classList.remove("in-view"); // re-trigger on scroll
            }
          });
        },
        { threshold: 0.2 }
      );

      items.forEach((el) => io.observe(el));
      return () => io.disconnect();
    };

    const disconnectLabels = animateGroup(labelsRef.current);
    const disconnectIcons = animateGroup(iconsRef.current);

    return () => {
      disconnectLabels && disconnectLabels();
      disconnectIcons && disconnectIcons();
    };
  }, []);

  return (
    <footer className="bg-white pt-16 overflow-hidden">
      {/* Card */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Top: Icons row */}
          <div className="bg-[#6E8628] px-8 py-8">
            <div
              ref={iconsRef}
              className="icons-row grid grid-cols-4 gap-6 items-center text-center"
            >
              <Link
                href="https://www.facebook.com/profile.php?id=61577629348900"
                className="inline-flex justify-center"
              >
                <FacebookIcon className="reveal w-10 h-10 text-white/95" />
              </Link>
              <Link
                href="https://www.instagram.com/motiparadise_?utm_source=qr&igsh=YjJyZGxuZ3hqbXox"
                className="inline-flex justify-center"
              >
                <InstagramIcon className="reveal w-10 h-10 text-white/95" />
              </Link>
              <Link
                href="https://www.youtube.com/@Moti_Paradise"
                className="inline-flex justify-center"
              >
                <YoutubeIcon className="reveal w-10 h-10 text-white/95" />
              </Link>
              <Link
                href="tel:+918905279300"
                className="inline-flex justify-center"
              >
                <PhoneIcon className="reveal w-10 h-10 text-white/95" />
              </Link>
            </div>
          </div>

          {/* Bottom: Labels row */}
          <div className="bg-white px-6 sm:px-8 py-6">
            <div
              ref={labelsRef}
              className="labels-row grid grid-cols-1 sm:grid-cols-4 text-center gap-4 sm:gap-6"
            >
              <Link
                href="https://www.facebook.com/profile.php?id=61577629348900"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal font-[Oswald] text-[#6E8628] text-lg sm:text-xl font-semibold hover:underline"
              >
                Moti Paradise Villa
              </Link>
              <Link
                href="https://www.instagram.com/motiparadise_/?igsh=MTRocjk0cHpyNHMwMA%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal font-[Oswald] text-[#6E8628] text-lg sm:text-xl font-semibold hover:underline"
              >
                @motiparadise
              </Link>
              <Link
                href="https://www.youtube.com/@Moti_Paradise"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal font-[Oswald] text-[#6E8628] text-lg sm:text-xl font-semibold hover:underline"
              >
                Fab The Family Stays
              </Link>
              <a
                href="tel:+918905279300"
                className=" font-[Oswald] text-[#6E8628] text-lg sm:text-xl font-semibold hover:underline"
              >
                +91-8905279300
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="mt-10 w-full bg-[#202020] py-4">
        <p className="text-center text-white text-sm tracking-wide font-[Oswald]">
          Copyright © {new Date().getFullYear()} FAB THE FAMILY All Rights
          Reserved. Designed &amp; Marketed by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ace360degree.com"
            className="hover:text-[#6E8628] underline"
          >
            ACE360DEGREE
          </a>
        </p>
      </div>

      {/* White strip below with 5px gap */}
      <div className="h-[5px] bg-white w-full"></div>

      {/* Animation styles */}
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* stagger for labels */
        .labels-row .reveal:nth-child(1) {
          transition-delay: 0ms;
        }
        .labels-row .reveal:nth-child(2) {
          transition-delay: 150ms;
        }
        .labels-row .reveal:nth-child(3) {
          transition-delay: 300ms;
        }
        .labels-row .reveal:nth-child(4) {
          transition-delay: 450ms;
        }

        /* stagger for icons */
        .icons-row .reveal:nth-child(1) {
          transition-delay: 0ms;
        }
        .icons-row .reveal:nth-child(2) {
          transition-delay: 150ms;
        }
        .icons-row .reveal:nth-child(3) {
          transition-delay: 300ms;
        }
        .icons-row .reveal:nth-child(4) {
          transition-delay: 450ms;
        }
      `}</style>
    </footer>
  );
}

/* === Icons remain unchanged === */
function FacebookIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22 12.07C22 6.49 17.52 2 11.93 2S2 6.49 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.9h-2.32V22c4.78-.74 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}
function InstagramIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.5 7.5s-.2-1.4-.8-2c-.8-.8-1.8-.8-2.2-.9C17.8 4.2 12 4.2 12 4.2h0s-5.8 0-8.5.4c-.5.1-1.5.1-2.2.9-.6.6-.8 2-.8 2S0 9.2 0 10.8v1.4c0 1.6.5 3.3.5 3.3s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.2 7.9.4 8.3.4 0 0 5.8 0 8.5-.4.5-.1 1.5-.1 2.2-.9.6-.6.8-2 .8-2s.5-1.7.5-3.3v-1.4c0-1.6-.5-3.3-.5-3.3zM9.6 14.9V8.9l6.1 3-6.1 3z" />
    </svg>
  );
}
function PhoneIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6.6 2a2 2 0 0 0-2 2c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.2a1.5 1.5 0 0 0-1.6-1.5l-3.4.3a1.5 1.5 0 0 0-1.3 1l-.5 1.4a13.3 13.3 0 0 1-6.7-6.7l1.4-.5a1.5 1.5 0 0 0 1-1.3l.3-3.4A1.5 1.5 0 0 0 10.2 2H8z" />
    </svg>
  );
}
