import { Link } from 'react-router-dom'
import { Anime } from '../types/anime'
import { StarIcon } from './Icons'

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-card">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="anime-card-image"
      />
      <div className="anime-card-content">
        <h3 className="anime-card-title">{anime.title}</h3>
        <div className="anime-card-info">
          <span>{anime.type || 'N/A'}</span>
          {anime.score && (
            <span className="anime-card-score">
              <StarIcon />
              {anime.score}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default AnimeCard