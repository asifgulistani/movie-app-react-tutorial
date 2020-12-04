import React from 'react';

const MovieForm = ({match, history}) => {
    return ( 
        <div>
            <h2>MovieForm - {match.params.id}</h2> 
            <button className="btn btn-outline-primary" onClick={()=> history.push('/movies')}>Save</button>
        </div>
    );
}
 
export default MovieForm;