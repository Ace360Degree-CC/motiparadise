"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Guest() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Manibhadra Singh Rathore",
      role: "Customer",
      avatar: "/unnamed (3).png",
      review:
        "If you’re looking for a private villa in Udaipur with a big swimming pool and a beautiful garden, this is the perfect place! Ideal for those who want privacy, comfort, and a space to relax and chill. I highly recommend this property — a must-visit!",
      stars: 5,
      images: [],
    },
    {
      id: 2,
      name: "Er M K Choudhary",
      role: "Customer",
      avatar: "/unnamed (2).png",
      review:
        "Best Villa for family in Udaipur and nearby to city, best service, good hygiene and all good",
      stars: 5,
      images: [],
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Customer",
      avatar: "/unnamed (1).png",
      review:
        "A pleasant getaway with family and friends.. pool is the highlight of this place which is well maintained and everything was beautiful and nicee..",
      stars: 5,
      images: [],
    },
    {
      id: 4,
      name: "Muskan jain 17",
      role: "Customer",
      avatar: "/unnamed.png",
      review:
        "Best place to have a fun weekend with your family and friends.. Pure veg food and nice place for photos also.. Do visit..",
      stars: 5,
      images: [],
    },
  ];

  // ✅ Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  // ✅ Animate on scroll (optional, from your old code)
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
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Subheading */}
        <p className="animate-on-scroll fade-down font-[Oswald] font-bold text-[22px] text-[#6E8628] tracking-wide uppercase">
          Love from our clients
        </p>

        {/* Heading */}
        <h2 className="animate-on-scroll scale-up font-[Cinzel] font-bold text-[#202020] text-[42px] md:text-[56px] mt-2">
          What Guests Say
        </h2>

        {/* Review Card */}
        <div className="mt-12 bg-transparent p-6 text-center max-w-3xl mx-auto transition-all duration-500">
          {/* Reviewer inline */}
          <div className="flex items-center justify-center gap-4">
            <Image
              src={reviews[active].avatar}
              alt={reviews[active].name}
              width={56}
              height={56}
              className="rounded-full"
            />
            <div className="text-left">
              <p className="font-semibold text-[#202020] text-[18px]">
                {reviews[active].name}
              </p>
              <p className="text-sm text-gray-500">{reviews[active].role}</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center mt-3 gap-1">
            {[...Array(reviews[active].stars)].map((_, i) => (
              <svg
                key={i}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 2l2.955 6.087L22 9.27l-5 4.873L18.09 22 12 18.77 5.91 22 7 14.143 2 9.27l7.045-1.183L12 2z"
                  fill="#FCBD14"
                />
              </svg>
            ))}
          </div>

          {/* Review text */}
          <p className="mt-4 text-gray-700 text-[18px] leading-relaxed max-w-2xl mx-auto">
            {reviews[active].review}
          </p>

          {/* Review images */}
          {reviews[active].images.length > 0 && (
            <div className="mt-5 flex justify-center gap-3 flex-wrap">
              {reviews[active].images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Review image ${i + 1}`}
                  width={200}
                  height={130}
                  className="rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Avatars */}
        <div className="mt-12 flex items-center justify-center gap-12">
          {reviews.map((person, i) => (
            <button
              key={person.id}
              onClick={() => setActive(i)}
              className="focus:outline-none"
            >
              <Image
                src={person.avatar}
                alt={person.name}
                width={64}
                height={64}
                className={`rounded-full transition-all duration-300 ${
                  active === i
                    ? "ring-4 ring-[#6E8628] scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
