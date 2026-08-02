import Link from 'next/link';

const SECTIONS = [
  ['Theme', '/admin/theme', 'Site colors and text size.'],
  ['Timeline', '/admin/timeline', 'Roles, volunteering, and honors.'],
  ['Writing', '/admin/writing', 'Blog posts published on the Writing page.'],
  ['Art gallery', '/admin/galleries/art', 'Upload or remove art pieces.'],
  ['Photos gallery', '/admin/galleries/photos', 'Upload or remove photos by category.'],
  ['Favorites gallery', '/admin/galleries/favorites', 'Upload or remove favorites.'],
  ['Projects gallery', '/admin/galleries/projects', 'Upload or remove project images.'],
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
