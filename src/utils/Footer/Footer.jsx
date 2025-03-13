import React from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <h1 className="super-text">RTRTS TMPLATE*</h1>
      <div className="bottom container">
        <Logo className="footer__logo" />
        <span className="micro-text shadow footer__description">
          *retrats template - the ideal for creative work, featuring stunning
          components, video backgrounds, and fluid functionality. Retrats is a
          starter that propels you forward
        </span>
      </div>
    </footer>
  );
}
