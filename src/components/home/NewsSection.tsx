"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { NewsData, NewsItem } from "@/@api/http/news/NewsData"; 

function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    const newsDataService = new NewsData();
    try {
      const data = await newsDataService.fetchNews();
      const sortedNews = data.sort((a, b) => b.id - a.id);
      setNews(sortedNews);
    } catch (err) {
      setError("Erro ao buscar notícias");
      console.error("Erro ao buscar notícias", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? news.length - slidesToShow : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 > news.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-[#27384b] dark:to-[#0C1B2B] text-center py-8">
      <p className="text-2xl font-semibold text-gray-800 dark:text-white">Carregando notícias...</p>
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-[#27384b] dark:to-[#0C1B2B] py-12 px-6">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Últimas Notícias
        </h2>

        <div className="relative flex items-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 ml-[-23px] z-10 p-4 text-white bg-[#0155AE] dark:bg-[#EC6625] rounded-full shadow-md hover:bg-[#144880] dark:hover:bg-[#c45016] transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(100 / slidesToShow) * currentIndex}%)`,
              }}
            >
              {news.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="flex-shrink-0 w-[calc(100%/3)] px-4"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div
                    onClick={() => window.open(newsItem.link, "_blank")}
                    className="flex flex-col h-full bg-white hover:bg-gray-200 dark:bg-[#142b42] dark:hover:bg-[#21466b] rounded-lg overflow-hidden"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {newsItem.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-[3em] line-clamp-3">
                        {newsItem.description}
                      </p>
                      <div className="absolute bottom-[3em] text-gray-500 dark:text-gray-400 text-xs mb-4 w-[max-content]">
                        {newsItem.date}
                      </div>
                      <Link
                        href={newsItem.link}
                        className="text-[#0155AE] dark:text-[#EC6625] font-semibold hover:underline mt-auto flex items-center gap-[4px]"
                        target="_blank"
                      >
                        Ler mais
                        <svg
                          className="fill-[#0155AE] dark:fill-[#EC6625]"
                          height="13px"
                          width="13px"
                          viewBox="0 0 330 330"
                        >
                          <path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l150-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 mr-[-23px] z-10 p-4 text-white bg-[#0155AE] dark:bg-[#EC6625] rounded-full shadow-md hover:bg-[#144880] dark:hover:bg-[#c45016] transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
