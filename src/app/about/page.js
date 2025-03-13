import AboutPage from "@/components/AboutPage/AboutPage";
import { URL_ABOUT } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";

export const generateMetadata = async () => generatePagesMetadata(URL_ABOUT);

export default function Home() {
  return (
    <AboutPage />
  );
}
