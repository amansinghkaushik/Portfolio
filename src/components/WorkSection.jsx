function WorkSection() {
  const workCards = [
    {
      title: 'Portrait Concepts',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: '3D Brand Sphere',
      image:
        'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Product Visuals',
      image:
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Typography Posters',
      image:
        'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=900&q=80',
    },
  ]

  return (
    <section className="bg-[#ececec] px-6 py-16 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-5xl font-semibold lowercase tracking-tight text-[#1f1f1f]">work.</h2>
          <button
            type="button"
            className="rounded-sm bg-[#e1e1e1] px-5 py-2.5 text-sm font-medium text-[#1d1d1d] transition-colors hover:bg-[#d8d8d8]"
          >
            Show More
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {workCards.map((card) => (
            <article key={card.title} className="group relative aspect-square overflow-hidden bg-white">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <p className="pointer-events-none absolute bottom-8 left-8 text-5xl font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
                {card.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkSection
