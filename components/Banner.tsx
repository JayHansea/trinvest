"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { bannerContent } from "@/utils/bannerContent";
import { motion } from "framer-motion";

const Banner = () => {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentItem((prevItem) =>
        prevItem === bannerContent.length - 1 ? 0 : prevItem + 1
      );
    }, 5000); // Change interval time as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-[550px] mx-auto flex flex-col place-content-center container">
      {bannerContent.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: index === 0 ? 1 : 0 }}
          animate={{ opacity: currentItem === index ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-9/12 lg:w-6/12 text-center md:text-left px-4"
          style={{ display: currentItem === index ? "block" : "none" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl w-auto font-bold text-amber-300"
          >
            {item.title}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="leading-relaxed my-5 font-light text-base tracking-wide"
          >
            {item.desc}
          </motion.div>
        </motion.div>
      ))}
      <div className="w-full md:w-6/12 mx-0 md:mx-4 flex justify-center md:justify-start">
        <Link href={"/signup"}>
          <button className="w-auto h-auto px-7 py-2.5 bg-amber-300 text-black text-sm rounded-md hover:bg-white ">
            Create an account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
