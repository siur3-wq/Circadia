import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingTextEffect({ value, icon = "", colorClass = "text-green-400" }) {
  const [elements, setElements] = useState([]);
  const isFirstRender = useRef(true);
  const prevValue = useRef(value);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevValue.current = value;
      return;
    }

    if (value > prevValue.current) {
      const diff = value - prevValue.current;
      const id = Date.now() + Math.random();
      setElements((prev) => [...prev, { id, text: `+${diff} ${icon}` }]);
    }
    
    prevValue.current = value;
  }, [value, icon]);

  const removeElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center z-30">
      <AnimatePresence>
        {elements.map((el) => (
          <motion.div
            key={el.id}
            initial={{ opacity: 0, y: 5, scale: 0.7 }}
            animate={{ opacity: 1, y: -40, scale: 1.25 }}
            exit={{ opacity: 0, y: -65, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onAnimationComplete={() => removeElement(el.id)}
            className={`absolute font-black text-xl tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] whitespace-nowrap ${colorClass}`}
          >
            {el.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}