/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ISO6391 from 'iso-639-1';
import env from "react-dotenv";

const apiKey = env.API_KEY;

const SelectLanguage = props => {
    const { selectLanguageCode, languageCode } = props;
    const [languages, setLanguages] = useState("");

    // * Language API Call
    useEffect(() => {
        const languageSearch = async () => {

            const url = `https://api.gavagai.se/v3/languages?apikey=${apiKey}`

            const response = await axios.get(url);
            const languageCodes = response.data;

            const languages = languageCodes ? languageCodes.reduce((acc, languageCode) => {
                acc[languageCode] = ISO6391.getName(languageCode.toLowerCase());
                return acc;
            }, {}) : {}

            setLanguages(languages);
        }

        languageSearch();
    }, []);


    const changeOption = (e) => {
        selectLanguageCode(e.target.value);
    }

    return (
        <>
            <label>Choose Language </label>
            <select onChange={changeOption} value={languageCode}>
                <option value="">-- Select --</option>
                {languages && Object.entries(languages).map(([code, languageName]) => (
                    <option key={code} value={code} >{languageName}</option>
                ))}
            </select>
        </>
    );
}

export default SelectLanguage;
