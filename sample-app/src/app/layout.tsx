import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSecOps Sample App",
  description: "Sample application for Agentic DevSecOps Framework testing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // {/* INTENTIONAL-A11Y-VIOLATION: Missing lang attribute on html element */}
    // {/* WCAG 3.1.1 (Level A): Page language must be specified */}
    <html>
      <body>{children}</body>
    </html>
  );
}
