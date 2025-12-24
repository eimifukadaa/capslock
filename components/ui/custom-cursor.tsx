"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverText, setHoverText] = useState("");
    const [isTouch, setIsTouch] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.getAttribute("role") === "button"
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }

            const dataHover = target.getAttribute("data-hover");
            if (dataHover) {
                setHoverText(dataHover);
                setIsHovered(true);
            } else {
                setHoverText("");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (isTouch) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gold pointer-events-none z-[9999] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                scale: isHovered ? (hoverText ? 4 : 2) : 1,
                backgroundColor: hoverText ? "#D4AF37" : "#D4AF37",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {hoverText && (
                <span className="text-[4px] font-bold text-black tracking-widest uppercase">
                    {hoverText}
                </span>
            )}
        </motion.div>
    );
}
