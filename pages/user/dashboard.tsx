import Head from 'next/head'
import { useState } from 'react'
import { Music, Download, Heart, Clock } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import PlayerBar from '../../components/PlayerBar'

export default function UserDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const purchasedBeats = [
    { id: 1, title: "Midnight Trap", artist: "ProducerMike", price: 29.99, downloadDate: "2024-01-15" },
    { id: 2, title: "Urban Dreams", artist: "BeatMaker99", price: 39.99, downloadDate: "2024-01-10" },
    { id: 3, title: "Street Vibes", artist: "SoundWizard", price: 24.99, downloadDate: "2024-01-05" }
  ]

  const favoriteBeats = [
    { id: 4, title: "City Lights", artist: "NightProducer", price: 34.99 },
    { id: 5, title: "Night Drive", artist: "UrbanBeats", price: 29.99 }
  ]

  return (
    <>
      <Head>
        <title>User Dashboard - ONDBeat</title>
        <meta name="description" content="View your library and recent purchases on ONDBeat" />
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
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
                <p className="text-gray-400">View your library and recent purchases</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Purchases</p>
                      <p className="text-2xl font-bold">{purchasedBeats.length}</p>
                    </div>
                    <Music className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Favorites</p>
                      <p className="text-2xl font-bold">{favoriteBeats.length}</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-400" />
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Spent</p>
                      <p className="text-2xl font-bold">
                        ${purchasedBeats.reduce((sum, beat) => sum + beat.price, 0).toFixed(2)}
                      </p>
                    </div>
                    <Download className="w-8 h-8 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Purchased Beats */}
              <div className="bg-neutral-900 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Purchased Beats</h2>
                <div className="space-y-4">
                  {purchasedBeats.map((beat) => (
                    <div key={beat.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-black font-bold">♪</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{beat.title}</h3>
                          <p className="text-gray-400 text-sm">by {beat.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">{beat.downloadDate}</span>
                        <span className="text-green-400 font-semibold">${beat.price}</span>
                        <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorite Beats */}
              <div className="bg-neutral-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Favorite Beats</h2>
                <div className="space-y-4">
                  {favoriteBeats.map((beat) => (
                    <div key={beat.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-black font-bold">♪</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{beat.title}</h3>
                          <p className="text-gray-400 text-sm">by {beat.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-semibold">${beat.price}</span>
                        <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
                          Purchase
                        </button>
                      </div>
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


