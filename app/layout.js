import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Planorama",
  description: "Your own Jira board",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* header  */}
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-900 py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
            <p>Made by 💖 Planorama</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
