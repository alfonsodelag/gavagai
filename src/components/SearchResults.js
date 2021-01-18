import React from 'react'

function SearchResults({ results }) {

    if (!results) return null;

    return (
        <div>
            <p>Forword is : {results.leftSideNeighbours[0].word}</p>
        </div>
    )
}

export default SearchResults
