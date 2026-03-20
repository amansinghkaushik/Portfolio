function AboutSection() {
  return (
    <section className="bg-[#ececec] px-6 pb-20 pt-16 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-5xl font-semibold lowercase tracking-tight text-[#1f1f1f]">about.</p>
          <button
            type="button"
            className="rounded-sm bg-[#e1e1e1] px-5 py-2.5 text-sm font-medium text-[#1d1d1d] transition-colors hover:bg-[#d8d8d8]"
          >
            Show More
          </button>
        </div>

        <p className="mb-12 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#141414]">
          I collaborate with businesses of all sizes worldwide, using the latest technologies. My
          designs have also earned multiple awards.
        </p>

        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"
            alt="Creative professional"
            className="h-[320px] w-full object-cover"
          />
          <p className="max-w-sm text-lg font-medium leading-relaxed text-[#222222]">
            I'm dedicated to crafting beautiful and highly functional designs that seamlessly align
            with my clients' unique needs and long-term goals.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
