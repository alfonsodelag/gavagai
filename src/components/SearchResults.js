import React from 'react';

function SearchResults(props) {
    const { results, currentSearchTerm } = props;

    if (!results) return null;

    return (
        <div>
            {
                results && results.leftSideNeighbours && results.rightSideNeighbours && results.leftSideNeighbours.length > 0 && results.rightSideNeighbours.length > 0 && results.leftSideNeighbours[0].word && results.leftSideNeighbours[0].word ?
                    <div className="pt-4">
                        <p>leftSideNeighbours words which are semantically similar to <b>{currentSearchTerm}</b> are: <b>{results.leftSideNeighbours[0].word}</b> and <b>{results.leftSideNeighbours[1].word}</b> </p>
                        <p>rightSideNeighbours words which are semantically similar to <b>{currentSearchTerm}</b> are: <b>{results.rightSideNeighbours[0].word}</b> and <b>{results.rightSideNeighbours[1].word}</b> </p>
                        <p>The frequency of the word <b>{currentSearchTerm}</b> is: <b>{results.wordInformation.frequency}</b></p>
                        {results.wordInformation.additionalInformation?.link ?

                            <p>Additional information about this word can be found <a target="_blank" rel="noreferrer" href={results.wordInformation.additionalInformation.link}>here</a></p>
                            :
                            null
                        }
                    </div>
                    :
                    <>
                        <p>No results found. Please try searching for another word</p>
                    </>
            }
        </div>
    );
}

export default SearchResults;
