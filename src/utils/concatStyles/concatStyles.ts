type ClassNames = string | null | undefined | false;

const joinStyles = (...args: ClassNames[]) => {
  return args.filter((className) => className).join(" ");
};

export default joinStyles;
