export async function getFetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 120 }, // Revalidate every 2 minutes instead of no-store
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {}; // Return empty object as fallback
  }
}
