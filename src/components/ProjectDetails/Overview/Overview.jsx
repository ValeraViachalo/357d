import React, { useState } from "react";

import "./Overview.scss";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { anim, ProjectsAnim } from "@/lib/helpers/anim";
import Image from "next/image";

export const Overview = ({ data }) => {
  const interests = data?.interests;
  const [activeInterest, setActiveInterest] = useState(interests.list[0]);

  return (
    <section className="overview">
      <div className="container">
        <div className="title">
          <p className="title__text">{data?.title?.identText}</p>
          <h1 className="title__title">{data?.title?.text}</h1>
        </div>
        <div className="interests">
          <div className="interests__list">
            <p>{interests?.title}</p>
            <div className="links">
              {interests.list.map((link, index) => (
                <div
                  key={index}
                  className={clsx("link__wrapper", {
                    "link__wrapper--active": activeInterest.type.slug === link.type.slug,
                  })}
                >
                  <button
                    className="link"
                    onClick={() => setActiveInterest(link)}
                  >
                    {link.type.text}
                  </button>
                  <p className="hover-text">{link?.farness}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="interests__content">
            <div className="image__wrapper">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img className="image" src={activeInterest.image} key={activeInterest.type.slug} {...anim(ProjectsAnim.slideshow)}/>
              </AnimatePresence>
            </div>
            <Image
              src="/images/projects/unit/map.jpg"
              alt="map"
              width={600}
              height={400}
              className="map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
