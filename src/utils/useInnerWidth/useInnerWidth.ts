import { useEffect, useState } from "react";

const useInnerWidth = (): number => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window?.innerWidth || 0);
    };

    window.addEventListener("resize", handleResize);

    return window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useInnerWidth;
