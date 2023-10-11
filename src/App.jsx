import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function App() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    ref: ref,
    offset: ["50% end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div>
      <div className="h-screen"></div>
      <div
        ref={ref}
        className="pb-[50%] h-0 overflow-hidden relative max-w-4xl mx-auto"
      >
        <motion.div
          style={{ y }}
          className=" absolute inset-0 flex items-center justify-center"
        >
          <img
            className="min-h-screen object-none w-full object-center "
            src="https://images.unsplash.com/photo-1696527318972-c8ca536c8778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80"
            width={1000}
            height={0}
            alt=""
          />
        </motion.div>
      </div>
      <div className="h-screen"></div>
    </div>
  );
}
