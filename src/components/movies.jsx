import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import {getMovies} from '../services/fakeMovieService'
import paginate from '../utils/paginate';
import ListGroup from './common/listGroup';
import Pagination from "./common/pagination";
import MoviesTable from './moviesTable';
import get from '../utils/object';
import { Link } from 'react-router-dom';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: null,
        sortColumn: null
     }

    componentDidMount(){
        const movies = getMovies();
        let genres = [{_id: "", name: 'All Genres'}, ...getGenres()];

        this.setState({
            movies,
            genres,
            selectedGenre: genres[0]
        })
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    }
    
    handlePageSizeChange = pageSize => {
        this.setState({pageSize: pageSize, currentPage: 1});
    }

    handleGenreSelected = genre => {
        this.setState({ selectedGenre: genre})
    }

    handleItemSelected = item => {
        console.log(item.name);
    }

    handleLike = movie => {
        const movies = this.state.movies.map(m => {
            if(m._id === movie._id)
                m.like = !m.like;

            return m;
        });

        this.setState({movies});
    }

    handleSort = sortColumn => {
        this.setState({sortColumn});
    }

    sortObjects = items => {
        const { sortColumn } = this.state;

        return items.sort(function(a, b){

                    // check order
                    if (sortColumn.order === 'asc'){
                        if(get(sortColumn.path,a) > get(sortColumn.path,b)) { return -1; }
                        if(get(sortColumn.path,a) < get(sortColumn.path,b)) { return 1; }
                        return 0;
                    } else {
                        if(get(sortColumn.path,a) < get(sortColumn.path,b)) { return -1; }
                        if(get(sortColumn.path,a) > get(sortColumn.path,b)) { return 1; }
                        return 0;
                    }
                })
    }

    getPagedMovies() {

        const { pageSize, 
            currentPage, 
            selectedGenre, 
            sortColumn,
            movies: allMovies} = this.state;

        const filterred = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorted = !sortColumn ? filterred : this.sortObjects(filterred);

        const movies = paginate(sorted, currentPage, pageSize);
        return { movies, filterred };
    }

    handleGenreCount = (genres) => {
        const {movies} = this.state;
        return genres.map(genre => {
            genre['total'] =  genre && genre._id !== ""
                                ? movies.filter(m => m.genre._id === genre._id).length
                                : movies.length ;
            return genre;
        });

    }

    render() { 

        const { 
            pageSize, 
            currentPage, 
            sortColumn,
            genres,
            selectedGenre
        } = this.state;
        
        const { movies, filterred } = this.getPagedMovies();
        
        const filterredGenres = this.handleGenreCount(genres);
        return ( 
            <div className="row">
                <div className="col-4">
                    <ListGroup 
                        items={filterredGenres}
                        selectedItem={selectedGenre}
                        onItemSelected={this.handleGenreSelected} />
                </div>
                <div className="col">
                    <Link to="/movies/new" className="btn btn-primary mb-2">
                        Add Movie
                    </Link>
                    
                    <MoviesTable 
                        movies={movies} 
                        onSort={this.handleSort} 
                        onDelete={this.handleDelete} 
                        sortColumn={sortColumn}
                        onLike={this.handleLike}/>
                    
                    <Pagination 
                        itemCount={filterred.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        currentPageItemCount={movies.length}
                        onPageChange={this.handlePageChange}
                        onPageSizeChange={this.handlePageSizeChange}
                        />
                </div>
            </div>
         );
    }
}
 
export default Movies;