import Head from 'next/head'
import { useState } from 'react'
import { Users, Music, DollarSign, BarChart2Icon, Shield, Settings } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import PlayerBar from '../../components/PlayerBar'

export default function AdminHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const adminStats = {
    totalUsers: 12543,
    totalBeats: 8923,
    totalRevenue: 184750.50,
    pendingApprovals: 23
  }

  const recentActivity = [
    { id: 1, action: "New beat uploaded", user: "ProducerMike", time: "2 hours ago" },
    { id: 2, action: "User registered", user: "NewUser123", time: "3 hours ago" },
    { id: 3, action: "Beat purchased", user: "Buyer99", beat: "Midnight Trap", time: "4 hours ago" },
    { id: 4, action: "Content flagged", user: "Moderator", time: "5 hours ago" }
  ]

  return (
    <>
      <Head>
        <title>Admin Dashboard - ONDBeat</title>
        <meta name="description" content="Manage users, content, and platform settings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-gray-400">Manage users, content, and platform settings</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Beats</p>
                      <p className="text-2xl font-bold">{adminStats.totalBeats.toLocaleString()}</p>
                    </div>
                    <Music className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Pending Approvals</p>
                      <p className="text-2xl font-bold">{adminStats.pendingApprovals}</p>
                    </div>
                    <Shield className="w-8 h-8 text-red-400" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Content Management</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      Review Pending Beats
                    </button>
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      Manage Categories
                    </button>
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      Content Moderation
                    </button>
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">User Management</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      View All Users
                    </button>
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      User Reports
                    </button>
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      Ban/Unban Users
                    </button>
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Platform Settings</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      Site Configuration
                    </button>
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      Payment Settings
                    </button>
                    <button className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                      Analytics Dashboard
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-neutral-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                      <div>
                        <p className="font-semibold">{activity.action}</p>
                        <p className="text-gray-400 text-sm">
                          {activity.user}
                          {activity.beat && ` • ${activity.beat}`}
                        </p>
                      </div>
                      <span className="text-gray-400 text-sm">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <PlayerBar />
        </div>
      </div>
    </>
  )
}


