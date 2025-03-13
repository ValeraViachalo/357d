import HomePage from "@/components/HomePage/HomePage";
import { URL_HOME } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";

export const generateMetadata = async () => generatePagesMetadata(URL_HOME);

export default function Home() {
  return (
    <HomePage />
  );
}
