import React from 'react'
import { Logo } from '../Logo/Logo';

import './Header.scss';
import Link from 'next/link';

const linksList = [
  {
    "name": "Home",
    "link": "/"
  },
  {
    "name": "FAQ",
    "link": "/faq"
  },
  {
    "name": "About",
    "link": "/about"
  }
]


export default function Header() {
  return (
    <header className="header">
      <Logo className="header__logo" />

      <div className="header__wrapper">
        <ul className="header__list_links">
          {linksList.map((currLink, index) => (
            <li key={`header_link_${index}`}>
              <Link className="header__link" href={currLink.link}>
                <span>{currLink.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
