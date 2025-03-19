import localFont from "next/font/local";
import "@/styles/reset.scss";
import {
  ScrollProvider,
} from "@/lib/providers/ScrollProvider/ScrollProvider";
import Footer from "@/utils/Footer/Footer";
import Header from "@/utils/Header/Header";

const ppMori = localFont({
  src: [
    {
      path: "./fonts/PPMori/PPMori-SemiBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/PPMori/PPMori-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--pp-mori",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="html">
      <body className={`${ppMori.variable} body`}>
      <ScrollProvider scrollBar></ScrollProvider>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
