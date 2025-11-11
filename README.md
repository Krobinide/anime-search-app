# Anime Search App

A React-based anime search application built with TypeScript, Redux, and the Jikan API.

## Features

- Instant search with debouncing (250ms)
- Server-side pagination
- Modern, responsive UI
- Fast performance with request cancellation
- Type-safe with TypeScript
- Mobile-friendly design

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- Axios
- Vite
- Jikan API (MyAnimeList)

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

The app will start on `http://localhost:4000`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── AnimeCard.tsx
│   └── SkeletonCard.tsx
|   └── Icons.tsx
├── pages/              # Page components
│   ├── SearchPage.tsx
│   └── DetailPage.tsx
├── store/              # Redux store and slices
│   ├── store.ts
│   └── animeSlice.ts
├── types/              # TypeScript type definitions
│   └── anime.ts
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Key Features Implemented

### Instant Search with Debouncing
- Search executes automatically as you type
- 250ms debounce prevents excessive API calls
- In-flight requests are cancelled when new searches begin

### Server-side Pagination
- Navigate through results with Previous/Next buttons
- Page information displayed
- Smooth scrolling to top on page change

### Redux State Management
- Centralized state for anime data
- Async thunks for API calls
- Type-safe with TypeScript

### Error Handling
- Network error handling
- Rate limit awareness
- User-friendly error messages
- Loading states with skeleton loaders

## Bonus Implementation

### User Experience
- ✅ Skeleton loaders with shimmer animation for better perceived performance
- ✅ Empty states with helpful messaging
- ✅ Fully mobile-responsive design
- ✅ Smooth animations and transitions with staggered delays
- ✅ Modern glassmorphism/liquid glass UI effects
- ✅ OLED-friendly pure black theme with gradient accents
- ✅ Interactive hover effects with elevation and glow
- ✅ Professional icon usage (no emojis)

### Technical Excellence
- ✅ Proper error handling for network failures
- ✅ Race condition handling with request cancellation
- ✅ AbortController for in-flight request cancellation
- ✅ Type-safe implementation with minimal 'any' usage

## API

This app uses the [Jikan API](https://jikan.moe/), an unofficial MyAnimeList API. No authentication required.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)