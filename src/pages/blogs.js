"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
          setHasMore(false); // no more posts
        }
        return;
      }
      const data = await res.json();
      setPosts((prev) => [...prev, ...data]);
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

      <div className="w-screen py-20 flex flex-col gap-10">
        {/* title */}
        <div className="upper_block max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-[Oswald] text-black tracking-wide uppercase animate-slideUp animation-delay">
            Blogs
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
                <div
                  key={post.id}
                  className="blog_item group font-[Oswald] bg-white border border-gray-300 rounded-lg p-2"
                >
                  <img
                    src={image}
                    className="w-full h-70 object-cover mb-4 rounded"
                    alt={post.title.rendered}
                  />
                  <p className="text-lg md:text-xl text-black group-hover:text-[#6E8628] tracking-wide uppercase animate-slideUp">
                    {post.title.rendered}
                  </p>
                  <p className="text-gray-600">
                    {post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 100)}
                    ...
                  </p>
                </div>
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
