"use client";

import { Footer } from "@/components/home/Footer";
import { NavBarHome } from "@/components/home/NavBarHome";
import { ObsHeader } from "@/components/home/ObsHeader";
import "../styles/home/style.scss";
import "../styles/explore/style.scss";
import HelpCenter from "@/components/ajuda/HelpCenter";
import GettingStarted from "@/components/ajuda/GettingStarted";
import SubmitRequest from "@/components/ajuda/SubmitRequest";
import { HelpHeader } from "@/components/ajuda/HelpHeader";



export default function HelpPage() {
  return (
    <>
      <ObsHeader />
      <NavBarHome simple />

      <HelpHeader />
      
      <main className="relative w-full min-h-screen flex flex-col items-center justify-start bg-white dark:bg-[#0C1B2B]">
          <div className="lg:absolute">
            <HelpCenter />
          </div>
          <div className="w-full flex justify-center items-center lg:mt-72">
            <GettingStarted />
          </div>
          <SubmitRequest />
      </main>

      <Footer />
    </>
  );
}
