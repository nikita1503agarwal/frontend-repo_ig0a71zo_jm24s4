import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import ArticleCard from './components/ArticleCard'
import { CartProvider, useCart } from './components/CartContext'
import './index.css'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Home() {
  const [products, setProducts] = useState([])
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/api/products`).then(r => r.json()).then(setProducts).catch(()=>setProducts([]))
    fetch(`${API_BASE}/api/articles`).then(r => r.json()).then(setArticles).catch(()=>setArticles([]))
  }, [])

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured coffees</h2>
          <a href="/shop" className="text-amber-700 hover:underline">Browse all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0,4).map(p => <ProductCard key={p.title} product={p} />)}
        </div>
      </section>

      <section className="bg-amber-50/60 border-t border-b border-amber-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Learn coffee</h2>
            <a href="/learn" className="text-amber-700 hover:underline">View more</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0,3).map(a => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>
    </>
  )
}

function Shop() {
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/products`).then(r=>r.json()).then(setProducts).catch(()=>setProducts([])) },[])
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Shop Coffee</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.title} product={p} />)}
      </div>
    </section>
  )
}

function Learn() {
  const [articles, setArticles] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/articles`).then(r=>r.json()).then(setArticles).catch(()=>setArticles([])) },[])
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Brew Guides & Education</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
      </div>
    </section>
  )
}

function CartPage() {
  const { items, subtotal, removeItem, updateQty, clear } = useCart()
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map(i => (
              <div key={i.title} className="flex items-center gap-4 border rounded-lg p-4 bg-white">
                <div className="w-16 h-16 bg-gray-100 rounded" />
                <div className="flex-1">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-sm text-gray-600">${i.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 border rounded" onClick={()=>updateQty(i.title, i.quantity - 1)}>-</button>
                  <span className="w-8 text-center">{i.quantity}</span>
                  <button className="px-2 py-1 border rounded" onClick={()=>updateQty(i.title, i.quantity + 1)}>+</button>
                </div>
                <button className="text-red-600 text-sm" onClick={()=>removeItem(i.title)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <a href="/checkout" className="mt-4 inline-flex w-full justify-center rounded-md bg-amber-700 text-white py-2 font-medium hover:bg-amber-800">Checkout</a>
              <button onClick={clear} className="mt-2 w-full text-sm text-gray-600 hover:text-gray-900">Clear cart</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Checkout() {
  const { items, subtotal, clear } = useCart()
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [address,setAddress]=useState('')
  const [city,setCity]=useState('')
  const [state,setState]=useState('')
  const [postal,setPostal]=useState('')
  const [country,setCountry]=useState('')
  const [status,setStatus]=useState(null)

  const placeOrder = async () => {
    const order = {
      items: items.map(i => ({ product_id: i.product._id || '', title: i.title, quantity: i.quantity, price: i.price })),
      subtotal,
      email,
      shipping_name: name,
      shipping_address: address,
      city, state, postal_code: postal, country,
      status: 'pending'
    }
    try {
      const res = await fetch(`${API_BASE}/api/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(order) })
      if(!res.ok) throw new Error('Order failed')
      const id = await res.json()
      setStatus({ ok:true, id })
      clear()
    } catch(e){ setStatus({ ok:false, error: e.message }) }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {items.length === 0 ? <p className="text-gray-600">Your cart is empty.</p> : (
        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="border rounded px-3 py-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} />
            <input className="border rounded px-3 py-2" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
            <input className="border rounded px-3 py-2" placeholder="State" value={state} onChange={e=>setState(e.target.value)} />
            <input className="border rounded px-3 py-2" placeholder="Postal code" value={postal} onChange={e=>setPostal(e.target.value)} />
            <input className="border rounded px-3 py-2" placeholder="Country" value={country} onChange={e=>setCountry(e.target.value)} />
          </div>
          <div className="flex items-center justify-between font-medium">
            <span>Order total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button onClick={placeOrder} className="inline-flex justify-center rounded-md bg-amber-700 text-white px-5 py-3 font-medium hover:bg-amber-800">Place order</button>
          {status && (
            status.ok ? <p className="text-green-700">Order placed! ID: {status.id}</p> : <p className="text-red-700">{status.error}</p>
          )}
        </div>
      )}
    </section>
  )
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50/40 text-gray-900">
      <Header />
      <main>{children}</main>
      <footer className="mt-20 border-t bg-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600 flex flex-col sm:flex-row gap-4 justify-between">
          <p>© {new Date().getFullYear()} Urban Bean Coffee Roasters</p>
          <p>Ethically sourced • Small-batch roasted • Brew better coffee</p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  )
}
