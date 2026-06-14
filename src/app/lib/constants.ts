// Saldo Awal Kas (Tunai + Bank)
export const INITIAL_BANK = Number(process.env.NEXT_PUBLIC_INITIAL_BANK) || 24576059;
export const INITIAL_TUNAI = Number(process.env.NEXT_PUBLIC_INITIAL_TUNAI) || 364000;

export const TOTAL_INITIAL_BALANCE = INITIAL_BANK + INITIAL_TUNAI;