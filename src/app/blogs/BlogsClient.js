"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function BlogsClient() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://blogs.fabthefamily.com/wp-json/wp/v2/posts?_embed"
        );
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Title */}
      <div className="max-w-6xl mx-auto px-6 text-center my-12">
        <h1 className="text-3xl md:text-4xl font-[Cinzel] font-bold text-[#6E8628]">
          Our Stories & Insights
        </h1>
        <p className="mt-4 text-lg text-gray-700 font-[Oswald]">
          Stay inspired with our latest articles — from travel diaries to unique
          experiences that define Moti Paradise.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col"
            >
              <img
                src={
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "/gallery1.png"
                }
                alt={post.title.rendered}
                className="w-full h-56 object-cover mb-4 rounded"
              />
              <h2 className="text-lg md:text-xl font-bold text-black group-hover:text-[#6E8628] tracking-wide uppercase mb-2">
                {post.title.rendered}
              </h2>
              <p className="text-gray-600 flex-grow">
                {post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120)}...
              </p>
              <button className="mt-4 w-full bg-[#6E8628] text-white py-2 rounded font-[Oswald] hover:bg-black transition">
                Continue Reading
              </button>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            Loading blogs...
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
