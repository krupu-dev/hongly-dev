import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { BlogList } from "~/data/blogList.server";
import { blogList } from "~/data/blogList.server";
import { motion } from "framer-motion";
import { textVariants, containerVariants } from "~/data/animationConfig";

export const loader: LoaderFunction = async () => {
  return json(blogList);
};

export default function apps() {
  const posts = useLoaderData<BlogList[]>();

  return ( 
  
    <div  className="h-full w-full text-center">
      <p className="font-comfortaa mt-8 text-sm">The list of apps will be available soon when those apps are published on the Play Store.</p>
    
    </div>
  );
}
