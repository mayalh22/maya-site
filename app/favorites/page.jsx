import favoritesData from '@/lib/content/favorites.json';
export const metadata = {
  title: 'Favorites - Maya Hazarika',
  description: 'Maya Hazarika’s favorite books, music, movies, and more.',
};

import Header from '@/components/Header';

export default function FavoritesPage() {
  return (
    <>

      <main className="container">
        <div className="about">
          <h1>my favorites</h1>
          <p>{favoritesData.intro}</p>
        </div>

        <div className="section">
          <h2>books</h2>
          <ul>
            {favoritesData.books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>


        <div className="section">
          <h2>music</h2>

          <h3>albums</h3>
          <ul>
            {favoritesData.music.albums.map((album, index) => (
              <li key={index}>{album}</li>
            ))}
          </ul>

          <h3>artists</h3>
          <ul>
            {favoritesData.music.artists.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>

          <h3>songs</h3>
          <ul>
            {favoritesData.music.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>


        <div className="section">
          <h2>movies and shows</h2>
          <ul>
            {favoritesData.movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      </main>

    </>
  );
}
