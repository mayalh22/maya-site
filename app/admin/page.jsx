import Link from 'next/link';

const SECTIONS = [
  ['Home', '/admin/home', 'Name, tagline, bio, and profile photo.'],
  ['Contact', '/admin/contact', 'Contact details and social links.'],
  ['Theme', '/admin/theme', 'Site colors, font, and text size.'],
  ['Projects', '/admin/projects', 'Portfolio and code projects.'],
  ['Art', '/admin/art', 'Art gallery.'],
  ['Photos', '/admin/photos', 'Photo gallery, grouped by category.'],
  ['Favorites', '/admin/favorites', 'Favorite movies, shows, books, and albums.'],
  ['Timeline', '/admin/timeline', 'Experience, volunteering, and honors.'],
  ['Blog', '/admin/blog', 'Blog posts.'],
];

export default function AdminDashboard() {
  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Admin Dashboard</h2></div>
      <div className="section-body">
        <div className="card-grid">
          {SECTIONS.map(([title, href, description]) => (
            <Link key={href} href={href} className="card admin-dashboard-card">
              <h3>{title}</h3>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
