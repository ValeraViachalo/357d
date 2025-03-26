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

export const BluredPresence = {
  initial: {
    opacity: 0,
    filter: "blur(0.4vw)",
  },
  animate: (param = { id: 0, duration: 1 }) => ({
    opacity: 1,
    filter: "blur(0vw)",
    transition: {
      duration: param.duration,
      ease: ease.inOutCirc,
      delay: (param.id + 1) * 0.1,
    },
    transitionEnd: {
      filter: "none",
    },
  }),
  exit: {
    opacity: 0,
    filter: "blur(0.4vw)",
  },
  scaled: {
    initial: {
      opacity: 0,
      filter: "blur(0.4vw)",
      scale: 1.2,
    },
    animate: (param = { id: 0, duration: 0.6 }) => ({
      opacity: 1,
      filter: "blur(0vw)",
      scale: 1,
      transition: {
        duration: param.duration,
        ease: ease.inOutCirc,
        delay: param.id * 0.8 * 0.001,
      },
      transitionEnd: {
        filter: "none",
      },
    }),
    exit: {
      opacity: 0,
      scale: 1,
      filter: "blur(0.4vw)",
    },
  },
};

export const ProjectsAnim = {
  wrapper: {
    initial: {
      clipPath: "inset(0 0 100% 0)",
    },
    animate: {
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },
    exit: {
      clipPath: "inset(0 0 100% 0)",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },
  },
  card: {
    initial: {
      opacity: 0,
      filter: "blur(0.2vw)",
    },
    animate: (i) => ({
      opacity: 1,
      filter: "blur(0vw)",
      transition: {
        duration: 1.2,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.1,
      },
    }),
    exit: {
      opacity: 0,
      filter: "blur(0.2vw)",
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  },
  tableTextAnim: {
    initial: {
      clipPath: "inset(0% -20% 100% -20%)",
      y: "100%",
    },
    animate: {
      clipPath: "inset(0% -20% -20% -20%)",
      y: "0%",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
        delay: 0.4,
      },
      transitionEnd: {
        clipPath: "none",
        y: "auto",
      },
    },
    exit: {
      clipPath: "inset(100% -20% 0% -20%)",
      y: "-100%",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
      transitionEnd: {
        clipPath: "none",
        y: "auto",
      },
    },
  },
  slideshow: {
    initial: (direction) => {
      return {
        clipPath: "inset(0% 0% 0% 100%)",
        x: "30%",
        zIndex: 2,
        transition: {
          ease: [0.08, 0.99, 0.37, 1],
          duration: 1.5,
        },
      };
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      x: "0%",
      zIndex: 1,
      transition: {
        ease: [0.08, 0.99, 0.37, 1],
        duration: 1.5,
      },
    },
    exit: (direction) => {
      return {
        clipPath: "inset(0% 0% 0% 0%)",
        x: "-30%",
        zIndex: 1,
        transition: {
          ease: [0.08, 0.99, 0.37, 1],
          duration: 1.5,
        },
      };
    },
  },
};
