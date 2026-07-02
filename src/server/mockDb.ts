import fs from 'fs';
import path from 'path';

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

const dbPath = path.resolve(process.cwd(), 'db.json');

const initialData: Transaction[] = [
  { id: '1', description: 'Grocery Shopping', amount: -450000, category: 'Food', date: '2026-06-23' },
  { id: '2', description: 'Monthly Salary', amount: 15000000, category: 'Salary', date: '2026-06-25' },
  { id: '3', description: 'Gojek/Grab', amount: -35000, category: 'Transport', date: '2026-06-26' },
  { id: '4', description: 'Movie Tickets', amount: -150000, category: 'Entertainment', date: '2026-06-26' },
  { id: '5', description: 'Coffee Shop', amount: -60000, category: 'Food', date: '2026-06-27' },
];

export let mockTransactions: Transaction[] = [];

try {
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf-8');
    mockTransactions = JSON.parse(data);
  } else {
    mockTransactions = [...initialData];
    fs.writeFileSync(dbPath, JSON.stringify(mockTransactions, null, 2));
  }
} catch (error) {
  console.error("Error reading db.json", error);
  mockTransactions = [...initialData];
}

const saveDb = () => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(mockTransactions, null, 2));
  } catch (e) {
    console.error("Error saving to db.json", e);
  }
};

export const addTransaction = (data: Omit<Transaction, 'id'>) => {
  const newTrx = {
    ...data,
    id: Math.random().toString(36).substring(7),
  };
  mockTransactions.unshift(newTrx);
  saveDb();
  return newTrx;
};

export const deleteTransaction = (id: string) => {
  const index = mockTransactions.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTransactions.splice(index, 1);
    saveDb();
    return true;
  }
  return false;
};

export const editTransaction = (id: string, updatedData: Partial<Transaction>) => {
  const index = mockTransactions.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTransactions[index] = { ...mockTransactions[index], ...updatedData };
    saveDb();
    return mockTransactions[index];
  }
  return null;
};
