import React,{useState} from 'react';
 //https://api.themoviedb.org/3/search/movie?api_key=bb774c9b38258863c6eaef8f0ad73e5c&language=en-US&page=1&include_adult=false&query=kid
import  axios from 'axios';
import Search from './Search';
import Results from './Results';

const  App =() =>  {
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {},
    });

    const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=bb774c9b38258863c6eaef8f0ad73e5c&language=en-US&page=1&include_adult=false';
    const handleInput =  e => {
        let s = e.target.value;

        setState(
          prevState =>{
              return {...prevState, s: s}
          }
        );

    };

    const search = e =>{
       if(e.key === 'Enter'){
           axios(`${apiUrl}&query=${state.s}`)
               .then(data => {
                   let results = data.data.results;
                   setState(
                       prevState =>{
                           return {...prevState, results: results}
                       }
                   );
               })
       }
    };
    const { results } =  state;
    return (
    <div className="App">
      <header  >
         <h1>Movie  Base</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search}/>
        <Results results={results}/>
      </main>
    </div>
  );
};

export default App;
