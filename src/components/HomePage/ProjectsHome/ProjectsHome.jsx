"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext } from "react";

import "./ProjectsHome.scss";
import clsx from "clsx";
import { Button } from "@/utils/Button/Button";
import { Content } from "@/utils/Content/Content";
import Link from "next/link";

export default function ProjectsHome() {
  const { data: allData } = useContext(DataContext);
  const { projects: data } = allData;

  return (
    <section className="projects container">
      <span className="super-text projects__title">{data?.title}</span>
      <div className="projects-list">
        {data?.list.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
      {/* <div className="projects-bottom">
        <h2>{data.bottom?.leftText}</h2>
        <h2>{data.bottom?.rightText}</h2>
      </div> */}
    </section>
  );
}

const ProjectCard = ({ project }) => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="categories">
          {project?.categories.map((category, index) => (
            <span
              className={clsx("categories__item", {
                "categories__item--black": category === "Ready to move in",
              })}
              key={project.title + "-category--" + index}
            >
              {category}
            </span>
          ))}
        </div>
        <h1 className="card__title">{project.title}</h1>
        <p>{project?.adress}</p>

        <div className="card-about">
          {project?.about.map((item, index) => (
            <div className="card-about-item" key={index}>
              <p className="card-about-item-top">
                <span className={`icon icon--${item.slug.split("-")[0]}`} />
                {item.text}
              </p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <div className="bottom">
          {project?.price && (
            <h2>
              {project?.price.text} €{project?.price.value}
            </h2>
          )}
          <div className="bottom__button">
            <Link
              href={project.button?.href}
              className={clsx("button", {
                "button--not-available":
                  project.button?.type === "not-available",
              })}
            >
              <p
                className="button__text-wrapper upperCase"
                aria-label={project.button?.text}
              >
                {project.button?.text &&
                  project.button?.text.split("").map((word, index) => (
                    <span
                      className="button__text"
                      key={index}
                      style={{
                        transitionDelay: `${
                          (index / project.button?.text.split("").length) * 0.06
                        }s`,
                      }}
                    >
                      {word !== " " ? word : <>&nbsp;</>}
                    </span>
                  ))}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="card__content card__content-images">
        {project.images.map((image, index) => (
          <Content
            url={image}
            alt={`${project.title}-${index}`}
            key={`${project.title}-${index}`}
            className="card__content-item"
          />
        ))}
      </div>
    </div>
  );
};
