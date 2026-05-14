import { useState } from 'react'
import {
  UserPlus, Gift, ShoppingCart, Users,
  Percent, DollarSign, SlidersHorizontal,
  Check, ArrowRight,
  Star, Clock,
  User, Mail, Phone,
  Minus, Plus, Pencil, Trash2, X, ChevronDown,
  Sparkles, Copy, Download, AlertTriangle, MessageSquare, Monitor, Tablet, Smartphone, Palette, Send, Upload, QrCode, Barcode, Grid3x3,
} from 'lucide-react'

const SHADOW = 'shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]'

const EARNING_RULES = [
  { id: 'create_account', icon: UserPlus, iconBg: '#EEF4FF', iconColor: '#004EEB', title: 'Create account', description: 'Grant points when customer creates an account.' },
  { id: 'birthday', icon: Gift, iconBg: '#FFF4ED', iconColor: '#EF6820', title: 'Birthday reward', description: 'Reward customers with points on their birthday.' },
  { id: 'purchase', icon: ShoppingCart, iconBg: '#F4F0FF', iconColor: '#6938EF', title: 'Points for purchase', description: 'Grant points for a purchase.' },
  { id: 'referral', icon: Users, iconBg: '#FFFAEB', iconColor: '#D97706', title: 'Referral program', description: 'Grant points when customer refers a friend.' },
]

const REDEMPTION_RULES = [
  { id: 'percentage', icon: Percent, iconBg: '#F2F4F7', iconColor: '#667085', title: 'Percentage off', description: '100 points = 45%' },
  { id: 'amount', icon: DollarSign, iconBg: '#F2F4F7', iconColor: '#667085', title: 'Amount discount', description: '100 points = $1' },
]

const BRAND_COLORS = [
  { hex: '#004EEB', label: 'Blue' }, { hex: '#6938EF', label: 'Purple' },
  { hex: '#16A34A', label: 'Green' }, { hex: '#D97706', label: 'Amber' },
  { hex: '#EF6820', label: 'Orange' }, { hex: '#101828', label: 'Dark' },
]


// ─── Shared primitives ─────────────────────────────────────────────────────────

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-[#004EEB] border-[#004EEB]' : 'border-[#D0D5DD] bg-white hover:border-[#98A2B3]'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {checked && <Check size={9} strokeWidth={3} className="text-white" />}
    </button>
  )
}

function ConfigSelect({ value, onChange, children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] bg-white focus:outline-none focus:border-[#004EEB] transition-colors pr-8 cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" strokeWidth={2} />
    </div>
  )
}

function PointsCountInput({ label, value, onChange, suffix = 'Points', required, compact = false, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="flex w-full items-center border border-[#EAECF0] rounded-[6px] overflow-hidden bg-white">
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value) || 0)}
          className="flex-1 min-w-0 px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none bg-transparent"
        />
        <span className="text-[13px] text-[#98A2B3] px-3 py-1.5 whitespace-nowrap">{suffix}</span>
        {!compact && (
          <>
            <button onClick={() => onChange(Math.max(0, value - 1))} className="p-2 text-[#667085] hover:bg-[#F9FAFB] transition-colors">
              <Minus size={12} strokeWidth={2} />
            </button>
            <button onClick={() => onChange(value + 1)} className="p-2 text-[#667085] hover:bg-[#F9FAFB] transition-colors">
              <Plus size={12} strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function IconPicker({ ruleIcon: Icon, iconBg, iconColor }) {
  const [selected, setSelected] = useState('default')
  const opts = [
    { id: 'default', label: 'Default', icon: <div className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}><Icon size={14} style={{ color: iconColor }} strokeWidth={1.8} /></div> },
    { id: 'upload', label: 'Upload your own', icon: <div className="w-8 h-8 bg-[#F2F4F7] rounded-[6px] flex items-center justify-center shrink-0"><Upload size={14} className="text-[#667085]" strokeWidth={1.8} /></div> },
  ]
  return (
    <div>
      <label className="text-[13px] font-medium text-[#344054] block mb-2">Icon</label>
      <div className="flex flex-col gap-2">
        {opts.map(opt => {
          const active = selected === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[8px] border transition-colors ${active ? 'border-[#004EEB] bg-[#F8FBFF]' : 'border-[#EAECF0] bg-white hover:bg-[#F9FAFB]'}`}
            >
              {opt.icon}
              <span className={`text-[13px] font-medium flex-1 text-left ${active ? 'text-[#101828]' : 'text-[#344054]'}`}>{opt.label}</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-[#004EEB]' : 'border-[#D0D5DD]'}`}>
                {active && <div className="w-2 h-2 rounded-full bg-[#004EEB]" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ExpiryRow({ enabled, onToggle, value, onChange, unit, onUnitChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div>
        <div className="flex items-center gap-2.5">
          <Toggle checked={enabled} onChange={onToggle} />
          <span className="text-[13px] font-medium text-[#344054]">Set expiry limit</span>
        </div>
        <p className="text-[13px] text-[#667085] mt-0.5 ml-[26px]">Till when can a customer redeem these points.</p>
      </div>
      {enabled && (
        <div className="flex items-center gap-2 ml-[26px]">
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            className="flex-1 min-w-0 border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB]"
          />
          <ConfigSelect value={unit} onChange={onUnitChange} className="w-28 shrink-0">
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </ConfigSelect>
        </div>
      )}
    </div>
  )
}

function ConfigHeader({ icon: Icon, iconBg, iconColor, title, description }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
          <Icon size={18} style={{ color: iconColor }} strokeWidth={1.8} />
        </div>
        <p className="text-[16px] font-semibold text-[#101828]">{title}</p>
      </div>
      <p className="text-[13px] text-[#667085] leading-[1.5]">{description}</p>
    </div>
  )
}

function RadioGroup({ value, onChange, options }) {
  return (
    <div className="flex items-center gap-5">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer" onClick={() => onChange(opt.value)}>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${value === opt.value ? 'border-[#004EEB]' : 'border-[#D0D5DD]'}`}>
            {value === opt.value && <div className="w-2 h-2 rounded-full bg-[#004EEB]" />}
          </div>
          <span className="text-[13px] text-[#344054]">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

// ─── Section card ──────────────────────────────────────────────────────────────

function SectionCard({ title, description, action, children, className = '' }) {
  return (
    <div className={`border border-[#EAECF0] rounded-[8px] overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b border-[#EAECF0] bg-[#F9FAFB] flex items-center justify-between">
        <div>
          <p className="text-[14px] font-semibold text-[#101828]">{title}</p>
          {description && <p className="text-[12px] text-[#667085] mt-0.5">{description}</p>}
        </div>
        {action && <div className="shrink-0 ml-4">{action}</div>}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

function FlatSection({ title, description, action, children }) {
  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[16px] font-semibold text-[#101828]">{title}</p>
          {description && <p className="text-[13px] text-[#667085] mt-0.5 leading-[1.4]">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  )
}

function CancelConfirmModal({ onStay, onLeave }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] w-[420px] p-6 flex flex-col gap-5" style={{ boxShadow: '0 20px 48px rgba(16,24,40,0.18)' }}>
        <div>
          <p className="text-[16px] font-semibold text-[#101828]">Discard changes?</p>
          <p className="text-[13px] text-[#667085] mt-1.5 leading-[1.5]">Any unsaved changes to this campaign will be lost. This action cannot be undone.</p>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onStay} className="px-4 py-2 text-[14px] font-medium text-[#344054] border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">Keep editing</button>
          <button onClick={onLeave} className="px-5 py-2 text-[14px] font-semibold text-white bg-red-600 rounded-[6px] hover:bg-red-700 transition-colors">Discard</button>
        </div>
      </div>
    </div>
  )
}

// ─── Inline modals ─────────────────────────────────────────────────────────────

function InlineModal({ title, subtitle, onCancel, children, confirmLabel = 'Save changes', onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] w-[400px] p-6 flex flex-col gap-5" style={{ boxShadow: '0 20px 48px rgba(16,24,40,0.18)' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[16px] font-semibold text-[#101828]">{title}</p>
            <p className="text-[13px] text-[#667085] mt-0.5 leading-[1.4]">{subtitle}</p>
          </div>
          <button onClick={onCancel} className="text-[#98A2B3] hover:text-[#344054] transition-colors shrink-0 mt-0.5">
            <X size={16} strokeWidth={2} />
          </button>
        </div>
        {children}
        <div className="flex justify-end gap-3 pt-1">
          <button onClick={onCancel} className="px-4 py-2 text-[14px] font-medium text-[#344054] border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-5 py-2 text-[14px] font-semibold text-white bg-[#004EEB] rounded-[6px] hover:bg-[#0040C9] transition-colors">{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

// ─── Rule config panels ────────────────────────────────────────────────────────

function CreateAccountConfig() {
  const [points, setPoints] = useState(100)
  const [expiryEnabled, setExpiryEnabled] = useState(true)
  const [expiryValue, setExpiryValue] = useState('100')
  const [expiryUnit, setExpiryUnit] = useState('days')
  const [allotTiming, setAllotTiming] = useState('immediately')

  return (
    <div className="flex flex-col gap-6">
      <ConfigHeader icon={UserPlus} iconBg="#EEF4FF" iconColor="#004EEB" title="Create account" description="Reward people for joining your brand with some points." />
      <PointsCountInput label="Points count" required value={points} onChange={setPoints} />
      <IconPicker ruleIcon={UserPlus} iconBg="#EEF4FF" iconColor="#004EEB" />
      <ExpiryRow enabled={expiryEnabled} onToggle={() => setExpiryEnabled(v => !v)} value={expiryValue} onChange={setExpiryValue} unit={expiryUnit} onUnitChange={setExpiryUnit} />
      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">When to allot points</label>
        <ConfigSelect value={allotTiming} onChange={setAllotTiming}>
          <option value="immediately">Immediately</option>
          <option value="15mins">15 mins</option>
          <option value="30mins">30 mins</option>
          <option value="1hour">1 hour</option>
        </ConfigSelect>
      </div>
    </div>
  )
}

function BirthdayConfig() {
  const [points, setPoints] = useState(100)
  const [expiryEnabled, setExpiryEnabled] = useState(true)
  const [expiryValue, setExpiryValue] = useState('100')
  const [expiryUnit, setExpiryUnit] = useState('days')
  const [allotTiming, setAllotTiming] = useState('same_day')
  const [eligibilityValue, setEligibilityValue] = useState('30')
  const [eligibilityUnit, setEligibilityUnit] = useState('days')

  return (
    <div className="flex flex-col gap-6">
      <ConfigHeader icon={Gift} iconBg="#FFF4ED" iconColor="#EF6820" title="Birthday reward" description='Wish people "happy birthday" with some points.' />
      <PointsCountInput label="Points count" required value={points} onChange={setPoints} />
      <IconPicker ruleIcon={Gift} iconBg="#FFF4ED" iconColor="#EF6820" />
      <ExpiryRow enabled={expiryEnabled} onToggle={() => setExpiryEnabled(v => !v)} value={expiryValue} onChange={setExpiryValue} unit={expiryUnit} onUnitChange={setExpiryUnit} />
      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">When to allot points</label>
        <ConfigSelect value={allotTiming} onChange={setAllotTiming}>
          <option value="same_day">Same day</option>
          <option value="day_before">Day before</option>
          <option value="immediately">Immediately</option>
        </ConfigSelect>
      </div>
      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Reward eligibility timing</label>
        <div className="flex items-center gap-2">
          <input value={eligibilityValue} onChange={e => setEligibilityValue(e.target.value)} className="flex-1 min-w-0 border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB]" />
          <ConfigSelect value={eligibilityUnit} onChange={setEligibilityUnit} className="w-28 shrink-0">
            <option value="days">Days</option>
            <option value="months">Months</option>
          </ConfigSelect>
        </div>
      </div>
    </div>
  )
}

function PurchaseConfig() {
  const [conditionType, setConditionType] = useState('product_based')
  const [allowSubscription, setAllowSubscription] = useState('yes')
  const [subscriptionType, setSubscriptionType] = useState('first_time')
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ name: '', price: '', points: '' })
  const [cartValues, setCartValues] = useState([{ id: 1, cartValue: 450, points: 100 }])
  const [expiryEnabled, setExpiryEnabled] = useState(true)
  const [expiryValue, setExpiryValue] = useState('100')
  const [expiryUnit, setExpiryUnit] = useState('days')
  const [taxCondition, setTaxCondition] = useState('before')
  const [ordersPerDay, setOrdersPerDay] = useState('10')
  const [maxPoints, setMaxPoints] = useState('2500')
  const [showAddValue, setShowAddValue] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [modalDraft, setModalDraft] = useState({ name: '', price: '', points: '' })

  function startEdit(product) {
    setEditingId(product.id)
    setDraft({ name: product.name, price: product.price, points: product.points ?? '' })
  }

  function saveRow(id) {
    setProducts(prev => prev.map(p => p.id === id ? { id, name: draft.name, price: draft.price, points: draft.points === '' ? null : Number(draft.points) } : p))
    setEditingId(null)
  }

  function cancelRow() {
    setEditingId(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <ConfigHeader icon={ShoppingCart} iconBg="#F4F0FF" iconColor="#6938EF" title="Points for purchase" description="Reward customers for purchasing from you with some points." />

      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Condition type</label>
        <ConfigSelect value={conditionType} onChange={setConditionType}>
          <option value="product_based">Product based</option>
          <option value="cart_based">Cart based</option>
        </ConfigSelect>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#344054]">Allow for subscription purchase</label>
        <div className="flex gap-2">
          <ConfigSelect value={allowSubscription} onChange={setAllowSubscription} className="w-20">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </ConfigSelect>
          <ConfigSelect value={subscriptionType} onChange={setSubscriptionType} className="flex-1">
            <option value="first_time">Only first time purchase</option>
            <option value="all">All purchases</option>
          </ConfigSelect>
        </div>
      </div>

      {conditionType === 'product_based' ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[13px] font-medium text-[#344054]">Condition table</label>
            <div className="flex items-center gap-4">
              <button onClick={() => { setModalDraft({ name: '', price: '', points: '' }); setShowAddProduct(true) }} className="flex items-center gap-1 text-[13px] font-medium text-[#344054] hover:text-[#101828] transition-colors">
                <Plus size={12} strokeWidth={2.5} />Add product
              </button>
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#004EEB] hover:text-[#0040C9] transition-colors">
                <Grid3x3 size={12} strokeWidth={2} />Add all products
              </button>
            </div>
          </div>
          <div className="border border-[#EAECF0] rounded-[8px] overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                  <th className="w-[45%] px-3 py-2.5 text-left text-[12px] font-semibold text-[#344054]">Product</th>
                  <th className="w-24 px-3 py-2.5 text-left text-[12px] font-semibold text-[#344054]">Price</th>
                  <th className="px-3 py-2.5 text-left text-[12px] font-semibold text-[#344054]">Points rewarded</th>
                  <th className="w-20 px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-[13px] text-[#98A2B3]">
                      No products added yet. Click "Add product" to get started.
                    </td>
                  </tr>
                )}
                {products.map(product => (
                  <tr key={product.id} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#FAFAFA]">
                    <td className="px-3 py-2.5 text-[13px] text-[#101828] truncate">{product.name}</td>
                    <td className="px-3 py-2.5 text-[13px] text-[#344054]">${product.price}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] text-[#344054]">{product.points ?? '—'}</span>
                        <span className="text-[13px] text-[#98A2B3]">pts</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <button onClick={() => startEdit(product)} className="text-[#98A2B3] hover:text-[#344054] transition-colors"><Pencil size={13} strokeWidth={1.8} /></button>
                        <button onClick={() => setProducts(prev => prev.filter(p => p.id !== product.id))} className="text-[#98A2B3] hover:text-red-500 transition-colors"><Trash2 size={13} strokeWidth={1.8} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <label className="text-[13px] font-medium text-[#344054] block mb-2">Condition table</label>
          <div className="border border-[#EAECF0] rounded-[8px] overflow-hidden mb-2">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                  <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-[#344054]">Cart value</th>
                  <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-[#344054]">Points rewarded</th>
                  <th className="w-16 px-4 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {cartValues.map(row => (
                  <tr key={row.id} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#FAFAFA]">
                    <td className="px-4 py-2.5 text-[13px] text-[#344054]">${row.cartValue}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] text-[#344054]">{row.points}</span>
                        <span className="text-[13px] text-[#98A2B3]">Points</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <button className="text-[#98A2B3] hover:text-[#344054] transition-colors"><Pencil size={13} strokeWidth={1.8} /></button>
                        <button onClick={() => setCartValues(prev => prev.filter(r => r.id !== row.id))} className="text-[#98A2B3] hover:text-red-500 transition-colors"><Trash2 size={13} strokeWidth={1.8} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => setShowAddValue(true)} className="flex items-center gap-1 text-[13px] font-medium text-[#004EEB] hover:text-[#0040C9] transition-colors">
            <Plus size={12} strokeWidth={2.5} />Add new value
          </button>
        </div>
      )}

      <IconPicker ruleIcon={ShoppingCart} iconBg="#F4F0FF" iconColor="#6938EF" />
      <ExpiryRow enabled={expiryEnabled} onToggle={() => setExpiryEnabled(v => !v)} value={expiryValue} onChange={setExpiryValue} unit={expiryUnit} onUnitChange={setExpiryUnit} />

      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-2">Purchase conditions to be met by customers</label>
        <RadioGroup value={taxCondition} onChange={setTaxCondition} options={[{ value: 'before', label: 'Before tax' }, { value: 'after', label: 'After tax' }]} />
      </div>

      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Points-earning orders per customer per day</label>
        <div className="flex w-full items-center border border-[#EAECF0] rounded-[6px] overflow-hidden bg-white">
          <input value={ordersPerDay} onChange={e => setOrdersPerDay(e.target.value)} className="flex-1 min-w-0 px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none bg-transparent" />
          <span className="text-[13px] text-[#98A2B3] px-2 py-1.5 shrink-0">Orders</span>
          <div className="relative shrink-0">
            <select className="appearance-none text-[13px] text-[#667085] px-2 py-1.5 pr-5 bg-white focus:outline-none">
              <option>/day</option><option>/week</option>
            </select>
            <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
          </div>
        </div>
      </div>
      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Max points per order</label>
        <ConfigSelect value={maxPoints} onChange={setMaxPoints}>
          <option value="2500">2,500 points</option>
          <option value="5000">5,000 points</option>
          <option value="10000">10,000 points</option>
          <option value="unlimited">Unlimited</option>
        </ConfigSelect>
      </div>

      {showAddValue && (
        <AddCartValueModal onCancel={() => setShowAddValue(false)} onAdd={v => { setCartValues(prev => [...prev, { id: Date.now(), ...v }]); setShowAddValue(false) }} />
      )}
      {showAddProduct && (
        <AddProductModal
          draft={modalDraft}
          setDraft={setModalDraft}
          onCancel={() => setShowAddProduct(false)}
          onAdd={() => {
            setProducts(prev => [...prev, { id: Date.now(), name: modalDraft.name, price: modalDraft.price, points: modalDraft.points === '' ? null : Number(modalDraft.points) }])
            setShowAddProduct(false)
          }}
        />
      )}
    </div>
  )
}

function AddProductModal({ draft, setDraft, onCancel, onAdd }) {
  return (
    <InlineModal title="Add product" subtitle="Enter product details to assign points." onCancel={onCancel} confirmLabel="Add product" onConfirm={onAdd}>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Product name <span className="text-red-500">*</span></label>
          <input autoFocus value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} placeholder="e.g. Vanilla latte" className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
        </div>
        <div>
          <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Price</label>
          <div className="flex items-center border border-[#EAECF0] rounded-[6px] overflow-hidden">
            <span className="text-[13px] text-[#98A2B3] px-3 py-1.5 border-r border-[#EAECF0] bg-[#F9FAFB]">$</span>
            <input type="number" value={draft.price} onChange={e => setDraft(d => ({ ...d, price: e.target.value }))} placeholder="0.00" className="flex-1 px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Points rewarded <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-[#EAECF0] rounded-[6px] overflow-hidden">
            <input type="number" value={draft.points} onChange={e => setDraft(d => ({ ...d, points: e.target.value }))} placeholder="0" className="flex-1 px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none" />
            <span className="text-[13px] text-[#98A2B3] px-3 py-1.5 border-l border-[#EAECF0] bg-[#F9FAFB]">pts</span>
          </div>
        </div>
      </div>
    </InlineModal>
  )
}

function AddCartValueModal({ onCancel, onAdd }) {
  const [cartValue, setCartValue] = useState('450.00')
  const [points, setPoints] = useState(100)
  return (
    <InlineModal title="Add new value" subtitle="Please fill all the necessary details." onCancel={onCancel} confirmLabel="Add value" onConfirm={() => onAdd({ cartValue: parseFloat(cartValue), points })}>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-[13px] font-medium text-[#344054] flex items-center gap-0.5 mb-1.5">Cart value <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-[#EAECF0] rounded-[6px] overflow-hidden px-3 py-1.5 gap-1.5">
            <span className="text-[13px] text-[#98A2B3]">$</span>
            <input value={cartValue} onChange={e => setCartValue(e.target.value)} className="flex-1 text-[13px] text-[#101828] focus:outline-none" />
          </div>
        </div>
        <PointsCountInput label="Points count" required value={points} onChange={setPoints} />
      </div>
    </InlineModal>
  )
}

function ReferralConfig() {
  const [referralsRequired, setReferralsRequired] = useState(5)
  const [pointsPerReferral, setPointsPerReferral] = useState(100)
  const [joinerPoints, setJoinerPoints] = useState(50)
  const [expiryEnabled, setExpiryEnabled] = useState(true)
  const [expiryValue, setExpiryValue] = useState('100')
  const [expiryUnit, setExpiryUnit] = useState('days')
  const [allotReferee, setAllotReferee] = useState('after_join')

  return (
    <div className="flex flex-col gap-6">
      <ConfigHeader icon={Users} iconBg="#FFFAEB" iconColor="#D97706" title="Referral program" description="Reward customers when they refer someone your brand some points." />
      <PointsCountInput label="Number of referral(s) required" value={referralsRequired} onChange={setReferralsRequired} suffix="referral(s)" />
      <PointsCountInput label="Points count for each referral" required value={pointsPerReferral} onChange={setPointsPerReferral} />
      <PointsCountInput label="Joiner get points" required value={joinerPoints} onChange={setJoinerPoints} />
      <IconPicker ruleIcon={Users} iconBg="#FFFAEB" iconColor="#D97706" />
      <ExpiryRow enabled={expiryEnabled} onToggle={() => setExpiryEnabled(v => !v)} value={expiryValue} onChange={setExpiryValue} unit={expiryUnit} onUnitChange={setExpiryUnit} />
      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Allot referee points</label>
        <ConfigSelect value={allotReferee} onChange={setAllotReferee}>
          <option value="after_join">After their referral joins the brand</option>
          <option value="after_purchase">After their referral makes a purchase</option>
          <option value="immediately">Immediately</option>
        </ConfigSelect>
      </div>
    </div>
  )
}

function LimitsTable({ rows }) {
  return (
    <div>
      {rows.map((row, i) => (
        <div key={row.label} className={`flex items-center gap-3 py-3 ${i < rows.length - 1 ? 'border-b border-[#F2F4F7]' : ''}`}>
          <div className="flex items-center gap-2 w-28 shrink-0">
            <Toggle checked={row.enabled} onChange={row.onToggle} />
            <span className="text-[13px] text-[#344054]">{row.label}</span>
          </div>
          {row.enabled ? (
            <>
              <div className="flex-1 min-w-0">{row.minField}</div>
              <span className="text-[13px] text-[#98A2B3] shrink-0">to</span>
              <div className="flex-1 min-w-0">{row.maxField}</div>
            </>
          ) : (
            <span className="text-[13px] text-[#98A2B3]">Disabled</span>
          )}
        </div>
      ))}
    </div>
  )
}

function PercentageOffConfig() {
  const [points, setPoints] = useState(100)
  const [discountValue, setDiscountValue] = useState('10')
  const [pointsEnabled, setPointsEnabled] = useState(true)
  const [pointsMin, setPointsMin] = useState(10)
  const [pointsMax, setPointsMax] = useState(250)
  const [pctEnabled, setPctEnabled] = useState(true)
  const [pctMin, setPctMin] = useState('10')
  const [pctMax, setPctMax] = useState('80')
  const [prefixEnabled, setPrefixEnabled] = useState(true)
  const [prefix, setPrefix] = useState('GHL')

  const numInput = (value, onChange, suffix) => (
    <div className="flex w-full items-center border border-[#EAECF0] rounded-[6px] overflow-hidden bg-white">
      <input value={value} onChange={e => onChange(e.target.value)} className="flex-1 min-w-0 px-2.5 py-1.5 text-[13px] text-[#101828] focus:outline-none bg-transparent" />
      {suffix && <span className="text-[13px] text-[#98A2B3] px-2 py-1.5 shrink-0">{suffix}</span>}
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <ConfigHeader icon={Percent} iconBg="#F2F4F7" iconColor="#667085" title="Percentage off" description="Allow customers to use their earned points for a discount on their next purchase." />
      <PointsCountInput label="Points count" required value={points} onChange={setPoints} />
      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Percentage discount value <span className="text-red-500">*</span></label>
        {numInput(discountValue, setDiscountValue, '%')}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#101828] mb-0.5">Limits</p>
        <p className="text-[13px] text-[#667085] mb-3">Set minimum and maximum redemption values for users.</p>
        <LimitsTable rows={[
          { label: 'Points', enabled: pointsEnabled, onToggle: () => setPointsEnabled(v => !v), minField: <PointsCountInput compact value={pointsMin} onChange={setPointsMin} />, maxField: <PointsCountInput compact value={pointsMax} onChange={setPointsMax} /> },
          { label: 'Percentage', enabled: pctEnabled, onToggle: () => setPctEnabled(v => !v), minField: numInput(pctMin, setPctMin, '%'), maxField: numInput(pctMax, setPctMax, '%') },
        ]} />
      </div>
      <IconPicker ruleIcon={Percent} iconBg="#F2F4F7" iconColor="#667085" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Toggle checked={prefixEnabled} onChange={() => setPrefixEnabled(v => !v)} />
          <span className="text-[13px] font-medium text-[#344054]">Add a prefix to discount codes</span>
        </div>
        {prefixEnabled && (
          <div className="inline-flex items-center border border-[#EAECF0] rounded-[6px] overflow-hidden bg-white">
            <input value={prefix} onChange={e => setPrefix(e.target.value)} className="w-24 px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none bg-transparent" />
            <span className="text-[13px] text-[#98A2B3] px-3 py-1.5">-TEST-121-TEST</span>
          </div>
        )}
      </div>
    </div>
  )
}

function AmountOffConfig() {
  const [points, setPoints] = useState(100)
  const [discountValue, setDiscountValue] = useState('1')
  const [pointsEnabled, setPointsEnabled] = useState(true)
  const [pointsMin, setPointsMin] = useState(10)
  const [pointsMax, setPointsMax] = useState(250)
  const [amountEnabled, setAmountEnabled] = useState(true)
  const [amountMin, setAmountMin] = useState('10')
  const [amountMax, setAmountMax] = useState('100')
  const [prefixEnabled, setPrefixEnabled] = useState(true)
  const [prefix, setPrefix] = useState('GHL')

  const amountInput = (value, onChange) => (
    <div className="flex w-full items-center border border-[#EAECF0] rounded-[6px] overflow-hidden bg-white">
      <span className="text-[13px] text-[#98A2B3] px-2.5 py-1.5 shrink-0">$</span>
      <input value={value} onChange={e => onChange(e.target.value)} className="flex-1 min-w-0 px-2.5 py-1.5 text-[13px] text-[#101828] focus:outline-none bg-transparent" />
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <ConfigHeader icon={DollarSign} iconBg="#F2F4F7" iconColor="#667085" title="Amount off" description="Allow customers to use their earned points for a discount on their next purchase." />
      <PointsCountInput label="Points count" required value={points} onChange={setPoints} />
      <div>
        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Amount discount value <span className="text-red-500">*</span></label>
        {amountInput(discountValue, setDiscountValue)}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#101828] mb-0.5">Limits</p>
        <p className="text-[13px] text-[#667085] mb-3">Set minimum and maximum redemption values for users.</p>
        <LimitsTable rows={[
          { label: 'Points', enabled: pointsEnabled, onToggle: () => setPointsEnabled(v => !v), minField: <PointsCountInput compact value={pointsMin} onChange={setPointsMin} />, maxField: <PointsCountInput compact value={pointsMax} onChange={setPointsMax} /> },
          { label: 'Amount', enabled: amountEnabled, onToggle: () => setAmountEnabled(v => !v), minField: amountInput(amountMin, setAmountMin), maxField: amountInput(amountMax, setAmountMax) },
        ]} />
      </div>
      <IconPicker ruleIcon={DollarSign} iconBg="#F2F4F7" iconColor="#667085" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Toggle checked={prefixEnabled} onChange={() => setPrefixEnabled(v => !v)} />
          <span className="text-[13px] font-medium text-[#344054]">Add a prefix to discount codes</span>
        </div>
        {prefixEnabled && (
          <div className="inline-flex items-center border border-[#EAECF0] rounded-[6px] overflow-hidden bg-white">
            <input value={prefix} onChange={e => setPrefix(e.target.value)} className="w-24 px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none bg-transparent" />
            <span className="text-[13px] text-[#98A2B3] px-3 py-1.5">-TEST-121-TEST</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 1 ────────────────────────────────────────────────────────────────────

function RuleNavItem({ icon: Icon, iconBg, iconColor, label, isSelected, isEnabled, onSelect, onToggle, isRadio }) {
  return (
    <div onClick={onSelect} className={`flex items-center gap-3 px-3 py-2.5 rounded-[8px] cursor-pointer transition-colors ${isSelected ? 'bg-[#F2F4F7]' : 'hover:bg-[#F9FAFB]'}`}>
      <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
        <Icon size={15} style={{ color: iconColor }} strokeWidth={1.8} />
      </div>
      <span className={`text-[13px] flex-1 truncate min-w-0 ${isSelected ? 'font-semibold text-[#101828]' : 'font-medium text-[#344054]'}`}>{label}</span>
      <div
        className={`shrink-0 flex items-center justify-center transition-colors ${isRadio ? 'w-4 h-4 rounded-full border-2' : 'w-4 h-4 rounded-[4px] border-2'} ${isEnabled ? (isRadio ? 'border-[#004EEB]' : 'bg-[#004EEB] border-[#004EEB]') : 'border-[#D0D5DD]'}`}
        onClick={e => { e.stopPropagation(); onToggle() }}
      >
        {isEnabled && isRadio && <div className="w-2 h-2 rounded-full bg-[#004EEB]" />}
        {isEnabled && !isRadio && <Check size={9} strokeWidth={3} className="text-white" />}
      </div>
    </div>
  )
}

function EarningRuleCard({ rule, checked, onToggle, onConfigure }) {
  const { icon: Icon, iconBg, iconColor, title, description } = rule
  return (
    <div className="flex items-center gap-3 py-3 px-3 hover:bg-[#FAFAFA] transition-colors">
      <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
        <Icon size={15} style={{ color: iconColor }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#344054]">{title}</p>
        <p className="text-[13px] text-[#98A2B3] mt-0.5 leading-[1.4]">{description}</p>
      </div>
      {checked && (
        <button onClick={onConfigure} className="shrink-0 flex items-center gap-1 text-[12px] font-medium text-[#98A2B3] hover:text-[#667085] transition-colors whitespace-nowrap mr-1">
          Configure <ArrowRight size={11} strokeWidth={2} />
        </button>
      )}
      <button
        onClick={onToggle}
        className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-[#004EEB] border-[#004EEB]' : 'border-[#D0D5DD] bg-white hover:border-[#98A2B3]'}`}
      >
        {checked && <Check size={9} strokeWidth={3} className="text-white" />}
      </button>
    </div>
  )
}

function RedemptionRuleCard({ rule, selected, onSelect, onConfigure }) {
  const { icon: Icon, iconBg, iconColor, title, description } = rule
  return (
    <div onClick={onSelect} className="flex items-center gap-3 py-3 px-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors">
      <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
        <Icon size={15} style={{ color: iconColor }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#344054]">{title}</p>
        <p className="text-[13px] text-[#98A2B3] mt-0.5">{description}</p>
      </div>
      {selected && (
        <button onClick={e => { e.stopPropagation(); onConfigure() }} className="shrink-0 flex items-center gap-1 text-[12px] font-medium text-[#98A2B3] hover:text-[#667085] transition-colors whitespace-nowrap mr-1">
          Configure <ArrowRight size={11} strokeWidth={2} />
        </button>
      )}
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-[#004EEB]' : 'border-[#D0D5DD]'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-[#004EEB]" />}
      </div>
    </div>
  )
}

function getConfigPanel(rule) {
  switch (rule) {
    case 'create_account': return <CreateAccountConfig />
    case 'birthday': return <BirthdayConfig />
    case 'purchase': return <PurchaseConfig />
    case 'referral': return <ReferralConfig />
    case 'percentage': return <PercentageOffConfig />
    case 'amount': return <AmountOffConfig />
    default: return null
  }
}

function Step1({ enabledRules, setEnabledRules, redemptionRule, setRedemptionRule, configuringRule, setConfiguringRule }) {

  function toggleRule(id) {
    setEnabledRules(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  if (configuringRule) {
    return (
      <div className="flex flex-1 min-h-0">
        {/* Left — fixed, never scrolls */}
        <div className="w-[260px] shrink-0 flex flex-col pl-5 pr-3 py-6 overflow-hidden">
          <button
            onClick={() => setConfiguringRule(null)}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#667085] hover:text-[#344054] transition-colors mb-4 px-1"
          >
            <ArrowRight size={13} className="rotate-180 shrink-0" strokeWidth={2} />
            All rules
          </button>
          <div className="border border-[#EAECF0] rounded-[8px] p-1.5 flex flex-col gap-0.5">
            <p className="text-[12px] font-medium text-[#667085] px-2 pt-1 pb-0.5">Earning rules</p>
            {EARNING_RULES.map(rule => (
              <RuleNavItem
                key={rule.id}
                icon={rule.icon}
                iconBg={rule.iconBg}
                iconColor={rule.iconColor}
                label={rule.title}
                isSelected={configuringRule === rule.id}
                isEnabled={enabledRules.includes(rule.id)}
                onSelect={() => setConfiguringRule(rule.id)}
                onToggle={() => toggleRule(rule.id)}
                isRadio={false}
              />
            ))}
            <p className="text-[12px] font-medium text-[#667085] px-2 pt-2 pb-0.5">Redemption rule</p>
            {REDEMPTION_RULES.map(rule => (
              <RuleNavItem
                key={rule.id}
                icon={rule.icon}
                iconBg={rule.iconBg}
                iconColor={rule.iconColor}
                label={rule.title}
                isSelected={configuringRule === rule.id}
                isEnabled={redemptionRule === rule.id}
                onSelect={() => setConfiguringRule(rule.id)}
                onToggle={() => { setRedemptionRule(rule.id); setConfiguringRule(rule.id) }}
                isRadio={true}
              />
            ))}
          </div>
        </div>
        {/* Right — scrolls independently */}
        <div className="flex-1 min-w-0 overflow-auto no-scrollbar px-7 py-6">
          {getConfigPanel(configuringRule)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-semibold text-[#344054]">Earning rules</p>
        <div className="flex flex-col divide-y divide-[#F2F4F7]">
          {EARNING_RULES.map(rule => (
            <EarningRuleCard
              key={rule.id}
              rule={rule}
              checked={enabledRules.includes(rule.id)}
              onToggle={() => toggleRule(rule.id)}
              onConfigure={() => setConfiguringRule(rule.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-semibold text-[#344054]">Redemption rule</p>
        <div className="flex flex-col divide-y divide-[#F2F4F7]">
          {REDEMPTION_RULES.map(rule => (
            <RedemptionRuleCard
              key={rule.id}
              rule={rule}
              selected={redemptionRule === rule.id}
              onSelect={() => setRedemptionRule(rule.id)}
              onConfigure={() => setConfiguringRule(rule.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const WIZARD_STEPS = [
  { num: 1, label: 'Setup rules', desc: 'Define how customers can earn points.' },
  { num: 2, label: 'Enrollment page', desc: 'Create a branded signup experience.' },
  { num: 3, label: 'Member portal', desc: 'Set up the member experience.' },
]

// ─── Stepper ───────────────────────────────────────────────────────────────────

function Stepper({ step }) {
  return (
    <div className="flex items-center">
      {WIZARD_STEPS.map((s, i) => (
        <div key={s.num} className="flex items-center">
          {i > 0 && (
            <div className="w-8 h-0.5 mx-2 rounded-full transition-colors" style={{ backgroundColor: step > i ? '#004EEB' : '#D0D5DD' }} />
          )}
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${step >= s.num ? 'bg-[#004EEB]' : 'bg-white border-2 border-[#D0D5DD]'}`}>
              {step > s.num
                ? <Check size={11} strokeWidth={2.5} className="text-white" />
                : <span className={`text-[11px] font-semibold leading-none ${step === s.num ? 'text-white' : 'text-[#98A2B3]'}`}>{s.num}</span>
              }
            </div>
            <span className={`text-[13px] whitespace-nowrap transition-colors ${step === s.num ? 'font-semibold text-[#004EEB]' : step > s.num ? 'font-medium text-[#667085]' : 'font-medium text-[#98A2B3]'}`}>
              {s.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Phone frame ───────────────────────────────────────────────────────────────

function PhoneFrame({ children, height = 440, scale = 1 }) {
  const w = 214
  return (
    <div className="relative shrink-0" style={{ width: w * scale, height: height * scale }}>
      <div style={{ width: w, height, transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left', position: 'relative' }}>
        <div className="absolute inset-0 rounded-[30px] bg-[#1D2939]" style={{ boxShadow: '0 20px 48px rgba(16,24,40,0.22)' }}>
          <div className="absolute inset-[7px] rounded-[24px] bg-white overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[14px] bg-[#1D2939] rounded-b-[8px] z-10" />
            <div className="absolute inset-0 overflow-y-auto" style={{ paddingTop: 18, scrollbarWidth: 'none' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Shared: theme picker + color swatch table ─────────────────────────────────

const PALETTE_THEMES = ['#004EEB', '#F5A623', '#6938EF', '#EF4444']

function ThemePicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {PALETTE_THEMES.map(color => (
        <button key={color} onClick={() => onChange(color)}
          className={`w-8 h-8 rounded-full transition-all hover:scale-105 ${value === color ? 'ring-2 ring-offset-2 ring-[#667085]' : ''}`}
          style={{ backgroundColor: color }}
        />
      ))}
      <button className="w-8 h-8 rounded-full border-2 border-[#EAECF0] flex items-center justify-center hover:bg-[#F9FAFB] transition-colors">
        <Palette size={13} className="text-[#667085]" strokeWidth={1.8} />
      </button>
    </div>
  )
}

function ColorSwatchTable({ rows }) {
  return (
    <div className="border border-[#EAECF0] rounded-[8px] overflow-hidden">
      {rows.map((row, i) => (
        <div key={row.label} className={`flex items-center justify-between px-3 py-2.5 ${i < rows.length - 1 ? 'border-b border-[#F2F4F7]' : ''}`}>
          <span className="text-[13px] text-[#344054]">{row.label}</span>
          <div className="w-5 h-5 rounded-full border border-[#E4E7EC] cursor-pointer shrink-0" style={{ backgroundColor: row.color }} />
        </div>
      ))}
    </div>
  )
}

// ─── Step 2: Enrollment page ───────────────────────────────────────────────────

const INITIAL_CONTENT_CARDS = [
  { id: 1, title: 'Earn on every purchase', subtitle: 'Get 1 point for every $1 spent.', enabled: true },
  { id: 2, title: 'Mobile wallet', subtitle: 'Add your card to apple wallet.', enabled: true },
  { id: 3, title: 'Exclusive rewards', subtitle: 'Redeem points for discount and free items.', enabled: true },
]

const STEP2_COLORS = [
  { label: 'Background color', color: '#FFFFFF' },
  { label: 'Header text', color: '#101828' },
  { label: 'Body text', color: '#667085' },
  { label: 'Button color', color: '#004EEB' },
  { label: 'Form background color', color: '#FFFFFF' },
  { label: 'Earning rules background color', color: '#FFFFFF' },
  { label: 'Icon(s) color', color: '#004EEB' },
]

function EnrollmentPhoneContent({ theme, heroTitle, heroSubtitle, cards, buttonText }) {
  const CARD_ICONS = [Star, ShoppingCart, Gift]
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Pill badge */}
      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, backgroundColor: theme + '15', border: `1px solid ${theme}28` }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: theme, flexShrink: 0 }} />
          <span style={{ fontSize: 8.5, color: theme, fontWeight: 500 }}>Get 500 bonus points today.</span>
        </div>
      </div>

      {/* Hero text */}
      <div style={{ padding: '8px 14px 0' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#101828', lineHeight: 1.25, margin: 0 }}>{heroTitle || 'Join today!'}</p>
        <p style={{ fontSize: 9, color: '#667085', marginTop: 4, lineHeight: 1.4 }}>{heroSubtitle}</p>
      </div>

      {/* Feature cards */}
      <div style={{ padding: '10px 14px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {cards.filter(c => c.enabled).map((card, i) => {
          const Icon = CARD_ICONS[i] || Gift
          return (
            <div key={card.id} style={{ display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#F9FAFB', borderRadius: 6, padding: '8px 10px' }}>
              <div style={{ width: 24, height: 24, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: theme + '20' }}>
                <Icon size={12} style={{ color: theme }} strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 600, color: '#101828', margin: 0 }}>{card.title}</p>
                <p style={{ fontSize: 8, color: '#667085', margin: '2px 0 0' }}>{card.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Form */}
      <div style={{ padding: '14px 14px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#101828', marginBottom: 8 }}>Create your account</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['First name', 'Email address', 'Phone number', 'Birthday'].map(f => (
            <div key={f} style={{ height: 28, border: '1px solid #D0D5DD', borderRadius: 5, display: 'flex', alignItems: 'center', padding: '0 10px', backgroundColor: 'white' }}>
              <span style={{ fontSize: 9, color: '#98A2B3' }}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, height: 32, borderRadius: 6, backgroundColor: theme, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>{buttonText || 'Verify & join'}</span>
        </div>
        <p style={{ color: '#98A2B3', textAlign: 'center', marginTop: 6, fontSize: 7.5 }}>By joining, you agree to our terms</p>
      </div>
    </div>
  )
}

function QRMini() {
  const S = 21
  const grid = Array.from({ length: S }, (_, r) =>
    Array.from({ length: S }, (_, c) => {
      const inTL = r < 7 && c < 7
      const inTR = r < 7 && c >= 14
      const inBL = r >= 14 && c < 7
      if (inTL || inTR || inBL) {
        const lr = inBL ? r - 14 : r
        const lc = inTR ? c - 14 : c
        if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return 1
        if (lr === 1 || lr === 5 || lc === 1 || lc === 5) return 0
        return (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) ? 1 : 0
      }
      if (r === 6 && c >= 8 && c <= 12) return c % 2 === 0 ? 1 : 0
      if (c === 6 && r >= 8 && r <= 12) return r % 2 === 0 ? 1 : 0
      if (r <= 7 && (c === 7 || c === 13)) return 0
      if (c <= 7 && (r === 7 || r === 13)) return 0
      return (r * 5 + c * 11 + r * c % 7) % 3 === 0 ? 1 : 0
    })
  )
  return (
    <div>
      {grid.map((row, r) => (
        <div key={r} style={{ display: 'flex' }}>
          {row.map((cell, c) => (
            <div key={c} style={{ width: 2.5, height: 2.5, backgroundColor: cell ? '#101828' : 'transparent' }} />
          ))}
        </div>
      ))}
    </div>
  )
}

function BarcodeStrip() {
  const bars = [2,1,3,2,1,1,2,3,1,2,1,1,3,2,1,2,2,1,1,2,3,1,2,1,1,3,2,1,2,1,1,2,3,2,1,1,2,1,3,2,1,2,3,1]
  return (
    <div style={{ display: 'flex', height: 30, alignItems: 'stretch' }}>
      {bars.map((w, i) => (
        <div key={i} style={{ width: w * 1.6, backgroundColor: i % 2 === 0 ? '#101828' : 'white', flexShrink: 0 }} />
      ))}
    </div>
  )
}

function WalletPassFront({ cardBg, imageType, barcodeType }) {
  const textColor = 'white'
  const mutedColor = 'rgba(255,255,255,0.55)'
  return (
    <div style={{ padding: '10px 10px 6px' }}>
      <div className="rounded-[14px] overflow-hidden" style={{ backgroundColor: cardBg, boxShadow: '0 8px 28px rgba(0,0,0,0.3)' }}>
        <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontSize: 8 }}>🌿</div>
            <span style={{ color: textColor, fontWeight: 700, fontSize: 10 }}>TurboLime</span>
          </div>
          <span style={{ color: mutedColor, fontSize: 6.5, letterSpacing: '0.08em' }}>LOYALTY</span>
        </div>
        {imageType === 'custom' && (
          <div style={{ height: 60, background: 'linear-gradient(135deg,#fecaca,#fce7f3,#fed7aa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎁</div>
        )}
        <div className="px-3.5" style={{ paddingTop: imageType === 'custom' ? 10 : 6 }}>
          <p style={{ color: mutedColor, fontSize: 5.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Points balance</p>
          <p style={{ color: textColor, fontWeight: 800, fontSize: 26, lineHeight: 1, marginTop: 2 }}>2,450</p>
        </div>
        <div className="flex items-end justify-between px-3.5 pb-2.5" style={{ marginTop: 8 }}>
          <div>
            <p style={{ color: mutedColor, fontSize: 5.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Member</p>
            <p style={{ color: textColor, fontWeight: 600, fontSize: 8, marginTop: 1 }}>Sara Jones</p>
          </div>
          <div className="text-right">
            <p style={{ color: mutedColor, fontSize: 5.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Status</p>
            <p style={{ color: textColor, fontWeight: 600, fontSize: 8, marginTop: 1 }}>Gold</p>
          </div>
        </div>
        {barcodeType !== 'none' && (
          <div className="mx-2.5 mb-2.5 bg-white rounded-[8px] flex flex-col items-center py-2.5 px-2 gap-1.5">
            {barcodeType === 'qr' ? <QRMini /> : <BarcodeStrip />}
            <p style={{ fontSize: 5, color: '#98A2B3', letterSpacing: '0.2em', fontFamily: 'monospace' }}>TURBO-SARA-2024</p>
          </div>
        )}
      </div>
    </div>
  )
}

function WalletPassBack({ cardBg }) {
  return (
    <div style={{ padding: '10px 10px 6px' }}>
      <div className="rounded-[14px] overflow-hidden" style={{ backgroundColor: cardBg, boxShadow: '0 8px 28px rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-1.5 px-3.5 pt-3 pb-2.5">
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontSize: 8 }}>🌿</div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 10 }}>TurboLime</span>
        </div>
        <div className="mx-3.5" style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />
        <div className="px-3.5 py-3 flex flex-col gap-3.5">
          {[
            ['Terms & conditions', 'https://turbolime.com/terms'],
            ['Customer support', 'support@turbolime.com'],
            ['Website', 'https://turbolime.com'],
          ].map(([label, value]) => (
            <div key={label}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 5.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</p>
              <p style={{ color: 'white', fontSize: 7.5, marginTop: 2 }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CustomizeRewardCard({ onBack }) {
  const [cardBg, setCardBg] = useState('#16A34A')
  const [brandType, setBrandType] = useState('logo')
  const [imageType, setImageType] = useState('custom')
  const [barcodeType, setBarcodeType] = useState('qr')
  const [showMember, setShowMember] = useState(true)
  const [showTier, setShowTier] = useState(true)
  const [previewSide, setPreviewSide] = useState('front')

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 overflow-auto no-scrollbar flex flex-col px-7 py-7 gap-6">
        <div>
          <p className="text-[16px] font-semibold text-[#101828]">Appearance</p>
          <p className="text-[13px] text-[#667085] mt-0.5">Design the wallet pass customers receive when they join your program.</p>
        </div>

        {/* Appearance */}
        <div className="flex flex-col gap-4">
          <p className="text-[14px] font-semibold text-[#101828]">Appearance</p>
          <div>
            <p className="text-[13px] font-medium text-[#344054] mb-2">Card color</p>
            <ThemePicker value={cardBg} onChange={setCardBg} />
          </div>
        </div>

        <div className="h-px bg-[#EAECF0]" />

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <p className="text-[14px] font-semibold text-[#101828]">Brand</p>
          <div className="flex items-center gap-4">
            {[['text', 'Text only'], ['logo', 'Logo + name']].map(([val, label]) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer" onClick={() => setBrandType(val)}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${brandType === val ? 'border-[#004EEB]' : 'border-[#D0D5DD]'}`}>
                  {brandType === val && <div className="w-2 h-2 rounded-full bg-[#004EEB]" />}
                </div>
                <span className="text-[14px] text-[#344054]">{label}</span>
              </label>
            ))}
          </div>
          {brandType === 'logo' && (
            <div>
              <p className="text-[13px] font-medium text-[#344054] mb-1.5">Logo</p>
              <div className="flex items-center justify-between border border-[#EAECF0] rounded-[6px] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#DCFCE7] rounded-full flex items-center justify-center" style={{ fontSize: 11 }}>🌿</div>
                  <span className="text-[14px] font-medium text-[#16A34A]">TurboLime</span>
                </div>
                <button className="text-[#98A2B3] hover:text-red-500 transition-colors"><Trash2 size={14} strokeWidth={1.8} /></button>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-[#EAECF0]" />

        {/* Strip image */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-[#101828]">Strip image</p>
              <p className="text-[13px] text-[#667085] mt-0.5">Optional banner shown on the card.</p>
            </div>
            <Toggle checked={imageType === 'custom'} onChange={v => setImageType(v ? 'custom' : 'none')} />
          </div>
          {imageType === 'custom' && (
            <div className="relative border border-[#EAECF0] rounded-[8px] overflow-hidden">
              <div className="h-28 bg-gradient-to-br from-red-100 via-pink-50 to-orange-100 flex items-center justify-center" style={{ fontSize: 40 }}>🎁</div>
              <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow-sm border border-[#EAECF0] flex items-center justify-center text-[#98A2B3] hover:text-red-500 transition-colors">
                <Trash2 size={12} strokeWidth={1.8} />
              </button>
              <div className="absolute bottom-2 right-2">
                <button className="flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAECF0] rounded-[6px] text-[12px] font-medium text-[#344054] shadow-sm hover:bg-[#F9FAFB] transition-colors">
                  <Upload size={11} strokeWidth={2} />Replace
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-[#EAECF0]" />

        {/* Card fields */}
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-semibold text-[#101828]">Card fields</p>
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-[14px] text-[#344054]">Points balance</p>
              <p className="text-[13px] text-[#667085]">Primary field, always shown</p>
            </div>
            <span className="text-[12px] font-medium text-[#98A2B3]">Required</span>
          </div>
          <div className="h-px bg-[#EAECF0]" />
          {[['showMember', 'Member name', showMember, setShowMember], ['showTier', 'Membership tier', showTier, setShowTier]].map(([key, label, checked, setter]) => (
            <div key={key} className="flex items-center justify-between py-1">
              <span className="text-[14px] text-[#344054]">{label}</span>
              <Toggle checked={checked} onChange={setter} />
            </div>
          ))}
        </div>

        <div className="h-px bg-[#EAECF0]" />

        {/* Barcode */}
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-semibold text-[#101828]">Barcode type</p>
          <div className="grid grid-cols-3 gap-2">
            {[['qr', 'QR code', QrCode], ['barcode', 'Barcode', Barcode], ['none', 'None', X]].map(([val, label, Icon]) => (
              <button key={val} onClick={() => setBarcodeType(val)} className={`flex flex-col items-center gap-2 border rounded-[8px] py-3 transition-colors ${barcodeType === val ? 'border-[#004EEB] bg-[#F8FBFF]' : 'border-[#EAECF0] hover:bg-[#F9FAFB]'}`}>
                <Icon size={18} className={barcodeType === val ? 'text-[#004EEB]' : 'text-[#667085]'} strokeWidth={1.5} />
                <span className={`text-[12px] font-medium ${barcodeType === val ? 'text-[#004EEB]' : 'text-[#667085]'}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right live preview */}
      <div className="w-[440px] shrink-0 overflow-auto no-scrollbar flex flex-col bg-white">
        <div className="p-6 flex flex-col items-center">
          <div className="rounded-[16px] flex flex-col items-center gap-4 py-7 px-6 w-full" style={{ background: 'linear-gradient(160deg, #EEF0FF 0%, #F3EEFF 40%, #EEF4FF 100%)' }}>
            <div className="flex items-center gap-px bg-white/70 border border-[#EAECF0] rounded-[8px] overflow-hidden">
              {[['front', 'Front'], ['back', 'Back']].map(([val, label]) => (
                <button key={val} onClick={() => setPreviewSide(val)} className={`px-4 py-1.5 text-[13px] font-medium transition-colors ${previewSide === val ? 'bg-white text-[#004EEB] shadow-sm' : 'text-[#667085] hover:text-[#344054]'}`}>
                  {label}
                </button>
              ))}
            </div>
            <PhoneFrame scale={1.3} height={420}>
              {previewSide === 'front'
                ? <WalletPassFront cardBg={cardBg} imageType={imageType} barcodeType={barcodeType} />
                : <WalletPassBack cardBg={cardBg} />
              }
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step2({ onCustomizeWallet }) {
  const [device, setDevice] = useState('mobile')
  const [brandName, setBrandName] = useState('TurboLime')
  const [theme, setTheme] = useState('#004EEB')
  const [heroTitle, setHeroTitle] = useState('Join TurboLime today!')
  const [heroSubtitle, setHeroSubtitle] = useState('Earn points on every purchase and unlock exclusive rewards')
  const [cards, setCards] = useState(INITIAL_CONTENT_CARDS)
  const [expandedCard, setExpandedCard] = useState(null)
  const [walletApple, setWalletApple] = useState(true)
  const [walletGoogle, setWalletGoogle] = useState(false)
  const [fields, setFields] = useState({ name: true, email: true, phone: true, birthday: false })
  const [buttonText, setButtonText] = useState('Verify & join')
  const [termsType, setTermsType] = useState('url')
  const [termsUrl, setTermsUrl] = useState('https://www.company-name.com/t&c')

  const FORM_FIELDS = [
    { id: 'name', label: 'Name', required: true },
    { id: 'email', label: 'Email', required: true },
    { id: 'phone', label: 'Phone number', required: false },
    { id: 'birthday', label: 'Birthday', required: false },
  ]
  const CARD_ICONS = [Star, ShoppingCart, Gift]

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <div className="flex-1 overflow-auto no-scrollbar flex flex-col px-7 py-2">

        {/* Brand */}
        <FlatSection title="Brand" description="Set your brand name, theme color, and color palette.">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Brand name <span className="text-red-500">*</span></label>
              <input value={brandName} onChange={e => setBrandName(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#344054] mb-2">Theme</p>
              <ThemePicker value={theme} onChange={setTheme} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#344054] mb-2">Custom color options</p>
              <ColorSwatchTable rows={STEP2_COLORS} />
              <p className="text-[12px] text-[#667085] mt-2">These colors were retrieved from your website URL. You can modify them to your preference.</p>
            </div>
          </div>
        </FlatSection>

        {/* Hero section */}
        <FlatSection title="Hero section" description="The headline and subtitle customers see at the top of the enrollment page.">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-medium text-[#344054]">Title</label>
                <button className="flex items-center gap-1 text-[12px] font-medium text-[#004EEB] hover:text-[#0040C9] transition-colors">
                  <Sparkles size={11} strokeWidth={2} />Generate with AI
                </button>
              </div>
              <input value={heroTitle} onChange={e => setHeroTitle(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-medium text-[#344054]">Subtitle</label>
                <button className="flex items-center gap-1 text-[12px] font-medium text-[#004EEB] hover:text-[#0040C9] transition-colors">
                  <Sparkles size={11} strokeWidth={2} />Generate with AI
                </button>
              </div>
              <div className="relative">
                <textarea value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} rows={3} maxLength={200} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors resize-none" />
                <span className="absolute bottom-2 right-2 text-[11px] text-[#98A2B3]">{heroSubtitle.length}/200 characters</span>
              </div>
            </div>
          </div>
        </FlatSection>

        {/* Content cards */}
        <FlatSection title="Content cards" description="Highlight key program benefits on the enrollment page.">
          <div className="flex flex-col">
            {cards.map((card, idx) => {
              const isExpanded = expandedCard === card.id
              const Icon = CARD_ICONS[idx]
              return (
                <div key={card.id} className={idx > 0 ? 'border-t border-[#EAECF0]' : ''}>
                  <div className="flex items-center gap-3 py-3 px-3">
                    <Toggle checked={card.enabled} onChange={v => setCards(prev => prev.map(c => c.id === card.id ? { ...c, enabled: v } : c))} />
                    <div className="w-8 h-8 bg-[#EEF4FF] rounded-[6px] flex items-center justify-center shrink-0">
                      <Icon size={14} stroke="#004EEB" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#101828]">{card.title}</p>
                      <p className="text-[13px] text-[#667085] mt-0.5">{card.subtitle}</p>
                    </div>
                    <button onClick={() => setExpandedCard(isExpanded ? null : card.id)} className="text-[#98A2B3] hover:text-[#344054] transition-colors shrink-0">
                      <Pencil size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="pb-4 flex flex-col gap-3 border-t border-[#F2F4F7] pt-3">
                      <div>
                        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Title</label>
                        <input value={card.title} onChange={e => setCards(prev => prev.map(c => c.id === card.id ? { ...c, title: e.target.value } : c))} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[13px] font-medium text-[#344054]">Subtitle</label>
                          <button className="flex items-center gap-1 text-[12px] font-medium text-[#004EEB]"><Sparkles size={11} strokeWidth={2} />Generate with AI</button>
                        </div>
                        <div className="relative">
                          <textarea value={card.subtitle} onChange={e => setCards(prev => prev.map(c => c.id === card.id ? { ...c, subtitle: e.target.value } : c))} rows={2} maxLength={200} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors resize-none" />
                          <span className="absolute bottom-2 right-2 text-[11px] text-[#98A2B3]">{card.subtitle.length}/200</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Icon</label>
                        <div className="flex items-center justify-between border border-[#EAECF0] rounded-[6px] px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-[#EEF4FF] rounded-[4px] flex items-center justify-center"><Icon size={13} stroke="#004EEB" strokeWidth={1.8} /></div>
                            <div><p className="text-[13px] font-medium text-[#344054]">Gift-icon.png</p><p className="text-[12px] text-[#98A2B3]">244 kb</p></div>
                          </div>
                          <button className="text-[#98A2B3] hover:text-red-500 transition-colors"><Trash2 size={13} strokeWidth={1.8} /></button>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button onClick={() => setExpandedCard(null)} className="px-3 py-1.5 text-[13px] font-medium text-[#344054] border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">Cancel</button>
                        <button onClick={() => setExpandedCard(null)} className="px-3 py-1.5 text-[13px] font-semibold text-white bg-[#004EEB] rounded-[6px] hover:bg-[#0040C9] transition-colors">Save changes</button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </FlatSection>

        {/* Wallets */}
        <FlatSection
          title="Wallets"
          description="Choose which digital wallets to support."
          action={
            <button onClick={onCustomizeWallet} className="flex items-center gap-1.5 text-[13px] font-medium text-[#004EEB] hover:text-[#0040C9] transition-colors">
              <Pencil size={12} strokeWidth={2} />Customize
            </button>
          }
        >
          <div className="flex flex-col gap-2">
            {[['apple', 'Apple wallet', walletApple, setWalletApple], ['google', 'Google wallet', walletGoogle, setWalletGoogle]].map(([id, label, checked, setter]) => (
              <label key={id} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setter(!checked)}>
                <div className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center transition-colors ${checked ? 'bg-[#004EEB] border-[#004EEB]' : 'border-[#D0D5DD] bg-white'}`}>
                  {checked && <Check size={9} strokeWidth={3} className="text-white" />}
                </div>
                <span className="text-[14px] text-[#344054]">{label}</span>
              </label>
            ))}
          </div>
        </FlatSection>

        {/* Loyalty forms */}
        <FlatSection title="Loyalty forms" description="Choose which fields to collect on sign-up.">
          <div className="border border-[#EAECF0] rounded-[8px] overflow-hidden">
            <div className="grid bg-[#F9FAFB] border-b border-[#EAECF0] px-3 py-2" style={{ gridTemplateColumns: '1fr 72px 72px' }}>
              <span className="text-[12px] font-medium text-[#667085]">Field</span>
              <span className="text-[12px] font-medium text-[#667085] text-center">Required</span>
              <span className="text-[12px] font-medium text-[#667085] text-center">Unique</span>
            </div>
            {FORM_FIELDS.map((field, i) => (
              <div key={field.id} className={`grid items-center px-3 py-2.5 ${i < FORM_FIELDS.length - 1 ? 'border-b border-[#F2F4F7]' : ''}`} style={{ gridTemplateColumns: '1fr 72px 72px' }}>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center cursor-pointer transition-colors ${fields[field.id] || field.required ? 'bg-[#004EEB] border-[#004EEB]' : 'border-[#D0D5DD] bg-white'}`}
                    onClick={() => !field.required && setFields(prev => ({ ...prev, [field.id]: !prev[field.id] }))}>
                    {(fields[field.id] || field.required) && <Check size={9} strokeWidth={3} className="text-white" />}
                  </div>
                  <span className="text-[13px] text-[#344054]">{field.label}</span>
                </div>
                <div className="flex justify-center"><Toggle checked={field.required} onChange={() => {}} disabled={!field.required} /></div>
                <div className="flex justify-center">{!field.required && <Toggle checked={false} onChange={() => {}} />}</div>
              </div>
            ))}
          </div>
        </FlatSection>

        {/* Sign-up form */}
        <FlatSection title="Sign-up form" description="Customize the CTA button and terms link.">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Button text</label>
              <input value={buttonText} onChange={e => setButtonText(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#344054] mb-2">Terms & conditions</p>
              <div className="flex items-center gap-4 mb-2">
                {[['description', 'Description'], ['url', 'URL']].map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer" onClick={() => setTermsType(val)}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${termsType === val ? 'border-[#004EEB]' : 'border-[#D0D5DD]'}`}>
                      {termsType === val && <div className="w-2 h-2 rounded-full bg-[#004EEB]" />}
                    </div>
                    <span className="text-[14px] text-[#344054]">{label}</span>
                  </label>
                ))}
              </div>
              {termsType === 'url' && (
                <div>
                  <label className="text-[13px] font-medium text-[#344054] block mb-1.5">URL</label>
                  <input value={termsUrl} onChange={e => setTermsUrl(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
                </div>
              )}
            </div>
          </div>
        </FlatSection>

      </div>

      {/* Right live preview */}
      <div className="w-[440px] shrink-0 overflow-auto no-scrollbar flex flex-col bg-white">
        <div className="p-6 flex flex-col items-center">
          <div className="rounded-[16px] flex flex-col items-center gap-5 py-7 px-6 w-full" style={{ background: 'linear-gradient(160deg, #EEF0FF 0%, #F3EEFF 40%, #EEF4FF 100%)' }}>
            <div className="flex items-center gap-1 bg-white/70 border border-[#EAECF0] rounded-[8px] p-1">
              {[[Monitor, 'web'], [Tablet, 'tablet'], [Smartphone, 'mobile']].map(([Icon, id]) => (
                <button key={id} onClick={() => setDevice(id)} className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-colors ${device === id ? 'bg-white shadow-sm text-[#344054]' : 'text-[#98A2B3] hover:text-[#667085]'}`}>
                  <Icon size={14} strokeWidth={1.8} />
                </button>
              ))}
            </div>
            <PhoneFrame scale={1.3} height={420}>
              <EnrollmentPhoneContent theme={theme} heroTitle={heroTitle} heroSubtitle={heroSubtitle} cards={cards} buttonText={buttonText} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Member portal ─────────────────────────────────────────────────────

const STEP3_COLORS = [
  { label: 'Banner background', color: '#F9FAFB' },
  { label: 'Header text', color: '#101828' },
  { label: 'Body text', color: '#667085' },
  { label: 'Button color', color: '#004EEB' },
  { label: 'Icon(s) color', color: '#004EEB' },
]

function MemberPortalPhoneContent({ theme, activeTab, redeemDesc, redeemBtn, successDesc, successBtn }) {
  if (activeTab === 'success') {
    return (
      <div className="px-3 py-6 flex flex-col items-center gap-2.5" style={{ fontSize: 7 }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: theme + '20' }}>
          <Check size={18} style={{ color: theme }} strokeWidth={2.5} />
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#101828', textAlign: 'center' }}>Success!</p>
        <p style={{ color: '#667085', textAlign: 'center', lineHeight: 1.4 }}>{successDesc}</p>
        <div className="w-full flex items-center justify-center mt-1" style={{ height: 22, borderRadius: 3, backgroundColor: theme }}>
          <span style={{ color: 'white', fontSize: 7.5, fontWeight: 600 }}>{successBtn || 'Apply code'}</span>
        </div>
      </div>
    )
  }
  return (
    <div style={{ fontSize: 7, lineHeight: 1.35 }}>
      <div className="px-3 py-3" style={{ background: `linear-gradient(140deg, ${theme} 0%, ${theme}CC 100%)` }}>
        <p style={{ color: 'white', fontWeight: 700, fontSize: 9 }}>Welcome, Customer!</p>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Track your rewards and redeem exciting offers.</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-[3px]" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <span style={{ color: 'white', fontSize: 6.5 }}>campaign</span>
            <ChevronDown size={7} color="white" strokeWidth={2} />
          </div>
          <div><p style={{ color: 'white', fontWeight: 600, fontSize: 8 }}>2,450</p><p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 6 }}>Points</p></div>
          <div><p style={{ color: 'white', fontWeight: 600, fontSize: 8 }}>2</p><p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 6 }}>Referrals</p></div>
        </div>
      </div>
      <div className="mx-2 mt-1.5 flex items-center gap-1 px-2 py-1 rounded-[3px]" style={{ backgroundColor: theme + '15', border: `1px solid ${theme}30` }}>
        <Clock size={7} style={{ color: theme }} strokeWidth={2} />
        <span style={{ color: theme, fontSize: 6.5 }}>500 points expiring soon</span>
      </div>
      <div className="px-2 mt-2">
        <p style={{ color: '#667085', fontSize: 7, lineHeight: 1.4 }}>{redeemDesc}</p>
        <div className="mt-1.5" style={{ height: 6, borderRadius: 3, backgroundColor: '#E4E7EC', overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', backgroundColor: theme, borderRadius: 3 }} />
        </div>
        <div className="mt-2 flex items-center justify-center" style={{ height: 20, borderRadius: 3, backgroundColor: theme }}>
          <span style={{ color: 'white', fontSize: 7.5, fontWeight: 600 }}>{redeemBtn || 'Redeem now'}</span>
        </div>
      </div>
      <div className="px-2 mt-3">
        <div className="flex items-center justify-between mb-1">
          <p style={{ fontSize: 7.5, fontWeight: 600, color: '#101828' }}>Recent activity</p>
          <span style={{ color: '#004EEB', fontSize: 6 }}>See all</span>
        </div>
        {[['Activity history', 'Portal', ''], ['Purchase', 'Today', '+25.80'], ['Purchase', 'Today', '+25.52'], ['Purchase', 'Today', '+25.00'], ['Birthday (unused)', '4 days ago', '+90.00'], ['Redeem', '4 days ago', '-25.00']].map(([label, sub, pts], i) => (
          <div key={i} className="flex items-center justify-between py-0.5">
            <div><p style={{ fontSize: 6.5, color: '#344054' }}>{label}</p><p style={{ fontSize: 6, color: '#98A2B3' }}>{sub}</p></div>
            {pts && <span style={{ fontSize: 6.5, fontWeight: 600, color: pts.startsWith('-') ? '#667085' : '#16A34A' }}>{pts}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Step3({ brandColor }) {
  const [device, setDevice] = useState('mobile')
  const [portalUrl] = useState('http://portal.product.gohighlevel.com/loyalty-rewards')
  const [theme, setTheme] = useState(brandColor || '#004EEB')
  const [redeemExpanded, setRedeemExpanded] = useState(false)
  const [successExpanded, setSuccessExpanded] = useState(false)
  const [redeemDesc, setRedeemDesc] = useState('You are spending {{points}} TurboLime points for {{amount}}')
  const [redeemBtn, setRedeemBtn] = useState('Redeem')
  const [sliderStyle, setSliderStyle] = useState('input')
  const [successDesc, setSuccessDesc] = useState('You have redeemed 250 points for $2')
  const [successRedirect, setSuccessRedirect] = useState(true)
  const [successBtn, setSuccessBtn] = useState('Apply code')
  const [previewTab, setPreviewTab] = useState('redeem')

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <div className="flex-1 overflow-auto no-scrollbar flex flex-col px-7 py-2">

        {/* Brand */}
        <FlatSection title="Brand" description="Set your portal URL, theme color, and color palette.">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Member portal URL</label>
              <div className="flex items-center border border-[#EAECF0] rounded-[6px] overflow-hidden">
                <input value={portalUrl} readOnly className="flex-1 px-3 py-1.5 text-[13px] text-[#344054] bg-white focus:outline-none" />
                <button className="px-3 py-1.5 text-[#667085] hover:text-[#344054] hover:bg-[#F9FAFB] transition-colors">
                  <Copy size={14} strokeWidth={1.8} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#344054] mb-2">Theme</p>
              <ThemePicker value={theme} onChange={setTheme} />
            </div>
            <div className="flex items-start gap-2.5 px-3 py-3 bg-[#FFFAEB] border border-[#FEF0C7] rounded-[8px]">
              <AlertTriangle size={14} className="text-[#D97706] shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-[13px] text-[#B45309] leading-[1.4]">We will use this color palette across different campaigns. So, any changes we make here will apply everywhere.</p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#344054] mb-2">Custom color options</p>
              <ColorSwatchTable rows={STEP3_COLORS} />
              <p className="text-[12px] text-[#667085] mt-2">These colors were retrieved from your website URL. You can modify them to your preference.</p>
            </div>
          </div>
        </FlatSection>

        {/* Content */}
        <FlatSection title="Content" description="Customize the redeem and success screens members see.">
          <div className="flex flex-col gap-2">
            <div className="border border-[#EAECF0] rounded-[8px] overflow-hidden">
              <button onClick={() => { const next = !redeemExpanded; setRedeemExpanded(next); if (next) setPreviewTab('redeem') }} className="w-full flex items-center gap-2 px-4 py-3 hover:bg-[#FAFAFA] transition-colors text-left">
                <ChevronDown size={14} className={`text-[#667085] transition-transform ${redeemExpanded ? 'rotate-180' : ''}`} strokeWidth={2} />
                <span className="text-[13px] font-semibold text-[#101828]">1. Redeem screen</span>
              </button>
              {redeemExpanded && (
                <div className="px-4 pb-4 flex flex-col gap-4 border-t border-[#F2F4F7]">
                  <p className="text-[13px] font-semibold text-[#344054] mt-3">Redeem content</p>
                  <div>
                    <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Description</label>
                    <input value={redeemDesc} onChange={e => setRedeemDesc(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Button text</label>
                    <input value={redeemBtn} onChange={e => setRedeemBtn(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#344054] mb-2">Redeem slider</p>
                    <div className="flex flex-col gap-2">
                      {[['input', 'Input style'], ['fixed', 'Fixed view']].map(([val, label]) => (
                        <div key={val} onClick={() => setSliderStyle(val)} className={`border rounded-[8px] p-3 cursor-pointer transition-colors ${sliderStyle === val ? 'border-[#004EEB] bg-[#F8FBFF]' : 'border-[#EAECF0]'}`}>
                          <p className="text-[13px] font-medium text-[#344054] mb-2">{label}</p>
                          {val === 'input' ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-[#E4E7EC] rounded-full overflow-hidden"><div className="h-full bg-[#004EEB] rounded-full" style={{ width: '25%' }} /></div>
                              <div className="border border-[#EAECF0] rounded-[4px] px-2 py-0.5 text-[12px] text-[#344054] bg-white shrink-0">25 points</div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-[12px] text-[#344054] text-center mb-1">25 points</p>
                              <div className="h-1.5 bg-[#E4E7EC] rounded-full overflow-hidden"><div className="h-full bg-[#004EEB] rounded-full" style={{ width: '25%' }} /></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border border-[#EAECF0] rounded-[8px] overflow-hidden">
              <button onClick={() => { const next = !successExpanded; setSuccessExpanded(next); if (next) setPreviewTab('success') }} className="w-full flex items-center gap-2 px-4 py-3 hover:bg-[#FAFAFA] transition-colors text-left">
                <ChevronDown size={14} className={`text-[#667085] transition-transform ${successExpanded ? 'rotate-180' : ''}`} strokeWidth={2} />
                <span className="text-[13px] font-semibold text-[#101828]">2. Success screen</span>
              </button>
              {successExpanded && (
                <div className="px-4 pb-4 flex flex-col gap-4 border-t border-[#F2F4F7]">
                  <p className="text-[13px] font-semibold text-[#344054] mt-3">Content</p>
                  <div>
                    <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Description</label>
                    <input value={successDesc} onChange={e => setSuccessDesc(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Toggle checked={successRedirect} onChange={setSuccessRedirect} />
                    <span className="text-[14px] text-[#101828]">Let users redirect to your website</span>
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Button text</label>
                    <input value={successBtn} onChange={e => setSuccessBtn(e.target.value)} className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] focus:outline-none focus:border-[#004EEB] transition-colors" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </FlatSection>

      </div>

      {/* Right live preview */}
      <div className="w-[440px] shrink-0 overflow-auto no-scrollbar flex flex-col bg-white">
        <div className="p-6 flex flex-col items-center">
          <div className="rounded-[16px] flex flex-col items-center gap-4 py-7 px-6 w-full" style={{ background: 'linear-gradient(160deg, #EEF0FF 0%, #F3EEFF 40%, #EEF4FF 100%)' }}>
            <div className="flex items-center gap-1 bg-white/70 border border-[#EAECF0] rounded-[8px] p-1">
              {[[Monitor, 'web'], [Tablet, 'tablet'], [Smartphone, 'mobile']].map(([Icon, id]) => (
                <button key={id} onClick={() => setDevice(id)} className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-colors ${device === id ? 'bg-white shadow-sm text-[#344054]' : 'text-[#98A2B3] hover:text-[#667085]'}`}>
                  <Icon size={14} strokeWidth={1.8} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-px bg-white/70 border border-[#EAECF0] rounded-[8px] overflow-hidden">
              {[['redeem', 'Redeem'], ['success', 'Success']].map(([val, label]) => (
                <button key={val} onClick={() => setPreviewTab(val)} className={`px-4 py-1.5 text-[13px] font-medium transition-colors ${previewTab === val ? 'bg-white text-[#004EEB] shadow-sm' : 'text-[#667085] hover:text-[#344054]'}`}>
                  {label}
                </button>
              ))}
            </div>
            <PhoneFrame scale={1.3} height={420}>
              <MemberPortalPhoneContent theme={theme} activeTab={previewTab} redeemDesc={redeemDesc} redeemBtn={redeemBtn} successDesc={successDesc} successBtn={successBtn} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Confirmation screen ───────────────────────────────────────────────────────

function ConfirmationScreen({ onDone }) {
  return (
    <div className="flex-1 overflow-auto no-scrollbar">
      <div className="max-w-[600px] mx-auto px-6 py-12 flex flex-col items-center gap-5">

        {/* Illustration */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-[52px] leading-none select-none" style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #EEF4FF 50%, #F4F0FF 100%)' }}>
            🎉
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center">
            <Check size={15} className="text-[#16A34A]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center">
          <p className="text-[22px] font-bold text-[#101828] leading-snug">Your loyalty campaign is live!</p>
          <p className="text-[14px] text-[#667085] mt-2">Customers can now join, earn points, and redeem rewards.</p>
        </div>

        {/* Share card */}
        <div className="w-full border border-[#EAECF0] rounded-[12px] p-6 flex flex-col items-center gap-4">
            <div className="w-28 h-28 border border-[#EAECF0] rounded-[8px] flex items-center justify-center bg-[#F9FAFB]">
              <QrCode size={72} className="text-[#D0D5DD]" strokeWidth={0.8} />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-semibold text-[#101828]">Share your enrollment page</p>
              <p className="text-[13px] text-[#667085] mt-1">Let customers scan the QR code or share the link directly.</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-[#344054] border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">
                <Copy size={13} strokeWidth={2} />Copy link
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-[#344054] border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">
                <Download size={13} strokeWidth={2} />Download QR
              </button>
            </div>
        </div>

        {/* Campaign summary card */}
        <div className="w-full border border-[#EAECF0] rounded-[12px] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAECF0]">
            <div>
              <p className="text-[12px] text-[#667085]">Campaign name</p>
              <p className="text-[14px] font-semibold text-[#101828] mt-0.5">Loyalty campaign 1</p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#16A34A] text-[12px] font-semibold px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full" />
              Live
            </div>
          </div>
          {[
            ['Earning rules', 'Create account, Points for purchase'],
            ['Redemption rule', 'Percentage off'],
            ['Enrollment page', 'Funnel — Branded program'],
            ['Member portal', 'Redeem & Success screens'],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between px-5 py-3.5 border-b border-[#F2F4F7] last:border-0">
              <span className="text-[13px] text-[#667085]">{label}</span>
              <span className="text-[13px] font-medium text-[#101828]">{value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button onClick={onDone} className="px-5 py-2.5 text-[14px] font-medium text-[#344054] border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">
            Back to campaigns
          </button>
          <button onClick={onDone} className="flex items-center gap-1.5 px-5 py-2.5 text-[14px] font-semibold text-white bg-[#004EEB] rounded-[6px] hover:bg-[#0040C9] transition-colors">
            <Send size={13} strokeWidth={2} />Notify contacts
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── Wizard shell ──────────────────────────────────────────────────────────────

export default function LoyaltyCampaignWizard({ onCancel }) {
  const [step, setStep] = useState(1)
  const [configuringRule, setConfiguringRule] = useState(null)
  const [customizeWallet, setCustomizeWallet] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [enabledRules, setEnabledRules] = useState(['create_account'])
  const [redemptionRule, setRedemptionRule] = useState('percentage')
  const [brandColor, setBrandColor] = useState('#004EEB')
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  if (showConfirmation) {
    return (
      <div className="flex-1 flex flex-col bg-[#F9FAFB] p-8 min-h-0">
        <div className={`flex-1 flex flex-col bg-white rounded-xl ${SHADOW} overflow-hidden`}>
          <ConfirmationScreen onDone={onCancel} />
        </div>
      </div>
    )
  }

  if (customizeWallet) {
    return (
      <div className="flex-1 flex flex-col bg-[#F9FAFB] px-10 pt-8 pb-6 min-h-0">
        <div className="flex flex-col mx-auto w-full max-w-[920px]" style={{ flex: '1 1 0', minHeight: 0 }}>
          {/* Progress + title */}
          <div className="shrink-0 text-center mb-6">
            <div className="flex items-center justify-center gap-1.5 mb-5">
              {WIZARD_STEPS.map(s => (
                <div key={s.num} className="h-[3px] w-12 rounded-full" style={{ backgroundColor: s.num <= 2 ? '#004EEB' : '#EAECF0' }} />
              ))}
            </div>
            <p className="text-[22px] font-bold text-[#101828] leading-tight mb-1">Customize reward card</p>
            <p className="text-[13px] text-[#667085]">Design the wallet pass customers receive when they join.</p>
          </div>
          {/* Card */}
          <div className={`flex flex-col bg-white rounded-xl ${SHADOW} overflow-hidden`} style={{ flex: '1 1 0', minHeight: 0 }}>
            <div className="flex-1 flex min-h-0 overflow-hidden">
              <CustomizeRewardCard onBack={() => setCustomizeWallet(false)} />
            </div>
          </div>
          {/* Footer */}
          <div className="shrink-0 flex items-center justify-between pt-4">
            <button onClick={() => setCustomizeWallet(false)} className="flex items-center gap-1.5 text-[13px] font-medium text-[#344054] border border-[#EAECF0] bg-white rounded-[6px] px-4 py-1.5 hover:bg-[#F9FAFB] transition-colors">
              <ArrowRight size={13} className="rotate-180" strokeWidth={2} />Cancel
            </button>
            <button onClick={() => setCustomizeWallet(false)} className="flex items-center gap-1.5 bg-[#004EEB] text-white text-[13px] font-semibold px-4 py-1.5 rounded-[6px] hover:bg-[#0040C9] transition-colors">
              Save changes <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-10 pt-8 pb-6 min-h-0">
      <div
        className={`flex flex-col mx-auto w-full ${step === 1 && !configuringRule ? 'max-w-[600px]' : step === 1 ? 'max-w-[720px]' : 'max-w-[920px]'}`}
        style={{ flex: '1 1 0', minHeight: 0 }}
      >
        {/* Progress + title */}
        <div className="shrink-0 text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-5">
            {WIZARD_STEPS.map(s => (
              <div key={s.num} className="h-[3px] w-12 rounded-full transition-colors"
                style={{ backgroundColor: s.num <= step ? '#004EEB' : '#EAECF0' }} />
            ))}
          </div>
          <p className="text-[22px] font-bold text-[#101828] leading-tight mb-1">{WIZARD_STEPS[step - 1].label}</p>
          <p className="text-[13px] text-[#667085]">{WIZARD_STEPS[step - 1].desc}</p>
        </div>

        {/* White card */}
        <div className={`flex flex-col bg-white rounded-xl ${SHADOW} overflow-hidden`} style={{ flex: '1 1 0', minHeight: 0 }}>
          {step === 1 && (
            <div className={`flex-1 min-h-0 ${configuringRule ? 'flex overflow-hidden' : 'overflow-auto no-scrollbar px-6 py-6'}`}>
              <Step1
                enabledRules={enabledRules}
                setEnabledRules={setEnabledRules}
                redemptionRule={redemptionRule}
                setRedemptionRule={setRedemptionRule}
                configuringRule={configuringRule}
                setConfiguringRule={setConfiguringRule}
              />
            </div>
          )}
          {step === 2 && (
            <div className="flex-1 flex min-h-0 overflow-hidden">
              <Step2 onCustomizeWallet={() => setCustomizeWallet(true)} />
            </div>
          )}
          {step === 3 && (
            <div className="flex-1 flex min-h-0 overflow-hidden">
              <Step3 brandColor={brandColor} />
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="shrink-0 flex items-center justify-between pt-4">
          <button
            onClick={step === 1 ? () => setShowCancelConfirm(true) : () => setStep(s => s - 1)}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#344054] border border-[#EAECF0] bg-white rounded-[6px] px-4 py-1.5 hover:bg-[#F9FAFB] transition-colors"
          >
            <ArrowRight size={13} className="rotate-180" strokeWidth={2} />
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : setShowConfirmation(true)}
            className="flex items-center gap-1.5 bg-[#004EEB] text-white text-[13px] font-semibold px-4 py-1.5 rounded-[6px] hover:bg-[#0040C9] transition-colors"
          >
            {step < 3 ? 'Save & continue' : 'Launch campaign'} <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {showCancelConfirm && (
        <CancelConfirmModal
          onStay={() => setShowCancelConfirm(false)}
          onLeave={onCancel}
        />
      )}
    </div>
  )
}
