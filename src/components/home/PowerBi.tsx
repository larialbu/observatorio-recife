"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import styles from "@/app/styles/home/PowerBi.module.css";


export default function PowerBi() {
  const searchParams = useSearchParams();
  const isCagedView = searchParams.get("caged") === "true";
  const isRaisView = searchParams.get("rais") === "true";

  let reportUrl;

  if (isRaisView) {
    reportUrl = process.env.NEXT_PUBLIC_RAIS_URL_BI;
  } else if (isCagedView) {
    reportUrl = process.env.NEXT_PUBLIC_CAGED_URL_BI;
  }  else {
    reportUrl = process.env.NEXT_PUBLIC_OBS_URL_BI;
  }

  return (
    <section className="w-full flex flex-col items-center justify-center relative mt-10">
      
      <div className="absolute top-[-25%] left-0 w-full h-full flex items-center justify-center z-[100]">
        <iframe
          title="Relatório Power BI"
          className={styles.powerbiReport}
          src={reportUrl}
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>

      <div className="mt-[600px]"></div>

      {/* <div className="w-full flex flex-col items-center justify-center mt-[500px]"> */}
        {/* <div className="mt-40 z-50 mb-40">
          <Link href={"/explorar"}>
            <button className="lg:text-[18px] font-bold text-white drop-shadow-xl rounded-full bg-[#EC6625] py-4 px-20 hover:bg-[#ce5a21] hover:scale-105 hover:drop-shadow-2xl transition duration-200 sm:hover:scale-85">
              Explorar
            </button>
          </Link>
        </div> */}
      {/* </div> */}
    </section>
  );
}