import Head from "next/head";
import { useState } from "react";
import { HelpCircleIcon, BookOpen, Video, MessageCircle, Mail, Phone } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";
import { useAuth } from "../context/AuthContext";
import CartModal from "../components/CartModal";

export default function Help() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const { openAuthModal } = useAuth();
  const [cartItems, setCartItems] = useState(0);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents, setCartContents] = useState<any[]>([]);

  const faqItems = [
    {
      question: "How do I upload my beats?",
      answer: "Go to your creator dashboard and click the 'Upload Beat' button. You can drag and drop audio files or click to browse. Supported formats include MP3, WAV, and FLAC."
    },
    {
      question: "What are the licensing options?",
      answer: "We offer Basic, Premium, and Exclusive licenses. Basic allows non-commercial use, Premium includes commercial rights, and Exclusive gives you full ownership and removes the beat from our platform."
    },
    {
      question: "How do I get paid for my beats?",
      answer: "Payments are processed automatically when someone purchases your beat. You'll receive 70% of the sale price, and payments are sent to your registered payment method within 7-14 business days."
    },
    {
      question: "Can I collaborate with other producers?",
      answer: "Yes! Use our community features to connect with other producers. You can share beats for feedback, collaborate on projects, and even create joint releases."
    },
    {
      question: "How do I promote my beats?",
      answer: "Use our promote feature to boost visibility, share on social media, engage with the community, and consider our advertising options to reach more potential buyers."
    }
  ];

  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of ONDBeat",
      icon: BookOpen,
      articles: ["Creating Your Account", "Uploading Your First Beat", "Setting Up Payment"]
    },
    {
      title: "Beat Production",
      description: "Tips for creating better beats",
      icon: HelpCircleIcon,
      articles: ["Mixing Techniques", "Mastering Basics", "Genre-Specific Tips"]
    },
    {
      title: "Marketing",
      description: "Promote and sell your beats",
      icon: Video,
      articles: ["Social Media Strategy", "SEO for Producers", "Building Your Brand"]
    },
    {
      title: "Technical Support",
      description: "Get help with technical issues",
      icon: MessageCircle,
      articles: ["Audio Quality Issues", "Upload Problems", "Payment Issues"]
    }
  ];

  return (
    <>
      <Head>
        <title>Help & Tips - ONDBeat</title>
        <meta name="description" content="Get help, tips, and support for using ONDBeat platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CartModal 
        isOpen={cartModalOpen} 
        onClose={() => setCartModalOpen(false)}
        cartItems={cartContents}
        onRemoveItem={() => {}}
        onUpdateQuantity={() => {}}
        onCheckout={() => {}}
      />

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cartItems}
          />

          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Help & Tips</h1>
                <p className="text-gray-400">Get support and learn how to make the most of ONDBeat</p>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Need Immediate Help?</h2>
                    <p className="text-gray-100">Contact our support team for personalized assistance</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Live Chat
                    </button>
                    <button className="bg-black/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-black/30 transition-colors flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-8">
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "faq" ? "bg-green-500 text-black" : "bg-neutral-800 text-white"}`}
                  onClick={() => setActiveTab("faq")}
                >
                  FAQ
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "guides" ? "bg-green-500 text-black" : "bg-neutral-800 text-white"}`}
                  onClick={() => setActiveTab("guides")}
                >
                  Guides
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "contact" ? "bg-green-500 text-black" : "bg-neutral-800 text-white"}`}
                  onClick={() => setActiveTab("contact")}
                >
                  Contact
                </button>
              </div>

              {/* FAQ Section */}
              {activeTab === "faq" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-neutral-900 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                      <p className="text-gray-300">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Guides Section */}
              {activeTab === "guides" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Help Categories</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {helpCategories.map((category, index) => {
                      const IconComponent = category.icon;
                      return (
                        <div key={index} className="bg-neutral-900 rounded-lg p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <IconComponent className="w-6 h-6 text-green-400" />
                            <h3 className="text-lg font-semibold">{category.title}</h3>
                          </div>
                          <p className="text-gray-400 mb-4">{category.description}</p>
                          <div className="space-y-2">
                            {category.articles.map((article, articleIndex) => (
                              <div key={articleIndex} className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                                • {article}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeTab === "contact" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-neutral-900 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="font-semibold">Email Support</p>
                          <p className="text-gray-400 text-sm">support@ondbeat.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="font-semibold">Live Chat</p>
                          <p className="text-gray-400 text-sm">Available 24/7</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="font-semibold">Phone Support</p>
                          <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-900 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Send us a Message</h2>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <input 
                          type="text" 
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                          placeholder="What can we help you with?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea 
                          rows={4}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                          placeholder="Describe your issue or question..."
                        />
                      </div>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg transition-colors">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </main>

          <PlayerBar />
        </div>
      </div>
    </>
  );
}
