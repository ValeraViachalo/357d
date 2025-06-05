"use client";
import React, { useContext } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";

import "./Details.scss";
import clsx from "clsx";
import { Button } from "@/utils/Button/Button";

export default function Details() {
  const { data: allData } = useContext(DataContext);
  const { details: data } = allData;

  return (
    data.showSection && (
      <section className="details-section__wrapper">
        <div className="details-section grid">
          <h2 className="price">{data?.price}</h2>

          <div className="address">
            <p>{data.address?.text}</p>
            <div className="address__link">
              <LinkAnim
                href={data.address?.button?.href}
                text={data.address?.button?.text}
                target="_blank"
              />
              <span className="icon icon--location" />
            </div>
          </div>
          {/* <div className="about">
            {data?.about.map((item, index) => (
              <div className="about-item" key={index}>
                <p>
                  <span className={`icon icon--${item.slug.split("-")[0]}`} />
                  {item.text}
                </p>
                <p>{item.value}</p>
              </div>
            ))}
          </div> */}
          {/* <div className="categories">
            {data?.categories && data?.categories.map((category, index) => (
              <span
                className={clsx("categories__item", {
                  "categories__item--black": category === "Ready to move in",
                })}
                key={"category--" + index}
              >
                {category}
              </span>
            ))}
          </div> */}
          {data?.availabilityButton?.show && (
            <Button
              classes="details-section__button"
              text={data?.availabilityButton?.text}
              href="#availability"
              data-scroll-anchor="#availability"
            />
          )}
        </div>
      </section>
    )
  );
}
