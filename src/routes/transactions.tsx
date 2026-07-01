import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { mockTransactions } from '../server/mockDb'
import { Search, Filter, ArrowUpRight, ArrowDownRight, FileText, MoreVertical } from 'lucide-react'

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

  const updateFilter = (key: keyof TransactionsSearch, value: string) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value || undefined }),
    })
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Transactions</h1>
          <p className="text-gray-400">View and manage all your recent financial activity.</p>
        </div>
        <button className="btn bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 hover:border-transparent rounded-full px-6 shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all hover:scale-105">
          <FileText className="w-4 h-4 mr-1" /> Export CSV
        </button>
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
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="relative z-10">
            {transactions.map((trx) => (
              <div key={trx.id} className="flex items-center justify-between p-5 hover:bg-white/[0.03] transition-colors group rounded-2xl cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105 ${trx.amount > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800/50 text-gray-400 border border-white/5'}`}>
                    {trx.amount > 0 ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg block mb-1 group-hover:text-emerald-50 transition-colors">{trx.description}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <span>{trx.date}</span>
                      <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                      <span className="text-emerald-500/70">{trx.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`font-black text-2xl tracking-tight ${trx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                    {trx.amount > 0 ? '+' : ''}{trx.amount.toLocaleString('id-ID')}
                  </span>
                  <button className="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5 text-gray-500 hover:text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
