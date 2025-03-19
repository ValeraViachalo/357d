"use client";
import React, { useContext, useRef } from "react";

import "./WhyUs.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { Content } from "../Content/Content";
import { useScroll, useTransform } from "framer-motion";

export default function WhyUs() {
  const { data: allData } = useContext(DataContext);
  const { whyUs: data } = allData;
  const whyUsRef = useRef();

  const { scrollYProgress } = useScroll({
    target: whyUsRef,
    offset: ["100% 70%", "100% 0%"],
    layoutEffect: true,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section className="why-us container" ref={whyUsRef}>
      <span className="super-text">{data.title}</span>
      <div className="list grid">
        {data.list.map((item, index) => (
          <div className="card" key={index}>
            <h2
              className="title"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: item.text }}
              className="text"
            />
          </div>
        ))}
        <Content
          url={data?.image}
          alt="Why us"
          className="list__image"
          style={{ y }}
        />
      </div>
    </section>
  );
}
