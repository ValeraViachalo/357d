"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";
import { usePathname } from "next/navigation";
import { URL_FOOTER } from "@/lib/helpers/DataUrls";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import { ContactForm } from "./ContactForm/ContactForm";
import Link from "next/link";

export default function Footer() {
  const [data, setData] = useState(null);
  const path = usePathname();
  const isGrePath = path.startsWith("/gre");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFetchData(URL_FOOTER);

        setData(useLanguageContent(result, isGrePath ? "gre" : "en"));
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }

    fetchData();
  }, [path]);

  const navigation = data?.navigation;

  return (
    data && (
      <footer className="footer container grid">
        <div className="navigation navigation-menu">
          <p className="navigation-title">{navigation.pages?.title}</p>
          <div className="list">
            {navigation.pages?.list.map((item, index) => (
              <LinkAnim
                href={item.href}
                text={item.text}
                key={index + "--pages"}
              />
            ))}
          </div>
        </div>
        <div className="copyright small-text" data-only-desktop>{data.copyright}</div>
        <div className="navigation navigation-legal">
          <p className="navigation-title">{navigation.legal?.title}</p>
          <div className="list">
            {navigation.legal?.list.map((item, index) => (
              <LinkAnim
                href={item.href}
                text={item.text}
                key={index + "--legal"}
              />
            ))}
          </div>
        </div>
        <ContactForm data={data.contactForm} />
        <div className="navigation navigation-contacts">
          <p className="navigation-title">{navigation.contacts?.title}</p>
          <div className="list">
            {navigation.contacts?.top.map((item, index) => (
              <LinkAnim
                href={item.href}
                text={item.text}
                key={index + "--top-contacts"}
              />
            ))}
          </div>
          <div className="list-icons">
            {navigation.contacts?.socials.map((item, index) => (
              <Link
                href={item.href}
                className="icon"
                style={{ backgroundImage: `url(${item.icon})` }}
                key={index + "--socials-contacts"}
                target="_blank"
                aria-label={item.text}
              />
            ))}
          </div>
        </div>
        {/* <div className="navigation navigation-address">
          <p>{navigation.address?.title}</p>
          <Link
            className="navigation-address__link"
            dangerouslySetInnerHTML={{
              __html: navigation.address?.button?.text,
            }}
            href={navigation.address?.button?.href || "/"}
            target="_blank"
          />
        </div> */}
        <LinkAnim
          href={data.madeBy.href}
          text={data.madeBy.text}
          target="_blank"
          classes="made-by"
          data-only-desktop
        />

        <div className="copyright-bottom" data-only-mobile--flex>
          <p className="copyright-bottom__text">{data.copyright}</p>
          <LinkAnim
            href={data.madeBy.href}
            text={data.madeBy.text}
            target="_blank"
            classes="made-by"
          />

        </div>
      </footer>
    )
  );
}
