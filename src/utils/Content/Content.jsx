"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
      width="100%"
      height="100%"
    >
      <source src={url} />
    </motion.video>
  ) : (
    <motion.img src={url} ref={refCon && refCon} width="100%"
    height="100%" {...rest} />
  );

  return (
    ContentElement
  );
};
