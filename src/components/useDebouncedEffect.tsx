import React, { useCallback, useEffect, useState } from "react";

const useDebouncedEffect = (fn: Function, delay: number = 1000, deps) => {
  const callback = useCallback(fn, deps);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
};

debounceFunction = (callback: Function, delay: number = 1000) => {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};
