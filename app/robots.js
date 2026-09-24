export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
    ],
    sitemap: "https://orango.co.in/sitemap.xml",
    host: "https://orango.co.in",
  };
}
