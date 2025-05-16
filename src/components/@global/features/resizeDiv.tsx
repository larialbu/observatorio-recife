'use client'

import { MutableRefObject, useEffect } from "react";

export const resizeDiv = (containerRef: MutableRefObject<HTMLDivElement | null>, width: number | null, setWidth: (val: number | null) => void) => {
    useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        setWidth(newWidth);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
}
