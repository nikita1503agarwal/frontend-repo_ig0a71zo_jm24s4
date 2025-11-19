import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('urbanbean_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('urbanbean_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(p => p.title === product.title)
      if (existing) {
        return prev.map(p => p.title === product.title ? { ...p, quantity: p.quantity + qty } : p)
      }
      return [...prev, { title: product.title, price: product.price, quantity: qty, product }]
    })
  }

  const removeItem = (title) => setItems(prev => prev.filter(p => p.title !== title))
  const updateQty = (title, qty) => setItems(prev => prev.map(p => p.title === title ? { ...p, quantity: Math.max(1, qty) } : p))
  const clear = () => setItems([])

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const value = useMemo(() => ({ items, addItem, removeItem, updateQty, clear, subtotal }), [items, subtotal])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }
