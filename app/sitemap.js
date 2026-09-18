const routes = [
  "",
  "/home",
  "/about",
  "/vending-machine",
  "/business-opportunity",
  "/contact",
  "/career",
  "/shop",
  "/terms",
  "/privacy",
  "/refund",
];

export default function sitemap() {
  const base = "https://orango.co.in";
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-09-10"),
    changeFrequency: path === "" || path === "/home" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/home" ? 0.95 : 0.7,
  }));
}
