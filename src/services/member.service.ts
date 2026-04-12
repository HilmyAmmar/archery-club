import { supabase } from '../app/lib/supabase'; 

export interface CreateMemberPayload {
  nama_lengkap: string;
  jenis_kelamin: string;
  tipe_membership: string;
  status_member: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  alamat?: string;
  no_hp_utama?: string;
  asal_sekolah?: string;
  nama_wali?: string; 
  no_hp_wali?: string; 
  catatan?: string;
}

/**
 * FUNGSI 1: Ambil semua data member
 */
export async function getAllMembersService() {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil data member: ${error.message}`);
  }

  return data;
}

/**
 * FUNGSI 2: Tambah member baru
 */
export async function createMemberService(payload: CreateMemberPayload) {
  const { data, error } = await supabase
    .from('members')
    .insert([
      {
        nama_lengkap: payload.nama_lengkap,
        jenis_kelamin: payload.jenis_kelamin,
        tipe_membership: payload.tipe_membership,
        status_member: payload.status_member,
        tempat_lahir: payload.tempat_lahir || null,
        tanggal_lahir: payload.tanggal_lahir || null,
        alamat: payload.alamat || null,
        no_hp_utama: payload.no_hp_utama || null,
        asal_sekolah: payload.asal_sekolah || null,
        nama_wali: payload.nama_wali || null,
        no_hp_wali: payload.no_hp_wali || null,
        catatan: payload.catatan || null,
      }
    ])
    .select()
    .single(); 

  if (error) {
    throw new Error(`Gagal menyimpan member: ${error.message}`);
  }

  return data;
}

/**
 * FUNGSI 3: Update data member berdasarkan ID
 */
export async function updateMemberService(id: string, payload: Partial<CreateMemberPayload>) {
  const { data, error } = await supabase
    .from('members')
    .update(payload)
    .eq('id', id) 
    .select()
    .single(); 

  if (error) {
    throw new Error(`Gagal mengupdate member: ${error.message}`);
  }

  return data;
}

/**
 * FUNGSI 4: Hapus member berdasarkan ID
 */
export async function deleteMemberService(id: string) {
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id); 

  if (error) {
    throw new Error(`Gagal menghapus member: ${error.message}`);
  }

  return true;
}

/**
 * FUNGSI 5: Ambil Detail Satu Member berdasarkan ID
 */
export async function getMemberByIdService(id: string) {
  const { data, error } = await supabase
    .from('members')
    .select('*') 
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Member tidak ditemukan: ${error.message}`);
  }

  return data;
}

