import { Inter, Chakra_Petch } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
} from "./site-config";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-chakra",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: `${SITE_NAME} Team` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Gaming",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    // og:image is generated automatically by app/opengraph-image.js
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    // twitter:image reuses the generated Open Graph image
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0E1A" },
    { media: "(prefers-color-scheme: light)", color: "#0A0E1A" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Enables env(safe-area-inset-*) so the mobile app bar/tab bar respect notches
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "گچا اُستاد",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        description: SITE_DESCRIPTION,
        areaServed: { "@type": "Country", name: "Pakistan" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: `${SITE_NAME} — premium gacha character guides & technical optimizations for Pakistani players`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-PK",
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: `${SITE_TAGLINE} | ${SITE_NAME}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        description:
          "A curated list of builds, weapons, echoes, artifacts and team comps optimized for gacha gamers in Pakistan.",
        inLanguage: "en-PK",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the best server for Wuthering Waves and Genshin Impact in Pakistan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Asia Server is highly recommended for Pakistani players. Fiber providers like Transworld Home and StormFiber achieve latencies between 90ms to 140ms on Asia, while European servers average 140ms to 190ms with higher jitter.",
            },
          },
          {
            "@type": "Question",
            name: "How do you optimize gacha games for low-spec PCs and mobile phones in Pakistan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Set resolution scaling to 0.8x, lock the frame rate to 45 FPS or 60 FPS, disable motion blur, and set shadows to Low. Utilizing F2P characters like Rover (Havoc) and Xiangli Yao reduces reliance on microtransactions.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en-PK" className={`${inter.variable} ${chakra.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
