import { MetadataRoute } from "next";
import blogData from "../../data/blog.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.moroccodrive.com";

  // Static routes
  const staticRoutes = [
    "",
    "/flotte",
    "/services",
    "/agences",
    "/a-propos",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog posts
  const blogRoutes = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
