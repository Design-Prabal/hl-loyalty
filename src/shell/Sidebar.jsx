import { useState } from 'react'
import { ChevronRight, ChevronLeft, Search, Zap, ArrowLeft, Settings } from 'lucide-react'

function HLLogo({ compact }) {
  if (compact) {
    return (
      <svg width="32" height="32" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10H6V39H12V10Z" fill="#528BFF"/>
        <path d="M6 12L12 17V12H6Z" fill="#92792D"/>
        <path d="M0 12L8.98881 3L18 12H0Z" fill="#FDC400"/>
        <path d="M24 23H18V39H24V23Z" fill="#2896FB"/>
        <path d="M18 25L24 31V25H18Z" fill="#1B6198"/>
        <path d="M12 25L20.9888 16L30 25H12Z" fill="#2896FB"/>
        <path d="M36 10H30V39H36V10Z" fill="#4ACF27"/>
        <path d="M30 12L36 17V12H30Z" fill="#327F3E"/>
        <path d="M24 12L32.9888 3L42 12H24Z" fill="#4ACF27"/>
      </svg>
    )
  }
  return (
    <svg width="149" height="28" viewBox="0 0 223 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4096 8.51025H7.14673V41.993H13.4096V8.51025Z" fill="#528BFF"/>
      <path d="M7.14673 10.3528L13.4096 16.2946V10.3528H7.14673Z" fill="#92792D"/>
      <path d="M0 10.76L10.2784 0L20.5824 10.76H0Z" fill="#FDC400"/>
      <path d="M27.6616 23.6348H20.489V41.993H27.6616V23.6348Z" fill="#2896FB"/>
      <path d="M20.1682 25.4773L27.6618 31.9519V25.4773H20.1682Z" fill="#1B6198"/>
      <path d="M13.9866 25.8845L24.265 15.1245L34.569 25.8845H13.9866Z" fill="#2896FB"/>
      <path d="M41.0459 8.51721H34.783V42H41.0459V8.51721Z" fill="#4ACF27"/>
      <path d="M34.783 10.3575L41.0459 16.2994V10.3575H34.783Z" fill="#327F3E"/>
      <path d="M27.636 10.7646L37.9144 0.00463867L48.2184 10.7646H27.636Z" fill="#4ACF27"/>
      <path d="M71.0491 12.2515V21.3542H60.5612V12.2515H55.2184V35.3379H60.5612V25.8725H71.0491V35.3379H76.3919V12.2515H71.0491Z" fill="white"/>
      <path d="M84.0638 15.1208C85.9767 15.1208 87.2629 13.8676 87.2629 12.1526C87.2629 10.5695 85.9767 9.3822 84.0638 9.3822C82.1509 9.3822 80.8647 10.6355 80.8647 12.2515C80.8647 13.8676 82.1509 15.1208 84.0638 15.1208ZM81.4913 35.3379H86.6363V17.5944H81.4913V35.3379Z" fill="white"/>
      <path d="M104.834 17.5944V19.87C103.482 18.155 101.437 17.3305 98.9638 17.3305C94.0497 17.3305 90.092 20.7275 90.092 25.9055C90.092 31.0834 94.0497 34.4804 98.9638 34.4804C101.272 34.4804 103.218 33.7549 104.571 32.2707V33.0293C104.571 36.2284 102.987 37.8775 99.3596 37.8775C97.0839 37.8775 94.6104 37.0859 93.0933 35.8656L91.0485 39.5595C93.1262 41.1755 96.3913 42 99.7553 42C106.154 42 109.715 38.9658 109.715 32.3697V17.5944H104.834ZM99.9862 30.2589C97.2818 30.2589 95.303 28.511 95.303 25.9055C95.303 23.3 97.2818 21.552 99.9862 21.552C102.691 21.552 104.636 23.3 104.636 25.9055C104.636 28.511 102.691 30.2589 99.9862 30.2589Z" fill="white"/>
      <path d="M125.289 17.3305C123.013 17.3305 121.034 18.0561 119.649 19.4413V10.8663H114.504V35.3379H119.649V26.5651C119.649 23.3 121.43 21.7829 123.904 21.7829C126.179 21.7829 127.498 23.1021 127.498 25.9715V35.3379H132.643V25.1799C132.643 19.7711 129.477 17.3305 125.289 17.3305Z" fill="white"/>
      <path d="M137.67 35.3379H154.589V30.9845H143.013V12.2515H137.67V35.3379Z" fill="white"/>
      <path d="M174.463 26.5321C174.463 20.8265 170.44 17.3305 165.229 17.3305C159.82 17.3305 155.763 21.1563 155.763 26.4662C155.763 31.7431 159.754 35.6018 165.888 35.6018C169.088 35.6018 171.561 34.6124 173.21 32.7325L170.473 29.7642C169.252 30.9185 167.9 31.4792 166.02 31.4792C163.316 31.4792 161.436 30.127 160.941 27.9173H174.364C174.397 27.4886 174.463 26.9279 174.463 26.5321ZM165.262 21.2222C167.57 21.2222 169.252 22.6734 169.615 24.9161H160.875C161.238 22.6404 162.92 21.2222 165.262 21.2222Z" fill="white"/>
      <path d="M190.231 17.5944L185.152 29.6653L180.238 17.5944H174.928L182.382 35.3379H187.692L195.178 17.5944H190.231Z" fill="white"/>
      <path d="M214.175 26.5321C214.175 20.8265 210.152 17.3305 204.941 17.3305C199.532 17.3305 195.475 21.1563 195.475 26.4662C195.475 31.7431 199.466 35.6018 205.6 35.6018C208.8 35.6018 211.273 34.6124 212.922 32.7325L210.185 29.7642C208.964 30.9185 207.612 31.4792 205.732 31.4792C203.028 31.4792 201.148 30.127 200.653 27.9173H214.076C214.109 27.4886 214.175 26.9279 214.175 26.5321ZM204.974 21.2222C207.282 21.2222 208.964 22.6734 209.327 24.9161H200.587C200.95 22.6404 202.632 21.2222 204.974 21.2222Z" fill="white"/>
      <path d="M217.601 35.3379H222.746V10.8663H217.601V35.3379Z" fill="white"/>
    </svg>
  )
}

function NavItemMainNav({ icon: Icon, label, active, collapsed }) {
  if (collapsed) {
    return (
      <div
        title={label}
        className={`size-9 mx-auto flex items-center justify-center rounded-lg cursor-pointer ${
          active ? 'bg-[#1D2939]' : 'hover:bg-[#1D2939]/50'
        }`}
      >
        <Icon size={20} strokeWidth={1.8} className={active ? 'text-white' : 'text-[#98A2B3]'} />
      </div>
    )
  }
  return (
    <div className={`flex gap-2 items-center px-2 py-2 rounded-lg w-full cursor-pointer ${
      active ? 'bg-[#1D2939]' : 'hover:bg-[#1D2939]/50'
    }`}>
      <Icon size={20} strokeWidth={1.8} className={active ? 'text-white' : 'text-[#98A2B3]'} />
      <span className={`text-[16px] font-medium leading-5 ${active ? 'text-white' : 'text-[#D0D5DD]'}`}>
        {label}
      </span>
    </div>
  )
}

function NavItemSettings({ icon: Icon, label, active, collapsed }) {
  if (collapsed) {
    return (
      <div
        title={label}
        className={`size-9 mx-auto flex items-center justify-center rounded-lg cursor-pointer ${
          active ? 'bg-[#1D2939]' : 'hover:bg-[#1D2939]/50'
        }`}
      >
        <Icon size={20} strokeWidth={1.8} className={active ? 'text-white' : 'text-[#98A2B3]'} />
      </div>
    )
  }
  return (
    <div className={`flex gap-2 items-center px-2 py-2 rounded-lg w-full cursor-pointer ${
      active ? 'bg-[#1D2939]' : 'hover:bg-[#1D2939]/50'
    }`}>
      <Icon size={20} strokeWidth={1.8} className={active ? 'text-white' : 'text-[#98A2B3]'} />
      <span className={`text-[16px] font-medium leading-5 ${active ? 'text-white' : 'text-[#D0D5DD]'}`}>
        {label}
      </span>
    </div>
  )
}

/**
 * Sidebar — two variants:
 *
 * variant="main-nav"  (Social Listening pattern)
 *   navSections: [{ items: [{ icon, label, active }] }, ...]
 *   Two sections separated by a divider. Flat — no section labels.
 *
 * variant="settings"  (Messaging Limits / Phone System pattern)
 *   sections: [{ label: 'My Business', items: [{ icon, label, active }] }, ...]
 *   Categorized with uppercase section labels. Includes a back ribbon.
 *   onBack: callback for the back ribbon
 *
 * Click the green chevron at bottom-right to collapse/expand.
 */
export default function Sidebar({
  variant = 'main-nav',
  navSections = [],
  sections = [],
  onBack,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const isSettings = variant === 'settings'
  const NavItem = isSettings ? NavItemSettings : NavItemMainNav

  return (
    <aside className={`relative flex flex-col h-screen bg-[#101828] px-2 py-4 shrink-0 transition-[width] duration-200 ${collapsed ? 'w-[64px]' : 'w-[280px]'}`}>
      <div className="flex flex-col flex-1 justify-between min-h-0">
        <div className="flex flex-col gap-3 flex-1 min-h-0">

          {/* Logo */}
          <div className={`h-10 flex items-center ${collapsed ? 'justify-center' : 'px-2'}`}>
            <HLLogo compact={collapsed} />
          </div>

          {/* Subaccount switcher */}
          {collapsed ? (
            <div
              title="Headquarters 1800-PLUMBER-200.."
              className="size-9 mx-auto rounded-lg border border-[#344054] flex items-center justify-center cursor-pointer hover:border-[#475467]"
            >
              <span className="text-[#D0D5DD] text-[11px] font-semibold leading-none">HQ</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 border border-[#344054] rounded-lg px-2 py-2 cursor-pointer hover:border-[#475467]">
              <span className="flex-1 text-[#98A2B3] text-[13px] font-medium leading-none truncate">
                Headquarters 1800-PLUMBER-200..
              </span>
              <ChevronRight size={13} className="text-[#667085] shrink-0" />
            </div>
          )}

          {/* Search + Quick action */}
          {collapsed ? (
            <div className="flex flex-col gap-2 items-center">
              <button title="Search" className="size-9 rounded-lg border border-[#344054] flex items-center justify-center hover:border-[#475467]">
                <Search size={15} className="text-[#667085]" />
              </button>
              <button title="Quick action" className="size-9 bg-[#344054] rounded-lg flex items-center justify-center hover:bg-[#475467]">
                <Zap size={15} className="text-[#D0D5DD]" fill="#D0D5DD" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <div className="flex flex-1 items-center justify-between border border-[#344054] rounded-lg pl-2 pr-1 py-[7px]">
                <div className="flex gap-2 items-center">
                  <Search size={14} className="text-[#667085]" />
                  <span className="text-[#667085] text-[13px] leading-none">Search</span>
                </div>
                <kbd className="bg-[#1D2939] text-[#667085] text-[11px] px-1.5 py-0.5 rounded font-medium">⌘K</kbd>
              </div>
              <div className="bg-[#344054] rounded-lg p-[9px] flex items-center justify-center cursor-pointer hover:bg-[#475467]">
                <Zap size={15} className="text-[#D0D5DD]" fill="#D0D5DD" />
              </div>
            </div>
          )}

          {/* Settings variant: Go back ribbon */}
          {isSettings && (
            collapsed ? (
              <div
                onClick={onBack}
                title="Go back"
                className="size-9 mx-auto bg-[#344054] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#475467] transition-colors"
              >
                <ArrowLeft size={18} strokeWidth={1.8} className="text-[#D0D5DD]" />
              </div>
            ) : (
              <div
                onClick={onBack}
                className="-ml-2 w-fit flex items-center gap-2 bg-[#344054] rounded-r-lg pl-3 pr-8 py-3 cursor-pointer hover:bg-[#475467] transition-colors"
              >
                <ArrowLeft size={18} strokeWidth={1.8} className="text-[#D0D5DD]" />
                <span className="text-[14px] font-medium text-[#D0D5DD] leading-none">Go back</span>
              </div>
            )
          )}

          {/* Nav items */}
          <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
            {isSettings ? (
              sections.map((section, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {!collapsed && (
                    <div className="px-2 pb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                        {section.label}
                      </span>
                    </div>
                  )}
                  {collapsed && i > 0 && <div className="h-px bg-[#1D2939] my-2 mx-3" />}
                  {section.items.map(item => (
                    <NavItemSettings key={item.label} {...item} collapsed={collapsed} />
                  ))}
                </div>
              ))
            ) : (
              navSections.map((section, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {i > 0 && <div className={`h-px bg-[#1D2939] my-2 ${collapsed ? 'mx-3' : ''}`} />}
                  {section.items.map(item => (
                    <NavItemMainNav key={item.label} {...item} collapsed={collapsed} />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom: Settings */}
        <div className="flex flex-col gap-2 mt-2">
          <div className={`h-px bg-[#1D2939] ${collapsed ? 'mx-3' : ''}`} />
          <NavItem icon={Settings} label="Settings" collapsed={collapsed} />
        </div>
      </div>

      {/* Collapse toggle */}
      <div
        onClick={() => setCollapsed(c => !c)}
        className="absolute bottom-6 -right-3 bg-[#73E2A3] rounded-xl size-6 flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#5DD08C] transition-colors"
      >
        {collapsed ? (
          <ChevronRight size={14} className="text-[#101828]" strokeWidth={2.5} />
        ) : (
          <ChevronLeft size={14} className="text-[#101828]" strokeWidth={2.5} />
        )}
      </div>
    </aside>
  )
}
