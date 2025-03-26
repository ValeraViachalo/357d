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
import { AnimatePresence, motion } from "framer-motion";
import { anim, TitlePresence } from "@/lib/helpers/anim";
import Link from "next/link";

export default function Header() {
  const [data, setData] = useState(null);
  const [isTopScroll, setIsTopScroll] = useState(true);
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
      <header className={clsx("header grid")}>
        {/* <Link href={isGrePath ? "/gre" : "/"} className="header__logo">
          <AnimatePresence mode="popLayout">
            {path === "/" || path === "/gre" ? (
              isTopScroll ? (
                <motion.p className="header__logo-text" {...anim(TitlePresence)}>
                  {data?.title}
                </motion.p>
              ) : (
                <motion.div
                  {...anim(TitlePresence)}
                >
                  <Logo />
                </motion.div>
                // <motion.div
                //   layoutId={`header_logo-${path}`}
                //   transition={{
                //     layout: {
                //       duration: 0.4,
                //       ease: ease.inOutExpo,
                //     },
                //   }}
                // >
                //   <Logo />
                // </motion.div>
              )
            ) : (
              <div className="header__logo header__logo--regular">
                <Logo className="header__logo-image"/>
                <p className="header__logo-text">{data?.title}</p>
              </div>
            )}
          </AnimatePresence>
        </Link> */}
        <Link href={isGrePath ? "/gre" : "/"} className={clsx("header__logo", {
          "header__logo--hide": (path === "/" || path === "/gre") && isTopScroll
        })}>
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
          <LinkAnim href={localeHref} text={isGrePath ? "ENG" : "GRE"} />
          <ContactButton />
        </div>
      </header>
    )
  );
}

const ContactButton = () => {
  return (
    <Link href="/contact" className="contact-button upperCase">
      Contact →
    </Link>
  );
};
