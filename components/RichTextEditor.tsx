import { useState } from 'react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
    const [editorValue, setEditorValue] = useState(value);

    const handleChange = (e) => {
        setEditorValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <textarea
            value={editorValue}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full h-32 bg-neutral-900/60 border border-neutral-700/80 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500 transition-all duration-200 shadow-inner-soft"
        />
    );
};

export default RichTextEditor;
