export const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

export const actionIconVariants = {
  open: {
    scale: 1,
    y: 0,
  },
  closed: {
    scale: 0,
    y: -7,
  },
};

export const settingsIcon = {
  open: { rotate: 180 },
  close: { rotate: 0 },
};

export const wrapperVariants = {
  open: {
    scaleY: 1,
  },
  closed: {
    scaleY: 0,
  },
};

export const favoriteButtonVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: { scale: [1, 1.5, 1], transition: { duration: 0.5 } },
};

export const modalHeartVariants = {
  initial: { opacity: 0, y: "-100%" },
  animate: { opacity: 1, y: "0%" },
  exit: { opacity: 0, y: "-100%" },
  transition: {
    duration: 0.3,
    ease: "easeIn",
    type: "spring",
    damping: 10,
    stiffness: 150,
  },
};
