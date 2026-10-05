import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prantik Chakraborty | Data Scientist",
  description: "Portfolio of Prantik Chakraborty — backend engineering, data analytics, AI projects, and full-stack development.",
  metadataBase: new URL("https://prantikchakz.vercel.app"),
  openGraph: {
    title: "Prantik Chakraborty | Data Scientist",
    description: "Backend engineering, data analytics, and practical AI projects.",
    url: "https://prantikchakz.vercel.app",
    siteName: "Prantik Chakraborty",
    type: "website"
  },
  twitter: { card: "summary_large_image", title: "Prantik Chakraborty | Data Scientist", description: "Backend engineering, data analytics, and practical AI projects." },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
