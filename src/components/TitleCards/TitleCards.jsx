import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
  const [apiData, setapiData] = useState([])
  const cardsRef = useRef()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjE0OTI3ZGZlNjYzM2U0NGNkZDk3ZDM5YzczZGJjYyIsIm5iZiI6MTczNjQ1MzU4MC41Niwic3ViIjoiNjc4MDJkY2M0NGQ2NDlmZmFlN2I1NjBiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6c-OtSbnF_W-7qKq5TchLpIKAqrG0V_1zAy4c9OdhAg'
    }
  };

  const handleWheel = (event) =>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY
  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category? category:'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setapiData(res.results))
    .catch(err => console.error(err));


    const currentElement = cardsRef.current
    if (currentElement){
      currentElement.addEventListener('wheel', handleWheel)
    }

    return ()=>{
      if (currentElement){
        currentElement.removeEventListener('wheel', handleWheel)
      }
    }
  },[])
  return (
    <div className='titlecards'>
      <h2>{title? title: 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) =>{
          return (<Link to={`/player/${card.id}`} className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='' />
                    <p>{card.original_title}</p>
                </Link>)
        })}
      </div>
    </div>
  )
}

export default TitleCards
