"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import blogData from "../../../data/blog.json";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = ["Tous", "Road Trips", "Conseils"];

  const filteredArticles = blogData.filter(article => {
    if (activeCategory === "Tous") return true;
    return article.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "Blog" }]} />

      <div className="text-center sm:text-left mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white">
          Blog & Guides de Voyage au Maroc
        </h1>
        <p className="text-sm sm:text-base text-brand-blue/60 dark:text-white/60 mt-2">
          Retrouvez nos conseils de conduite, suggestions d'itinéraires et actus de la location.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2.5 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-2 px-5 text-xs font-bold rounded-xl border whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat
                ? "bg-brand-orange border-brand-orange text-white"
                : "bg-white dark:bg-dark-card border-light-border dark:border-dark-border text-brand-blue/80 dark:text-white/80 hover:bg-brand-blue/5 dark:hover:bg-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredArticles.map((article, idx) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                {article.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              {/* Meta */}
              <div className="flex items-center space-x-4 text-[10px] sm:text-xs text-brand-blue/50 dark:text-white/50 mb-3 font-semibold">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-brand-blue dark:text-white mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-brand-blue/70 dark:text-white/70 mb-6 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Author and Read Link */}
              <div className="mt-auto pt-4 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-brand-blue/80 dark:text-white/80">
                  <User className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{article.author}</span>
                </div>
                
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-extrabold text-brand-orange hover:text-brand-orange-light flex items-center space-x-1 transition-colors"
                >
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
