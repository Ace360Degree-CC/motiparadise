"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://blogs.fabthefamily.com/wp-json/wp/v2/posts?per_page=3&_embed"
        );
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // helper: extract first <img> src from post content
  const extractFirstImage = (html) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
  };

  return (
    <div className="w-full bg-black pb-26 py-16 flex flex-col gap-10">
      {/* title */}
      <div className="upper_block max-w-6xl mx-auto px-6 flex flex-col gap-4 text-center">
        <p className="text-2xl md:text-3xl font-[Cinzel] font-bold text-white tracking-wide uppercase animate-slideUp animation-delay">
          Our Stories & Insights
        </p>
        <p className="text-lg md:text-lg px-8 font-[Oswald] text-white/80 tracking-wide uppercase animate-slideUp animation-delay">
          Stay inspired with our latest articles — from travel diaries and
          lifestyle ideas to unique experiences that define Moti Paradise.
          Explore what’s new and discover stories worth sharing.
        </p>
      </div>

      {/* blogs */}
      <div className="lower_block max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => {
            const contentImg = extractFirstImage(post.content?.rendered);
            const image =
              contentImg ||
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/gallery1.png";

            // Prefer ACF content_description; fallback to excerpt if not available
            const description =
              post.acf?.content_description ||
              post.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 100);

            return (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="blog_item group font-[Oswald] hover:shadow-lg transition rounded-lg"
              >
                <img
                  src={image}
                  className="w-full h-70 object-cover mb-4 rounded"
                  alt={post.title.rendered}
                />
                <p className="text-lg md:text-xl text-white group-hover:text-[#6E8628] tracking-wide uppercase animate-slideUp">
                  {post.title.rendered}
                </p>
                <p className="text-gray-300">
                  {description.length > 120
                    ? description.slice(0, 120) + "..."
                    : description}
                </p>
                <Link href={`/blogs/${post.slug}`} className="block cursor-pointer mt-4">
                  <button
                    className="w-full cursor-pointer bg-[#6E8628] text-black py-2 
               transform transition duration-300 
               hover:scale-105 hover:text-white hover:bg-[#88a737]"
                  >
                    Continue reading
                  </button>
                </Link>
              </Link>
            );
          })
        ) : (
          <p className="text-white text-center col-span-3">Loading blogs...</p>
        )}
      </div>
      <div className="w-full flex justify-center">
        <Link href="/blogs">
        <button
          className="px-12  mt-4 bg-[#6E8628] font-[Oswald] text-black py-2 
             transform transition duration-300 cursor-pointer 
             hover:scale-101 hover:text-white hover:bg-[#88a737]"
        >
          Read All Blogs
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
