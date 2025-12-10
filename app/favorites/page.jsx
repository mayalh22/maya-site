import favoritesData from '@/lib/content/favorites.json';
export const metadata = {
  title: 'Favorites - Maya Hazarika',
  description: 'Maya Hazarika’s favorite books, music, movies, and more.',
};

import Header from '@/components/Header';

export default function FavoritesPage() {
  return (
    <>
      <Header />

      <main className="container">
        {/* Intro */}
        <div className="about">
          <h1>My Favorites</h1>
          <p>{favoritesData.intro}</p>
        </div>

        {/* Books */}
        <div className="section">
          <h2>Books I Love</h2>
          <ul>
            {favoritesData.books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>

        {/* Music */}
        <div className="section">
          <h2>Music</h2>

          <h3>Favorite Albums</h3>
          <ul>
            {favoritesData.music.albums.map((album, index) => (
              <li key={index}>{album}</li>
            ))}
          </ul>

          <h3>Artists I Listen To</h3>
          <ul>
            {favoritesData.music.artists.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>

          <h3>Songs on Repeat</h3>
          <ul>
            {favoritesData.music.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>

        {/* Movies & Shows */}
        <div className="section">
          <h2>Movies & Shows</h2>
          <ul>
            {favoritesData.movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Maya Hazarika</p>
      </footer>
    </>
  );
}
