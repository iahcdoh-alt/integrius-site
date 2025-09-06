export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8">
      <article className="prose prose-invert max-w-none">
        {children}
      </article>
    </div>
  )
}
