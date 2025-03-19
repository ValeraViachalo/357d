"use client";
import React, { useContext } from 'react'
import { DataContext } from '@/lib/providers/DataProvider/context';

import './Services.scss'
import { Content } from '@/utils/Content/Content';

export default function ServicesHome() {
  const { data: allData } = useContext(DataContext);
  const { services: data } = allData;

  return (
    <section className="services container">
      <span className="super-text">{data?.title}</span>
      <div className="list">
        {data?.list.map((service, index) => (
          <div className="services-card" key={index}>
            <p>0{index+1}</p>
            <h1>{service}</h1>
          </div>
        ))}
      </div>
      <Content 
        url={data?.content}
      />
    </section>
  )
}
