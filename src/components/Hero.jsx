export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#fde68a_0%,transparent_30%),radial-gradient(circle_at_80%_0%,#fcd34d_0%,transparent_30%)] opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Ethically sourced, expertly roasted
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-prose">
              We partner with small farms around the world to bring you traceable, sustainably-grown coffees—roasted fresh and delivered to your door.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/shop" className="inline-flex items-center rounded-lg bg-amber-700 text-white px-5 py-3 font-medium shadow hover:bg-amber-800">Shop coffee</a>
              <a href="/learn" className="inline-flex items-center rounded-lg bg-white text-gray-900 px-5 py-3 font-medium shadow border border-gray-200 hover:bg-gray-50">Learn coffee</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src="/public/coffee-hero.jpg" alt="Coffee beans and brewing" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
