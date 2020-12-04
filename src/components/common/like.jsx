import React from 'react';

const Like = props => {

    const {onLiked, item, state} = props;

    return ( 
        <button onClick={()=> onLiked(item)} className={"btn btn-sm btn-" + (item[state] ? 'primary' : 'secondary')}>
            {item[state] ? 'Dislike' : 'Like it'}
        </button>
     );
}

Like.defaultProps = {
    state: 'state',
};
 
export default Like;