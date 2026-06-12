import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FeatureBoxes from '../components/FeatureBoxes'
import ScrollReveal from '../components/ScrollReveal'
import { researchAreas, focusAreas } from '../data/research'
import { team } from '../data/team'
import TeamCard from '../components/TeamCard'

const GlobeHero = lazy(() => import('../components/GlobeHero'))

/* ─── Word-by-word animated heading ─── */
function HeroHeading() {
  const line1 = ['MAPPING', 'THE', 'EARTH,']
  const line2 = ['UNDERSTANDING', 'THE', 'FUTURE']
  let idx = 0
  return (
    <h1 className="font-black text-white leading-none tracking-tight mt-4">
      <span className="block text-5xl md:text-7xl xl:text-[5.5rem] word-reveal">
        {line1.map(w => {
          const d = (idx++ * 0.09).toFixed(2)
          return <span key={w} className="word mr-3 md:mr-4" style={{ animationDelay: `${d}s` }}>{w}</span>
        })}
      </span>
      <span className="block text-5xl md:text-7xl xl:text-[5.5rem] word-reveal mt-1">
        {line2.map(w => {
          const d = (idx++ * 0.09).toFixed(2)
          return <span key={w} className="word mr-3 md:mr-4" style={{ animationDelay: `${d}s` }}>{w}</span>
        })}
      </span>
    </h1>
  )
}

/* ─── Animated counter ─── */
function useCounter(target, active) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let c = 0
    const step = Math.max(1, Math.ceil(target / 60))
    const t = setInterval(() => {
      c += step
      if (c >= target) { setVal(target); clearInterval(t) }
      else setVal(c)
    }, 16)
    return () => clearInterval(t)
  }, [target, active])
  return val
}

const STATS = [
  { value: 8,  suffix: '+', label: 'Research Areas'  },
  { value: 5,  suffix: '',  label: 'Team Members'    },
  
]

/* Each stat needs its own component so useCounter is called at the top level */
function StatItem({ value, suffix, label, active }) {
  const num = useCounter(value, active)
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-black text-white tabular-nums">
        {num}{suffix}
      </div>
      <div className="text-xs text-forest-400 font-semibold mt-2 uppercase tracking-widest">
        {label}
      </div>
    </div>
  )
}

function StatsSection() {
  const ref        = useRef(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-forest-950 py-16">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(s => (
          <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} active={on} />
        ))}
      </div>
    </section>
  )
}


export default function Home() {
  const director = team.find(m => m.isDirector)
  const members  = team.filter(m => !m.isDirector).slice(0, 3)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[640px] overflow-hidden bg-forest-950">
        <Suspense fallback={<div className="absolute inset-0 bg-forest-950" />}>
          <GlobeHero />
        </Suspense>

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl">
          <span
            className="text-forest-400 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ opacity: 0, animation: 'fadeUp 0.5s ease 0.1s forwards' }}
          >
          </span>

          <HeroHeading />

          <p
            className="mt-7 text-forest-200 text-lg max-w-lg leading-relaxed"
            style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.7s forwards' }}
          >
            Advancing research in GIS, remote sensing, GeoAI and spatial data analytics
            for environment, urban planning, agriculture and climate resilience.
          </p>

          <div
            className="flex flex-wrap gap-4 mt-10"
            style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.9s forwards' }}
          >
            <Link to="/research"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest-400 hover:bg-forest-300 text-forest-950 font-bold rounded-full transition-all text-sm uppercase tracking-wide shadow-lg shadow-forest-900/40">
              Explore Research <ArrowRight size={15} />
            </Link>
            <Link to="/people"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 hover:border-white/50 text-white font-semibold rounded-full transition-all text-sm uppercase tracking-wide backdrop-blur-sm">
              Meet the Team
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[9px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/20 relative overflow-hidden scroll-line" />
        </div>
      </section>

      {/* ── FEATURE BOXES ── */}
      <FeatureBoxes />

      {/* ── ABOUT ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Our Mission</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
            Solving Real-World<br />Geospatial Challenges
          </h2>
          <p className="text-gray-500 mt-5 leading-relaxed">
            GSAL advances research in GIS, remote sensing, GeoAI, and spatial data analytics for
            environment, urban planning, agriculture, climate, and disaster risk. We support students
            and researchers in solving geospatial problems using satellite data, mapping tools, and
            machine learning.
          </p>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Increasingly, we integrate machine learning and cloud-based geospatial analytics —
            enabling applications in forestry, climate resilience, sustainable resource management,
            and data-driven urban planning.
          </p>
          <Link to="/research"
            className="inline-flex items-center gap-2 mt-8 text-forest-700 font-bold text-sm hover:text-forest-500 transition-colors group">
            View all research areas
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-2 gap-3">
            {focusAreas.slice(0, 4).map((area, i) => (
              <div key={i}
                className="bg-gray-50 hover:bg-forest-50 border border-gray-100 hover:border-forest-200 rounded-xl p-4 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-forest-500 mb-3" />
                <p className="text-sm text-gray-700 font-medium leading-snug">{area}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── STATS ── */}
      <StatsSection />

      {/* ── RESEARCH HIGHLIGHTS ── */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600">What We Study</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">Research Areas</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {researchAreas.map((area, i) => (
              <ScrollReveal key={area.id} delay={i * 0.06}>
                <Link to="/research"
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 block h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-gray-100 group-hover:text-gray-200 transition-colors tabular-nums">
                      {area.num}
                    </span>
                    <div className="w-2 h-2 rounded-full" style={{ background: area.accent }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-forest-800 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed line-clamp-3">{area.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/research"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-forest-700 text-forest-700 font-bold rounded-full hover:bg-forest-700 hover:text-white transition-all text-sm uppercase tracking-wide">
              All Research Areas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* spacer */}

      {/* ── TEAM PREVIEW ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <ScrollReveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">The Researchers</h2>
          </div>
          <Link to="/people"
            className="inline-flex items-center gap-2 text-forest-700 font-bold text-sm hover:text-forest-500 transition-colors group shrink-0">
            View all team members
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {director && <TeamCard member={director} featured />}
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-5 mt-6">
          {members.map((m, i) => (
            <ScrollReveal key={m.id} delay={0.1 + i * 0.08}>
              <TeamCard member={m} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-forest-950 py-20 text-center">
        <ScrollReveal>
          <span className="text-xs text-forest-400 font-bold uppercase tracking-widest">Collaborate</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Join the Research
          </h2>
          <p className="text-forest-300 mt-4 max-w-lg mx-auto text-base leading-relaxed">
            We welcome motivated students and researchers. Open positions for MS and PhD candidates
            in GIS, remote sensing, and GeoAI.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link to="/contact"
              className="px-8 py-3.5 bg-forest-400 hover:bg-forest-300 text-forest-950 font-bold rounded-full transition-all text-sm uppercase tracking-wide">
              Get in Touch
            </Link>
            <Link to="/research"
              className="px-8 py-3.5 border border-forest-700 hover:border-forest-500 text-forest-300 font-semibold rounded-full transition-all text-sm uppercase tracking-wide">
              Our Research
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
