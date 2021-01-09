import React, { useState, useEffect, useRef } from "react";

export const useHover = () => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const handleMouseEnter = () => {
    setActive(true);
  };
  const handleMouseLeave = () => {
    setActive(false);
  };
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [ref.current]);

  return [ref, active];
};
