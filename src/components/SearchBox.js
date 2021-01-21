/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import useGetLanguages from './SelectLanguage';
import Spinner from './Spinner/Spinner';
import SelectLanguage from './SelectLanguage';
import SearchResults from './SearchResults';
import env from "react-dotenv";

const apiKey = env.API_KEY;
const icon = <FontAwesomeIcon icon={faSearch} />

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentSearchTerm, setCurrentSearchTerm] = useState("");
    const [results, setResults] = useState("");
    const [languageCode, selectLanguageCode] = useState("");
    const [loading, setLoading] = useState(false);


    // * Submitting Search to API
    const submitSearch = async (language) => {

        if (searchTerm === '') return null;

        const url = `https://api.gavagai.se/v3/lexicon/${language}/${searchTerm}?apiKey=${apiKey}`

        setResults(null);
        setLoading(true);

        const response = await axios.get(url);

        // console.log("response.data of submitSearch", response.data)

        const undefinedResult = typeof response.data === "undefined";
        if (!undefinedResult) {
            try {
                setResults(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }

        setCurrentSearchTerm(searchTerm);
        setLoading(false);
    }

    const changeInput = (e) => {
        setSearchTerm(e.target.value);
    }


    return (

        <div className="searchbox">
            <h1 className="text-center pb-4">Search for a Term</h1>
            <div className={
                (languageCode === "" || searchTerm === "") ? "search disabled" : "search"
            }>
                <input onChange={changeInput} className="searchTerm" type="text" placeholder="Please search for a term" value={searchTerm} />

                <button onClick={() => submitSearch(languageCode)} className="searchButton " type="submit" disabled={languageCode === "" || searchTerm === ""}>
                    {icon}
                </button>
            </div>

            <div className="flex">
                <SelectLanguage
                    selectLanguageCode={selectLanguageCode}
                    languageCode={languageCode}
                />
            </div>

            {loading ? <Spinner /> : null}

            <SearchResults
                results={results}
                currentSearchTerm={currentSearchTerm}
            />
        </div>
    );
}

export default SearchBox;
