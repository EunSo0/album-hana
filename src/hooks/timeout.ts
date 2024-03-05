/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";

export const useTimeout = (
  cb: () => void,
  delay: number,
  dependencies: unknown[] = []
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const cbRef = useRef(cb);
  cbRef.current = cb;
  const delayRef = useRef(delay);
  delayRef.current = delay;

  const setup = useCallback(() => {
    timerRef.current = setTimeout(cbRef.current, delayRef.current);
  }, []);

  const clear = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    clear();
    setup();
  }, [setup, clear]);

  useEffect(() => {
    setup();

    return clear;
  }, dependencies);

  return { reset, clear };
};
