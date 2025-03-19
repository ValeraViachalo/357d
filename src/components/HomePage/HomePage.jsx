import { Content } from "@/utils/Content/Content";

import "./HomePage.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";
import { motion } from "framer-motion";
import HeroHome from "./Hero/Hero";
import AboutHome from "./About/About";
import ProjectsHome from "./ProjectsHome/ProjectsHome";
import ServicesHome from "./Services/Services";

const HomePage = () => {
  return (
    <main className="home">
      <HeroHome />
      <AboutHome />
      <ProjectsHome />
      <ServicesHome />
    </main>
  );
};

export default HomePage;
