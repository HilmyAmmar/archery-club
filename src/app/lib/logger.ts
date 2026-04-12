import { supabase } from '@/app/lib/supabase';

export async function insertActivityLog(adminName: string, actionType: 'TAMBAH' | 'EDIT' | 'HAPUS', module: string, description: string) {
    const { error } = await supabase
        .from('activity_logs')
        .insert([{ 
            admin_name: adminName, 
            action_type: actionType, 
            module: module, 
            description: description 
        }]);

    if (error) {
        console.error("Gagal mencatat log aktivitas:", error);
    }
}