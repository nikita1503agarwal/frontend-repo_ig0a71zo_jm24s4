import { useCart } from './CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={product.image || 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-amber-700 font-semibold">${product.price.toFixed(2)}</span>
          <button onClick={() => addItem(product, 1)} className="inline-flex items-center rounded-md bg-amber-700 text-white px-3 py-1.5 text-sm hover:bg-amber-800">Add to cart</button>
        </div>
      </div>
    </div>
  )
}
