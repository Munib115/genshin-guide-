import { SITE_URL } from "./site-config";

// Single-page app: sections (Guides/Optimizer/Maps/Chat) are client-side views,
// not separate URLs, so the sitemap lists the canonical homepage.
export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-07-08",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
