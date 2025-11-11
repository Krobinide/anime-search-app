import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Anime, AnimeSearchResponse, AnimeDetailResponse } from '../types/anime'

interface AnimeState {
  searchResults: Anime[];
  currentAnime: Anime | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

const initialState: AnimeState = {
  searchResults: [],
  currentAnime: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
})

// Search anime with pagination
export const searchAnime = createAsyncThunk(
  'anime/search',
  async ({ query, page }: { query: string; page: number }, { signal }) => {
    const source = axios.CancelToken.source()
    
    signal.addEventListener('abort', () => {
      source.cancel('Request cancelled')
    })

    const response = await api.get<AnimeSearchResponse>('/anime', {
      params: {
        q: query,
        page: page,
        limit: 24,
      },
      cancelToken: source.token,
    })
    
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      query,
    }
  }
)

// Get anime details
export const getAnimeDetails = createAsyncThunk(
  'anime/getDetails',
  async (id: number) => {
    const response = await api.get<AnimeDetailResponse>(`/anime/${id}`)
    return response.data.data
  }
)

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Search anime
      .addCase(searchAnime.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false
        state.searchResults = action.payload.data
        state.currentPage = action.payload.pagination.current_page
        state.totalPages = action.payload.pagination.last_visible_page
        state.searchQuery = action.payload.query
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false
        if (action.error.name !== 'CancelledError' && action.error.message !== 'Request cancelled') {
          state.error = action.error.message || 'Failed to search anime'
        }
      })
      // Get anime details
      .addCase(getAnimeDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAnimeDetails.fulfilled, (state, action) => {
        state.loading = false
        state.currentAnime = action.payload
      })
      .addCase(getAnimeDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load anime details'
      })
  },
})

export const { setSearchQuery, clearError } = animeSlice.actions
export default animeSlice.reducer