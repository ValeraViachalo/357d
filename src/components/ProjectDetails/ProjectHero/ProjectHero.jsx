"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";

import "./ProjectHero.scss";
import { Content } from "@/utils/Content/Content";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectHero() {
  const { data: allData } = useContext(DataContext);
  const { hero: data } = allData;
  const heroRef = useRef();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["100% 100%", "100% 0%"],
    layoutEffect: false,
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], ["30%", "100%"]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <section className="hero" ref={heroRef}>
      <Content url={data.image} className="hero__background" style={{ y: yImage }}/>
      <motion.span className="hero__background-fade" style={{ opacity, scaleY }}/>
      <motion.div className="container" >
        <span className="hero__title">
          {data.title}
        </span>
        <p className="hero__descrition">{data?.text}</p>
      </motion.div>
    </section>
  );
}
