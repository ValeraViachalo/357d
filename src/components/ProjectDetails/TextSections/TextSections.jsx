import React, { useState } from "react";

import "./TextSections.scss";
import { motion } from "framer-motion";

export const TitleText = ({ data }) => {
  return (
    <section className="title-text container">
      <p className="title-text__text">{data?.text}</p>
      <h2 className="title-text__title">{data?.title}</h2>
    </section>
  );
};

export const DoubleText = ({ data }) => {
  return (
    <section className="double-text container">
      <div className="double-text__wrapper">
        <p>{data.firtsTitle?.title}</p>
        <p dangerouslySetInnerHTML={{ __html: data.firtsTitle?.text }} />
      </div>
      <div className="double-text__wrapper">
        <p>{data.secondTitle?.title}</p>
        <p dangerouslySetInnerHTML={{ __html: data.secondTitle?.text }} />
      </div>
    </section>
  );
};

export const FeaturesSection = ({ data }) => {
  return (
    <section className="features-section container">
      <h1>{data?.title}</h1>
      <ul className="features-section__list">
        {data?.list.map((feture, index) => (
          <li className="item" key={index}>
            <p className="upperCase title">{feture.title}</p>
            <p className="text">{feture.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}