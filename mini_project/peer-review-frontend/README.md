# LMS Platform Frontend

A modern Learning Management System (LMS) platform built with React, TypeScript, and Tailwind CSS.

## Features

- Course detail pages with reviews and nested comments
- Tryout section detail pages with reviews and nested comments
- Home page with featured courses and tryouts
- All reviews page with filtering capabilities
- Modern dark theme UI
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router DOM
- Axios

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── store/         # Zustand store
  ├── App.tsx        # Main app component
  └── main.tsx       # Entry point
```

## API Integration

The frontend is designed to work with the peer-review-api backend. Make sure the backend server is running and the API_URL in the store is correctly configured.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
