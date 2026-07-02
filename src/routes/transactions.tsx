import { useState } from 'react'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mockTransactions, addTransaction, deleteTransaction, editTransaction } from '../server/mockDb'
import { Search, Filter, MoreVertical, Coffee, Bus, Briefcase, ShoppingBag, Gamepad2, CircleHelp, ArrowUpRight, ArrowDownRight, ArrowRightLeft, Trash2 } from 'lucide-react'
import { TransactionFormModal } from '../components/transactions/TransactionFormModal'
import { useToast } from '../components/ui/ToastProvider'

const getCategoryUI = (category: string) => {
  switch(category) {
    case 'Food': return { icon: Coffee, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
    case 'Transport': return { icon: Bus, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
    case 'Salary': return { icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
    case 'Shopping': return { icon: ShoppingBag, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' };
    case 'Entertainment': return { icon: Gamepad2, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
    default: return { icon: CircleHelp, color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' };
  }
}

type TransactionsSearch = {
  category?: string
  q?: string
}

const getFilteredTransactions = createServerFn({ method: 'GET' })
  .validator((search: TransactionsSearch) => search)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...mockTransactions]
    if (data.category) {
      filtered = filtered.filter(t => t.category.toLowerCase() === data.category?.toLowerCase())
    }
    if (data.q) {
      filtered = filtered.filter(t => t.description.toLowerCase().includes(data.q!.toLowerCase()))
    }
    return filtered
  })

const createTransaction = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 300)) // simulate network
    return addTransaction(data)
  })

const deleteTransactionFn = createServerFn({ method: 'POST' })
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return deleteTransaction(data)
  })

const editTransactionFn = createServerFn({ method: 'POST' })
  .validator((data: { id: string, updatedData: any }) => data)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return editTransaction(data.id, data.updatedData)
  })

export const Route = createFileRoute('/transactions')({
  validateSearch: (search: Record<string, unknown>): TransactionsSearch => ({
    category: search.category as string | undefined,
    q: search.q as string | undefined,
  }),
  loaderDeps: ({ search: { category, q } }) => ({ category, q }),
  loader: async ({ deps }) => {
    return await getFilteredTransactions({ data: deps })
  },
  pendingComponent: TransactionsSkeleton,
  component: TransactionsComponent,
})

function TransactionsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <div className="h-10 bg-white/10 rounded-xl w-64 mb-3"></div>
          <div className="h-5 bg-white/5 rounded-lg w-80"></div>
        </div>
        <div className="h-12 w-40 bg-white/10 rounded-full"></div>
      </div>

      {/* Filter Skeleton */}
      <div className="h-20 bg-white/5 border border-white/5 rounded-2xl mb-8"></div>

      {/* Table List Skeleton */}
      <div className="bg-[#0f1115] border border-white/5 rounded-[2rem] overflow-hidden p-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-5 border-b border-white/5">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/5"></div>
              <div>
                <div className="h-5 w-40 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-24 bg-white/5 rounded"></div>
              </div>
            </div>
            <div className="h-6 w-20 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TransactionsComponent() {
  const transactions = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const router = useRouter()
  const { toast } = useToast()
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: (data: any) => createTransaction({ data }),
    onSuccess: () => {
      toast.success('Transaction added successfully!');
      router.invalidate();
    },
  });

  const editMutation = useMutation({
    mutationFn: (payload: { id: string, updatedData: any }) => editTransactionFn({ data: payload }),
    onSuccess: () => {
      toast.success('Transaction updated successfully!');
      router.invalidate();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTransactionFn({ data: id }),
    onSuccess: () => {
      toast.success('Transaction deleted successfully!');
      router.invalidate();
    },
  });

  const updateFilter = (key: keyof TransactionsSearch, value: string) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value || undefined }),
    })
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Transactions</h1>
          <p className="text-gray-400">View and manage all your recent financial activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <TransactionFormModal onSubmit={async (data) => {
            await createMutation.mutateAsync(data);
          }} />
        </div>
      </div>

      {/* Summary Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#0f1115]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-xl flex items-center gap-4 group hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <ArrowDownRight className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Total Income</p>
            <p className="text-xl font-bold text-white tracking-tight">Rp {transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="bg-[#0f1115]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-xl flex items-center gap-4 group hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Total Expense</p>
            <p className="text-xl font-bold text-white tracking-tight">Rp {Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0)).toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="bg-[#0f1115]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-xl flex items-center gap-4 group hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
            <ArrowRightLeft className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Transactions Count</p>
            <p className="text-xl font-bold text-white tracking-tight">{transactions.length} items</p>
          </div>
        </div>
      </div>

      {/* Filter Glassmorphism Bar */}
      <div className="bg-[#0f1115]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-2.5 mb-8 flex flex-col sm:flex-row gap-3 shadow-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search description, reference..." 
            className="w-full bg-black/30 border border-transparent rounded-xl py-3.5 pl-12 pr-4 text-white font-medium focus:outline-none focus:bg-black/50 focus:border-white/10 transition-all placeholder:text-gray-600 shadow-inner"
            value={search.q || ''}
            onChange={(e) => updateFilter('q', e.target.value)}
          />
        </div>
        <div className="w-[1px] bg-white/5 mx-1 hidden sm:block"></div>
        <div className="relative w-full sm:w-72 flex items-center bg-black/30 rounded-xl hover:bg-black/50 transition-colors border border-transparent hover:border-white/5">
          <Filter className="absolute left-4 w-4 h-4 text-gray-500" />
          <select 
            className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-white font-medium focus:outline-none appearance-none cursor-pointer"
            value={search.category || ''}
            onChange={(e) => updateFilter('category', e.target.value)}
          >
            <option value="" className="bg-gray-900">All Categories</option>
            <option value="Food" className="bg-gray-900">Food & Dining</option>
            <option value="Transport" className="bg-gray-900">Transportation</option>
            <option value="Salary" className="bg-gray-900">Income & Salary</option>
            <option value="Entertainment" className="bg-gray-900">Entertainment</option>
          </select>
        </div>
      </div>

      {/* Modern List */}
      <div className="bg-[#0f1115] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl p-2 relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl mix-blend-overlay pointer-events-none"></div>
        
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-48 h-48 mb-6 overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] border border-white/5">
              <img src="/empty-state.jpg" alt="No transactions" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col gap-6">
            {Object.entries(
              transactions.reduce((acc, trx) => {
                if (!acc[trx.date]) acc[trx.date] = [];
                acc[trx.date].push(trx);
                return acc;
              }, {} as Record<string, typeof transactions>)
            ).sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
             .map(([date, dateTransactions]) => (
              <div key={date} className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2 pt-2 border-b border-white/5 pb-2">
                  {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))}
                </h3>
                
                {dateTransactions.map((trx) => {
                  const UI = getCategoryUI(trx.category);
                  const Icon = UI.icon;
                  
                  return (
                    <div key={trx.id} className="flex items-center justify-between p-5 hover:bg-white/[0.04] transition-colors group rounded-2xl cursor-pointer border border-transparent hover:border-white/5 shadow-sm">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105 ${UI.bg} ${UI.color} border ${UI.border}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg block mb-1 group-hover:text-emerald-50 transition-colors">{trx.description}</h4>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <span className={`${UI.color} bg-white/5 px-2 py-0.5 rounded-md text-xs`}>{trx.category}</span>
                            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                            <span className="text-gray-500">{trx.amount > 0 ? 'Income' : 'Expense'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className={`font-black text-2xl tracking-tight block ${trx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                            {trx.amount > 0 ? '+' : ''}{trx.amount.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="dropdown dropdown-end">
                          <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-5 h-5 text-gray-500 hover:text-white" />
                          </button>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-[#0f1115] border border-white/10 rounded-box w-32 mt-2">
                            <li>
                              <button 
                                className="w-full text-left text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-2 rounded-lg"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Close dropdown by blurring active element
                                  if (document.activeElement instanceof HTMLElement) {
                                    document.activeElement.blur();
                                  }
                                  setEditingTransaction(trx);
                                }}
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button 
                                className="w-full text-left text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 p-2 rounded-lg mt-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (document.activeElement instanceof HTMLElement) {
                                    document.activeElement.blur();
                                  }
                                  setDeletingTransaction(trx);
                                }}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {editingTransaction && (
        <TransactionFormModal 
          isOpen={true}
          onClose={() => setEditingTransaction(null)}
          initialData={editingTransaction}
          onSubmit={async (data) => {
            await editMutation.mutateAsync({ id: editingTransaction.id, updatedData: data });
            setEditingTransaction(null);
          }}
          trigger={null}
        />
      )}

      {/* Custom Delete Modal */}
      {deletingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f1115] border border-rose-500/20 rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl mix-blend-overlay pointer-events-none -mr-24 -mt-24"></div>
            <div className="p-6 relative z-10 text-center">
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20 shadow-inner">
                <Trash2 className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Transaction?</h3>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to delete <span className="text-white font-medium">"{deletingTransaction.description}"</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeletingTransaction(null)}
                  className="flex-1 btn bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  onClick={async () => {
                    await deleteMutation.mutateAsync(deletingTransaction.id);
                    setDeletingTransaction(null);
                  }}
                  disabled={deleteMutation.isPending}
                  className="flex-1 btn bg-rose-500 hover:bg-rose-600 text-white border-none rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] flex items-center justify-center gap-2"
                >
                  {deleteMutation.isPending ? <span className="loading loading-spinner loading-sm"></span> : null}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
