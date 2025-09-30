import Head from 'next/head';
import { Edit } from 'lucide-react';

const InputField = ({ label, type, placeholder, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
    </div>
);

export default function EditProfilePage() {
    return (
        <>
            <Head>
                <title>Edit Profile | ONDBEAT</title>
            </Head>
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Edit size={32} />
                    <h1 className="text-3xl font-bold">Edit Profile</h1>
                </div>

                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8 space-y-6">
                     <div className="flex items-center gap-6">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="User Avatar" className="w-24 h-24 rounded-full object-cover"/>
                        <div>
                            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Change Photo</button>
                            <p className="text-xs text-neutral-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                    
                    <InputField label="Full Name" type="text" placeholder="Enter your full name" value="Demo User" />
                    <InputField label="Email Address" type="email" placeholder="Enter your email" value="demo.user@example.com" />
                    
                    <div>
                         <label className="block text-sm font-medium text-neutral-300 mb-2">Your Bio</label>
                         <textarea 
                            rows="4"
                            placeholder="Tell us a little about yourself..."
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700">Save Changes</button>
                    </div>
                </div>
            </div>
        </>
    );
}
