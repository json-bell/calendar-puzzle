type ClassNames = string | null | undefined | false;

const cx = (...args: ClassNames[]) => {
  return args.filter((className) => className).join(" ");
};

export default cx;
