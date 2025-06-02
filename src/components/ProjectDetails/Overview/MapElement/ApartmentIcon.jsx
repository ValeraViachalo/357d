import React from "react";

export const ApartmentIcon = ({ imageUrl }) => {
  return (
    <svg
      width="63"
      height="72"
      viewBox="0 0 63 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.5 0C14.103 0 0 14.103 0 31.5C0 45.4278 9.03926 57.2444 21.5713 61.4033C23.1807 61.9374 24.6498 62.8664 25.6673 64.2231V64.2231C28.5836 68.1115 34.4164 68.1115 37.3327 64.2231V64.2231C38.3502 62.8664 39.8193 61.9374 41.4287 61.4033C53.9607 57.2445 63 45.4278 63 31.5C63 14.103 48.897 0 31.5 0Z"
        fill="black"
      />
      <path d="M18 54H45L31.5 72L18 54Z" fill="black" />
      <defs>
        <image
          id="image0_1387_1788"
          width="110"
          height="110"
          xlinkHref={imageUrl}
          preserveAspectRatio="none"
        />
      </defs>
      <rect
        x="4"
        y="4"
        width="55"
        height="55"
        rx="27.5"
        fill={`url(#pattern0_1387_1788)`}
      />
      <pattern
        id="pattern0_1387_1788"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use href="#image0_1387_1788" transform="scale(0.00909091)" />
      </pattern>
    </svg>
  );
};
