import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Twitter, Instagram, Cloud } from 'lucide-react';

const profileData = {
  beatsPurchased: 12,
  favorites: 42,
  totalSpent: 450,
};

const chartData = [
  { name: 'Beats Purchased', value: profileData.beatsPurchased },
  { name: 'Favorites', value: profileData.favorites },
  { name: 'Total Spent', value: profileData.totalSpent },
];

const UserProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-2xl text-white">Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="px-6 py-8 sm:p-10">
            <div className="flex items-center">
              <img className="h-24 w-24 rounded-full object-cover ring-4 ring-green-500" src={user.photoURL || '/default-avatar.png'} alt="User Avatar" />
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
                <p className="text-md text-neutral-400 mt-1">{user.bio}</p>
                <div className="flex items-center mt-3 space-x-4">
                  <a href="#" className="text-neutral-500 hover:text-green-500"><Twitter size={20} /></a>
                  <a href="#" className="text-neutral-500 hover:text-green-500"><Instagram size={20} /></a>
                  <a href="#" className="text-neutral-500 hover:text-green-500"><Cloud size={20} /></a>
                </div>
              </div>
              <div className="ml-auto flex space-x-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{user.followers}</p>
                  <p className="text-sm text-neutral-400">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{user.following}</p>
                  <p className="text-sm text-neutral-400">Following</p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="border-t border-neutral-800 p-6 sm:p-10">
            <h2 className="text-xl font-semibold text-white mb-6">Your Dashboard</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barCategoryGap={"40%"}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="name" stroke="#a3a3a3" />
                  <YAxis stroke="#a3a3a3" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#171717', 
                      border: '1px solid #404040',
                      borderRadius: '0.5rem' 
                    }} 
                    cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Content Tabs (e.g., Purchased Beats, Favorites) */}
          <div className="border-t border-neutral-800 p-6 sm:p-10">
            <h2 className="text-xl font-semibold text-white mb-4">Your Collection</h2>
            {/* Add tabs here in the future */}
            <div className="text-center text-neutral-500 py-10">
              <p>Your purchased beats and favorites will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
