import { Metadata, Viewport } from "next";
import Layout from "../../layout/layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  themeColor: "dark",
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "BlackBase",
  description:
    "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: "PrimeReact Atlantis-REACT",
    url: "https://www.primefaces.org/Atlantis-react",
    description:
      "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
    images: ["https://www.primefaces.org/static/social/Atlantis-react.png"],
    ttl: 604800,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <Layout>{children}</Layout>;
}
