import React from "react";
import "./FixedContacts.scss";
import Link from "next/link";
import clsx from "clsx";

export default function FixedContacts({ data, isNearFooter }) {
  return (
    <div className={clsx("fixed-contacts", {
      "fixed-contacts--hidden": isNearFooter,
    })}>
      {data?.map((item, index) => (
        <Link
          href={item.href}
          text={item.text}
          className="icon"
          style={{ backgroundImage: `url(${item.icon})` }}
          key={index + "--socials-contacts"}
          target="_blank"
        />
      ))}
    </div>
  );
}
