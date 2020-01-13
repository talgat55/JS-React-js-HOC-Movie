import React, {Component} from 'react';
import axios from 'axios';
import Search from './Search';
const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=bb774c9b38258863c6eaef8f0ad73e5c&language=en-US&page=1&include_adult=false';

const withSearch = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                s: "",
                results: [],
                selected: {},
            };
            this.handleInput = this.handleInput.bind(this);
            this.search = this.search.bind(this);
        }
        handleInput = e => {
            let s = e.target.value;
            this.setState({
                s: s
            });
        };

        search = e => {
            if (e.key === 'Enter') {
                axios(`${apiUrl}&query=${this.state.s}`)
                    .then(data => {
                        let results = data.data.results;

                        this.setState({
                            results: results
                        });
                    })
            }
        };
        render() {
            const {results} = this.state;
            return (
                <div  className="App">
                    <header>
                        <h1>Movie Base</h1>
                    </header>
                    <main>
                        <Search handleInput={this.handleInput} search={this.search}/>
                        <WrappedComponent  results={results}/>
                    </main>
                </div>
            )
        }
    }
};
export default withSearch;
