import React from "react";
import { useQuery } from "react-query";
import { DataContext } from "./context";

const getData = async (url) => {
  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const DataProvider = ({ children, url }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getData(url),
    queryKey: ["data", url],
  });

  if (isError) {
    console.error("Error fetching data:", error);
    return <div>Error loading data: {error.message}</div>;
  }

  return !isLoading && data ? (
    <DataContext.Provider value={{ data, isLoading }}>
      {children}
    </DataContext.Provider>
  ) : null;
};
