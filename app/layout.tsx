import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VibeShift — Move Your Music",
  description: "Transfer playlists between Spotify and YouTube.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}