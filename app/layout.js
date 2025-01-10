import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Planorama",
  description: "Your own Jira board",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: shadesOfPurple,
      variables:{
        colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
      },
      elements: {
        formButtonPrimary: "bg-blue-800 hover:bg-blue-700 text-white",
        card: "bg-gray-800",
        headerTitle: "text-blue-400",
        headerSubtitle: "text-gray-400",
      },
    }}
    >
    <html lang="en">
      <body className={`${inter.className} dotted-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-900 py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
            <p>Made by 💖 Planorama</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
