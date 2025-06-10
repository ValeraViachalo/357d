import HomePage from "@/components/HomePage/HomePage";
import ProjectDetails from "@/components/ProjectDetails/ProjectDetails";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_PROJECT_DETAILS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import WhyUs from "@/utils/WhyUs/WhyUs";

export const generateMetadata = async () => generatePagesMetadata(URL_PROJECT_DETAILS + "unit-residence.json");

export default async function Home() {
  const preparedData = await getFetchData(URL_PROJECT_DETAILS + "unit-residence");
  const data = useLanguageContent(preparedData, "en");

  return (
    <DataProvider data={data}>
      <ProjectDetails />
      {/* <WhyUs /> */}
    </DataProvider>
  );
}
