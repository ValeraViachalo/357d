import HomePage from "@/components/HomePage/HomePage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_HOME } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import WhyUs from "@/utils/WhyUs/WhyUs";

export const generateMetadata = async () => generatePagesMetadata(URL_HOME);

export default async function Home() {
  const data = await getFetchData(URL_HOME);
  
  // Provide fallback data structure if fetch failed
  const fallbackData = {
    en: {
      // Add your expected data structure here
    }
  };
  
  const safeData = Object.keys(data).length > 0 ? data : fallbackData;

  return (
    <DataProvider data={safeData}>
      <HomePage />
      <WhyUs />
    </DataProvider>
  );
}
