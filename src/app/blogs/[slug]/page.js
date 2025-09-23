"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/ContactModal"; // make sure path is correct

// fetch single post by slug
async function getPost(slug) {
  const res = await fetch(
    `https://blogs.fabthefamily.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" } // always fresh data
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await res.json();
  return data[0]; // first match
}

export default function BlogDetailWrapper({ params }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Navbar now receives openModal */}
      <Navbar openModal={() => setModalOpen(true)} />

      {/* Blog detail content */}
      <BlogDetailContent slug={params.slug} />

      {/* Contact Modal */}
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}

      <Footer />
    </>
  );
}

// Extracted async content logic into a child component
async function BlogDetailContent({ slug }) {
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Blog not found.</p>
      </div>
    );
  }

  const acf = post.acf || {};
  const imageMatches = [
    ...post.content?.rendered.matchAll(/<img[^>]+src="([^">]+)"/gi),
  ];
  const images = imageMatches.map((m) => m[1]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      {/* Banner Image */}
      {images[0] && (
        <div className="w-full aspect-[21/9] mb-6">
          <img
            src={images[0]}
            alt={acf.heading || post.title.rendered}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Heading + Subheading */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-[Cinzel] text-gray-900 mb-4">
          {acf.heading || post.title.rendered}
        </h1>
        {acf.sub_heading && (
          <p className="text-lg md:text-xl text-gray-600 font-[Oswald]">
            {acf.sub_heading}
          </p>
        )}
      </div>

      {/* Content Heading + Description + List */}
      <div>
        {acf.content_heading && (
          <h2 className="text-2xl font-[Oswald] text-gray-900 mb-4">
            {acf.content_heading}
          </h2>
        )}
        {acf.content_description && (
          <p className="text-gray-700 font-[Oswald] mb-4">
            {acf.content_description}
          </p>
        )}
        {acf.list && (
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-[Oswald]">
            {acf.list.split("\n").map(
              (item, idx) =>
                item.trim() && (
                  <li key={idx}>{item.replace("•", "").trim()}</li>
                )
            )}
          </ul>
        )}
      </div>

      {/* Middle Section */}
      {images[1] && (
        <div className="space-y-6">
          <img
            src={images[1]}
            alt="middle"
            className="w-full h-auto object-cover"
          />
          {acf.mini_title && (
            <h3 className="text-xl font-[Cinzel] text-gray-900">
              {acf.mini_title}
            </h3>
          )}
          {acf.list_title && (
            <h4 className="text-lg font-[Oswald] text-gray-800 mt-2">
              {acf.list_title}
            </h4>
          )}
          {acf.list_items && (
            <ul className="list-disc pl-6 space-y-2 text-gray-700 font-[Oswald]">
              {acf.list_items.split("\n").map(
                (item, idx) =>
                  item.trim() && (
                    <li key={idx}>{item.replace("•", "").trim()}</li>
                  )
              )}
            </ul>
          )}
        </div>
      )}

      {/* Final Section */}
      {images[2] && (
        <div className="space-y-6">
          <img
            src={images[2]}
            alt="final"
            className="w-full h-auto object-cover"
          />
          {acf.final_paragraph && (
            <p className="text-gray-700 font-[Oswald]">
              {acf.final_paragraph}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
