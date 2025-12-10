import favoritesData from '@/lib/content/favorites.json';

export const metadata = {
  title: 'Favorites - Maya Hazarika',
  description: "Maya Hazarika's favorite books, music, movies, and more.",
};

export default function FavoritesPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>my favorites</h1>
        <p>{favoritesData.intro}</p>
      </div>

      <div className="starline">✦</div>

      <section className="section">
        <h2 className="section-title">books</h2>
        <div className="grid-cards">
          {favoritesData.books.map((book, index) => (
            <div key={index} className="card-mini">
              <h4>#{index + 1}</h4>
              <p>{book}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="starline">✦</div>

      <section className="section">
        <h2 className="section-title">music</h2>
        
        <div className="feature-block">
          <h3>albums</h3>
          <ul className="star-list">
            {favoritesData.music.albums.map((album, index) => (
              <li key={index}>{album}</li>
            ))}
          </ul>
        </div>

        <div className="feature-block">
          <h3>artists</h3>
          <ul className="star-list">
            {favoritesData.music.artists.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>
        </div>

        <div className="feature-block">
          <h3>songs</h3>
          <ul className="star-list">
            {favoritesData.music.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="starline">✦</div>

      <section className="section">
        <h2 className="section-title">movies & shows</h2>
        <div className="grid-cards">
          {favoritesData.movies.map((movie, index) => (
            <div key={index} className="card-mini">
              <h4>★</h4>
              <p>{movie}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}