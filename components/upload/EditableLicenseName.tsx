import React, { useState, useEffect } from 'react';

const EditableLicenseName = ({ initialName, onNameUpdate, isEditable }) => {
    const [name, setName] = useState(initialName);

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    const handleBlur = () => {
        onNameUpdate(name);
    };

    return (
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            className="text-xl font-bold bg-transparent text-white outline-none focus:ring-1 focus:ring-green-500 rounded-md px-2 py-1 -ml-2"
            disabled={!isEditable}
        />
    );
};

export default EditableLicenseName;
