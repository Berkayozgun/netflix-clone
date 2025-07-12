# 🍿 MovieMania - Netflix Clone

A modern, responsive Netflix clone built with **React.js**, **Vite**, and **Tailwind CSS** that replicates the core functionality and design of the original Netflix platform with enhanced performance and user experience.

![MovieMania Screenshot](https://via.placeholder.com/800x450/000000/FFFFFF?text=MovieMania+Screenshot)

## ✨ Features

### 🎯 Core Features
- **Movie Browsing**: Browse through different movie categories with smooth horizontal scrolling
- **Movie Trailers**: Watch movie trailers in embedded YouTube players
- **Advanced Search**: Multi-type search with movies, TV shows, and people
- **Responsive Design**: Fully responsive design that works on all devices
- **Dark Theme**: Netflix-style dark theme for optimal viewing experience
- **Auto-scroll**: Smooth auto-scrolling movie sliders with pause on hover

### 🎨 Modern UI/UX Features
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Component-Based Architecture**: Modular and reusable components
- **Vite Build Tool**: Lightning-fast development and build times
- **Professional Design**: Netflix-inspired UI with modern animations
- **Smooth Transitions**: Hover effects and smooth transitions throughout the app
- **Loading States**: Elegant loading indicators for better user experience
- **Error Handling**: Graceful error handling with user-friendly messages
- **Mobile Optimized**: Perfect experience on mobile devices
- **Text Readability**: Enhanced text shadows and overlays for better contrast
- **Performance Optimized**: Optimized image loading and component rendering

### 👤 User Features
- **User Profile**: Personal profile with favorites and watch history
- **My List**: Save and manage your favorite movies and TV shows
- **Watch History**: Track your viewing progress
- **Search Results**: Advanced search with filtering options
- **Movie Details Modal**: Comprehensive movie information with trailers

### 🎬 Movie Features
- **Multiple Categories**: Action, Comedy, Horror, Romance, Documentaries, Trending
- **Movie Details**: Detailed movie information with ratings, year, and descriptions
- **Trailer Integration**: Watch movie trailers directly in the app
- **Poster Gallery**: High-quality movie posters with hover effects and overlays
- **Optimized Images**: Performance-optimized image loading with different resolutions

## 🚀 Technologies Used

- **React.js** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React YouTube** - YouTube video integration
- **Movie Trailer** - Trailer search functionality
- **TMDB API** - Movie and TV show data

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your TMDB API key:
   ```
   VITE_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 Usage

### Navigation
- **Home**: Browse movies and TV shows by category
- **Search**: Use the search bar to find specific content
- **Profile**: Access your user profile and preferences
- **Movie Details**: Click on any movie poster for detailed information

### Features
- **Browse**: Scroll horizontally through different movie categories
- **Auto-scroll**: Movies automatically scroll with pause on hover
- **Watch Trailers**: Click on movie posters to watch trailers
- **Advanced Search**: Search for movies, TV shows, and people
- **My List**: Add movies to your personal watchlist
- **Responsive**: Enjoy the app on any device size
- **Performance**: Optimized loading and smooth animations

## 📁 Project Structure

```
netflix-clone/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Banner.jsx       # Hero banner component
│   │   ├── Row.jsx          # Movie row component with auto-scroll
│   │   ├── Nav.jsx          # Navigation component with search
│   │   ├── Footer.jsx       # Footer component
│   │   ├── Search.jsx       # Advanced search functionality
│   │   ├── UserProfile.jsx  # User profile component
│   │   └── MovieDetail.jsx  # Movie detail modal with trailer
│   ├── layout/              # Layout components
│   ├── pages/               # Page components
│   ├── utils/               # Utility functions
│   │   ├── axios.js         # Axios configuration with caching
│   │   └── requests.js      # API request endpoints
│   ├── App.jsx              # Main application component
│   ├── index.jsx            # Application entry point
│   └── index.css            # Tailwind CSS imports
├── public/
│   ├── index.html           # HTML template
│   └── favicon.ico          # App icon
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── README.md               # Project documentation
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Netflix Red (#E50914)
- **Background**: Dark (#111)
- **Text**: White (#FFFFFF)
- **Secondary**: Gray (#666)

### Typography
- **Headers**: Bold, large fonts for impact
- **Body**: Clean, readable fonts
- **Responsive**: Scales appropriately on all devices
- **Text Shadows**: Enhanced readability on light backgrounds

### Animations
- **Hover Effects**: Smooth scaling and opacity changes
- **Transitions**: 0.3s ease transitions throughout
- **Loading States**: Elegant spinners and placeholders
- **Auto-scroll**: Smooth horizontal scrolling with pause on hover

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Desktop**: Full feature set with large displays
- **Tablet**: Adapted layout for medium screens
- **Mobile**: Touch-optimized interface for small screens

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style
- **ES6+**: Modern JavaScript features
- **Functional Components**: React hooks for state management
- **Tailwind CSS**: Utility-first styling approach
- **Clean Code**: Well-documented and maintainable code
- **Performance**: Optimized components with memoization

## 🏗️ Component Architecture

### Component Structure
- **Atomic Design**: Components follow atomic design principles
- **Reusability**: Components are modular and reusable
- **Props Interface**: Clear prop interfaces for each component
- **State Management**: Local state with React hooks

### Key Components
- **Banner**: Hero section with featured content and enhanced info
- **Row**: Horizontal scrolling movie categories with auto-scroll
- **Nav**: Navigation bar with search and profile
- **Footer**: Site footer with links and information
- **Search**: Advanced search functionality with multi-type results
- **UserProfile**: User account management
- **MovieDetail**: Detailed movie information modal with trailer support

## 🚀 Performance Features

### Optimizations
- **Image Optimization**: Different resolution images for better performance
- **Component Memoization**: React.memo for performance optimization
- **Lazy Loading**: Components load only when needed
- **Caching**: Axios interceptors for API response caching
- **Smooth Animations**: CSS optimizations for better performance

### Loading States
- **Skeleton Loading**: Elegant loading placeholders
- **Error Boundaries**: Graceful error handling
- **Progressive Loading**: Images load progressively

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB API** for providing movie data
- **Netflix** for the original design inspiration
- **React.js** community for excellent documentation
- **Vite** team for the fast build tool
- **Tailwind CSS** team for the utility-first framework

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ by [Your Name]**

*This is a demo project for educational purposes. All movie data is provided by TMDB API.*
