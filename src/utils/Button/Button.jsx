import Link from 'next/link'
import React from 'react'

import './Button.scss'
import clsx from 'clsx'

export const Button = ({ text, href, secondaryItem, greenHover=false, ...rest }) => {
  return (
    <Link href={href} {...rest} className={clsx("button", {
      "button--green-hover": greenHover,
    })}>
      {secondaryItem && (
        <p className="button__text-wrapper" aria-label={text}>
          {secondaryItem}
        </p>
      )}
      <p className="button__text-wrapper upperCase" aria-label={text}>
        {text && text.split("").map((word, index) => (
          <span className="button__text" key={index} style={{ transitionDelay: `${(index / text.split("").length) * 0.06}s` }}>
            {word !== " " ? word : (<>&nbsp;</>)}
          </span>
        ))}
      </p>
    </Link>
  )
}
