import { NavLink } from 'react-router-dom'
import { Mail, MapPin, Globe } from 'lucide-react'


const cols = [
  {
    heading: 'Lab',
    links: [
      { to: '/',              label: 'Home'          },
      { to: '/research',      label: 'Research'      },
      { to: '/people',        label: 'People'        },
      { to: '/blogs',         label: 'Blogs'         },
    ],
  },
  {
    heading: 'Work',
    links: [
      { to: '/visualization', label: 'Visualization' },
      { to: '/contact',       label: 'Contact'       },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-200">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-forest-800">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src="/gsal-website/GSAL_Logo_v6.png" alt="GSAL Logo" className="h-18 w-auto" />
            <p className="mt-5 text-sm text-forest-300 leading-relaxed max-w-sm">
              Advancing research and training in GIS, remote sensing, GeoAI, and spatial
              data analytics. Independent research lab based in Lahore, Pakistan.
            </p>
            <div className="mt-6 space-y-2 text-sm text-forest-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-forest-400" />
                <span>31°29′38.8″N 74°17′55.3″E — Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-forest-400" />
                <a href="mailto:geoscapeanalyticslab@gmail.com" className="hover:text-white transition-colors">
                  geoscapeanalyticslab@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe size={14} className="shrink-0 text-forest-400" />
                <span>gsallab.github.io</span>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-forest-400 mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className="text-sm text-forest-300 hover:text-white transition-colors"
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forest-500">
          <span>© {new Date().getFullYear()} GeoScape Analytics Lab (GSAL). All rights reserved.</span>
          <span>GeoScape Analytics Lab — Lahore, Pakistan</span>
        </div>
      </div>
    </footer>
  )
}
