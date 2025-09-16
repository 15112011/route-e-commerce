import React, { useEffect, useState } from "react";
import RecentProducts from "./components/RecentProducts/RecentProducts";
import PopluarCategories from "./components/PopluarCategories/PopluarCategories";
import StaticSliders from "./components/staticSliders/staticSliders";
import AnimatedWrapper from "../Shared/AnimatedWrapper";




export default function Home() {
  return(<>
      <AnimatedWrapper animation="fadeIn" duration={0.8}>
        <StaticSliders />
      </AnimatedWrapper>
      <AnimatedWrapper animation="fadeInUp" delay={0.2}>
        <PopluarCategories />
      </AnimatedWrapper>
      <AnimatedWrapper animation="fadeInUp" delay={0.4}>
        <RecentProducts />
      </AnimatedWrapper>
  </>
  ) 
}
