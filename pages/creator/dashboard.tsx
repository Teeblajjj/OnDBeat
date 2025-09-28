import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import PlayerBar from '../../components/PlayerBar'
import UploadForm from '../../components/UploadForm'

export default function CreatorDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Head>
        <title>Creator Dashboard - ONDBeat</title>
        <meta name="description" content="Upload and manage your beats on ONDBeat" />
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
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
                <p className="text-gray-400">Upload new beats and manage your catalog</p>
              </div>
              
              <UploadForm />
            </div>
          </main>

          <PlayerBar />
        </div>
      </div>
    </>
  )
}


