import { useMemo } from "react";

let nextUniqueNum = 0;

const useUniqueToastId = () => {
  const uniqueId = useMemo(() => `unique-toast-id-${nextUniqueNum}`, []);
  nextUniqueNum++;
  return uniqueId;
};

export default useUniqueToastId;
