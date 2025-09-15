"use client";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// PHP API endpoint (change if you deploy elsewhere)
const API_URL = process.env.NEXT_PUBLIC_CONTACT_API || "/api/contact";

export default function Contcat() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  const bump = (setter, delta) => setter((v) => Math.max(0, v + delta));

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".aos");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("aos-in");
          else e.target.classList.remove("aos-in");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.adults = adults;
    data.children = children;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        Swal.fire({
          title: "Success!",
          text: "Booking submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
          background: "#fff",
          color: "#000",
          confirmButtonColor: "#6E8628",
        });
        e.target.reset();
      } else {
        Swal.fire({
          title: "Error",
          text: result.error || "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
          background: "#fff",
          color: "#000",
          confirmButtonColor: "#6E8628",
        });
      }
    } catch (err) {
      console.error("❌ Submit failed:", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Check console.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#fff",
        color: "#000",
        confirmButtonColor: "#6E8628",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-cover bg-center overflow-visible relative"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div
        className="absolute inset-0 pointer-events-none bg-[length:110%_110%] bg-center animate-bg-pan"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT */}
        <div className="lg:col-span-5 -my-25">
          <div className="aos aos-slide-left bg-[#202020] text-white p-8 md:p-12 shadow-lg h-[700px] flex flex-col justify-center relative z-10">
            <div className="w-14 h-[2px] bg-white/50 mb-6" />
            <p className="aos aos-fade-down font-[Oswald] tracking-widest uppercase text-sm md:text-base mb-6">
              Connect with us to for your <br /> staycation
            </p>
            <h2 className="aos aos-scale-pop font-[Cinzel] text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
              Book Your Stay!
            </h2>
            <p className="aos aos-fade-up font-[Oswald] text-sm md:text-base text-white/80 mt-8 max-w-md">
              Whether it’s a birthday, reunion, honeymoon, or just a weekend
              break — Moti Paradise is ready to host you.
            </p>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 mt-20 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="md:col-span-2 aos aos-stagger">
                <label className="block font-[Oswald] text-xs tracking-widest uppercase text-black mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white text-black px-4 py-3 outline-none focus:ring-2 ring-offset-2 ring-[#6E8628]"
                />
              </div>

              {/* Email */}
              <div className="aos aos-stagger">
                <label className="block font-[Oswald] text-xs tracking-widest uppercase text-black mb-2">
                  Email ID:
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white text-black px-4 py-3 outline-none focus:ring-2 ring-offset-2 ring-[#6E8628]"
                />
              </div>

              {/* Mobile */}
              <div className="aos aos-stagger">
                <label className="block font-[Oswald] text-xs tracking-widest uppercase text-black mb-2">
                  Mobile:
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full bg-white text-black px-4 py-3 outline-none focus:ring-2 ring-offset-2 ring-[#6E8628]"
                />
              </div>

              {/* Check-in */}
              <div className="aos aos-stagger">
                <label className="block font-[Oswald] text-xs tracking-widest uppercase text-black mb-2">
                  Checkin:
                </label>
                <input
                  type="date"
                  name="checkin"
                  required
                  className="w-full bg-white text-black px-4 py-3 outline-none focus:ring-2 ring-offset-2 ring-[#6E8628] [color-scheme:light]"
                />
              </div>

              {/* Checkout */}
              <div className="aos aos-stagger">
                <label className="block font-[Oswald] text-xs tracking-widest uppercase text-black mb-2">
                  Checkout:
                </label>
                <input
                  type="date"
                  name="checkout"
                  required
                  className="w-full bg-white text-black px-4 py-3 outline-none focus:ring-2 ring-offset-2 ring-[#6E8628] [color-scheme:light]"
                />
              </div>

              {/* Guests */}
              <div className="md:col-span-2 aos aos-stagger">
                <label className="block font-[Oswald] text-xs tracking-widest uppercase text-black mb-2">
                  Guests:
                </label>
                <div className="flex flex-col md:flex-row md:justify-between gap-4 bg-white text-black px-4 py-3 rounded">
                  <Counter
                    label="Adults"
                    value={adults}
                    onDec={() => bump(setAdults, -1)}
                    onInc={() => bump(setAdults, 1)}
                  />
                  <Counter
                    label="Child"
                    value={children}
                    onDec={() => bump(setChildren, -1)}
                    onInc={() => bump(setChildren, 1)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 aos aos-pop">
              <button
                type="submit"
                disabled={loading}
                className="group w-full relative overflow-hidden bg-[#202020] text-white font-[Oswald] tracking-widest uppercase py-4 text-lg hover:opacity-95 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="relative z-10">Submit</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .aos {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.7s ease;
        }
        .aos-in {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-bg-pan {
          animation: bg-pan 20s ease-in-out infinite;
        }
        @keyframes bg-pan {
          0% {
            background-position: 50% 50%;
          }
          50% {
            background-position: 55% 52%;
          }
          100% {
            background-position: 50% 50%;
          }
        }
      `}</style>
    </section>
  );
}

/* Counter */
function Counter({ label, value, onDec, onInc }) {
  return (
    <div className="flex items-center justify-between w-full md:w-auto gap-3">
      <span className="font-[Oswald] uppercase">{label}</span>
      <div className="flex items-center border border-black/30 px-2 rounded">
        <IconButton onClick={onDec}>–</IconButton>
        <span className="w-8 text-center font-[Oswald]">{value}</span>
        <IconButton onClick={onInc}>+</IconButton>
      </div>
    </div>
  );
}

function IconButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-7 h-7 grid place-items-center border border-black/30 hover:border-black transition"
    >
      {children}
    </button>
  );
}
