import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';

class NewMovie extends Form {
    
    state = { 
        genres: getGenres(),
        data: {
            title: '',
            genre: '',
            stock: '',
            rate: ''
        },
        errors: {}
     }

    componentDidMount(){
        const genres = getGenres();
        console.log('from did mount ',genres);
        this.setState({genres});
    }

    schema = {
        title: Joi.string().min(3).required(),
        genre: Joi.string().required(),
        stock: Joi.number().min(0).max(100).required(),
        rate: Joi.number().min(0).max(10).required(),
    };
        
    doSubmit = e => {
        console.log('submitted');
    }

    render() { 
        const {data, errors} = this.state;
        return ( 
            <div className="row pt-2">
                <div className="col-4 offset-4">
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('title','Title')}
                        <div class="form-group">
                            <label for="genre">Genre</label>
                            <select 
                                className="form-control" 
                                value={data.genre}
                                onChange={this.handleInputChange}
                                error={errors.genre}
                                id="genre" >
                                    <option value="">. . . </option>
                                    {this.state.genres.map(genre => <option key={genre._id} value={genre._id}>{genre.name}</option>)}
                            </select>
                        </div>
                        {this.renderInput('stock','Number in Stock', 'number')}
                        {this.renderInput('rate','rate', 'number')}
                        {this.renderSubmitBtn('Save movie')}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default NewMovie;