import React from 'react';

const Genre = probs => {

    const {genres, onGenreSelected} = probs;

    return ( 
        <ul className="list-group">
            {genres.map(genre => (
                <li className="list-group-item" onClick={() => onGenreSelected(genre)}>{genre.name}</li>
            ))}
        </ul>
     );
}
 
export default Genre;