"use client";
import React, { useContext, useRef, useState } from "react";
import "./About.scss";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function AboutHome() {
  const { data: allData } = useContext(DataContext);
  const { about: data } = allData;
  const { top } = data;
  const aboutRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: data && aboutRef,
    offset: ["0% 100%", "0% 90%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsActive(latest > 0.2);
  });

  return (
    <section className="about container" ref={aboutRef}>
      <div className="top">
        <p className="about__text">{top.text}</p>
        {/* <h1 className="about__title">
          <ParagraphAnim text={top.title} isActive={true}/>
        </h1> */}
        <h1 className="about__title">{top.title}</h1>
      </div>
      <div className="bottom">
        {data.bottom.list.map((item, index) => (
          <div className="card" key={index}>
            <h1>{item.text}</h1>
            <span className="line" />
          </div>
        ))}
      </div>
    </section>
  );
}
