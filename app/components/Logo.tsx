import { motion } from "framer-motion";
import { NavLink } from "@remix-run/react";
import { logoRotationVariant } from "~/data/animationConfig";

export const Logo = () => {
  return (
    <NavLink to="/" className="inline-block">
      {/* <motion.text
         tex
        // src="/assets/images/fa.webp"
        // className="block w-[60px]"
        // width="60"
        // height="45"
        // variants={logoRotationVariant}
        // animate="rotate"
        // layout="position"
      /> */}
      <strong className="font-comfortaa">Hongly DEV</strong>
    </NavLink>
  );
};

export default Logo;
