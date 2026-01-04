"use client"

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import SearchModal from './SearchModal'
import Link from 'next/link'

const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const firstItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === ''

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const focusFirst = (key: string) => {
    // slight delay to ensure element is rendered
    setTimeout(() => {
      firstItemRefs.current[key]?.focus()
    }, 0)
  }

  const handleButtonKey = (key: string) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenMenu(openMenu === key ? null : key)
      if (openMenu !== key) focusFirst(key)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpenMenu(key)
      focusFirst(key)
    }
  }

  return (
    <>
  <header className={"site-header" + (isHome ? ' home' : '')}>
        <div className="container ">
            {/* Left: logo */}
            <div id='logo'>
              <Link href="/" className="inline-flex items-center">
                <img src="/images/logo.svg" alt="somet" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Center: nav wrapper */}
            <div id='headermenu' className='d-none d-md-flex align-items-center' ref={containerRef}>
              <ul className="">
                <li className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === 'hakkimizda' ? null : 'hakkimizda')}
                    onKeyDown={handleButtonKey('hakkimizda')}
                    aria-expanded={openMenu === 'hakkimizda'}
                    aria-haspopup="true"
                    aria-controls="menu-hakkimizda"
                    className="header-nav-link"
                    style={{textDecoration: "none", cursor: "pointer"}}
                  >
                    Hakkımızda ▾
                  </button>

                  {openMenu === 'hakkimizda' && (
                    <div id="menu-hakkimizda" role="menu" className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black/5">
                      <ul className="p-3 space-y-2">
                        <li>
                          <Link href="/hakkimizda/" legacyBehavior>
                            <a ref={(el) => { firstItemRefs.current['hakkimizda'] = el }} role="menuitem" className="block px-2 py-1" onClick={() => setOpenMenu(null)}>Tanım, Misyon, Vizyon</a>
                          </Link>
                        </li>
                        <li><Link href="/amac/" role="menuitem" className="block px-2 py-1">Amaç ve Hedefler</Link></li>
                        <li><Link href="/degerlerimiz/" role="menuitem" className="block px-2 py-1">Değerlerimiz</Link></li>
                        <li><Link href="/tarihce/" role="menuitem" className="block px-2 py-1">Tarihçe</Link></li>
                        <li><Link href="/oguzhan-metintas/" role="menuitem" className="block px-2 py-1">Oğuzhan Metintaş</Link></li>
                      </ul>
                    </div>
                  )}
                </li>

                <li className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === 'Organizasyon' ? null : 'Organizasyon')}
                    onKeyDown={handleButtonKey('Organizasyon')}
                    aria-expanded={openMenu === 'Organizasyon'}
                    aria-haspopup="true"
                    aria-controls="menu-faaliyetler"
                    className="header-nav-link"
                    style={{textDecoration: "none", cursor: "pointer"}}
                  >
                    Organizasyon ▾
                  </button>
                  {openMenu === 'Organizasyon' && (
                    <div id="menu-organizasyon" role="menu" className="absolute left-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black/5">
                      <ul className="p-3 space-y-2">
                        <li><Link ref={(el)=> { firstItemRefs.current['organizasyon'] = el }} href="/kurucularimiz" role="menuitem" className="block px-2 py-1">Kurucular</Link></li>
                        <li><Link href="/mutevelli-heyet" role="menuitem" className="block px-2 py-1">Yönetim</Link></li>
                        <li><Link href="/vakif-senedi" role="menuitem" className="block px-2 py-1">Vakıf Senedi</Link></li>
                        <li><Link href="/tuzuk" role="menuitem" className="block px-2 py-1">Dernek Tüzüğü</Link></li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === 'Aktiviteler' ? null : 'Aktiviteler')}
                    onKeyDown={handleButtonKey('Aktiviteler')}
                    aria-expanded={openMenu === 'Aktiviteler'}
                    aria-haspopup="true"
                    aria-controls="menu-faaliyetler"
                    className="header-nav-link"
                    style={{textDecoration: "none", cursor: "pointer"}}
                  >
                    Aktiviteler ▾
                  </button>
                  {openMenu === 'Aktiviteler' && (
                    <div id="menu-aktiviteler" role="menu" className="absolute left-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black/5">
                      <ul className="p-3 space-y-2">
                        <li><Link ref={(el)=> { firstItemRefs.current['aktiviteler'] = el }} href="/faaliyetlerimiz" role="menuitem" className="block px-2 py-1">Faaliyetler</Link></li>
                        <li><Link href="/aktiviteler/projelerimiz" role="menuitem" className="block px-2 py-1">Projeler</Link></li>
                        <li><Link href="/aktiviteler/kurumsal-etkinlikler" role="menuitem" className="block px-2 py-1">Kurumsal Etkinlikler</Link></li>
                      </ul>
                    </div>
                  )}
                </li>

                <li className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === 'egitim' ? null : 'egitim')}
                    onKeyDown={handleButtonKey('egitim')}
                    aria-expanded={openMenu === 'egitim'}
                    aria-haspopup="true"
                    aria-controls="menu-egitim"
                    className="header-nav-link"
                    style={{textDecoration: "none", cursor: "pointer"}}
                  >
                    Eğitim ▾
                  </button>
                  {openMenu === 'egitim' && (
                    <div id="menu-egitim" role="menu" className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black/5">
                      <ul className="p-3 space-y-2">
                        <li><Link ref={(el)=> { firstItemRefs.current['egitim'] = el }} href="/egitim-merkezi" role="menuitem" className="block px-2 py-1">Eğitim Merkezi</Link></li>
                        <li><Link href="/zette-modeli" role="menuitem" className="block px-2 py-1">ZETTE Modeli</Link></li>
                        <li><Link href="/zihinsel-engellilik" role="menuitem" className="block px-2 py-1">Zihinsel Yetersizlik</Link></li>
                        <li><Link href="/ailelere-ogutler" role="menuitem" className="block px-2 py-1">Ailelere Öğütler</Link></li>
                      </ul>
                    </div>
                  )}
                </li>

                <li className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === 'dayanisma' ? null : 'dayanisma')}
                    onKeyDown={handleButtonKey('dayanisma')}
                    aria-expanded={openMenu === 'dayanisma'}
                    aria-haspopup="true"
                    aria-controls="menu-dayanisma"
                    className="header-nav-link"
                    style={{textDecoration: "none", cursor: "pointer"}}
                  >
                    Dayanışma
                  </button>
                  {openMenu === 'dayanisma' && (
                    <div id="menu-dayanisma" role="menu" className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black/5">
                      <ul className="p-3 space-y-2">
                        <li><Link ref={(el)=> { firstItemRefs.current['dayanisma'] = el }} href="/burs-olanaklarimiz" role="menuitem" className="block px-2 py-1">Burs İmkanları</Link></li>
                        <li><Link href="/destek-programlarimiz" role="menuitem" className="block px-2 py-1">Destek Programlarımız</Link></li>
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <Link href="/iletisim" className="header-nav-link" style={{textDecoration: "none"}}>İletişim</Link>
                </li>
              </ul>
              <button type="button" className="header-nav-link ms-4" id="searchButton" onClick={() => setSearchOpen(true)} aria-label="Ara">
                <i className="fa fa-search"></i>
              </button>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-6">
              <div>
                <Link href="/bagis" className="donate-btn">
                  <span className="text-lg">❤</span>
                  <span className="hidden sm:inline">BAĞIŞ YAP</span>
                </Link>
              </div>
            </div>
        </div>
      </header>
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
         
      {/* Header styles moved to styles/globals.css to avoid duplication */}
    </>
  )
}

export default Header
