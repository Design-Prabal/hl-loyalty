import { ArrowRight, RefreshCw, Users, TrendingUp, Settings, UserPlus, LayoutDashboard } from 'lucide-react'

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
    icon: Settings,
    number: '01',
    title: 'Setup rule',
    description: 'Define how customers can earn points by engaging with your brand.',
  },
  {
    icon: UserPlus,
    number: '02',
    title: 'Enrollment page',
    description: 'Create a branded signup experience for your loyalty program.',
  },
  {
    icon: LayoutDashboard,
    number: '03',
    title: 'Member portal',
    description: 'Setup the experience customers get after they join your loyalty program.',
  },
]

function LoyaltyCard() {
  return (
    <div className="relative" style={{ width: 268 }}>
      <div
        style={{
          width: 268,
          borderRadius: 18,
          padding: 24,
          background: 'linear-gradient(140deg, #004EEB 0%, #0031C0 100%)',
          boxShadow: '0 20px 48px rgba(0, 78, 235, 0.28)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', top: -10, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <svg width="28" height="22" viewBox="0 0 48 40" fill="none">
                <path d="M8 36V20L18 8L28 20V36" stroke="#F9C400" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 36V20L32 8L42 20V36" stroke="#00C4C4" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-white/60 text-[11px] font-medium mt-1">HighLevel Loyalty</p>
            </div>
            <div className="flex items-center gap-1 bg-white/15 px-2 py-1 rounded-full">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFD166">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-[11px] font-semibold text-[#FFD166]">Gold member</span>
            </div>
          </div>

          {/* Member name */}
          <p className="text-white text-[16px] font-semibold mb-4">Sarah Mitchell</p>

          {/* Points balance */}
          <div className="mb-4">
            <p className="text-white/60 text-[11px] font-medium mb-0.5">Points balance</p>
            <p className="text-white text-[24px] font-bold leading-none">2,450 pts</p>
          </div>

          {/* Progress to Platinum */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-white/60 text-[11px] font-medium">Progress to Platinum</p>
              <p className="text-white/80 text-[11px] font-medium">82%</p>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div
        className="absolute -bottom-4 -left-6 bg-white border border-[#EAECF0] rounded-[10px] px-3 py-2.5 flex items-center gap-2.5"
        style={{ boxShadow: '0 4px 16px rgba(16,24,40,0.10)', minWidth: 188 }}
      >
        <div className="w-7 h-7 bg-[#DCFCE7] rounded-full flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-[#101828] leading-none">+150 pts earned</p>
          <p className="text-[11px] text-[#667085] mt-0.5 leading-none">New purchase · just now</p>
        </div>
      </div>
    </div>
  )
}

function StepCard({ icon: Icon, number, title, description }) {
  return (
    <div className="flex-1 bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-5 flex flex-col gap-4 relative overflow-hidden">
      <span
        className="absolute font-extrabold text-[#EAECF0] select-none"
        style={{ fontSize: 72, lineHeight: 1, top: -8, right: 12 }}
      >
        {number}
      </span>
      <div className="w-9 h-9 bg-[#EEF4FF] rounded-[6px] flex items-center justify-center relative z-10">
        <Icon size={16} stroke="#004EEB" strokeWidth={1.8} />
      </div>
      <div className="relative z-10">
        <p className="text-[14px] font-semibold text-[#101828]">{title}</p>
        <p className="text-[13px] text-[#667085] leading-[1.55] mt-1">{description}</p>
      </div>
    </div>
  )
}

export default function LoyaltyPitchPage() {
  return (
    <div className={`flex-1 overflow-auto bg-[#F9FAFB] p-4 flex flex-col`}>
      <div className={`bg-white rounded-xl ${SHADOW} overflow-hidden`}>
        <div className="overflow-y-auto">

          {/* Hero */}
          <div
            className="px-10 py-12 border-b border-[#EAECF0]"
            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f5ff 100%)' }}
          >
            <div className="flex items-center gap-12">
              {/* Left */}
              <div className="flex flex-col gap-5 flex-1 min-w-0">
                <div className="bg-[#EEF4FF] text-[#004EEB] text-[12px] font-medium px-3 py-1 rounded-full w-fit">
                  New · Loyalty
                </div>
                <h1 className="text-[28px] font-extrabold text-[#101828] leading-[1.25]">
                  Customers are 1.5× more likely to return when rewarded
                </h1>
                <p className="text-[14px] text-[#475467] leading-relaxed">
                  Turn one-time buyers into loyal customers. Reward every purchase, visit, and interaction across your website, community, and store.
                </p>
                <button className="flex items-center gap-1.5 bg-[#004EEB] text-white text-[14px] font-semibold px-5 py-2.5 rounded-[6px] w-fit hover:bg-[#0040C9] transition-colors">
                  Get started
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Right — loyalty card */}
              <div className="shrink-0 pb-6 pr-2">
                <LoyaltyCard />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="border-b border-[#EAECF0]">
            <div className="grid grid-cols-3 divide-x divide-[#EAECF0]">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-4 p-8">
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

          {/* How it works */}
          <div className="px-10 py-10 border-b border-[#EAECF0]">
            <div className="mb-8">
              <h2 className="text-[16px] font-semibold text-[#101828]">How it works</h2>
              <p className="text-[13px] text-[#667085] mt-1">Three steps to launch your loyalty program</p>
            </div>
            <div className="flex items-start gap-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="contents">
                  <StepCard {...step} />
                  {i < STEPS.length - 1 && (
                    <ArrowRight size={18} className="mt-8 shrink-0 text-[#D0D5DD]" strokeWidth={2} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <div
            className="px-10 py-14 relative overflow-hidden flex flex-col items-center gap-4"
            style={{ background: 'linear-gradient(135deg, #004EEB 0%, #0031C0 100%)' }}
          >
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <h2 className="text-[20px] font-bold text-white relative z-10">Ready when you are</h2>
            <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-md relative z-10">
              Everything you need to launch a loyalty program that keeps customers coming back.
            </p>
            <button className="bg-white text-[#004EEB] text-[14px] font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#F0F5FF] transition-colors relative z-10">
              Get started now
            </button>
            <p className="text-[12px] font-medium text-white/45 relative z-10">No setup fees</p>
          </div>

        </div>
      </div>
    </div>
  )
}
