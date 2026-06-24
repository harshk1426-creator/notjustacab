import { useState, useEffect, useRef } from 'react'
import {
  Wind, PhoneOff, Volume2, Car,
  AlertTriangle, Train, Briefcase,
  Calendar, HelpCircle, Smartphone,
  Play, MapPin, MessageCircle, Bell,
  ArrowDown, ChevronRight, Menu, X,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Strategy', href: '#strategy' },
  { label: 'Scripts',  href: '#scripts'  },
  { label: 'Channels', href: '#channels' },
  { label: 'Metrics',  href: '#metrics'  },
  { label: 'Close',    href: '#close'    },
]

const INSIGHT_CARDS = [
  {
    label: 'The Insight',
    body: 'Every DriveU user has been asked - why not just take an Ola? #NotJustACab is the answer. It rejects the cab category entirely and positions DriveReserve as something your own car would be - if it could drive itself.',
  },
  {
    label: 'The Audience',
    personas: [
      'The Urban Professional - daily commute, no parking',
      'The Frequent Traveler - airport runs, reliability',
      'The Indian Family - multi-destination, everyone needs a car',
    ],
  },
  {
    label: 'The Tension',
    body: 'Cabs are familiar but broken - smell, cancellations, noise, strangers. Your own car is comfortable but exhausting to drive. DriveReserve lives in the gap: all the comfort, none of the cost or effort of ownership.',
  },
]

const RESOLUTION_SCENE = {
  icon: Car,
  label: 'The Resolution',
  title: 'THE RESOLUTION',
  isResolution: true,
}

const SERIES = [
  {
    number: '01',
    audience: 'The Urban Professional Woman',
    tagline: 'She didn\'t ask for much. Just a clean, quiet ride.',
    image: '/script_1.png',
    scenes: [
      {
        icon: Wind,
        label: 'Scene 01',
        title: 'The Smell',
        body: 'She settles into a cab. Something\'s off. Sweat. Moisture. She shifts uncomfortably.',
      },
      {
        icon: PhoneOff,
        label: 'Scene 02',
        title: 'The Cancellations',
        body: 'She books again. Cancelled. Books again. Cancelled. She\'s going to be late.',
      },
      {
        icon: Volume2,
        label: 'Scene 03',
        title: 'The Noise',
        body: 'She\'s finally in a cab, laptop open. The driver is on a loud call. She can\'t focus.',
      },
      {
        ...RESOLUTION_SCENE,
        body: 'Book DriveReserve. Clean. Quiet. Safe. Comfort like your own car.',
        hashtag: '#NotJustACab',
      },
    ],
  },
  {
    number: '02',
    audience: 'The Frustrated Car Owner',
    tagline: 'The day started wrong before it even started.',
    image: '/script_2.png',
    scenes: [
      {
        icon: AlertTriangle,
        label: 'Scene 01',
        title: 'The Flat Tire',
        body: 'Monday morning. He walks to his car. Flat tire. His heart sinks.',
      },
      {
        icon: Train,
        label: 'Scene 02',
        title: 'The Commute from Hell',
        body: 'Metro. Change lanes. Auto. Change autos. 45 minutes of standing, sweating, squeezing.',
      },
      {
        icon: Briefcase,
        label: 'Scene 03',
        title: 'Arrives Defeated',
        body: 'He reaches office exhausted. His day hasn\'t even started.',
      },
      {
        ...RESOLUTION_SCENE,
        body: 'Reserve DriveReserve. A clean, luxurious car and your chauffeur - at your doorstep. Comfort like your own car.',
        hashtag: '#NotJustACab',
      },
    ],
  },
  {
    number: '03',
    audience: 'The Indian Family',
    tagline: 'One Sunday. Four destinations. One solution.',
    image: '/script-3.png',
    scenes: [
      {
        icon: Calendar,
        label: 'Scene 01',
        title: 'The Sunday Plan',
        body: 'Grandparents need to visit a friend. Parents are leaving for Vaishno Devi. Kids want the movies. All on Sunday.',
      },
      {
        icon: HelpCircle,
        label: 'Scene 02',
        title: 'The Chaos',
        body: 'One car. Four plans. Who goes first? Who waits? Someone always misses out.',
      },
      {
        icon: Smartphone,
        label: 'Scene 03',
        title: 'The DriveReserve Rescue',
        body: 'She opens the DriveU app. Books 3 DriveReserve cars. Everyone leaves at their own time.',
      },
      {
        ...RESOLUTION_SCENE,
        body: 'Because everyone deserves the comfort of their own car. DriveReserve - book cars for everyone.',
        hashtag: '#NotJustACab',
      },
    ],
  },
]

const CHANNELS = [
  {
    Icon: Play,
    name: 'Instagram Reels + YouTube Shorts',
    desc: 'Primary content vehicle. Each series adapted as a 15–30 sec reel. Hook in 2 seconds. Resolution with #NotJustACab.',
  },
  {
    Icon: MapPin,
    name: 'OOH + Metro Advertising',
    desc: 'Static executions of each scene\'s tension moment - placed at metro stations, parking lots, and office complex entrances in Bengaluru, Mumbai, Hyderabad.',
  },
  {
    Icon: MessageCircle,
    name: 'WhatsApp + Push Notifications',
    desc: 'Personalised drip to existing DriveU users. Message 1: the pain point. Message 2: the resolution. Message 3: Reserve Now CTA.',
  },
  {
    Icon: Bell,
    name: 'In-App Campaign Banners',
    desc: 'Contextual banners triggered by user behavior - shown to users who have booked 3+ rides. Banner copy: "You\'ve used DriveU. Now try DriveReserve."',
  },
]

const PHASES = [
  { weeks: 'Week 1–2',  label: 'Teaser',            desc: '#NotJustACab - no product reveal'    },
  { weeks: 'Week 3–4',  label: 'Content Drop',       desc: 'One series released per week'        },
  { weeks: 'Week 5–6',  label: 'Push Activation',    desc: 'Push to existing base + in-app'      },
  { weeks: 'Week 7–8',  label: 'Review & Iterate',   desc: 'Performance review + iteration'      },
]

const METRICS = [
  {
    label: 'Primary Metric',
    title: 'DriveReserve Ride Bookings',
    target: '10,000 first rides within 60 days of launch',
    tracking: 'In-app UTM + DriveReserve booking funnel',
  },
  {
    label: 'Conversion Metric',
    title: 'Existing User Activation Rate',
    target: '15% of existing DriveU base tries DriveReserve within 30 days',
    tracking: 'Cohort analysis on DriveU app user IDs',
  },
  {
    label: 'Content Metric',
    title: 'Cost Per First Booking (CPFB)',
    target: '₹150–200 per first DriveReserve booking via paid + organic combined',
    tracking: 'Channel-wise attribution in MMP (AppsFlyer / Branch)',
  },
]

// ─── Scroll Timeline ──────────────────────────────────────────────────────────

function ScrollTimeline({ scenes }) {
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef(null)

  const onScroll = () => {
    if (!scrolled && ref.current && ref.current.scrollLeft > 24) setScrolled(true)
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
      >
        {scenes.map((scene, i) => {
          const { icon: Icon, label, title, body, hashtag, isResolution } = scene
          return (
            <div
              key={i}
              className={[
                'snap-start flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl p-7 flex flex-col gap-4 relative transition-transform duration-200 hover:-translate-y-1',
                isResolution
                  ? 'bg-[#029d61] text-white'
                  : 'bg-white border border-gray-100 text-[#0a0a0a] shadow-sm',
              ].join(' ')}
            >
              {/* Icon badge */}
              <div className={[
                'w-10 h-10 rounded-xl flex items-center justify-center',
                isResolution ? 'bg-white/20' : 'bg-[#029d61]/10',
              ].join(' ')}>
                <Icon size={18} className={isResolution ? 'text-white' : 'text-[#029d61]'} />
              </div>

              {/* Label */}
              <p className={[
                'text-[10px] font-bold uppercase tracking-[0.18em]',
                isResolution ? 'text-white/70' : 'text-[#029d61]',
              ].join(' ')}>
                {label}
              </p>

              {/* Title + body */}
              <div className="flex-1">
                <h4 className="font-bold text-base leading-snug mb-2">{title}</h4>
                <p className={[
                  'text-sm leading-relaxed',
                  isResolution ? 'text-white/85' : 'text-gray-500',
                ].join(' ')}>
                  {body}
                </p>
                {hashtag && (
                  <p className="mt-4 text-sm font-bold text-white/80">{hashtag}</p>
                )}
              </div>

              {/* Scene number watermark */}
              <span className={[
                'absolute bottom-5 right-5 text-[11px] font-extrabold tabular-nums',
                isResolution ? 'text-white/25' : 'text-gray-100',
              ].join(' ')}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          )
        })}
      </div>

      {/* Scroll hint - fades out after first scroll */}
      <div
        aria-hidden="true"
        className={[
          'absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5',
          'bg-white/90 backdrop-blur-sm text-gray-400 text-xs px-3 py-1.5 rounded-full',
          'pointer-events-none transition-all duration-700',
          scrolled ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0',
        ].join(' ')}
      >
        scroll <ChevronRight size={11} />
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [elevated, setElevated] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = () => setOpen(false)

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 font-jakarta',
        elevated ? 'bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/[0.06]' : 'bg-[#0a0a0a]',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-2 select-none" onClick={handleLink}>
          <span className="text-[#029d61] font-extrabold text-base tracking-tight">DriveReserve</span>
          <span className="text-white/25 text-base font-light">×</span>
          <span className="text-white font-semibold text-base tracking-tight">#NotJustACab</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-white/50 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/[0.06] px-6 py-5 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={handleLink}
              className="text-white/60 hover:text-white font-medium text-sm tracking-wide transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative pt-20 pb-24 font-jakarta overflow-hidden">
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #029d61 0%, transparent 70%)' }}
      />

      {/* Centered hashtag — fully visible, scales with viewport */}
      <div className="relative w-full text-center px-6">
        <h1
          className="font-extrabold text-white leading-none animate-fade-in"
          style={{
            fontSize: 'clamp(2.5rem, 11vw, 11rem)',
            letterSpacing: '-0.04em',
            animationDelay: '0.1s',
          }}
        >
          #NotJustACab
        </h1>
      </div>

      {/* Below-hashtag copy - contained with padding */}
      <div className="relative text-center max-w-3xl mx-auto w-full px-6 mt-10">
        {/* Pitch subtitle */}
        <p
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white/40 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          A 360° Campaign Pitch for DriveReserve by DriveU
        </p>

        {/* Subtext */}
        <p
          className="mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.55s' }}
        >
          Presenting a campaign that speaks directly to every DriveU user who has ever
          asked - why not just book a cab?
        </p>

        {/* Campaign line */}
        <p
          className="mt-8 text-2xl sm:text-3xl md:text-4xl font-bold italic text-[#029d61] animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          "Comfort Like Your Own Car."
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#strategy"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-200 group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Explore the Campaign</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  )
}

// ─── Strategy ─────────────────────────────────────────────────────────────────

function Strategy() {
  return (
    <section id="strategy" className="bg-[#0a0a0a] py-28 px-6 font-jakarta">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.22em] mb-5">
          The Strategy
        </p>

        <h2
          className="font-extrabold text-white leading-tight mb-20"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
        >
          Why #NotJustACab?
        </h2>

        {/* 3-col insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {INSIGHT_CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-[#0d0d0d] p-10 flex flex-col gap-5 border-l-[3px] border-[#029d61]"
            >
              <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.2em]">
                {card.label}
              </p>
              {card.body && (
                <p className="text-white/60 text-base leading-relaxed">{card.body}</p>
              )}
              {card.personas && (
                <div>
                  <p className="text-white/60 text-base mb-4 leading-relaxed">
                    Existing DriveU customers across 3 personas:
                  </p>
                  <ul className="space-y-3">
                    {card.personas.map((p, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-[#029d61] mt-0.5 font-bold">-</span>
                        <span className="text-white/55 text-sm leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Positioning line */}
        <div className="mt-20 text-center">
          <p
            className="font-extrabold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.75rem)' }}
          >
            Not a cab. Not a rental.{' '}
            <span className="text-[#029d61]">#NotJustACab.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Content Series ────────────────────────────────────────────────────────────

function ContentSeries() {
  return (
    <section id="scripts" className="bg-white py-28 px-6 font-jakarta">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.22em] mb-5">
          The Scripts
        </p>
        <h2
          className="font-extrabold text-[#0a0a0a] leading-tight mb-5"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
        >
          3 Script Ideas
        </h2>
        <p className="text-[#0a0a0a] text-lg max-w-2xl leading-relaxed mb-20">
          Each content series targets a different DriveU user persona and ends with the same
          emotional resolution - Comfort Like Your Own Car.
        </p>

        {/* Series blocks */}
        <div className="space-y-20">
          {SERIES.map((s) => (
            <div key={s.number}>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
                <span className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.2em]">
                  Series {s.number}
                </span>
                <span className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.2em]">
                  - {s.audience}
                </span>
              </div>
              <p className="text-[#0a0a0a] text-lg font-semibold italic mb-7 leading-snug">
                {s.tagline}
              </p>
              <img
                src={s.image}
                alt={`Script ${s.number} - ${s.audience}`}
                className="w-full rounded-2xl object-contain"
              />
            </div>
          ))}
        </div>

        {/* Closing dark banner */}
        <div className="mt-20 bg-[#0a0a0a] rounded-3xl px-10 py-14 md:px-16 text-center">
          <p
            className="font-bold text-white leading-relaxed"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
          >
            Three different people. Three different problems.
            <br />
            <span className="text-[#029d61]">One answer: #NotJustACab</span>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Channels ─────────────────────────────────────────────────────────────────

function Channels() {
  return (
    <section id="channels" className="bg-[#f5f5f5] py-28 px-6 font-jakarta">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.22em] mb-5">
          The Channels
        </p>
        <h2
          className="font-extrabold text-[#0a0a0a] leading-tight mb-20"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
        >
          A Full 360° Rollout
        </h2>

        {/* 4-col channel grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CHANNELS.map(({ Icon, name, desc }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 flex flex-col gap-5 border border-gray-200/60 hover:border-[#029d61]/30 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#029d61]/10 flex items-center justify-center">
                <Icon size={22} className="text-[#029d61]" />
              </div>
              <h3 className="font-bold text-[#0a0a0a] text-sm leading-snug">{name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{desc}</p>
            </div>
          ))}
        </div>

        {/* Campaign timeline bar */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200/60">
          <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.22em] mb-8">
            Campaign Timeline
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PHASES.map(({ weeks, label, desc }, i) => (
              <div key={i} className="relative flex flex-col gap-3">
                {/* Connector - horizontal line to next phase */}
                {i < PHASES.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute left-full top-3 w-full h-px bg-[#029d61]/15 -translate-y-px"
                    style={{ width: 'calc(100% - 20px)', left: 'calc(100% + 20px)' }}
                  />
                )}
                {/* Step circle */}
                <div className="w-7 h-7 rounded-full bg-[#029d61] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] font-extrabold">{i + 1}</span>
                </div>
                <div>
                  <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-wider mb-1">
                    {weeks}
                  </p>
                  <p className="text-[#0a0a0a] font-bold text-sm">{label}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

function Metrics() {
  return (
    <section id="metrics" className="bg-[#0a0a0a] py-28 px-6 font-jakarta">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.22em] mb-5">
          How We Measure Success
        </p>
        <h2
          className="font-extrabold text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
        >
          The Numbers That Matter
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mb-20 leading-relaxed">
          DriveReserve is a new vertical launch. Every campaign metric ties back to one
          outcome - rides booked.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {METRICS.map(({ label, title, target, tracking }, i) => (
            <div
              key={i}
              className="bg-[#0d0d0d] border border-[#029d61]/18 rounded-2xl p-10 flex flex-col gap-6 hover:border-[#029d61]/40 transition-colors duration-200"
            >
              <div>
                <p className="text-[#029d61] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  {label}
                </p>
                <h3 className="text-white font-bold text-xl leading-snug">{title}</h3>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <p className="text-[#029d61] font-semibold text-base leading-relaxed">
                  Target: {target}
                </p>
                <div className="border-t border-white/[0.05] pt-4">
                  <p className="text-white/25 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Tracked via
                  </p>
                  <p className="text-white/45 text-sm leading-relaxed">{tracking}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/35 italic text-lg max-w-3xl mx-auto leading-relaxed border-t border-white/[0.04] pt-12">
          "Every view, every share, every save means nothing if someone doesn't Reserve.
          That's the north star."
        </p>
      </div>
    </section>
  )
}

// ─── Closing ──────────────────────────────────────────────────────────────────

function Closing() {
  return (
    <section
      id="close"
      className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-28 px-6 font-jakarta relative"
    >
      {/* Faint radial glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, #029d61 0%, transparent 65%)' }}
      />

      <div className="relative max-w-4xl mx-auto text-center w-full">
        {/* Big hashtag */}
        <p
          className="font-extrabold text-[#029d61] leading-none mb-10"
          style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', letterSpacing: '-0.03em' }}
        >
          #NotJustACab
        </p>

        {/* Headline */}
        <h2
          className="font-bold text-white leading-snug mb-8 max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
        >
          DriveReserve isn't competing with cabs.
          <br className="hidden sm:block" />
          It's replacing the need for them.
        </h2>

        {/* Supporting text */}
        <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-20">
          This campaign is built to do one thing - make every existing DriveU user feel that
          booking a cab was always the compromise. DriveReserve is the upgrade they didn't know
          they could afford.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-20 justify-center">
          <div className="flex-1 max-w-[120px] h-px bg-white/10" />
          <div className="w-10 h-[2px] bg-[#029d61]" />
          <div className="flex-1 max-w-[120px] h-px bg-white/10" />
        </div>

        {/* Strategist credit */}
        <div className="space-y-3">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.22em]">
            Campaign Strategy & Creative Direction
          </p>
          <p
            className="text-white font-extrabold leading-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            Anisha Jain
          </p>
          <p className="text-white/50 text-base">
            MBA - Startup Leadership, Mesa School of Business
          </p>
          <p className="text-white/35 text-sm">
            Ex Founder - Ekdor
          </p>
          <p className="text-white/35 text-sm">
            anisha_jain@pg26.mesaschool.co&ensp;|&ensp;linkedin.com/in/anishajain15051999
          </p>
        </div>

        {/* Bottom footnote */}
        <p className="mt-20 text-[#029d61] text-[10px] font-bold uppercase tracking-[0.22em]">
          Built as a proactive pitch for the Marketing Head role at DriveU.
        </p>
      </div>
    </section>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-jakarta antialiased">
      <Navbar />
      <Hero />
      <Strategy />
      <ContentSeries />
      <Channels />
      <Metrics />
      <Closing />
    </div>
  )
}
