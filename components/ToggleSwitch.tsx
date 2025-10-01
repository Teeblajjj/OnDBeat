const ToggleSwitch = ({ enabled, setEnabled, label }) => {
  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input id="toggle" type="checkbox" className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} />
        <div className={`block w-14 h-8 rounded-full transition-all duration-300 ${enabled ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-[0_0_8px_rgba(49,196,141,0.5)]' : 'bg-neutral-700'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${enabled ? 'transform translate-x-6' : ''}`}></div>
      </div>
      {label && <span className="ml-3 text-white font-medium">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
