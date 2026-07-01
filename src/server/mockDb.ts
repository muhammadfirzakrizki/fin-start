export type Transaction = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

// Data dummy yang tersimpan di memori server (sebagai pengganti Local Storage/Database)
export const mockTransactions: Transaction[] = [
  { id: '1', amount: -50000, category: 'Food', date: '2026-07-01', description: 'Makan Siang' },
  { id: '2', amount: -150000, category: 'Transport', date: '2026-07-01', description: 'Bensin' },
  { id: '3', amount: 5000000, category: 'Salary', date: '2026-06-28', description: 'Gaji Bulanan' },
  { id: '4', amount: -250000, category: 'Entertainment', date: '2026-06-30', description: 'Nonton Bioskop' },
  { id: '5', amount: -30000, category: 'Food', date: '2026-06-30', description: 'Kopi Sore' },
];
