import ProjectDetails from "@/components/ProjectDetails/ProjectDetails";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_PROJECT_DETAILS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export const generateMetadata = async ({ params }) => {
  const { project } = await params;
  return generatePagesMetadata(URL_PROJECT_DETAILS + project);
};

export default async function page({ params }) {
  const { project } = await params;
  const data = await getFetchData(URL_PROJECT_DETAILS + project);

  return (
    <DataProvider data={data}>
      <ProjectDetails />
    </DataProvider>
  );
}
