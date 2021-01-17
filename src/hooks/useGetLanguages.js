/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const useGetLanguages = (label, initialState, options, languageCodes) => {

    // State de nuestro custom hook
    const [state, setState] = useState(initialState);
    const [langCode, setLangCode] = useState(null);

    const languageCode = languageCodes.map(languageCode => languageCode);

    const changeOption = (e) => {
        setLangCode(e.target.value);
    }

    const Select = () => (
        <>
            <label>{label} </label>
            <select>
                <option value="">-- Select --</option>
                {options.map(languageNames => (
                    <option onChange={changeOption} className="option" key={languageNames} value={langCode}>{languageNames}</option>
                ))}
            </select>
        </>
    );

    // Returning state, UI and fn that modifies the state
    return [state, Select, setState];
}

export default useGetLanguages;
