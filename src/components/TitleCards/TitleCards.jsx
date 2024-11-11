import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {
     
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWUwMjEzZjg0YTEyYTYwMjU0ZTg1NWY4YjkzMzBhNiIsIm5iZiI6MTczMDAwNjk0Ni43NjczNzQsInN1YiI6IjY3MWRjNWUzNDU0MmUzNzFmZTBhY2Y3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DPo70G42cJVk4rswh5GN0LZoLM07LVW8au6iE3hCvqs'
      }
    };

    const handleWheel = (event)=>{
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
}

    useEffect(()=>{
      
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

     cardsRef.current.addEventListener('wheel', handleWheel);
    },[])   

  return (
    <div className= 'title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
                </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
