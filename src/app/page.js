import HomePage from "@/components/HomePage/HomePage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_HOME } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import WhyUs from "@/utils/WhyUs/WhyUs";

export const generateMetadata = async () => generatePagesMetadata(URL_HOME);

export default async function Home() {
  const preparedData = await getFetchData(URL_HOME);
  const data = useLanguageContent(preparedData, "en");

  return (
    <DataProvider data={data}>
      <h1>{data.seo.documentTitle}</h1>
      {/* <HomePage /> */}
      {/* <WhyUs /> */}
    </DataProvider>
  );
}
