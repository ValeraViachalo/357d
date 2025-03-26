"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { useContext } from "react";
import {
  DoubleText,
  FeaturesSection,
  TitleText,
} from "../TextSections/TextSections";
import { DownloadSection } from "../DownloadSection/DownloadSection";
import VideoSection from "../VideoSection/VideoSection";
import Gallery from "../Gallery/Gallery";
import Availability from "../Availability/Availability";
import { Overview } from "../Overview/Overview";

export const Sections = () => {
  const { data } = useContext(DataContext);
  const { sections } = data;

  const renderComponent = (section, index) => {
    switch (section.type) {
      case "text-title":
        return <TitleText key={index} data={section} />;
      case "two-row-text":
        return <DoubleText key={index} data={section} />;
      case "video":
        return <VideoSection key={index} data={section} />;
      case "download-files":
        return <DownloadSection key={index} data={section} />;
      case "gallery":
        return <Gallery key={index} data={section} />;
      case "features":
        return <FeaturesSection key={index} data={section} />;
      case "availability":
        return <Availability key={index} data={section} />;
      case "neighborhood-overview":
        return <Overview key={index} data={section} />;
    }
  };

  return (
    <>{sections.map((section, index) => renderComponent(section, index))}</>
  );
};
