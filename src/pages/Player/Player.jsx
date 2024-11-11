import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

   const {id} = useParams(); 
   const navigate = useNavigate();

   const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
   })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWUwMjEzZjg0YTEyYTYwMjU0ZTg1NWY4YjkzMzBhNiIsIm5iZiI6MTczMDAwNjk0Ni43NjczNzQsInN1YiI6IjY3MWRjNWUzNDU0MmUzNzFmZTBhY2Y3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DPo70G42cJVk4rswh5GN0LZoLM07LVW8au6iE3hCvqs'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  
    
  return (
    <div className= 'player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
       <iframe width='90%' height='90%'
       src={`https://www.youtube.com/embed/${apiData.key}`}
       title='trailer' frameBorder='0' allowFullScreen></iframe>
       <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
       </div>
    </div>
  )
}

export default Player
