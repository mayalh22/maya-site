export const TIMELINE_DOC_PATH = 'content/timeline';

export const emptyEvent = () => ({ date: '', organization: '', role: '', location: '', description: '' });
export const emptySection = () => ({ year: '', title: '', events: [emptyEvent()] });
export const emptyRole = () => ({ organization: '', role: '', date: '', category: '', description: '' });
export const emptyAward = () => ({ title: '', issuer: '', date: '', description: '' });
