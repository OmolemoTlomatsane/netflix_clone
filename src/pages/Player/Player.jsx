import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [apiData, setapiData] = useState({
        name: '',
        key: '',
        published_at: '',
        typeof: ''})

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjE0OTI3ZGZlNjYzM2U0NGNkZDk3ZDM5YzczZGJjYyIsIm5iZiI6MTczNjQ1MzU4MC41Niwic3ViIjoiNjc4MDJkY2M0NGQ2NDlmZmFlN2I1NjBiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6c-OtSbnF_W-7qKq5TchLpIKAqrG0V_1zAy4c9OdhAg'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setapiData(res.results[0]))
    .catch(err => console.error(err));
  }, [])
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={()=>{navigate('/')}} />
      <iframe width={'90%'} height={'90%'}
        src={`https://www.youtube.com/embed/${apiData.key}`} 
        title='Trailer'
        frameBorder={0}
        allowFullScreen></iframe>
        <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.typeof}</p>
        </div>
    </div>
    
  )
}

export default Player
