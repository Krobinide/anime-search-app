# AI Prompts Used in Development

This document outlines all AI prompts used during the development of this Anime Search App. AI was primarily used for styling and CSS implementation, while core logic and architecture were implemented manually.

## Note on AI Usage

In a real work scenario with provided designs and design systems, I would implement those specifications directly. However, since no designs were provided for this coding challenge, I leveraged AI to generate modern, professional styling to save time and focus on functionality and code quality.

I used **GitHub Copilot** (VSCode extension) throughout development for autocomplete suggestions, which helped speed up typing common patterns and boilerplate code.

---

## Styling & CSS Prompts

### Initial Layout Design
**Prompt:**
```
Create modern CSS styling for an anime search app with the following requirements:
- OLED-friendly dark theme (pure black background)
- Glassmorphism/liquid glass effects using backdrop-filter
- Smooth animations and transitions
- Gradient accents using purple/blue tones
- Card-based layout for anime items
- Professional, minimal design without emojis
```

**Context:** Used for `src/index.css` - Initial styling foundation

---

### Search Input Styling
**Prompt:**
```
Design a modern search input with these specs:
- Glass morphism effect with backdrop blur
- Smooth focus transition with glow effect
- Subtle elevation on focus
- Placeholder text in muted gray
- Border radius around 16px
- Use rgba for transparency
```

**Context:** Styling the search input field with modern glassmorphism aesthetic

---

### Card Hover Effects
**Prompt:**
```
Create hover effects for anime cards with:
- Smooth scale and translateY animation
- Glowing border on hover using box-shadow
- Image zoom effect inside the card
- Staggered animation delays for grid items
- Use cubic-bezier easing for smooth motion
- Add gradient overlay on hover
```

**Context:** Interactive card animations in the search results grid

---

### Skeleton Loader Animation
**Prompt:**
```
Create a shimmer loading animation for skeleton screens:
- Moving gradient effect from left to right
- Use linear-gradient with rgba values
- Animation duration around 1.5s
- Infinite loop with smooth easing
- Should work on OLED black background
```

**Context:** Loading state animations for better UX

---

### Detail Page Layout
**Prompt:**
```
Design a detail page layout with:
- Two-column grid (image on left, info on right)
- Glass morphism container
- Gradient text for title
- Info tags with pills/badges style
- Responsive collapse to single column on mobile
- Subtle borders using rgba
```

**Context:** Styling for the anime detail page

---

### Button Styling
**Prompt:**
```
Create button styles with glass morphism:
- Transparent background with backdrop blur
- Subtle border using rgba
- Hover state with color shift and elevation
- Disabled state with reduced opacity
- Border radius 12px
- Smooth transitions using cubic-bezier
```

**Context:** Pagination buttons and back button styling

---

### Responsive Design Adjustments
**Prompt:**
```
Add responsive media queries for:
- Mobile breakpoint at 768px
- Small mobile at 480px
- Reduce font sizes proportionally
- Adjust grid columns for smaller screens
- Reduce padding and gaps
- Stack detail page columns on mobile
```

**Context:** Mobile responsiveness across all pages

---

### Animation Keyframes
**Prompt:**
```
Create CSS keyframe animations:
1. fadeIn: opacity 0 to 1
2. fadeInDown: opacity + translateY from top
3. scaleIn: opacity + scale from 0.9 to 1
4. skeleton-loading: moving background gradient

Use ease-out timing and stagger delays for grid items
```

**Context:** Entry animations for page elements

---

## Configuration & Setup

### Vite Configuration
**Prompt:**
```
Create a minimal Vite config for React + TypeScript:
- Set server port to 4000
- Include React plugin
- No additional build optimizations needed
```

**Context:** Setting up the development server configuration

---

## Additional Tooling

Throughout development, I used **GitHub Copilot** in VSCode for:
- Auto-completing import statements
- Suggesting TypeScript type annotations
- Generating common React patterns (useEffect, useState)
- Completing function parameters and return types
- Suggesting CSS property values

Copilot was particularly helpful for reducing typing time and catching TypeScript syntax, allowing me to focus on architecture and logic implementation.

---

Used AI to beautify/format the README.md

---

## Code Logic (Not AI Generated)

The following were implemented without AI assistance:
- Redux store architecture and slice configuration
- Async thunk implementations for API calls
- Debouncing logic with useRef and setTimeout
- AbortController implementation for request cancellation
- React Router setup and navigation
- Component architecture and prop interfaces
- State management patterns
- Error handling logic
- Pagination logic

These core implementations demonstrate understanding of React, TypeScript, Redux, and API integration patterns.