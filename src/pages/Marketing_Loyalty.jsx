import {
  ArrowRight,
  RefreshCw, Users, TrendingUp,
  ShoppingCart,
} from 'lucide-react'

const SHADOW = 'shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]'

const STATS = [
  {
    icon: RefreshCw,
    value: '1.5×',
    label: 'Purchase rate',
    description: "Rewarded customers are 1.5× more likely to come back and make another purchase.",
  },
  {
    icon: TrendingUp,
    value: '5×',
    label: 'Retention ROI',
    description: "Retaining a customer costs 5× less than acquiring a brand new one.",
  },
  {
    icon: Users,
    value: '+67%',
    label: 'Revenue per customer',
    description: "Loyal customers spend 67% more on average than first-time buyers.",
  },
]

const STEPS = [
  {
    Illustration: RulesIllustration,
    bg: '#F2F4F7',
    title: 'Setup rules',
    description: 'Define how customers earn points; purchases, referrals, and more.',
  },
  {
    Illustration: EnrollmentIllustration,
    bg: '#F2F4F7',
    title: 'Enrollment page',
    description: 'Create a branded signup experience for your loyalty program.',
  },
  {
    Illustration: PortalIllustration,
    bg: '#F2F4F7',
    title: 'Member portal',
    description: 'Give members a beautiful dashboard to track points and redeem rewards.',
  },
]

// ── Hero components (current version) ────────────────────────────────────────

function MemberChip({ emoji, name, detail, detailColor, bg }) {
  return (
    <div
      className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center gap-2.5 w-fit"
      style={{ boxShadow: '0 10px 32px rgba(16,24,40,0.14)', whiteSpace: 'nowrap' }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base"
        style={{ backgroundColor: bg }}
      >
        {emoji}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#101828] leading-none">{name}</p>
        <p className="text-[12px] font-semibold mt-0.5 leading-none" style={{ color: detailColor }}>{detail}</p>
      </div>
    </div>
  )
}

function LoyaltyCard() {
  return (
    <div
      style={{
        width: 248,
        borderRadius: 20,
        padding: 22,
        background: 'linear-gradient(145deg, #004EEB 0%, #6938EF 100%)',
        boxShadow: '0 24px 60px rgba(105,56,239,0.38)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: -34, right: -34, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.09)' }} />
      <div style={{ position: 'absolute', bottom: -26, left: -16, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex items-center mb-5">
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-lg">
            <ShoppingCart size={11} className="text-white" strokeWidth={2} />
            <span className="text-white text-[10px] font-semibold tracking-wide">Shopping reward</span>
          </div>
        </div>
        <p className="text-white text-[14px] font-semibold mb-3">Sarah Mitchell</p>
        <div className="mb-4">
          <p className="text-white/60 text-[10px] font-medium mb-0.5">Points balance</p>
          <p className="text-white text-[22px] font-bold leading-none">2,450 pts</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-white/60 text-[10px] font-medium">Discount coming</p>
            <p className="text-white/80 text-[10px] font-medium">82%</p>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-white" style={{ width: '82%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="shrink-0 select-none flex flex-col gap-4" style={{ width: 300 }}>

      <div style={{ transform: 'rotate(-2.5deg)' }} className="w-fit">
        <div style={{ animation: 'lp-float 4.5s ease-in-out infinite', animationDelay: '0.5s' }}>
          <MemberChip emoji="🧑" name="Sam is now a member!" detail="+200 pts earned" detailColor="#004EEB" bg="#EEF4FF" />
        </div>
      </div>

      <div style={{ transform: 'translateX(20px) rotate(4deg)' }} className="w-fit">
        <div style={{ animation: 'lp-float 5.2s ease-in-out infinite' }}>
          <LoyaltyCard />
        </div>
      </div>

      <div style={{ transform: 'rotate(2deg)' }} className="w-fit">
        <div style={{ animation: 'lp-float 4s ease-in-out infinite', animationDelay: '1.1s' }}>
          <MemberChip emoji="👩" name="Alex redeemed a reward!" detail="-150 pts · $12 off" detailColor="#16A34A" bg="#DCFCE7" />
        </div>
      </div>

      <div style={{ transform: 'translateX(28px) rotate(-2.5deg)' }} className="w-fit">
        <div style={{ animation: 'lp-float 3.8s ease-in-out infinite', animationDelay: '1.8s' }}>
          <div
            className="inline-flex items-center gap-2 rounded-[14px] px-4 py-2.5 text-[13px] font-bold"
            style={{ backgroundColor: '#FFD60A', color: '#1C1917', boxShadow: '0 10px 28px rgba(234,197,10,0.45)' }}
          >{'Start earning for free'}</div>
        </div>
      </div>

    </div>
  )
}

// ── Step illustrations ────────────────────────────────────────────────────────

function RulesIllustration() {
  return (
    <div style={{ width: 190, background: 'white', borderRadius: 10, padding: '11px 13px', boxShadow: '0 4px 20px rgba(0,78,235,0.08)' }}>
      <p style={{ fontSize: 9, fontWeight: 700, color: '#667085', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reward rules</p>
      {[['Purchase', '+10 pts', '#004EEB'], ['Referral', '+50 pts', '#16A34A'], ['Birthday', '+25 pts', '#6938EF']].map(([label, pts, color]) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F2F4F7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#344054' }}>{label}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, color }}>{pts}</span>
        </div>
      ))}
      <div style={{ marginTop: 7, background: '#EEF4FF', borderRadius: 5, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: '#004EEB' }}>+ Add rule</span>
      </div>
    </div>
  )
}

function EnrollmentIllustration() {
  return (
    <div style={{ width: 175, background: 'white', borderRadius: 10, padding: '13px 14px', boxShadow: '0 4px 20px rgba(0,78,235,0.08)' }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div style={{ width: 22, height: 22, background: 'linear-gradient(135deg, #004EEB 0%, #6938EF 100%)', borderRadius: 6, margin: '0 auto 6px' }} />
        <p style={{ fontSize: 10, fontWeight: 700, color: '#101828', marginBottom: 1 }}>Join the club</p>
        <p style={{ fontSize: 9, color: '#98A2B3' }}>Earn rewards from day one</p>
      </div>
      {[['Your name', 6], ['Email address', 5]].map(([placeholder, mb]) => (
        <div key={placeholder} style={{ background: '#F9FAFB', border: '1px solid #EAECF0', borderRadius: 5, height: 22, marginBottom: mb, display: 'flex', alignItems: 'center', paddingLeft: 7 }}>
          <span style={{ fontSize: 9, color: '#D0D5DD' }}>{placeholder}</span>
        </div>
      ))}
      <div style={{ background: 'linear-gradient(135deg, #004EEB 0%, #6938EF 100%)', borderRadius: 5, height: 23, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: 'white' }}>Get started free</span>
      </div>
    </div>
  )
}

function PortalIllustration() {
  return (
    <div style={{ width: 190, background: 'white', borderRadius: 10, padding: '11px 13px', boxShadow: '0 4px 20px rgba(0,78,235,0.08)' }}>
      <p style={{ fontSize: 9, color: '#98A2B3', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Points balance</p>
      <p style={{ fontSize: 17, fontWeight: 700, color: '#101828', lineHeight: 1, marginBottom: 9 }}>2,450 pts</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 9, color: '#667085' }}>Next reward</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: '#004EEB' }}>82%</span>
      </div>
      <div style={{ background: '#EEF4FF', borderRadius: 3, height: 4, marginBottom: 9 }}>
        <div style={{ background: '#004EEB', borderRadius: 3, height: 4, width: '82%' }} />
      </div>
      {['+50 pts · Referral bonus', '+10 pts · Purchase'].map((item, i) => (
        <div key={i} style={{ fontSize: 9, color: '#475467', padding: '4px 0', borderTop: '1px solid #F2F4F7' }}>
          {item}
        </div>
      ))}
    </div>
  )
}

// ── Step card ─────────────────────────────────────────────────────────────────

function StepCard({ Illustration, bg, title, description }) {
  return (
    <div className="flex-1 flex flex-col border border-[#EAECF0] rounded-[12px] overflow-hidden bg-white">
      <div className="flex items-center justify-center" style={{ backgroundColor: bg, height: 230 }}>
        <Illustration />
      </div>
      <div className="px-6 py-5 text-center">
        <p className="text-[14px] font-semibold text-[#101828]">{title}</p>
        <p className="text-[13px] text-[#667085] leading-[1.6] mt-1.5">{description}</p>
      </div>
    </div>
  )
}

// ── Feature overview section ─────────────────────────────────────────────────

function FeatureChip({ emoji, label }) {
  return (
    <div className="bg-white rounded-[14px] px-4 py-3 flex items-center gap-3"
      style={{ boxShadow: '0 6px 24px rgba(16,24,40,0.09)', whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: 20, lineHeight: 1 }}>{emoji}</span>
      <span className="text-[14px] font-semibold text-[#101828]">{label}</span>
    </div>
  )
}

function DonutChart() {
  const r = 40, cx = 55, cy = 55
  const c = 2 * Math.PI * r
  const segs = [
    { pct: 0.45, color: '#93C5FD' },
    { pct: 0.25, color: '#6EE7B7' },
    { pct: 0.20, color: '#C4B5FD' },
    { pct: 0.10, color: '#FDE68A' },
  ]
  let angle = -90
  const arcs = segs.map(seg => {
    const startAngle = angle
    angle += seg.pct * 360
    return { ...seg, dashLength: seg.pct * c - 3, startAngle }
  })
  return (
    <svg width={110} height={110}>
      {arcs.map((arc, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={arc.color} strokeWidth={13}
          strokeDasharray={`${arc.dashLength} ${c}`} strokeDashoffset={0}
          style={{ transform: `rotate(${arc.startAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </svg>
  )
}

function LoyaltyDashboardCard() {
  return (
    <div style={{ width: 268, background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,78,235,0.13)' }}>
      <div style={{ background: 'linear-gradient(135deg, #004EEB 0%, #6938EF 100%)', padding: '13px 18px' }}>
        <span style={{ color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: '-0.2px' }}>Loyalty</span>
      </div>
      <div style={{ padding: '14px 14px 0' }}>
        {[
          { emoji: '🧑', name: 'Sarah Mitchell', pts: '2,450 pts', bg: '#EEF4FF' },
          { emoji: '👩', name: 'Alex Chen', pts: '1,200 pts', bg: '#DCFCE7' },
        ].map(({ emoji, name, pts, bg }) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F9FAFB', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#101828', marginBottom: 3 }}>{name}</div>
              <div style={{ width: '65%', height: 5, background: '#EAECF0', borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#004EEB', flexShrink: 0 }}>{pts}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '6px 14px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <DonutChart />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['#93C5FD', 'Purchases'], ['#6EE7B7', 'Referrals'], ['#C4B5FD', 'Birthday'], ['#FDE68A', 'Promos']].map(([color, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
              <span style={{ fontSize: 9, color: '#667085' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WhatItOffersSection() {
  const leftChips = [
    { emoji: '🛍️', label: 'Earn on purchase' },
    { emoji: '🎂', label: 'Birthday bonus' },
    { emoji: '👥', label: 'Refer & earn' },
  ]
  const rightChips = [
    { emoji: '🏆', label: 'Branded portal' },
    { emoji: '🔔', label: 'Auto-notifications' },
    { emoji: '🎁', label: 'Redeem anytime' },
  ]
  return (
    <div className="px-10 py-20 border-b border-[#EAECF0]">
      <div className="text-center mb-14">
        <h2 className="text-[20px] font-bold text-[#101828]">Everything in one place</h2>
        <p className="text-[14px] text-[#667085] mt-2 leading-relaxed mx-auto" style={{ maxWidth: 440 }}>
          From earning rules to a branded member portal — your complete loyalty stack, all in one place.
        </p>
      </div>
      <div style={{ position: 'relative', width: 720, height: 360, margin: '0 auto' }}>
        {/* Decorative arrows + sparkles */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
          <defs>
            <marker id="lp-arrow-head" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,1 L7,4 L0,7" fill="none" stroke="#6938EF" strokeWidth="1.5" />
            </marker>
          </defs>
          <path d="M 360,44 C 318,2 216,6 188,118"
            fill="none" stroke="#6938EF" strokeWidth={1.5} strokeDasharray="5 4" opacity={0.4} markerEnd="url(#lp-arrow-head)" />
          <path d="M 636,222 C 692,234 698,270 660,280 C 622,290 566,266 548,242"
            fill="none" stroke="#6938EF" strokeWidth={1.5} strokeDasharray="5 4" opacity={0.3} markerEnd="url(#lp-arrow-head)" />
          <text x="672" y="36" style={{ fontSize: 20, fill: '#6938EF', opacity: 0.3 }}>✦</text>
          <text x="18" y="355" style={{ fontSize: 14, fill: '#004EEB', opacity: 0.2 }}>○</text>
        </svg>

        {/* Left chips */}
        <div style={{ position: 'absolute', left: 0, top: 96, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {leftChips.map(c => <FeatureChip key={c.label} {...c} />)}
        </div>

        {/* Center card */}
        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)' }}>
          <LoyaltyDashboardCard />
        </div>

        {/* Right chips */}
        <div style={{ position: 'absolute', right: 0, top: 44, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rightChips.map(c => <FeatureChip key={c.label} {...c} />)}
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LoyaltyPitchPage({ onGetStarted }) {
  return (
    <div className="flex-1 min-h-0 overflow-auto no-scrollbar bg-[#F9FAFB] p-4">
      <div className={`bg-white rounded-xl ${SHADOW} overflow-hidden`}>

        {/* ── Hero (current version) ── */}
        <div
          className="px-10 py-16 border-b border-[#EAECF0] relative"
          style={{ background: 'linear-gradient(145deg, #EEF4FF 0%, #F0ECFF 45%, #FFF4ED 100%)' }}
        >
          <div style={{ position: 'absolute', top: -100, right: 60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(105,56,239,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: 60, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,78,235,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="flex items-center gap-10 relative z-10">
            {/* Left */}
            <div className="flex flex-col gap-5 flex-1 min-w-0" style={{ animation: 'lp-slide-up 0.7s ease-out both' }}>

              <div className="flex items-center gap-2 w-fit">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-3 h-3 rounded-full bg-[#004EEB]/25" style={{ animation: 'lp-pulse-ring 2s ease-out infinite' }} />
                  <div className="w-2 h-2 rounded-full bg-[#004EEB] relative z-10" />
                </div>
                <span className="text-[13px] font-semibold text-[#004EEB]">New · Loyalty</span>
              </div>

              <h1 className="text-[28px] font-extrabold text-[#101828] leading-[1.2]" style={{ letterSpacing: '-0.3px' }}>
                Turn one-time buyers into{' '}
                <span style={{ background: 'linear-gradient(135deg, #004EEB 0%, #6938EF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>loyal fans</span>
              </h1>

              <p className="text-[14px] text-[#475467] leading-relaxed" style={{ maxWidth: 400 }}>
                Reward purchases, referrals, and birthdays. Build a branded loyalty program your customers will actually love.
              </p>

              <div className="flex items-center gap-2.5">
                <div className="flex">
                  {['#004EEB', '#6938EF', '#16A34A', '#EF6820', '#D97706'].map((c, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ backgroundColor: c, marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i }} />
                  ))}
                </div>
                <span className="text-[13px] text-[#667085]"><span className="font-semibold text-[#344054]">1,200+</span> businesses already growing</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onGetStarted}
                  className="relative flex items-center gap-1.5 text-white text-[14px] font-semibold px-5 py-2.5 rounded-[8px] overflow-hidden hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #004EEB 0%, #6938EF 100%)', boxShadow: '0 8px 24px rgba(0,78,235,0.35)' }}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Get started <ArrowRight size={15} />
                  </span>
                  <span className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)', animation: 'lp-shimmer 3.5s ease-in-out infinite' }} />
                </button>
              </div>
            </div>

            {/* Right — scattered cards */}
            <HeroVisual />
          </div>
        </div>

        {/* ── What it offers ── */}
        <WhatItOffersSection />

        {/* ── Stats ("The one") ── */}
        <div className="border-b border-[#EAECF0]">
          <div className="grid grid-cols-3 divide-x divide-[#EAECF0]">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-4 px-10 py-12">
                <div className="w-10 h-10 bg-[#EEF4FF] rounded-[6px] flex items-center justify-center">
                  <stat.icon size={18} stroke="#004EEB" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[28px] font-extrabold text-[#101828] leading-none">{stat.value}</p>
                  <p className="text-[13px] font-medium text-[#344054] mt-1">{stat.label}</p>
                </div>
                <p className="text-[13px] text-[#667085] leading-[1.6]">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works ("The one") ── */}
        <div className="px-10 py-16 border-b border-[#EAECF0]">
          <div className="mb-10">
            <h2 className="text-[16px] font-semibold text-[#101828]">How it works</h2>
            <p className="text-[13px] text-[#667085] mt-1">Three steps to launch your loyalty program</p>
          </div>
          <div className="flex items-stretch gap-4">
            {STEPS.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </div>
        </div>

        {/* ── CTA strip ("The one") ── */}
        <div
          className="px-10 py-20 relative overflow-hidden flex flex-col items-center gap-4 rounded-b-xl"
          style={{ background: 'linear-gradient(135deg, #004EEB 0%, #0031C0 100%)' }}
        >
          <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', animation: 'lp-blob 9s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', animation: 'lp-blob 11s ease-in-out infinite', animationDelay: '2s' }} />
          <div style={{ position: 'absolute', top: '30%', right: '18%', width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', animation: 'lp-blob 13s ease-in-out infinite', animationDelay: '1s' }} />
          <h2 className="text-[20px] font-bold text-white relative z-10">Ready when you are</h2>
          <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-md relative z-10">
            Everything you need to launch a loyalty program that keeps customers coming back.
          </p>
          <button
            onClick={onGetStarted}
            className="relative overflow-hidden bg-white text-[#004EEB] text-[14px] font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#F0F5FF] transition-colors z-10"
          >
            <span className="relative z-10">Get started now</span>
            <span className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,78,235,0.08) 50%, transparent 100%)', animation: 'lp-shimmer 3s ease-in-out infinite' }} />
          </button>
          <p className="text-[12px] font-medium text-white/45 relative z-10">No setup fees</p>
        </div>

      </div>
    </div>
  )
}
