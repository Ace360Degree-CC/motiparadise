"use client";
// app/components/guest.js
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Guest() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-active");
          } else {
            entry.target.classList.remove("animate-active");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Subheading */}
        <p className="animate-on-scroll fade-down font-[Oswald] font-bold text-[24px] text-[#6E8628] tracking-wide uppercase">
          Love from our clients
        </p>

        {/* Heading */}
        <h2 className="animate-on-scroll scale-up font-[Cinzel] font-bold text-[#202020] text-[40px] md:text-[64px] leading-tight mt-2">
          What Guests Say
        </h2>

        {/* 3 Images */}
        {/* 3 Images */}
<div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div className="w-[200px] mx-auto animate-on-scroll flip-in delay-100">
    <Image
      src="/guest1.png"
      alt="Guest stay highlight 1"
      width={200}
      height={120}
      className="w-full h-auto"
    />
  </div>
  <div className="w-[200px] mx-auto animate-on-scroll flip-in delay-200">
    <Image
      src="/guest2.png"
      alt="Guest stay highlight 2"
      width={200}
      height={120}
      className="w-full h-auto"
    />
  </div>
  <div className="w-[200px] mx-auto animate-on-scroll flip-in delay-300">
    <Image
      src="/guest3.png"
      alt="Guest stay highlight 3"
      width={200}
      height={120}
      className="w-full h-auto"
    />
  </div>
</div>


        {/* Stars */}
        <div className="mt-8 flex items-center justify-center gap-2 animate-on-scroll pulse">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2l2.955 6.087L22 9.27l-5 4.873L18.09 22 12 18.77 5.91 22 7 14.143 2 9.27l7.045-1.183L12 2z"
                fill="#FCBD14"
              />
            </svg>
          ))}
        </div>

        {/* Testimonial Content */}
        <p className="animate-on-scroll slide-up font-[Oswald] text-[#202020] mt-6 md:mt-8 text-[28px] md:text-[50px] leading-snug md:leading-tight max-w-4xl mx-auto">
          “A perfect weekend escape with privacy, cleanliness, and great service!”
        </p>

        {/* Avatars */}
        <div className="mt-8 flex items-center justify-center gap-16">
          {["person1.png","person2.png","person3.png","person4.png","person5.png"].map((src, i) => (
            <Image
              key={src}
              src={`/${src}`}
              alt={`Guest avatar ${i+1}`}
              width={56}
              height={56}
              className="rounded-full animate-on-scroll bounce-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Name & Role */}
        <div className="mt-4 animate-on-scroll fade-up">
          <p className="font-[Oswald] text-[#202020] text-[18px]">Lisa Haydon</p>
          <p className="font-[Oswald] text-[#6E8628] text-[12px] tracking-widest uppercase">
            Customer
          </p>
        </div>
      </div>
    </section>
  );
}
