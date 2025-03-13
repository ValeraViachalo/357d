"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const LazyLoad = dynamic(() => import('react-lazyload'), { ssr: false });

export const Content = ({ url, refCon, lazy = true, ...rest }) => {
  const [offset, setOffset] = useState(0);
  const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  const isVideo = url.match(/\.(mp4|webm)$/) != null;

  useEffect(() => {
    setOffset(window.innerHeight);
  }, []);

  const ContentElement = isVideo ? (
    <motion.video
      loop
      muted
      autoPlay
      webkit-playsinline="true"
      playsInline
      {...rest}
      ref={refCon && refCon}
    >
      <source src={url} />
    </motion.video>
  ) : (
    <motion.img src={url} ref={refCon && refCon} {...rest} />
  );

  if (typeof window === 'undefined') {
    return null; // or a placeholder component
  }

  return (
    <>
      {lazy ? (
        <LazyLoad offset={offset} {...rest}>
          {ContentElement}
        </LazyLoad>
      ) : (
        <>
          {isVideo && (
            <video
              loop
              muted
              autoPlay
              webkit-playsinline="true"
              playsInline
              {...rest}
              ref={refCon && refCon}
            >
              <source src={url} />
            </video>
          )}
          {isImage && (
            <Image src={url} ref={refCon && refCon} {...rest} />
          )}
        </>
      )}
    </>
  );
};