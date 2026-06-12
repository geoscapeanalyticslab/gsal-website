import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'


const links = [
  { to: '/',             label: 'Home'          },
  { to: '/research',     label: 'Research'      },
  { to: '/people',       label: 'People'        },
  { to: '/blogs',        label: 'Blogs'         },
  { to: '/visualization',label: 'Visualization' },
  { to: '/contact',      label: 'Contact'       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()
  const isHome                  = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  /* Style logic */
  const atop    = isHome && !scrolled
  const navBg   = atop ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
  const linkCol = atop ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-forest-900'
  const activeStyle = atop
    ? 'text-white border-b-2 border-white'
    : 'text-forest-900 border-b-2 border-forest-600'

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-[10.5rem] flex items-center gap-8">
        {/* Brand — stretches from left edge to nav links */}
        <NavLink to="/" className="flex items-center gap-3 flex-1 min-w-0 select-none">
          <img src="/gsal-website/GSAL_Logo_v6.png" alt="GSAL Logo" className="h-28 w-auto" />
          <div className="flex flex-col leading-none">
            <span className={`text-lg md:text-2xl font-black tracking-tight whitespace-nowrap ${atop ? 'text-white' : 'text-forest-900'}`}>
              GeoScape Analytics Lab
            </span>
            <span className={`text-[9px] font-bold tracking-[0.32em] uppercase mt-1 ${atop ? 'text-forest-300' : 'text-forest-600'}`}>
              
            </span>
          </div>
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7 shrink-0">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide pb-0.5 transition-colors ${linkCol} ${isActive ? activeStyle : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className={`md:hidden p-2 rounded-lg transition-colors ${atop ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end={to === '/'}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-forest-50 text-forest-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-forest-900'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
