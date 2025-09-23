import BlogsClient from "./BlogsClient";

// ✅ SEO metadata here (server)
export const metadata = {
  title: "Our Stories & Insights | Motiparadise",
  description:
    "Explore our travel diaries, lifestyle ideas, and experiences at Moti Paradise. Stay updated with our latest blogs and insights.",
};

export default function BlogsPage() {
  return <BlogsClient />;
}
