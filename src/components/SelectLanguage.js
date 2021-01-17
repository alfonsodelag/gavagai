/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const SelectLanguage = props => {
    const { label, initialState, languageNames, languageToCode, setLangCode } = props;
    // State de nuestro custom hook
    // const [state, setState] = useState(initialState);

    // const languageCode = languageCodes.map(languageCode => languageCode);

    const changeOption = (e) => {
        setLangCode(e.target.value);
        console.log(e.target.value);
    }


    // const Select = () => (
    return (
        <>
            <label>{label} </label>
            <select onChange={changeOption}>
                <option value="">-- Select --</option>
                {languageNames && languageNames.map(languageName => (
                    <option className="option" key={languageName} value={languageToCode[languageName]} >{languageName}</option>
                ))}
            </select>
        </>
    )

    // );

    // Returning state, UI and fn that modifies the state
    // return [state, Select, setState, langCode];
}

export default SelectLanguage;
