import React from "react";
import "./FixedContacts.scss";
import Link from "next/link";

export default function FixedContacts({ data }) {
  return (
    <div className="fixed-contacts">
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
