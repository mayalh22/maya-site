async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading JSON:', error);
    return null;
  }
}

async function insertJSON(path, elementId, template) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }
  
  // Show loading state
  element.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--primary);">Loading...</div>';
  
  try {
    const data = await loadJSON(path);
    if (data) {
      element.innerHTML = template(data);
      
      // Trigger animation for cards
      const cards = element.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
    } else {
      element.innerHTML = '<div style="text-align: center; padding: 2rem; color: red;">Failed to load content. Please refresh the page.</div>';
    }
  } catch (error) {
    console.error('Error inserting content:', error);
    element.innerHTML = '<div style="text-align: center; padding: 2rem; color: red;">Error loading content.</div>';
  }
}

async function loadHeader(isSubpage = false) {
  const headerPath = isSubpage ? '../header.html' : 'header.html';
  
  try {
    const response = await fetch(headerPath);
    if (!response.ok) {
      throw new Error(`Failed to load header: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Adjust paths if on subpage
    let adjustedHtml = html;
    if (isSubpage) {
      adjustedHtml = html
        .replace(/href="index\.html"/g, 'href="../index.html"')
        .replace(/href="subpages\//g, 'href="')
        .replace(/src="assets\//g, 'src="../assets/');
    }
    
    document.getElementById('header-container').innerHTML = adjustedHtml;
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.image-nav a');
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop();
      if (linkPage === currentPage || 
          (currentPage === 'index.html' && linkPage === '../index.html')) {
        link.style.opacity = '0.6';
        link.style.pointerEvents = 'none';
      }
    });
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

// Add smooth scrolling to top button
function addScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--secondary);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  `;
  
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
    } else {
      scrollBtn.style.opacity = '0';
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
  });
}

// Initialize scroll to top button when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addScrollToTop);
} else {
  addScrollToTop();
}