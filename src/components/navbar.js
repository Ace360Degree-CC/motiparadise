"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [active, setActive] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { href: "#about", label: "About Us" },
    { href: "#gallery", label: "Gallery" },
    { href: "#features", label: "Features" },
    { href: "#location", label: "Location Advantage" },
    { href: "#tour", label: "Virtual Tour" },
    { href: "#guest", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ]

  useEffect(() => {
    setLoaded(true)

    // IntersectionObserver to track active section
    const sectionIds = menuItems.map((item) => item.href.replace("#", ""))
    const sections = sectionIds.map((id) => document.getElementById(id))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 shadow-sm bg-white transition-all duration-700 ease-in-out ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      }`}
    >
      {/* Logo Section → link to home */}
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
      <ul className="hidden md:flex space-x-8 lg:space-x-12 text-gray-800 font-oswald text-[16px] lg:text-[18px]">
        {menuItems.map((item, index) => (
          <li
            key={item.href}
            className={`relative group transition-all duration-700 ease-in-out ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <Link
              href={item.href}
              className={`transition-colors duration-300 hover:text-[#6E8628] ${
                active === item.href ? "text-[#6E8628] font-semibold" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-[#6E8628] transition-all duration-300 
              ${active === item.href ? "w-full" : "w-0 group-hover:w-full"}`}
            ></span>
          </li>
        ))}
      </ul>

      {/* Desktop Button with animation */}
      <Link
        href="#contact"
        className={`hidden md:block border border-[#6E8628] text-[#202020] px-5 py-2 rounded font-oswald text-[18px] lg:text-[20px]
          transition-all duration-300 hover:bg-[#6E8628] hover:text-white
          ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          animate-pulse hover:scale-105`}
        style={{ transitionDelay: `${menuItems.length * 150}ms` }}
      >
        BOOK NOW!
      </Link>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col justify-center items-center space-y-[5px] w-8 h-8"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`block w-7 h-[2px] bg-[#202020] transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-[7px]" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-[2px] bg-[#202020] transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-[2px] bg-[#202020] transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-[72px] left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center space-y-6 py-6 font-oswald text-[18px] transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {menuItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-all duration-500 ${
              active === item.href ? "text-[#6E8628] font-semibold" : "text-gray-800"
            }`}
            style={{ transitionDelay: `${index * 120}ms` }}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        {/* Mobile Button with animation */}
        <Link
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="border border-[#6E8628] text-[#202020] px-5 py-2 rounded font-oswald text-[18px]
            transition-all duration-300 hover:bg-[#6E8628] hover:text-white
            animate-pulse hover:scale-105"
        >
          BOOK NOW!
        </Link>
      </div>
    </nav>
  )
}
