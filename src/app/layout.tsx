import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL('https://aetherstack.top'),
  title: {
    default: "AetherStack | From Devices to Cloud to Apps",
    template: "%s | AetherStack",
  },
  description: "Complete, production-ready web, mobile, and IoT systems — no gaps, no juniors, no outsourcing.",
  keywords: ["web development", "mobile app development", "IoT", "cloud solutions", "ERP systems", "senior developers", "full-stack"],
  authors: [{ name: "AetherStack" }],
  creator: "AetherStack",
  publisher: "AetherStack",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aetherstack.top",
    siteName: "AetherStack",
    title: "AetherStack | From Devices to Cloud to Apps",
    description: "Complete, production-ready web, mobile, and IoT systems — no gaps, no juniors, no outsourcing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AetherStack - Senior Team for Web, Mobile & IoT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherStack | From Devices to Cloud to Apps",
    description: "Complete, production-ready web, mobile, and IoT systems — no gaps, no juniors, no outsourcing.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <Header />
        {children}
      </body>
    </html>
  );
}
