import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Plus, X, Calendar as CalendarIcon } from 'lucide-react';
import { formatTerbilang } from '../../lib/terbilang';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format } from 'date-fns';

export function TransactionFormModal({ 
  onSubmit, 
  initialData, 
  trigger,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: { 
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleClose = () => {
    if (controlledOnClose) controlledOnClose();
    else setInternalIsOpen(false);
  };

  const handleOpen = () => {
    if (controlledIsOpen === undefined) setInternalIsOpen(true);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amountVal, setAmountVal] = useState(initialData ? Math.abs(initialData.amount).toString() : '');
  const [dateVal, setDateVal] = useState<Date>(initialData?.date ? new Date(initialData.date) : new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as string;
    const rawAmount = Number(formData.get('amount'));
    const amount = type === 'expense' ? -rawAmount : rawAmount;
    
    const data = {
      description: formData.get('description'),
      amount,
      category: formData.get('category'),
      date: dateVal.toISOString().split('T')[0],
    };

    await onSubmit(data);
    
    setIsSubmitting(false);
    handleClose();
    setAmountVal('');
    setDateVal(new Date());
    
    // Invalidate route to refresh data
    router.invalidate();
  };

  return (
    <>
      {trigger !== null && (
        <div onClick={handleOpen}>
          {trigger ? trigger : (
            <button className="btn bg-emerald-500 hover:bg-emerald-400 text-black border-none rounded-full px-6 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:scale-105">
              <Plus className="w-5 h-5 mr-1" /> Add Transaction
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f1115] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300">
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl mix-blend-overlay -mr-32 -mt-32"></div>
            </div>
            
            <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10">
              <h3 className="text-xl font-bold text-white tracking-tight">{initialData ? 'Edit Transaction' : 'New Transaction'}</h3>
              <button 
                onClick={handleClose}
                className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 relative z-10 flex flex-col gap-5">
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="type" value="expense" className="peer sr-only" defaultChecked={!initialData || initialData.amount < 0} />
                  <div className="text-center py-2 rounded-lg text-sm font-medium text-gray-400 peer-checked:bg-white/10 peer-checked:text-rose-400 peer-checked:shadow-sm transition-all">Expense</div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="type" value="income" className="peer sr-only" defaultChecked={initialData && initialData.amount > 0} />
                  <div className="text-center py-2 rounded-lg text-sm font-medium text-gray-400 peer-checked:bg-white/10 peer-checked:text-emerald-400 peer-checked:shadow-sm transition-all">Income</div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Amount (Rp)</label>
                <input 
                  type="number" 
                  name="amount" 
                  required 
                  min="0"
                  value={amountVal}
                  onChange={(e) => setAmountVal(e.target.value)}
                  className="input input-bordered w-full bg-black/30 border-white/10 text-white font-bold text-lg focus:outline-none focus:border-emerald-500/50"
                  placeholder="0"
                />
                {amountVal && (
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="text-sm text-emerald-400 font-medium tracking-wide flex items-center">
                      <span className="text-gray-500 mr-2">≈</span> Rp {Number(amountVal).toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-emerald-500/70 italic capitalize">
                      {formatTerbilang(Number(amountVal))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                <input 
                  type="text" 
                  name="description" 
                  required 
                  defaultValue={initialData?.description || ''}
                  className="input input-bordered w-full bg-black/30 border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  placeholder="e.g. Groceries, Salary, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                  <select 
                    name="category" 
                    required
                    defaultValue={initialData?.category || 'Food'}
                    className="select select-bordered w-full bg-black/30 border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Salary">Salary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Date</label>
                  <div 
                    className="input input-bordered w-full bg-black/30 border-white/10 text-white flex items-center justify-between cursor-pointer"
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  >
                    <span>{format(dateVal, 'yyyy-MM-dd')}</span>
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  {isCalendarOpen && (
                    <div className="absolute bottom-full right-0 sm:left-0 sm:right-auto mb-2 z-[60] bg-[#0f1115] border border-emerald-500/30 rounded-2xl p-3 shadow-[0_10px_40px_rgba(16,185,129,0.15)]">
                      <DayPicker
                        mode="single"
                        selected={dateVal}
                        onSelect={(date) => {
                          if (date) {
                            setDateVal(date);
                            setIsCalendarOpen(false);
                          }
                        }}
                        className="text-white"
                        styles={{
                          root: {
                            '--rdp-accent-color': '#10b981',
                            '--rdp-background-color': '#0f1115',
                            '--rdp-accent-background-color': 'rgba(16, 185, 129, 0.2)',
                          } as React.CSSProperties
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black border-none rounded-xl py-3.5 h-auto text-base font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Transaction'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
