import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";
import React from "react";
import "./DownloadSection.scss";
import { Button } from "@/utils/Button/Button";

export const DownloadSection = ({ data }) => {
  return (
    <section className="download-section grid">
      <Button
        text={data?.button?.text}
        href={data?.button?.href}
        target="_blank"
        classes="download-section__button"
        secondaryItem={
          <span className="icon icon--white icon--download" />
        }
        download
      />
    </section>
  );
};
