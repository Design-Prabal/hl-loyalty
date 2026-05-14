import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

function SelectField({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] bg-white focus:outline-none focus:border-[#004EEB] transition-colors pr-8 cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" strokeWidth={2} />
    </div>
  )
}

export default function NewCampaignModal({ onCancel, onConfirm }) {
  const [campaignName, setCampaignName] = useState('Loyalty campaign 1')
  const [campaignType, setCampaignType] = useState('online')
  const [visibility, setVisibility] = useState('funnel')
  const [funnel, setFunnel] = useState('branded_program')

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] w-[480px] flex flex-col gap-5 p-6" style={{ boxShadow: '0 20px 48px rgba(16,24,40,0.18)' }}>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[16px] font-semibold text-[#101828]">New campaign</p>
            <p className="text-[13px] text-[#667085] mt-0.5 leading-[1.4]">Fill in the details below to set up your loyalty campaign.</p>
          </div>
          <button onClick={onCancel} className="text-[#98A2B3] hover:text-[#344054] transition-colors shrink-0 mt-0.5">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div>
          <label className="text-[13px] font-medium text-[#344054] flex items-center gap-0.5 mb-1.5">
            Campaign name <span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            value={campaignName}
            onChange={e => setCampaignName(e.target.value)}
            className="w-full border border-[#EAECF0] rounded-[6px] px-3 py-1.5 text-[13px] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] transition-colors"
            placeholder="Enter campaign name"
          />
        </div>

        <div>
          <label className="text-[13px] font-medium text-[#344054] block mb-1.5">Campaign type</label>
          <SelectField value={campaignType} onChange={setCampaignType}>
            <option value="online">Online</option>
            <option value="in_store">In-store</option>
            <option value="hybrid">Hybrid</option>
          </SelectField>
        </div>

        <div>
          <label className="text-[13px] font-medium text-[#344054] flex items-center gap-0.5 mb-1.5">
            Online visibility <span className="text-red-500 ml-0.5">*</span>
          </label>
          <SelectField value={visibility} onChange={setVisibility}>
            <option value="funnel">Funnel</option>
            <option value="website">Website</option>
            <option value="social">Social</option>
            <option value="all">All channels</option>
          </SelectField>
        </div>

        <div>
          <label className="text-[13px] font-medium text-[#344054] flex items-center gap-0.5 mb-1.5">
            Select funnel <span className="text-red-500 ml-0.5">*</span>
          </label>
          <SelectField value={funnel} onChange={setFunnel}>
            <option value="branded_program">Branded program</option>
            <option value="summer_sale">Summer sale</option>
            <option value="vip_members">VIP members</option>
          </SelectField>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button onClick={onCancel} className="px-4 py-2 text-[14px] font-medium text-[#344054] border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onConfirm({ campaignName, campaignType, visibility, funnel })}
            disabled={!campaignName.trim()}
            className="px-5 py-2 text-[14px] font-semibold text-white bg-[#004EEB] rounded-[6px] hover:bg-[#0040C9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save & continue
          </button>
        </div>

      </div>
    </div>
  )
}
