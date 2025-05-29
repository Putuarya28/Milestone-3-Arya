import React from "react";

const ContactSection = () => (
  <section className="bg-zinc-800 py-12 px-4 mt-12 rounded-xl shadow-lg max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold text-white mb-4 text-center">Contact Us</h2>
    <p className="text-zinc-300 mb-6 text-center">
      Have questions or need support? Reach out to us!
    </p>
    <form className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-zinc-200 mb-1" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="name"
          name="name"
          required
        />
      </div>
      <div>
        <label className="block text-zinc-200 mb-1" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div>
        <label className="block text-zinc-200 mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="message"
          name="message"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        Send Message
      </button>
    </form>
  </section>
);

export default ContactSection;