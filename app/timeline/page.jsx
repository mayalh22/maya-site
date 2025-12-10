export const metadata = {
  title: 'Timeline - Maya Hazarika',
  description: ' Maya Hazarika’s event history.',
};

import Header from '@/components/Header';
import timelineData from '@/lib/content/timeline.json';

export default function TimelinePage() {
  return (
    <>

      <main className="container">
        {/* Intro */}
        <div className="about">
          <h1>Timeline</h1>
          <p>{timelineData.intro}</p>
        </div>

        {/* Timeline sections */}
        {timelineData.sections.map((section, index) => (
          <div key={index} className="section">
            <h2>{section.year}</h2>
            <h3>{section.title}</h3>
            {section.events.map((event, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-date">{event.date}</div>
                <h3>
                  {event.role} {event.organization ? `at ${event.organization}` : ''}
                </h3>
                {event.location && <p><em>{event.location}</em></p>}
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        ))}

        {/* Volunteering */}
        <div className="section">
          <h2>{timelineData.volunteering.title}</h2>
          <div className="card-grid">
            {timelineData.volunteering.roles.map((role, index) => (
              <div key={index} className="card">
                <h3>{role.role}</h3>
                <p><strong>{role.organization}</strong></p>
                {role.category && <span className="tag">{role.category}</span>}
                <p><small>{role.date}</small></p>
              </div>
            ))}
          </div>
        </div>
      </main>

    </>
  );
}
