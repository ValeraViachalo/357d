import React from "react";
import ProjectHero from "./ProjectHero/ProjectHero";
import Details from "./Details/Details";
import { Sections } from "./Sections/Sections";
import WhyUs from "@/utils/WhyUs/WhyUs";
import MapElement from "./Overview/MapElement/MapElement";

export default function ProjectDetails() {
  return (
    <main className="project-details">
      {/* <ProjectHero />
      <Details /> */}
      <Sections />
      {/* <WhyUs /> */}
    </main >
  );
}

