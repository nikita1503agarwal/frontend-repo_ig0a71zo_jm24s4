export default function ArticleCard({ article }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img src={article.image || 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop'} alt={article.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{article.title}</h3>
        {article.excerpt && <p className="text-sm text-gray-600 mt-1">{article.excerpt}</p>}
        <div className="mt-3 text-xs text-gray-500 capitalize">{article.category || 'Education'}</div>
      </div>
    </article>
  )
}
