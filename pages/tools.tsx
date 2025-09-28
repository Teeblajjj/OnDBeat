import Head from "next/head";
import { useState } from "react";
import { AudioWaveform, Mic, Volume2, Settings, Play, Pause, Upload, Download } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";

export default function AudioTools() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioTools = [
    {
      name: "Beat Maker",
      description: "Create beats with our built-in sequencer",
      icon: AudioWaveform,
      color: "bg-blue-500",
      href: "/tools/beat-maker"
    },
    {
      name: "Voice Recorder",
      description: "Record vocals and instruments",
      icon: Mic,
      color: "bg-red-500",
      href: "/tools/recorder"
    },
    {
      name: "Audio Editor",
      description: "Edit and enhance your audio files",
      icon: Settings,
      color: "bg-purple-500",
      href: "/tools/editor"
    },
    {
      name: "Sample Library",
      description: "Browse and download samples",
      icon: Download,
      color: "bg-green-500",
      href: "/tools/samples"
    }
  ];

  const recentProjects = [
    { name: "Midnight Trap", lastModified: "2 hours ago", type: "Beat" },
    { name: "Urban Dreams", lastModified: "1 day ago", type: "Beat" },
    { name: "Street Vibes", lastModified: "3 days ago", type: "Mix" },
    { name: "City Lights", lastModified: "1 week ago", type: "Beat" }
  ];

  return (
    <>
      <Head>
        <title>Audio Tools - ONDBeat</title>
        <meta name="description" content="Professional audio tools for beat making, recording, and editing" />
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
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Audio Tools</h1>
                <p className="text-gray-400">Professional tools for beat making, recording, and editing</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Quick Record</h3>
                    <Mic className="w-6 h-6 text-red-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Start recording immediately</p>
                  <button 
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      isRecording 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </button>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Beat Player</h3>
                    <Volume2 className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Play your latest creation</p>
                  <button 
                    className="w-full py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-black transition-colors flex items-center justify-center gap-2"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                </div>

                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Upload File</h3>
                    <Upload className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Import audio files</p>
                  <button className="w-full py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                    Choose File
                  </button>
                </div>
              </div>

              {/* Audio Tools Grid */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">Available Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {audioTools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    return (
                      <div key={index} className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors cursor-pointer">
                        <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                        <p className="text-gray-400 text-sm">{tool.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Projects */}
              <div className="bg-neutral-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Recent Projects</h2>
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-black font-bold">♪</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-gray-400 text-sm">{project.type} • {project.lastModified}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Play className="w-5 h-5" />
                      </button>
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
