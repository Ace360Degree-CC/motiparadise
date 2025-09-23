"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 6;

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  async function fetchPosts(pageNumber) {
    try {
      const res = await fetch(
        `https://blogs.fabthefamily.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${pageNumber}&_embed`
      );
      if (!res.ok) {
        if (res.status === 400) {
          setHasMore(false);
        }
        return;
      }
      const data = await res.json();

      // avoid duplicates
      setPosts((prev) => {
        const allPosts = [...prev, ...data];
        return allPosts.filter(
          (post, index, self) => index === self.findIndex((p) => p.id === post.id)
        );
      });

      if (data.length < perPage) setHasMore(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const extractFirstImage = (html) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="w-full py-20 flex flex-col gap-10">
        {/* title */}
        <div className="upper_block max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-[Cinzel] font-bold text-[#6E8628] tracking-wide uppercase">
            Our Stories & Insights
          </p>
          <p className="text-lg md:text-lg px-14 font-[Oswald] text-black/80 tracking-wide uppercase">
            Stay inspired with our latest articles — from travel diaries and lifestyle ideas
            to unique experiences that define Moti Paradise. Explore what’s new and discover
            stories worth sharing.
          </p>
        </div>

        {/* blog grid */}
        <div className="lower_block max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => {
              const contentImg = extractFirstImage(post.content?.rendered);
              const image =
                contentImg ||
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/gallery1.png";

              return (
                <Link
                  href={`/blogs/${post.slug}`}
                  key={post.id}
                  className="group font-[Oswald] bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col"
                >
                  {/* Blog Image */}
                  <img
                    src={image}
                    className="w-full h-56 object-cover mb-4 rounded"
                    alt={post.title.rendered}
                  />

                  {/* Title */}
                  <p className="text-lg md:text-xl font-bold text-black group-hover:text-[#6E8628] tracking-wide uppercase mb-2">
                    {post.title.rendered}
                  </p>

                  {/* Excerpt */}
                  <p className="text-gray-600 flex-grow">
                    {post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120)}...
                  </p>

                  {/* Button */}
                  <button
                    className="mt-4 w-full cursor-pointer bg-[#6E8628] text-white py-2 rounded font-[Oswald]
                      transform transition duration-300 hover:scale-105 hover:bg-black"
                  >
                    Continue Reading
                  </button>
                </Link>
              );
            })
          ) : (
            <p className="text-black text-center col-span-3">Loading blogs...</p>
          )}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-[#6E8628] text-white font-[Oswald] rounded hover:bg-black transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
