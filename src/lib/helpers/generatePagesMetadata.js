const fallbackData = {
  documentTitle: "357D",
  documentKeywords:
    "nextjs, next.js, creative, creative development, framer-motion",
  documentDescription:
    "Building homes, not just walls We are developing a property that integrates urban principles and prioritizes human needs in a contemporary housing format.",
  documentImage: "/images/screenshot2.jpg",
};

export async function generatePagesMetadata(endpoint, lang = "en") {
  try {
    const preparedData = await fetch(endpoint, {
      next: { revalidate: 120 },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });

    const data = preparedData?.seo || fallbackData;

    return {
      title: data.documentTitle,
      keywords: data.documentKeywords,
      description: data.documentDescription,
      metadataBase: new URL("https://357d.com"), // Add metadataBase to fix the warning
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
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Return fallback metadata when fetch fails
    return {
      title: fallbackData.documentTitle,
      keywords: fallbackData.documentKeywords,
      description: fallbackData.documentDescription,
      metadataBase: new URL("https://357d.com"),
      openGraph: {
        title: fallbackData.documentTitle,
        keywords: fallbackData.documentKeywords,
        description: fallbackData.documentDescription,
        url: "",
        images: [
          {
            url: fallbackData.documentImage,
            width: 720,
            height: 405,
            alt: "OpenGraph",
          },
        ],
      },
    };
  }
}
