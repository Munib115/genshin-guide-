import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "TeyvatResonance PK | Genshin Impact & Wuthering Waves Character Guides Pakistan",
  description: "Ultimate F2P guides, character builds, and team comps for Genshin Impact & Wuthering Waves in Pakistan. Optimized for low-end mobile/PC, featuring PTCL/StormFiber ping guidelines.",
  keywords: "Genshin Impact guide Pakistan, Wuthering Waves build PK, F2P Genshin characters Pakistan, best server ping Pakistan Genshin WuWa, low spec mobile settings gacha PK, TeyvatResonance Pakistan, Wuthering Waves resonators guides",
  authors: [{ name: "TeyvatResonance PK Team" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://teyvatresonance.pk/",
  },
  openGraph: {
    type: "website",
    url: "https://teyvatresonance.pk/",
    title: "TeyvatResonance PK | Genshin & Wuthering Waves Guides Pakistan",
    description: "Discover F2P builds, local server ping recommendations, and character guides for Genshin Impact and Wuthering Waves in Pakistan. Optimized for budget mobile & PC systems.",
    images: [
      {
        url: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png",
        width: 800,
        height: 600,
        alt: "Jiyan Wuthering Waves Character Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeyvatResonance PK | Genshin & Wuthering Waves Guides Pakistan",
    description: "Ultimate character builds, F2P setups, and network ping optimization advice for Pakistani gacha game players.",
    images: ["https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-PK" className={`${inter.variable}`}>
      <head>
        {/* Schema.org JSON-LD Script (Technical SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://teyvatresonance.pk/#website",
                  "url": "https://teyvatresonance.pk/",
                  "name": "TeyvatResonance PK",
                  "description": "Premium gacha character guides & technical optimizations for Pakistani players",
                  "inLanguage": "en-PK"
                },
                {
                  "@type": "CollectionPage",
                  "@id": "https://teyvatresonance.pk/#webpage",
                  "url": "https://teyvatresonance.pk/",
                  "name": "Genshin Impact & Wuthering Waves Character Guides Pakistan",
                  "isPartOf": { "@id": "https://teyvatresonance.pk/#website" },
                  "description": "A curated list of builds, weapons, echoes, and artifacts optimized for gacha gamers in Pakistan."
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://teyvatresonance.pk/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is the best server for Wuthering Waves and Genshin Impact in Pakistan?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Asia Server is highly recommended for Pakistani players. Fiber providers like Transworld Home and StormFiber achieve latencies between 90ms to 140ms on Asia, while European servers average 140ms to 190ms with higher jitter."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do you optimize gacha games for low-spec PCs and mobile phones in Pakistan?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Set resolution scaling to 0.8x, lock the frame rate to 45 FPS or 60 FPS, disable motion blur, and set shadows to Low. Utilizing F2P characters like Rover (Havoc) and Xiangli Yao reduces reliance on microtransactions."
                      }
                    }
                  ]
                }
              ]
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
