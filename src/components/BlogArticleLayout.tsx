import Link from "next/link";
import { HeaderNav } from "@/components/HeaderNav";
import { BlackFooterBar } from "@/components/BlackFooterBar";

type BlogArticleLayoutProps = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: readonly string[];
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function BlogArticleLayout({
  title,
  description,
  date,
  author,
  tags,
  children,
  footer,
}: BlogArticleLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeaderNav />
      <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-[120px] sm:px-8 sm:pt-[140px]">
        <nav
          className="mb-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-foreground/90">
            Home
          </Link>
          <span className="px-2 text-foreground/30">/</span>
          <Link href="/blog" className="transition-colors hover:text-foreground/90">
            Insights
          </Link>
        </nav>

        <header className="mb-12 border-b border-foreground/10 pb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {new Date(date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="px-2 text-foreground/30">·</span>
            {author}
          </p>
          <h1 className="mt-5 font-heading text-[clamp(28px,4.4vw,44px)] font-light leading-[1.12] tracking-[-0.02em] text-foreground">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          {tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-foreground/15 bg-white/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/70 backdrop-blur"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="space-y-6 text-[15px] leading-[1.75] text-foreground/85 sm:text-base">
          {children}
        </div>

        {footer ? (
          <footer className="mt-16 border-t border-foreground/10 pt-8 text-sm leading-relaxed text-muted-foreground">
            {footer}
          </footer>
        ) : null}
      </article>
      <BlackFooterBar />
    </main>
  );
}

export function ArticleH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-heading text-[clamp(20px,2.6vw,26px)] font-light leading-tight tracking-[-0.01em] text-foreground">
      {children}
    </h2>
  );
}

export function ArticleP({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function ArticleUL({ children }: { children: React.ReactNode }) {
  return <ul className="ml-5 list-disc space-y-2 marker:text-foreground/40">{children}</ul>;
}
