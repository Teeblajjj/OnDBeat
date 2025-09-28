import Head from "next/head";
import { useState } from "react";
import { BarChart2Icon, TrendingUp, Eye, Heart, DollarSign, Calendar, Download } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";

export default function Analytics() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("30d");

  const analyticsData = {
    overview: {
      totalPlays: 12543,
      totalLikes: 892,
      totalDownloads: 234,
      totalRevenue: 1847.50
    },
    topBeats: [
      { title: "Midnight Trap", plays: 2341, likes: 89, downloads: 23, revenue: 345.00 },
      { title: "Urban Dreams", plays: 1892, likes: 67, downloads: 18, revenue: 267.00 },
      { title: "Street Vibes", plays: 1654, likes: 54, downloads: 15, revenue: 225.00 },
      { title: "City Lights", plays: 1432, likes: 43, downloads: 12, revenue: 180.00 },
      { title: "Night Drive", plays: 1209, likes: 38, downloads: 9, revenue: 135.00 }
    ],
    monthlyStats: [
      { month: "Jan", plays: 1200, revenue: 150 },
      { month: "Feb", plays: 1450, revenue: 180 },
      { month: "Mar", plays: 1680, revenue: 210 },
      { month: "Apr", plays: 1920, revenue: 240 },
      { month: "May", plays: 2100, revenue: 260 },
      { month: "Jun", plays: 2340, revenue: 290 }
    ]
  };

  return (
    <>
      <Head>
        <title>Analytics - ONDBeat</title>
        <meta name="description" content="Track your beat performance, plays, downloads, and revenue analytics" />
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
              {/* Page Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Analytics</h1>
                  <p className="text-gray-400">Track your beat performance and revenue</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className={`px-4 py-2 rounded-lg transition-colors ${timeRange === "7d" ? "bg-green-500 text-black" : "bg-neutral-800 text-white"}`}
                    onClick={() => setTimeRange("7d")}
                  >
                    7 Days
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg transition-colors ${timeRange === "30d" ? "bg-green-500 text-black" : "bg-neutral-800 text-white"}`}
                    onClick={() => setTimeRange("30d")}
                  >
                    30 Days
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg transition-colors ${timeRange === "90d" ? "bg-green-500 text-black" : "bg-neutral-800 text-white"}`}
                    onClick={() => setTimeRange("90d")}
                  >
                    90 Days
                  </button>
                </div>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Plays</p>
                      <p className="text-2xl font-bold">{analyticsData.overview.totalPlays.toLocaleString()}</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="mt-2 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5% from last month
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Likes</p>
                      <p className="text-2xl font-bold">{analyticsData.overview.totalLikes.toLocaleString()}</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="mt-2 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8.3% from last month
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Downloads</p>
                      <p className="text-2xl font-bold">{analyticsData.overview.totalDownloads.toLocaleString()}</p>
                    </div>
                    <Download className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="mt-2 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15.2% from last month
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Revenue</p>
                      <p className="text-2xl font-bold">${analyticsData.overview.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="mt-2 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +22.1% from last month
                  </div>
                </div>
              </div>

              {/* Top Beats Performance */}
              <div className="bg-neutral-900 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Top Performing Beats</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-700">
                        <th className="text-left py-3 px-4">Beat Title</th>
                        <th className="text-left py-3 px-4">Plays</th>
                        <th className="text-left py-3 px-4">Likes</th>
                        <th className="text-left py-3 px-4">Downloads</th>
                        <th className="text-left py-3 px-4">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.topBeats.map((beat, index) => (
                        <tr key={index} className="border-b border-neutral-800">
                          <td className="py-3 px-4 font-medium">{beat.title}</td>
                          <td className="py-3 px-4">{beat.plays.toLocaleString()}</td>
                          <td className="py-3 px-4">{beat.likes}</td>
                          <td className="py-3 px-4">{beat.downloads}</td>
                          <td className="py-3 px-4 text-green-400">${beat.revenue.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monthly Revenue Chart */}
              <div className="bg-neutral-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Monthly Revenue Trend</h2>
                <div className="h-64 flex items-end justify-between gap-2">
                  {analyticsData.monthlyStats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="bg-green-500 w-full rounded-t transition-all duration-500 hover:bg-green-400"
                        style={{ height: `${(stat.revenue / 300) * 200}px` }}
                        title={`${stat.month}: $${stat.revenue}`}
                      />
                      <span className="text-xs text-gray-400 mt-2">{stat.month}</span>
                      <span className="text-xs text-green-400">${stat.revenue}</span>
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
  );
}
