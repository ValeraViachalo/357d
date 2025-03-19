import { ease } from "./ease";

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export const TitlePresence = {
  initial: {
    clipPath: "inset(0% -20% 100% -20%)",
    y: "100%",
  },
  animate: (param = { id: 0, duration: 1 }) => ({
    clipPath: "inset(0% -20% -20% -20%)",
    y: "0%",
    transition: {
      duration: param.duration,
      ease: ease.inOutCirc,
      delay: (param.id + 1) * 0.1,
    },
    transitionEnd: {
      clipPath: "none",
      y: "auto",
    },
  }),
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: "100%",
  },
};

export const ContactTitle = {
  initial: {
    clipPath: "inset(100% 0% 0% 0)",
    y: "-100%",
    transition: {
      duration: 1,
      ease: ease.inOutCirc,
    },
  },
  animate: (delay) => ({
    clipPath: "inset(0% 0% 0% 0)",
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: ease.inOutCirc,
    },
  }),
  exit: (delay) => ({
    clipPath: "inset(0% 0% 100% 0)",
    y: "100%",
    transition: {
      duration: 1,
      delay,
      ease: ease.inOutCirc,
    },
  }),
};
