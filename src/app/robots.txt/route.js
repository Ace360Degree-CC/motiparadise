// src/app/robots.txt/route.js
export async function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://motiparadise.fabthefamily.com/sitemap.xml
Host: https://motiparadise.fabthefamily.com
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
