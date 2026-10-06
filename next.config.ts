import type { NextConfig } from "next";

// The example sites (/examples/cafe/, /examples/frisor/, /examples/restaurant/)
// still live in the previous makkerne.tech deployment. Any path this app does
// not have itself is fetched from there, so the examples keep working and can
// be shown live (same origin) in the boxes on the front page.
//
// Once this app is on the makkerne.tech domain, set LEGACY_SITE_URL in Vercel
// to the old deployment's own URL (e.g. https://<old-project>.vercel.app),
// otherwise the fallback would point back at this app.
const legacySite = (process.env.LEGACY_SITE_URL || "https://makkerne.tech").replace(/\/$/, "");

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        // Files (images, css, js …) keep their exact path.
        { source: "/:file(.*\\.[a-zA-Z0-9]+)", destination: `${legacySite}/:file` },
        // Pages keep the trailing slash the old site uses, so it doesn't redirect.
        { source: "/:path*", destination: `${legacySite}/:path*/` },
      ],
    };
  },
};

export default nextConfig;
