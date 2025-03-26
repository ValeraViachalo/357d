import Link from 'next/link'
import React from 'react'
import './LinkAnim.scss'
import Image from 'next/image'

export const LinkAnim = ({href, classes = "", text, icon = false, secondaryItem = false, ...rest}) => {
  return (
    <Link href={href} {...rest} className={"link-anim " + classes}>
      
      {secondaryItem && (
        <p className="link-anim__text-wrapper" aria-label={text}>
          {secondaryItem}
        </p>
      )}
      <p className="link-anim__text-wrapper" aria-label={text}>
        {text && text.split("").map((word, index) => (
          <span className="link-anim__text" key={index} style={{ transitionDelay: `${(index / text.split("").length) * 0.06}s` }}>
            {word !== " " ? word : (<>&nbsp;</>)}
          </span>
        ))}
      </p>
      {icon && (
        <Image
          width={17}
          height={17}
          src={icon}
          alt=""
          className="link-anim__icon"
        />
      )}
    </Link>
  )
}
