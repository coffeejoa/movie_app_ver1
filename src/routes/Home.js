import React from "react";
import axios from 'axios';
import Movie from "../components/Movie";
import './Home.css';

//App처럼 대문자로 시작해야함.
class Home extends React.Component{

  state ={
    isLoading : true,
    movies : [],  //영화데이터를 저장할 배열
  };

  //async -await 같이 쓰임.
getMovies = async() =>{

  
  const{
    data :{
        data :{movies},
    },

    //평점에 의한 내림차순으로 가져오겠다
  } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sorty_by=rating');
  
  //console.log(movies);  //movies.data.data.movies 점연산자 적용
  this.setState({movies, isLoading : false});


};



  componentDidMount(){
    //영화앱의 데이터를 불려올것.
    //setTimeout(() => {this.setState({isLoading:false})}, 6000);
    //6초후에 isLoading State를 false로 바꾸자
   
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres ={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default Home;