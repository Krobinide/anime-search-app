import { useEffect, useRef, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { searchAnime } from '../store/animeSlice'
import AnimeCard from '../components/AnimeCard'
import SkeletonCard from '../components/SkeletonCard'

function SearchPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { searchResults, loading, error, currentPage, totalPages, searchQuery } = useSelector(
    (state: RootState) => state.anime
  )
  
  // Local state for the input value (separate from Redux)
  const [inputValue, setInputValue] = useState('')
  
  const debounceTimerRef = useRef<number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Debounced search function
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value) // Update local state immediately

    // Cancel any pending search
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Debounce search by 250ms
    debounceTimerRef.current = window.setTimeout(() => {
      if (value.trim()) {
        abortControllerRef.current = new AbortController()
        dispatch(searchAnime({ 
          query: value, 
          page: 1 
        }))
      }
    }, 250)
  }, [dispatch])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handlePageChange = (newPage: number) => {
    if (searchQuery.trim()) {
      dispatch(searchAnime({ query: searchQuery, page: newPage }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Anime Search</h1>
        <p>Discover your next favorite anime</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for anime... (e.g., Naruto, One Piece, Attack on Titan)"
          value={inputValue}
          onChange={handleSearchChange}
        />
      </div>

      {error && (
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="anime-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <>
          <div className="results-info">
            Found {searchResults.length} results for "{searchQuery}"
          </div>
          <div className="anime-grid">
            {searchResults.map((anime: typeof searchResults[0]) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && searchQuery && searchResults.length === 0 && (
        <div className="empty-state">
          <h2>No results found</h2>
          <p>Try searching for something else</p>
        </div>
      )}

      {!loading && !searchQuery && !inputValue && (
        <div className="empty-state">
          <h2>Welcome</h2>
          <p>Start typing to search for anime</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage