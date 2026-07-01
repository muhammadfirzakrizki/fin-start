import * as React from 'react'
import { HeadContent, Scripts, createRootRoute, Outlet, Link, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'
import { LayoutDashboard, ReceiptText, Wallet, Menu, Bell, Search, Settings, PanelLeftClose, PanelLeft, Zap, Loader2 } from 'lucide-react'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'FinStart | Premium Dashboard' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap' }
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
  const isFetching = useRouterState({ select: (s) => s.isFetching })

  return (
    <html lang="id" data-theme="black" className="bg-[#050505]">
      <head>
        <HeadContent />
      </head>
      <body className="font-['Outfit'] antialiased text-gray-200 bg-gradient-to-br from-[#050505] to-[#0a0f16] min-h-screen selection:bg-emerald-500/30">
        
        {/* Global Top Loading Bar */}
        {(isLoading || isFetching) && (
          <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-[#050505]">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-full origin-left animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
          </div>
        )}

        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          
          <div className="drawer-content flex flex-col items-center justify-start relative w-full transition-all duration-300">
            {/* Top Glass Navbar */}
            <div className="navbar sticky top-0 z-40 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 h-20 w-full flex items-center justify-between">
              
              {/* Mobile Hamburger */}
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-emerald-400">
                  <Menu className="w-6 h-6" />
                </label>
              </div>
              
              {/* Desktop Sidebar Toggle */}
              <div className="flex-none hidden lg:flex mr-4">
                <button 
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                  className="btn btn-square btn-ghost text-gray-400 hover:text-white transition-all"
                  title="Toggle Sidebar"
                >
                  {isSidebarCollapsed ? <PanelLeft className="w-6 h-6" /> : <PanelLeftClose className="w-6 h-6" />}
                </button>
              </div>

              <div className="flex-1 lg:hidden">
                <a className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-emerald-500" /> FinStart
                </a>
              </div>
              
              <div className="flex-1 hidden lg:flex">
                <div className="relative w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                  <input type="text" placeholder="Search transactions..." className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-gray-600 shadow-inner" />
                </div>
              </div>

              <div className="flex flex-none items-center gap-4">
                
                {/* Visual indicator for background fetching */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold transition-all duration-300 ${isFetching ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 w-0 overflow-hidden px-0 border-none'}`}>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="whitespace-nowrap">Syncing...</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="btn btn-circle btn-ghost btn-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="btn btn-circle btn-ghost btn-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                <div className="avatar placeholder cursor-pointer ring-2 ring-transparent hover:ring-emerald-500/50 transition-all rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <div className="bg-gradient-to-tr from-emerald-600 to-teal-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-sm font-bold">MR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <main className="w-full flex-1 p-6 md:p-12 max-w-7xl mx-auto pb-10">
              {children || <Outlet />}
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-white/5 bg-[#050505]/50 backdrop-blur-md py-6 px-6 mt-auto">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <p>© 2026 Muhammad Firzak Rizki. All rights reserved.</p>
                <div className="flex items-center flex-wrap justify-center gap-2">
                  <span className="font-medium mr-1">Built with:</span>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white tracking-wide shadow-sm">TanStack Start</span>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 tracking-wide shadow-sm">React</span>
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400 tracking-wide shadow-sm">Tailwind CSS</span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 tracking-wide shadow-sm">daisyUI</span>
                    <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400 tracking-wide shadow-sm">Bun</span>
                  </div>
                </div>
              </div>
            </footer>
          </div> 
          
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-72'} min-h-full bg-[#07090c]/95 backdrop-blur-3xl border-r border-white/5 flex flex-col shadow-2xl transition-all duration-300 ease-in-out overflow-hidden`}>
              <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-8'} h-20 border-b border-white/5 transition-all duration-300`}>
                <div className={`rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0 transition-all duration-300 ${isSidebarCollapsed ? 'w-12 h-12' : 'w-10 h-10 mr-3'}`}>
                  <Wallet className={`${isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
                </div>
                <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                  <span className="font-bold text-2xl tracking-tight text-white">Fin<span className="text-emerald-500">Start</span></span>
                </div>
              </div>
              
              <ul className={`flex flex-col py-8 gap-2 flex-1 w-full`}>
                <li className={`mb-2 overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-8">Menu</span>
                </li>
                <li className="w-full">
                  <Link to="/dashboard" title={isSidebarCollapsed ? 'Overview' : ''} className={`relative py-4 text-gray-400 font-medium hover:text-white hover:bg-white/5 [&.active]:bg-gradient-to-r [&.active]:from-emerald-500/20 [&.active]:to-emerald-500/5 [&.active]:text-emerald-400 [&.active]:border-l-4 [&.active]:border-emerald-500 transition-all duration-300 group flex items-center w-full ${isSidebarCollapsed ? 'justify-center px-0' : 'px-8'} border-l-4 border-transparent`}>
                    <LayoutDashboard className={`flex-shrink-0 group-[.active]:drop-shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-transform duration-300 group-[.active]:scale-110 group-hover:scale-110 ${isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} /> 
                    <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-4'}`}>
                      <span className="font-semibold tracking-wide">Overview</span>
                    </div>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/transactions" title={isSidebarCollapsed ? 'Transactions' : ''} className={`relative py-4 text-gray-400 font-medium hover:text-white hover:bg-white/5 [&.active]:bg-gradient-to-r [&.active]:from-emerald-500/20 [&.active]:to-emerald-500/5 [&.active]:text-emerald-400 [&.active]:border-l-4 [&.active]:border-emerald-500 transition-all duration-300 group flex items-center w-full ${isSidebarCollapsed ? 'justify-center px-0' : 'px-8'} border-l-4 border-transparent`}>
                    <ReceiptText className={`flex-shrink-0 group-[.active]:drop-shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-transform duration-300 group-[.active]:scale-110 group-hover:scale-110 ${isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} /> 
                    <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-4'}`}>
                      <span className="font-semibold tracking-wide">Transactions</span>
                    </div>
                  </Link>
                </li>
              </ul>

              {/* Upgrade Plan Widget */}
              <div className="mt-auto transition-all duration-300 overflow-hidden">
                {!isSidebarCollapsed ? (
                  <div className="p-6 m-4 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl relative group hover:border-emerald-500/30 transition-colors cursor-pointer">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-emerald-500/30 duration-700"></div>
                    <h4 className="font-bold text-white mb-2 relative z-10">Pro Plan</h4>
                    <p className="text-xs text-gray-400 mb-4 relative z-10 whitespace-normal">Unlock all premium analytics & limits.</p>
                    <button className="btn btn-sm btn-block border-none bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors relative z-10 font-bold">Upgrade</button>
                  </div>
                ) : (
                  <div className="m-4 mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-500/20 cursor-pointer shadow-lg hover:shadow-emerald-500/20 transition-all" title="Upgrade to Pro">
                      <Zap className="w-6 h-6 fill-emerald-500/20" />
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}

