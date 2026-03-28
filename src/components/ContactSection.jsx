import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="ds-section bg-[#ececec] py-20">
      <div className="ds-container flex flex-col md:flex-row gap-12 items-start justify-between">
        {/* Left: Info */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-black">
            Get in <span className="inline-block w-8 md:w-12 align-middle border-t-4 border-black mx-2" /> touch with us
          </h2>
          <p className="text-lg text-[#444] mb-8">
            We’re here to help! Whether you have a question about our services, need assistance with your account, or want to provide feedback, our team is ready to assist you.
          </p>
          <div className="mb-4">
            <div className="text-base text-[#222] mb-1">Email:</div>
            <div className="text-xl font-semibold text-black">hello@finpro.com</div>
          </div>
          <div className="mb-4">
            <div className="text-base text-[#222] mb-1">Phone:</div>
            <div className="text-xl font-semibold text-black">+1 234 567 78</div>
          </div>
          <div className="text-sm text-[#666] mb-8">Available Monday to Friday, 9 AM - 6 PM GMT</div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold text-base hover:bg-zinc-800 transition-colors shadow-md">
            Live Chat <span className="ml-1">→</span>
          </button>
        </div>
        {/* Right: Form */}
        <form className="flex-1 max-w-xl w-full bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1 text-[#222]">First Name</label>
              <input type="text" placeholder="Enter your first name..." className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-[#fafafa] text-base outline-none focus:ring-2 focus:ring-black/20 transition" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1 text-[#222]">Last Name</label>
              <input type="text" placeholder="Enter your last name..." className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-[#fafafa] text-base outline-none focus:ring-2 focus:ring-black/20 transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#222]">Email</label>
            <input type="email" placeholder="Enter your email address..." className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-[#fafafa] text-base outline-none focus:ring-2 focus:ring-black/20 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#222]">How can we help you?</label>
            <textarea placeholder="Enter your message..." rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-[#fafafa] text-base outline-none focus:ring-2 focus:ring-black/20 transition resize-none" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold text-base hover:bg-zinc-800 transition-colors shadow-md">
              Send Message <span className="ml-1">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
