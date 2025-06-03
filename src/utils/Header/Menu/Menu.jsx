import React, { useState } from "react";
import "./Menu.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ease } from "@/lib/helpers/ease";
import { Button } from "@/utils/Button/Button";
import { anim, MenuAnim } from "@/lib/helpers/anim";

export const Menu = ({ data, menuActive, setMenuActive }) => {
  return (
    <>
      <motion.span {...anim(MenuAnim.wrapper)} className="menu-bg" />
      <motion.div {...anim(MenuAnim.wrapper)} className="menu">
        <svg
          width="71"
          height="71"
          viewBox="0 0 71 71"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="menu__close"
          onClick={() => setMenuActive(false)}
        >
          <path d="M17.6729 53.0295L53.0282 17.6741" stroke="black" />
          <path d="M53.0283 53.0364L17.673 17.6811" stroke="black" />
        </svg>
        <div className="menu-socials">
          <DropDown />
          {data?.fixedContacts?.map((item, index) => (
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
        <div className="menu-link-list">
          {data?.list?.map((currLink, index) => (
            <Link
              href={currLink.link}
              key={`menu_link_${index}`}
              className="menu-link-list__link"
              onClick={() => setMenuActive(false)}
            >
              <h1>{currLink.name}</h1>
            </Link>
          ))}
          <Button
            href={data?.contact?.href}
            text={data?.contact?.name}
            data-scroll-anchor={data?.contact?.href}
            onClick={() => setMenuActive(false)}
          />
        </div>
      </motion.div>
    </>
  );
};

const DropDown = () => {
  const [isActive, setIsActive] = useState(false);
  const path = usePathname();

  const isGrePath = path.startsWith("/gre");
  const currentPath = isGrePath ? path.replace("/gre", "") : path;
  const grePath = `/gre${currentPath}`;
  const engPath = currentPath;

  return (
    <>
      <div className="menu-dropdown-placehold"></div>
      <div
        className={clsx("menu-dropdown", {
          "menu-dropdown--active": isActive,
        })}
        onClick={() => setIsActive(!isActive)}
      >
        <div className="menu-dropdown__head">
          {isGrePath ? "GR" : "EN"}
          <svg
            className="menu-dropdown__head-icon"
            viewBox="0 0 17 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L8.5 8L16 1" strokeWidth="1.4" stroke="black" />
          </svg>
        </div>
        <motion.div
          className={clsx("menu-dropdown__wrapper", {
            "menu-dropdown__wrapper--active": isActive,
          })}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: ease.inOutExpo }}
        >
          <div className="menu-dropdown__content">
            <Link
              // href={isGrePath ? engPath || "/" : grePath}
              href={""}
              className="menu-dropdown__link"
              onClick={() => setIsActive(false)}
            >
              <p>{isGrePath ? "EN" : "GR"}</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};
