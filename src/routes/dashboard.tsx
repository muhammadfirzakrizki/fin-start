import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { mockTransactions } from '../server/mockDb'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, Wallet, MoreHorizontal } from 'lucide-react'

const getDashboardSummary = createServerFn({ method: 'GET' })
  .handler(async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const totalBalance = mockTransactions.reduce((sum, trx) => sum + trx.amount, 0)
    const recentTransactions = mockTransactions.slice(0, 5)
    return { totalBalance, recentTransactions }
  })

export const Route = createFileRoute('/dashboard')({
  loader: async () => await getDashboardSummary(),
  pendingComponent: DashboardSkeleton,
  component: DashboardComponent,
})

function DashboardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="h-10 bg-white/10 rounded-xl w-64 mb-3"></div>
          <div className="h-5 bg-white/5 rounded-lg w-80"></div>
        </div>
        <div className="h-12 w-40 bg-white/10 rounded-full"></div>
      </div>
      
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="col-span-1 md:col-span-2 h-72 bg-white/5 border border-white/5 rounded-[2rem]"></div>
        <div className="h-72 bg-white/5 border border-white/5 rounded-[2rem]"></div>
      </div>

      {/* Lists Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-8 bg-white/10 rounded-lg w-48 mb-6"></div>
          <div className="h-96 bg-white/5 border border-white/5 rounded-[2rem]"></div>
        </div>
        <div>
          <div className="h-8 bg-white/10 rounded-lg w-40 mb-6"></div>
          <div className="h-96 bg-white/5 border border-white/5 rounded-[2rem]"></div>
        </div>
      </div>
    </div>
  )
}

function DashboardComponent() {
  const { totalBalance, recentTransactions } = Route.useLoaderData()

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Welcome back, Muhammad Firzak Rizki</h1>
          <p className="text-gray-400">Here's what's happening with your finances today.</p>
        </div>
        <button className="btn bg-white text-black hover:bg-gray-200 border-none rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]">
          <ArrowUpRight className="w-4 h-4 mr-1" /> Transfer Funds
        </button>
      </div>
      
      {/* Premium Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="col-span-1 md:col-span-2 relative overflow-hidden rounded-[2rem] p-8 md:p-10 shadow-2xl group transition-all hover:shadow-emerald-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-900 z-0"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 mix-blend-overlay opacity-40 group-hover:opacity-70 transition-opacity duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-300/20 rounded-full blur-3xl -ml-20 -mb-20 mix-blend-overlay opacity-30"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between text-emerald-100/90 mb-10">
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <Wallet className="w-4 h-4" />
                <span className="font-medium tracking-wide text-xs uppercase">Total Balance</span>
              </div>
              <MoreHorizontal className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-md flex items-baseline">
                <span className="opacity-70 text-3xl md:text-4xl mr-2 font-bold tracking-normal">Rp</span>{totalBalance.toLocaleString('id-ID')}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center bg-white/20 text-white px-3 py-1.5 rounded-lg font-bold backdrop-blur-md shadow-sm border border-white/20">
                  <TrendingUp className="w-4 h-4 mr-1.5" /> +12.5%
                </span>
                <span className="text-emerald-50/70 font-medium">from last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1115] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between group hover:border-white/10 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-gray-400 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-rose-500" />
              </div>
              <span className="font-medium text-sm">Monthly Expenses</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              <span className="text-xl text-gray-500 mr-1">Rp</span>430.000
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-2.5 mb-3 overflow-hidden shadow-inner mt-6">
              <div className="bg-gradient-to-r from-rose-500 to-orange-400 h-2.5 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" style={{ width: '45%' }}></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">45% of budget reached</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
            <button className="text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">View All</button>
          </div>
          
          <div className="bg-[#0f1115] border border-white/5 rounded-[2rem] overflow-hidden shadow-xl p-2">
            {recentTransactions.map((trx, i) => (
              <div key={trx.id} className="flex justify-between items-center p-4 hover:bg-white/[0.03] transition-colors cursor-pointer group rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${trx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500 group-hover:shadow-emerald-500/20' : 'bg-gray-800/50 text-gray-400 border border-white/5 group-hover:bg-gray-800'}`}>
                    {trx.amount > 0 ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1 text-lg group-hover:text-emerald-50 transition-colors">{trx.description}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-emerald-500/80 bg-emerald-500/10 px-2 py-0.5 rounded-md">{trx.category}</span>
                      <span className="text-xs text-gray-500">{trx.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`font-black text-xl ${trx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                  {trx.amount > 0 ? '+' : ''}{trx.amount.toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-6">Quick Transfer</h3>
          <div className="bg-[#0f1115] border border-white/5 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide relative z-10">
               {['Sarah', 'Mike', 'Emma', 'John'].map((name, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                   <div className="w-14 h-14 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-sm font-bold text-gray-300 group-hover:bg-gradient-to-tr group-hover:from-emerald-500 group-hover:to-teal-400 group-hover:text-white group-hover:border-transparent transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                     {name[0]}
                   </div>
                   <span className="text-xs text-gray-500 group-hover:text-gray-300 font-medium transition-colors">{name}</span>
                 </div>
               ))}
            </div>
            
            <div className="relative z-10 mb-6">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">Rp</span>
              <input type="text" placeholder="0" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-2xl font-bold text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner" />
            </div>
            
            <button className="btn w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black border-none rounded-2xl h-14 text-lg font-bold shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02] relative z-10">
              Send Money
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
