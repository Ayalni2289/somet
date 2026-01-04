"use client"

import React from 'react'

type Counter = {
  value: string
  label: string
  icon?: React.ReactNode
}

const defaultCounters: Counter[] = [
  { value: 'SOMET', label: '-', icon: <span><i className="fa fa-heart"></i></span> },
  { value: 'SOMET VAKFI', label: '-', icon: <span><i className="fa fa-users"></i></span> },
  { value: 'SOMET DERNEK', label: '-', icon: <span><i className="fa fa-user"></i></span> },
  { value: 'SOMET İŞLETME', label: '-', icon: <span><i className="fa fa-clipboard-list"></i></span> },
  { value: 'SOMET EĞİTİM MERKEZİ', label: '-', icon: <span><i className="fa fa-rocket"></i></span> },
]

const CounterContainer: React.FC<{ counters?: Counter[] }> = ({ counters = defaultCounters }) => {
  return (
    <section className="counter-container">
      <div className="container cc-inner">
        {counters.map((c, i) => (
          <div className="cc-item" key={i}>
            <div className="cc-text">
              <div className="cc-value">{c.value}</div>
            </div>
            <div className="cc-icon-wrap" aria-hidden>
              {c.icon}
            </div>
            {i < counters.length - 1 && <div className="cc-sep" aria-hidden />}
          </div>
        ))}
      </div>
    </section>
  )
}

export default CounterContainer
