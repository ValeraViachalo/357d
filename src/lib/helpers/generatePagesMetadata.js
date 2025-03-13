export async function generatePagesMetadata(endpoint) {
  const data = await fetch(endpoint, {
    next: { revalidate: 120 },
  }).then((response) => response.json());

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