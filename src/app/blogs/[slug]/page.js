import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// fetch single post by slug
async function getPost(slug) {
  const res = await fetch(
    `https://blogs.fabthefamily.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { next: { revalidate: 60 } } // ISR: revalidate every 60s
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await res.json();
  return data[0]; // first match
}

export default async function BlogDetail({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Blog not found.</p>
      </div>
    );
  }

  // extract banner image (first <img> in content OR featured image)
  const match = post.content?.rendered.match(/<img[^>]+src="([^">]+)"/i);
  const contentImg =
    (match ? match[1] : null) ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/gallery1.png";

  // remove the first <img> from content so it doesn't repeat
  let cleanedContent = post.content?.rendered;
  if (match) {
    cleanedContent = cleanedContent.replace(match[0], "");
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-30">
        {/* Banner */}
        <div className="w-full aspect-[21/9] mb-6">
          <img
            src={contentImg}
            alt={post.title.rendered}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-[Oswald]">
          {post.title.rendered}
        </h1>

        {/* Content */}
        <div
          className="prose prose-lg text-gray-800 max-w-none"
          dangerouslySetInnerHTML={{ __html: cleanedContent }}
        />
      </div>

      <Footer />
    </div>
  );
}
