"use client";
import React, { useContext, useRef, useState } from "react";
import "./About.scss";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function AboutHome() {
  const { data: allData } = useContext(DataContext);
  const { about: data } = allData;
  const { top } = data;
  const aboutRef = useRef();

  const { scrollYProgress } = useScroll({
    target: data && aboutRef,
    offset: ["20% 0%", "100% 0%"],
    layoutEffect: false,
  });

  const ySection = useTransform(scrollYProgress, [0, 1], ["0", "50%"]);

  return (
    <section className="about container" ref={aboutRef}>
      <motion.div className="top" style={{ y: ySection }}>
        <h1 className="about__title">{top.title}</h1>
      </motion.div>
      <motion.div className="bottom" style={{ y: ySection }}>
        {data.bottom.list.map((item, index) => (
          <div className="card" key={index}>
            <h1>{item.text}</h1>
            <span className="line" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
