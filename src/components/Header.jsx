import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-block w-8 h-8 rounded-full bg-amber-700" />
          <span className="font-bold tracking-tight text-gray-900">Urban Bean Coffee Roasters</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <NavLink to="/shop" className={({isActive})=> isActive? 'text-amber-700 font-semibold' : 'hover:text-gray-900'}>Shop</NavLink>
          <NavLink to="/learn" className={({isActive})=> isActive? 'text-amber-700 font-semibold' : 'hover:text-gray-900'}>Learn</NavLink>
          <a href="https://www.sca.coffee/" target="_blank" rel="noreferrer" className="hover:text-gray-900">SCA</a>
        </nav>
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-900">
          <span className="i-lucide-shopping-cart" aria-hidden />
          Cart
        </Link>
      </div>
    </header>
  )
}
