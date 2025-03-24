import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "RSTL Appointment Portal",
  description: "Regional Standards and Testing Laboratories Appointment Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
} 