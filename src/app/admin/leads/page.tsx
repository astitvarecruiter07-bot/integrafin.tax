import { getLeads } from '@/app/actions/leads';
import { Calendar, Mail, Phone, Building, Info } from 'lucide-react';

export const metadata = {
  title: 'Leads Management | IntegraFin Admin',
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#003580] tracking-tight">Customer Leads</h1>
            <p className="text-gray-600 mt-2">Manage and track all form submissions from the website.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total Leads</span>
            <span className="text-2xl font-black text-[#00C2CB]">{leads.length}</span>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#0047AB]">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#0047AB]">Contact Info</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#0047AB]">Service & Source</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#0047AB]">Message</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#0047AB]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">
                      No leads found in the database.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead: any) => (
                    <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-6">
                        <div className="font-bold text-[#003580]">{lead.name}</div>
                        {lead.company && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                            <Building className="w-3.5 h-3.5" />
                            {lead.company}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1">
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-[#0047AB] hover:underline">
                            <Mail className="w-3.5 h-3.5" />
                            {lead.email}
                          </a>
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:underline">
                            <Phone className="w-3.5 h-3.5" />
                            {lead.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="inline-block px-2 py-1 bg-[#00C2CB]/10 text-[#00C2CB] text-[10px] font-black uppercase tracking-wider rounded mb-1">
                          {lead.service}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <Info className="w-3 h-3" />
                          Source: {lead.source}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-xs" title={lead.message}>
                          {lead.message}
                        </p>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(lead.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
