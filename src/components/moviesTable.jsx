import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {

    columns = [
        {
            path: 'title', 
            label: 'Title',
            content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {
            path: 'like', 
            label: 'Favorites',
            content: movie => <Like item={movie} state="like" onLiked={()=> this.props.onLike(movie)} />
        },
        {
            key: 'options',
            content: movie => <button onClick={()=> this.props.onDelete(movie)} className="btn btn-outline-danger btn-sm">X</button>
        },
    ]

    render() { 
        const { 
            movies,
            onSort,
            sortColumn } = this.props;

        return ( 
            <Table 
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
                columns={this.columns}
                />
         );
    }
}
 
export default MoviesTable;