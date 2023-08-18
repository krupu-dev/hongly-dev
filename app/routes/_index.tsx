import { motion } from "framer-motion";
import {
  textVariants,
  containerVariants,
  imageLoadAnimationProps,
} from "~/data/animationConfig";

export default function Index() {
  return (
    <div className="mx-0 my-[2em] flex min-h-[400px] flex-[1] items-center justify-center max-w-md:flex-col">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md:flex-[0 flex-[1] px-[1em] py-0 max-w-md:pb-[2em] max-w-md:text-center"
      >
        <motion.h1
          variants={textVariants}
          className="mb-[0.5em] text-2xl font-bold leading-[1.3] md:text-4xl"
        >
          Hello, I'm Hongly.
        </motion.h1>
        <motion.p variants={textVariants} className="text-xlg md:text-xl">
        I'm an Android developer. Developing amazing and useful apps is my passion.
        </motion.p>
      </motion.div>

      <div className="mx-[1em] my-0 text-center">
        <motion.div {...imageLoadAnimationProps}>
          <picture className="block min-h-[250px]">
            <source
              srcSet="/assets/images/showlarge.webp"
              media="(min-width: 600px)"
            />
            <img
              className="mb-[1em] w-full max-w-[550px] max-w-lg:max-w-[400px]"
              alt="Illustration of person reading a book"
              src="/assets/images/showsmall.webp"
              width="500"
              height="500"
            />
          </picture>
        </motion.div>
      </div>   
    </div>
  );
}
