"use client";
import React, { useContext, useRef } from 'react'
import { DataContext } from '@/lib/providers/DataProvider/context';

import './Services.scss'
import { Content } from '@/utils/Content/Content';
import { useScroll, useTransform } from 'framer-motion';

export default function ServicesHome() {
  const { data: allData } = useContext(DataContext);
  const { services: data } = allData;
  const servicesRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ["0% 100%", "100% 0%"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section className="services" ref={servicesRef}>
      {/* <span className="super-text">{data?.title}</span>
      <div className="list">
        {data?.list.map((service, index) => (
          <div className="services-card" key={index}>
            <p>0{index+1}</p>
            <h1>{service}</h1>
          </div>
        ))}
      </div> */}
      <Content 
        url={data?.content}
        style={{y}}
        className="services-content"
      />
    </section>
  )
}
