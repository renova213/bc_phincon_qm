# Peer Review Frontend

A modern React application for managing course and tryout section reviews.

## Features

- Course detail page with reviews
- Tryout section detail page with reviews
- App review page
- Overall review list page
- Modern UI with Tailwind CSS
- State management with Redux Toolkit
- TypeScript support

## Tech Stack

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your API base URL:

   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
  ├── components/       # Reusable components
  ├── pages/           # Page components
  ├── services/        # API services
  ├── store/           # Redux store and slices
  ├── types/           # TypeScript types
  ├── App.tsx          # Main App component
  └── main.tsx         # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
