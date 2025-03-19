"use client"

import { useState, useEffect } from "react";
import { LocaleContext } from "./context";
import { usePathname } from "next/navigation";

export const LocaleProvider = ({ children }) => {
    const path = usePathname();
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const isGrePath = path.startsWith("/gre");
        setLang(isGrePath ? "gre" : "en");
    }, [path]);

    return (
      <LocaleContext.Provider value={{ lang }}>
        {children}
      </LocaleContext.Provider>
    );
}