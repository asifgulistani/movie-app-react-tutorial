import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class NewMovie extends Form {
    
    state = { 
        genres: [],
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        errors: {}
     }

    schema = {
        _id: Joi.string(),
        title: Joi.string().min(3).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(100).required(),
        dailyRentalRate: Joi.number().min(0).max(10).required(),
    };

    componentDidMount(){
        const genres = getGenres();
        this.setState({genres});

        //decide if adding new or editing the existance of a movie
        const movieId = this.props.match.params.id;
        
        if (movieId === 'new') return;

        const movie = getMovie(movieId);
        if (!movie) return this.props.history.replace('/not-found');

        this.setState({ data: this.mapToViewModel(movie) });
    }

    mapToViewModel(movie){
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    }
        
    doSubmit = e => {
        const movie = {...this.state.data};
        saveMovie(movie);
        this.props.history.push('/movies');
    }

    render() { 
        const {genres} = this.state;
        
        return ( 
            <div className="row pt-2">
                <div className="col-4 offset-4">
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('title','Title')}
                        {this.renderSelect('genreId', 'Genre', genres)}
                        {this.renderInput('numberInStock','Number in Stock', 'number')}
                        {this.renderInput('dailyRentalRate','Rate', 'number')}
                        {this.renderSubmitBtn('Save movie')}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default NewMovie;