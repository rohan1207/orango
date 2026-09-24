const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/home", priority: 0.95, changeFrequency: "weekly" },
  { path: "/the-machine", priority: 0.9, changeFrequency: "monthly" },
  { path: "/for-locations", priority: 0.9, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.9, changeFrequency: "monthly" },
  { path: "/find-orango", priority: 0.85, changeFrequency: "weekly" },
  { path: "/about", priority: 0.75, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/support", priority: 0.7, changeFrequency: "monthly" },
  { path: "/career", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap() {
  const base = "https://orango.co.in";
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
