import { useEffect } from "react";

export const useAsyncEffect = (effect = async () => {}, deps) => {
  useEffect(() => {
    const asyncActions = async () => {
      await effect();
    };

    asyncActions();
  }, [...deps]);
};
