import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, ChevronLeft } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import blogData from "../../../../data/blog.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Link
        href="/blog"
        className="flex items-center space-x-1 text-xs font-bold text-brand-orange hover:text-brand-orange-light mb-6 transition-colors w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Retour au blog</span>
      </Link>

      <article className="space-y-6">
        {/* Category & Title */}
        <div>
          <span className="bg-brand-orange/15 text-brand-orange text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue dark:text-white mt-3 leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-brand-blue/50 dark:text-white/50 border-y border-light-border dark:border-dark-border py-3 font-semibold">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4 text-brand-orange" />
            <span>Par {post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-brand-orange" />
            <span>Publié le {post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-brand-orange" />
            <span>Lecture : {post.readTime}</span>
          </div>
        </div>

        {/* Feature Image */}
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="max-w-none text-brand-blue/90 dark:text-white/90 text-sm sm:text-base leading-relaxed space-y-6 pt-4">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("###")) {
              return (
                <h3 key={idx} className="text-lg sm:text-xl font-extrabold text-brand-blue dark:text-white pt-3 border-b border-light-border dark:border-white/5 pb-1">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("10. ")) {
              return (
                <p key={idx} className="pl-4 border-l-2 border-brand-orange py-1 text-sm bg-brand-blue/5 dark:bg-white/5 rounded-r-lg">
                  {paragraph}
                </p>
              );
            }
            return <p key={idx} className="whitespace-pre-line">{paragraph}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
