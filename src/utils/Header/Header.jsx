"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { URL_HEADER } from "@/lib/helpers/DataUrls";
import "./Header.scss";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import FixedContacts from "../FixedContacts/FixedContacts";
import { LangSwitch } from "./LangSwitch/LangSwitch";
import { Menu } from "./Menu/Menu";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const [data, setData] = useState(null);
  const [isTopScroll, setIsTopScroll] = useState(true);
  const [menuActive, setMenuActive] = useState(false);
  const path = usePathname();

  const isGrePath = path.startsWith("/gre");

  const localeHref = isGrePath ? path.replace("/gre", "") : `/gre${path}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsTopScroll(window.scrollY < 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFetchData(URL_HEADER);

        setData(useLanguageContent(result, isGrePath ? "gre" : "en"));
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }

    fetchData();
  }, [path]);

  return (
    data && (
      <>
        <header className={clsx("header grid")}>
          <Link
            href={isGrePath ? "/gre" : "/"}
            className={clsx("header__logo", {
              "header__logo--hide":
                (path === "/" || path === "/gre") && isTopScroll,
            })}
          >
            <div className="header__logo header__logo--regular">
              <Logo className="header__logo-image" />
              <p className="header__logo-text">{data?.title}</p>
            </div>
          </Link>
          <nav className="header__list">
            {data.list.map((currLink, index) => (
              <LinkAnim
                classes="link upperCase"
                href={isGrePath ? `/gre${currLink.link}` : currLink.link}
                key={`header_link_${index}`}
                text={currLink.name}
              />
            ))}
          </nav>

          <div className="right">
            {/* <LinkAnim href={localeHref} text={isGrePath ? "ENG" : "GRE"} /> */}
            <LangSwitch />
            <Link href="/contact" className="contact-button upperCase">
              {data.contact.name}
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="contact-button__icon"
              >
                <path
                  d="M1 6.5L13 6.5M13 6.5L7.33333 12M13 6.5L7.33333 1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <svg
              width="30"
              height="14"
              viewBox="0 0 30 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="header__burger"
              onClick={() => setMenuActive(true)}
            >
              <path d="M0 7H30" stroke="black" />
              <path d="M0 13H30" stroke="black" />
              <path d="M0 1H30" stroke="black" />
            </svg>
          </div>
        </header>
        <AnimatePresence mode="wait">
          {menuActive && (
            <Menu data={data} menuActive={menuActive} setMenuActive={setMenuActive} />
          )}
        </AnimatePresence>
        <FixedContacts data={data?.fixedContacts} />
      </>
    )
  );
}
