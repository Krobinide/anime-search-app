import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { getAnimeDetails } from '../store/animeSlice'
import { ArrowLeftIcon, StarIcon, TvIcon, FilmIcon, CalendarIcon, ActivityIcon } from '../components/Icons'

function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentAnime, loading, error } = useSelector((state: RootState) => state.anime)

  useEffect(() => {
    if (id) {
      dispatch(getAnimeDetails(parseInt(id)))
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="detail-page">
        <div className="loading">Loading anime details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="detail-page">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeftIcon />
          Back to Search
        </button>
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!currentAnime) {
    return (
      <div className="detail-page">
        <div className="loading">No anime found</div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <button className="back-button" onClick={() => navigate('/')}>
        <ArrowLeftIcon />
        Back to Search
      </button>

      <div className="detail-content">
        <div className="detail-header">
          <img
            src={currentAnime.images.jpg.large_image_url || currentAnime.images.jpg.image_url}
            alt={currentAnime.title}
            className="detail-image"
          />
          
          <div className="detail-info">
            <h1>{currentAnime.title}</h1>
            {currentAnime.title_english && currentAnime.title_english !== currentAnime.title && (
              <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '10px' }}>
                {currentAnime.title_english}
              </p>
            )}
            
            <div className="detail-meta">
              {currentAnime.score && (
                <div className="meta-item">
                  <StarIcon />
                  <span className="score">{currentAnime.score}</span>
                </div>
              )}
              {currentAnime.type && (
                <div className="meta-item">
                  <TvIcon />
                  <span>{currentAnime.type}</span>
                </div>
              )}
              {currentAnime.episodes && (
                <div className="meta-item">
                  <FilmIcon />
                  <span>{currentAnime.episodes} episodes</span>
                </div>
              )}
              {currentAnime.status && (
                <div className="meta-item">
                  <ActivityIcon />
                  <span>{currentAnime.status}</span>
                </div>
              )}
              {currentAnime.year && (
                <div className="meta-item">
                  <CalendarIcon />
                  <span>{currentAnime.year}</span>
                </div>
              )}
            </div>

            {currentAnime.synopsis && (
              <div className="detail-synopsis">
                <h2>Synopsis</h2>
                <p>{currentAnime.synopsis}</p>
              </div>
            )}
          </div>
        </div>

        <div className="detail-additional">
          {currentAnime.genres && currentAnime.genres.length > 0 && (
            <div className="info-section">
              <h3>Genres</h3>
              <div className="info-list">
                {currentAnime.genres.map((genre) => (
                  <span key={genre.mal_id} className="info-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentAnime.studios && currentAnime.studios.length > 0 && (
            <div className="info-section">
              <h3>Studios</h3>
              <div className="info-list">
                {currentAnime.studios.map((studio) => (
                  <span key={studio.mal_id} className="info-tag">
                    {studio.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentAnime.rating && (
            <div className="info-section">
              <h3>Rating</h3>
              <p>{currentAnime.rating}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailPage