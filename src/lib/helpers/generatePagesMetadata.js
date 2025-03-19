const fallbackData = {
  documentTitle: "357D",
  documentKeywords:
    "nextjs, next.js, creative, creative development, framer-motion",
  documentDescription:
    "Building homes, not just walls We are developing a property that integrates urban principles and prioritizes human needs in a contemporary housing format.",
  documentImage: "/images/screenshot2.jpg",
};

export async function generatePagesMetadata(endpoint, lang = "en") {
  const preparedData = await fetch(endpoint, {
    next: { revalidate: 120 },
  }).then((response) => response.json());

  const data = preparedData[lang].seo || fallbackData;

  return {
    title: data.documentTitle,
    keywords: data.documentKeywords,
    description: data.documentDescription,
    openGraph: {
      title: data.documentTitle,
      keywords: data.documentKeywords,
      description: data.documentDescription,
      url: "",
      images: [
        {
          url: data.documentImage,
          width: 720,
          height: 405,
          alt: "OpenGraph",
        },
      ],
    },
  };
}
