import React from 'react'


export default function SearchBar(props) {    

    return (
        <>
            <input className='search-bar' type='search' value={props.searchLocation} 
                onChange={props.onChange} onKeyDown={props.handleSearch} placeholder='🔍 Search a City...'
                onBlur={() => props.onBlurHandler()} 
            />
            {props.suggestions && props.suggestions.map((suggestion, index) => 
                <div    key={index} className='search-suggestions' 
                        onClick={() => props.onSuggest(suggestion.name)} 
                >
                    {`📍 ${suggestion.name}, ${suggestion.country}`}
                </div>
            )}
        </>
    )
}