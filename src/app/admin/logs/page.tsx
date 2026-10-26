'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { useLogs } from '@/hook/useLogs';
import { Activity, ShieldAlert, PlusCircle, Edit2, Trash2, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { localeFor } from '@/i18n/helpers';
import Rich from '@/i18n/rich';

export default function ActivityLogsPage() {
    const { logs, isLoading, error } = useLogs();
    const { lang, t } = useLanguage();

    // Helper untuk warna badge aksi
    const getActionBadge = (type: string) => {
        switch (type.toUpperCase()) {
            case 'TAMBAH': return <span className="px-2.5 py-1 text-[10px] font-black rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1 w-fit"><PlusCircle className="w-3 h-3"/> {t.admin.logs.actionAdd}</span>;
            case 'EDIT': return <span className="px-2.5 py-1 text-[10px] font-black rounded-md bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1 w-fit"><Edit2 className="w-3 h-3"/> {t.admin.logs.actionEdit}</span>;
            case 'HAPUS': return <span className="px-2.5 py-1 text-[10px] font-black rounded-md bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1 w-fit"><Trash2 className="w-3 h-3"/> {t.admin.logs.actionDelete}</span>;
            default: return <span className="px-2.5 py-1 text-[10px] font-black rounded-md bg-slate-100 text-slate-600 border border-slate-200 w-fit">{type}</span>;
        }
    };

    // Helper format tanggal
    const formatWaktu = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(localeFor(lang), { 
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    return (
        <AdminLayout 
            title={t.admin.logs.title} 
            subtitle={t.admin.logs.subtitle}
        >
            <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
                
                {/* Banner Info Keamanan */}
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-blue-900">{t.admin.logs.auditTitle}</h4>
                        <p className="text-xs font-medium text-blue-700 mt-1 leading-relaxed">
                            <Rich text={t.admin.logs.auditBody} />
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-bold">
                        {t.admin.logs.error} {error}
                    </div>
                )}

                {/* Tabel Log */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-slate-800 text-lg">{t.admin.logs.last100}</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-semibold w-[20%]">{t.admin.logs.colTime}</th>
                                    <th className="p-4 font-semibold w-[15%]">{t.admin.logs.colAdmin}</th>
                                    <th className="p-4 font-semibold w-[15%]">{t.admin.logs.colAction}</th>
                                    <th className="p-4 font-semibold w-[15%]">{t.admin.logs.colModule}</th>
                                    <th className="p-4 font-semibold w-[35%]">{t.admin.logs.colDescription}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    // SKELETON TABLE ROWS
                                    [1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i}>
                                            <td className="p-4"><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></td>
                                            <td className="p-4"><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></td>
                                            <td className="p-4"><div className="h-6 w-16 bg-slate-100 rounded animate-pulse"></div></td>
                                            <td className="p-4"><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></td>
                                            <td className="p-4"><div className="h-4 w-64 bg-slate-100 rounded animate-pulse"></div></td>
                                        </tr>
                                    ))
                                ) : logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">
                                            {t.admin.logs.empty}
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 text-xs font-bold text-slate-500 flex items-center gap-2">
                                                <Clock className="w-3 h-3" /> {formatWaktu(log.created_at)}
                                            </td>
                                            <td className="p-4 text-sm font-black text-slate-800">{log.admin_name}</td>
                                            <td className="p-4">{getActionBadge(log.action_type)}</td>
                                            <td className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{log.module}</td>
                                            <td className="p-4 text-sm font-medium text-slate-600">{log.description}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}