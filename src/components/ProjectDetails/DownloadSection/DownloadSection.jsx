import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";
import React from "react";
import "./DownloadSection.scss";

export const DownloadSection = ({ data }) => {
  return (
    <section className="download-section grid">
      <p>{data?.title}</p>
      <div className="download-section__list">
      {data?.links.map((link, index) => link?.href && (
        <LinkAnim
          href={link?.href}
          text={link.text}
          key={index}
          download
          target="_blank"
          icon="/images/icons/download-icon.svg" />
      ))}
      </div>
    </section>
  );
};
