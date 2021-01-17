import React, { useState } from 'react';

const useGetLanguages = (label, initialState, options) => {

    // State de nuestro custom hook
    const [state, setState] = useState(initialState)

    const Select = () => (
        <>
            <label>{label} </label>
            <select>
                <option value="">-- Select --</option>
                {options.map(languageNames => (
                    <option key={languageNames} value={languageNames}>{languageNames}</option>
                ))}
            </select>
        </>
    );

    // Returning state, UI and fn that modifies the state
    return [state, Select, setState];
}

export default useGetLanguages;
