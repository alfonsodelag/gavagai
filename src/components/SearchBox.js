import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useGetLanguages from '../hooks/useGetLanguages';
import SearchResults from './SearchResults';
import Spinner from './Spinner/Spinner';
import ISO6391 from 'iso-639-1';

const icon = <FontAwesomeIcon icon={faSearch} />

const apiKey = "12c1199d4b43706e6a6e8394b518b7f8";

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState("");
    const [forWord, setForWord] = useState(null);
    const [languages, setLanguages] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const languageSearch = async () => {

            // if (searchTerm === '') return null;

            const url = `https://api.gavagai.se/v3/languages?apikey=${apiKey}`

            const response = await axios.get(url);

            const responseData = response.data;

            // console.log(responseData);
            setLanguages(Object.keys(responseData).map(i => responseData[i]));
            // console.log("languages", languages);
        }

        languageSearch();
    }, []);

    const submitSearch = async (language) => {

        if (searchTerm === '') return null;

        const url = `https://api.gavagai.se/v3/lexicon/${language}/${searchTerm}?apiKey=${apiKey}`

        setLoading(true);
        const response = await axios.get(url);

        const forWord = response.data.leftSideNeighbours[0].forWord;
        setResults(forWord);
        setLoading(false);
        setSearchTerm("");
        console.log(response.data);
    }

    const changeInput = (e) => {
        setSearchTerm(e.target.value);
    }

    const optionHandler = (e) => {
        setLanguages(e.target.value);
    }

    // const component = (loading) ? <Spinner /> : { results }


    const languageCodes = Object.values(languages)
    // console.log("languageCodes", languageCodes);

    const languageNames = languageCodes.map(languageCode => ISO6391.getName(languageCode.toLowerCase()));
    // console.log("languageNames", languageNames);

    // const languageNames = languageCodes.map((languageName, index) => ISO6391.getName(languageCodes));

    // console.log("languageNames", languageNames);


    // Using useGetLanguages
    const [language, Select] = useGetLanguages("Choose Language ", "", languageNames);

    return (


        <div className="searchbox">
            <h1 className="text-center pb-4">Search for a Term</h1>
            <div className="search">
                <input onChange={changeInput} className="searchTerm" type="text" placeholder="Please search for a term" value={searchTerm} />
                <button onClick={() => submitSearch(languageNames)} className="searchButton" type="submit">
                    {icon}
                </button>
            </div>

            <div>
                <Select />
                {results}
            </div>

            {/* {forWord ? <p>The forword for {setSearchTerm} is {forWord} </p> : ""} */}
        </div>
    );
}

export default SearchBox;
