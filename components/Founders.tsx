"use client"

import React from 'react'

const Founders: React.FC = () => {
  return (
    <section className="founders-section py-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 containers">
        <div className="founder-media w-48 md:w-72 flex-shrink-0 mx-auto md:mx-0">
          <img
            src="/images/somet-oguzhan.jpg"
            alt="Oğuzhan"
            className="w-full object-cover rounded-tl-[48px] rounded-br-[48px] shadow-sm"
          />
        </div>
        <div className="founder-content max-w-2xl text-center md:text-left">
          <h3 className="text-3xl md:text-4xl font-semibold text-purple-700 mb-4 ogi">Oğuzhan'la doğan bir yolculuk</h3>
          <p className="text-gray-600 mb-4">
            Bu hikayenin kahramanı, 1989 yılının Ekim ayında dünyaya gelen sevgili Oğuzhan Metintaş.
          </p>
          <br />
          <p className="text-gray-600 mb-6">
            Özel çocuk Oğuzhan ile başlayan bu kadim yolculuk, sevginin, sabrın ve mücadelenin hikayesi...
          </p>
          <a
            className="inline-block px-6 py-2 border border-purple-700 text-purple-700 rounded-full hover:bg-purple-50 transition-colors duration-200"
            href="/kurucularimiz"
          >
            Kurucularımız
          </a>
        </div>
      </div>
    </section>
  )
}

export default Founders
