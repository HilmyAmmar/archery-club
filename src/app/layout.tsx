import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: '#1a3680',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fastkodamar.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "FAST Kodamar | Archery Club & Pelatihan Panahan Jakarta",
    template: "%s | FAST Kodamar"
  },
  description: "FAST Kodamar Archery Club adalah pusat pelatihan panahan profesional di Jakarta Utara (Kelapa Gading & sekitarnya). Kami menawarkan program latihan memanah intensif yang aman dan fun untuk anak-anak, kelas pemula dewasa, hingga pembinaan atlet prestasi. Dengan pelatih bersertifikat nasional dan fasilitas lengkap di Komplek Kodamar, kami siap membantu Anda mengasah fokus, disiplin, dan teknik panahan yang tepat. Daftar sekarang untuk pengalaman olahraga sunnah dan prestasi terbaik!",
  keywords: [
    "panahan jakarta",
    "archery club jakarta",
    "FAST Kodamar",
    "belajar memanah",
    "klub panahan jakarta utara",
    "tempat latihan panahan",
    "ekstrakurikuler panahan",
    "pelatihan panahan profesional",
    "program panahan anak-anak",
    "program panahan pemula",
    "program panahan atlet prestasi",
    "pelatih panahan berpengalaman",
    "klub panahan terbaik di jakarta",
    "klub panahan termurah di jakarta",
    "klub panahan dengan fasilitas lengkap",
    "klub panahan dengan pelatih berpengalaman",
    "klub panahan dengan program latihan lengkap",
    "klub panahan dengan komunitas aktif",
    "klub panahan dengan lokasi strategis",
    "panahan untuk semua usia",
    "panahan kelapa gading",
    "panahan jakarta utara",
    "panahan untuk anak-anak",
    "panahan untuk pemula",
    "panahan untuk atlet prestasi",
  ],
  verification: {
    google: "gu06ND8s7CEmJ3PXuJ4kDwgXuo-nm6TY8CxM-p2K810",
  },
  authors: [{ name: "FAST Kodamar" }],
  creator: "FAST Kodamar",
  publisher: "FAST Kodamar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FAST Kodamar Archery Club",
    description: "Pusat pelatihan panahan terbaik di Jakarta. Gabung sekarang dan asah fokusmu!",
    url: "https://www.fastkodamar.com",
    siteName: "FAST Kodamar",
    images: [
      {
        url: "/bg-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Latihan Panahan FAST Kodamar",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAST Kodamar Archery Club",
    description: "Latihan panahan profesional untuk semua usia di Jakarta.",
    images: ["/bg-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsClub",
              "name": "FAST Kodamar Archery Club",
              "image": "https://www.fastkodamar.com/bg-hero.jpg",
              "description": "Klub Panahan profesional di wilayah Jakarta Utara. Kami menyediakan program anak-anak, pemula dewasa, hingga atlet berprestasi.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Komplek Kodamar TNI AL",
                "addressLocality": "Jakarta Utara",
                "addressRegion": "DKI Jakarta",
                "addressCountry": "ID"
              },
              "telephone": "+6281188037673",
              "url": "https://www.fastkodamar.com"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased suppressHydrationWarning`}
      >
        {children}
      </body>
    </html>
  );
}
