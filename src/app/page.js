import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import PrivateEscapeSection from "@/components/escape"
import Gallery from "@/components/gallery"
import Features from "@/components/features"
import Location from "@/components/location"
import Virtual from "@/components/virtual"
import Guest from "@/components/guest"
import Contcat from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About */}
      <section id="about">
        <PrivateEscapeSection />
      </section>

      {/* Gallery */}
      <section id="gallery">
        <Gallery />
      </section>

      {/* Features */}
      <section id="features">
        <Features />
      </section>

      {/* Location Advantage */}
      <section id="location">
        <Location />
      </section>

      {/* Virtual Tour */}
      <section id="tour">
        <Virtual />
      </section>

      {/* Testimonials */}
      <section id="guest">
        <Guest />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contcat />
      </section>

      <Footer />
    </main>
  )
}
