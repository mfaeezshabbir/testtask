import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Test Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased min-h-full flex flex-col bg-gray-50`}
      >
        <div id="app-container" className="flex flex-col flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
