import React, { useState, useEffect } from 'react';
import { X, Globe, Search, MapPin, Tag, User, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CampaignTargetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (targeting: { global: boolean; userType: string; keywords: string[]; locations: string[]; interests: string[]; }) => void;
  initialTargeting?: { global: boolean; userType: string; keywords: string[]; locations: string[]; interests: string[]; };
}

const CampaignTargetingModal: React.FC<CampaignTargetingModalProps> = ({ isOpen, onClose, onSave, initialTargeting }) => {
  const [isGlobal, setIsGlobal] = useState(initialTargeting?.global ?? true);
  const [userType, setUserType] = useState(initialTargeting?.userType ?? 'both'); // 'artists', 'producers', 'both'
  const [keywords, setKeywords] = useState<string[]>(initialTargeting?.keywords ?? []);
  const [locations, setLocations] = useState<string[]>(initialTargeting?.locations ?? []);
  const [interests, setInterests] = useState<string[]>(initialTargeting?.interests ?? []);
  const [keywordInput, setKeywordInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const handleAddTag = (tag: string, tagType: 'keyword' | 'location' | 'interest') => {
    if (tag.trim() === '') return;

    if (tagType === 'keyword' && keywords.length < 3) {
      setKeywords(prev => [...prev, tag.trim()]);
      setKeywordInput('');
    } else if (tagType === 'location' && locations.length < 3) {
      setLocations(prev => [...prev, tag.trim()]);
      setLocationInput('');
    } else if (tagType === 'interest') {
      setInterests(prev => [...prev, tag.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string, tagType: 'keyword' | 'location' | 'interest') => {
    if (tagType === 'keyword') {
      setKeywords(prev => prev.filter(tag => tag !== tagToRemove));
    } else if (tagType === 'location') {
      setLocations(prev => prev.filter(tag => tag !== tagToRemove));
    } else if (tagType === 'interest') {
      setInterests(prev => prev.filter(tag => tag !== tagToRemove));
    }
  };

  const handleSave = () => {
    onSave({ global: isGlobal, userType, keywords, locations, interests });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="bg-[#181818] rounded-2xl w-full max-w-2xl border border-neutral-800 overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-neutral-800 sticky top-0 bg-[#181818] z-10">
              <h2 className="text-xl font-bold text-white">Audience Targeting</h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Global Audience Toggle */}
              <div className="flex items-center justify-between bg-neutral-900/50 p-4 rounded-lg border border-neutral-700">
                <div className="flex items-center gap-3">
                  <Globe size={24} className="text-green-400" />
                  <div>
                    <p className="font-semibold text-white">Global Audience</p>
                    <p className="text-sm text-neutral-400">Reach everyone on the platform.</p>
                  </div>
                </div>
                <label htmlFor="global-toggle" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="global-toggle" 
                      className="sr-only" 
                      checked={isGlobal}
                      onChange={() => setIsGlobal(!isGlobal)}
                    />
                    <div className={`block bg-neutral-600 w-14 h-8 rounded-full ${isGlobal ? 'bg-green-500' : ''}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isGlobal ? 'translate-x-full border-green-500' : 'border-neutral-600'}`}></div>
                  </div>
                </label>
              </div>

              {!isGlobal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* User Type Targeting */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">User Targeting</label>
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="artists"
                          checked={userType === 'artists'}
                          onChange={() => setUserType('artists')}
                          className="form-radio text-green-500 bg-neutral-800 border-neutral-700 focus:ring-green-500"
                        />
                        <span className="ml-2 text-neutral-300">Artists (users)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="producers"
                          checked={userType === 'producers'}
                          onChange={() => setUserType('producers')}
                          className="form-radio text-green-500 bg-neutral-800 border-neutral-700 focus:ring-green-500"
                        />
                        <span className="ml-2 text-neutral-300">Producers (creators)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="both"
                          checked={userType === 'both'}
                          onChange={() => setUserType('both')}
                          className="form-radio text-green-500 bg-neutral-800 border-neutral-700 focus:ring-green-500"
                        />
                        <span className="ml-2 text-neutral-300">Artists & Producers</span>
                      </label>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-neutral-300 mb-2">Keywords Targeting</label>
                    <p className="text-xs text-neutral-500 mb-2">You can add up to 3 keywords or leave empty for Global.</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {keywords.map((tag, index) => (
                        <span key={index} className="flex items-center gap-1 bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag, 'keyword')} className="ml-1 text-green-300 hover:text-white">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        id="keywords"
                        placeholder={keywords.length >= 3 ? "Maximum 3 keywords added" : "Add keywords (e.g., trap, lofi, dark)"}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 pl-10 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(keywordInput, 'keyword'))}
                        disabled={keywords.length >= 3}
                      />
                    </div>
                  </div>

                  {/* Locations */}
                  <div>
                    <label htmlFor="locations" className="block text-sm font-medium text-neutral-300 mb-2">Location Targeting</label>
                    <p className="text-xs text-neutral-500 mb-2">Select up to 3 locations or leave empty for Global.</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {locations.map((tag, index) => (
                        <span key={index} className="flex items-center gap-1 bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag, 'location')} className="ml-1 text-green-300 hover:text-white">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        id="locations"
                        placeholder={locations.length >= 3 ? "Maximum 3 locations added" : "Add locations (e.g., New York, London)"}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 pl-10 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(locationInput, 'location'))}
                        disabled={locations.length >= 3}
                      />
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-neutral-300 mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {interests.map((tag, index) => (
                        <span key={index} className="flex items-center gap-1 bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag, 'interest')} className="ml-1 text-green-300 hover:text-white">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="relative">
                      <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        id="interests"
                        placeholder="Add interests (e.g., EDM, trap music, production)"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 pl-10 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(interestInput, 'interest'))}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-end items-center gap-4 p-6 border-t border-neutral-800">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-neutral-300 hover:text-white rounded-lg">Cancel</button>
              <button type="button" onClick={handleSave} className="px-6 py-2 text-sm font-bold bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors">
                Save Targeting
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CampaignTargetingModal;
