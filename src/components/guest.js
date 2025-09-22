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
      role: "Local Guide",
      avatar: "/person1.png",
      review:
        "If you’re looking for a private villa in Udaipur with a big swimming pool and a beautiful garden, this is the perfect place! Ideal for those who want privacy, comfort, and a space to relax and chill.",
      stars: 5,
      images: ["/1gallery.png"],
    },
    {
      id: 2,
      name: "Lisa Haydon",
      role: "Customer",
      avatar: "/person2.png",
      review:
        "A perfect weekend escape with privacy, cleanliness, and great service!",
      stars: 5,
      images: [],
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Customer",
      avatar: "/person3.png",
      review:
        "Amazing property, spacious rooms, and the pool was super clean. Our family had the best time!",
      stars: 5,
      images: ["/1guest.png", "/2guest.png"],
    },
  ];

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
        <p className="animate-on-scroll fade-down font-[Oswald] font-bold text-[20px] text-[#6E8628] tracking-wide uppercase">
          Love from our clients
        </p>

        {/* Heading */}
        <h2 className="animate-on-scroll scale-up font-[Cinzel] font-bold text-[#202020] text-[36px] md:text-[50px] mt-2">
          What Guests Say
        </h2>

        {/* Review Card */}
        <div className="mt-12 bg-white border border-gray-200 rounded-xl shadow-md p-6 text-left max-w-3xl mx-auto">
          {/* Reviewer */}
          <div className="flex items-center gap-4">
            <Image
              src={reviews[active].avatar}
              alt={reviews[active].name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-[#202020]">
                {reviews[active].name}
              </p>
              <p className="text-sm text-gray-500">{reviews[active].role}</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex mt-3 gap-1">
            {[...Array(reviews[active].stars)].map((_, i) => (
              <svg
                key={i}
                width="18"
                height="18"
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
          <p className="mt-3 text-gray-700 text-[16px] leading-relaxed">
            {reviews[active].review}
          </p>

          {/* Review images */}
          {reviews[active].images.length > 0 && (
            <div className="mt-4 flex gap-3 flex-wrap">
              {reviews[active].images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Review image ${i + 1}`}
                  width={160}
                  height={100}
                  className="rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Avatars */}
        <div className="mt-10 flex items-center justify-center gap-10">
          {reviews.map((person, i) => (
            <button
              key={person.id}
              onClick={() => setActive(i)}
              className="focus:outline-none"
            >
              <Image
                src={person.avatar}
                alt={person.name}
                width={56}
                height={56}
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
