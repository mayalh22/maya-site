async function loadJSON(path) {
  const response = await fetch(path);
  return await response.json();
}

async function insertJSON(path, elementId, template) {
  const data = await loadJSON(path);
  document.getElementById(elementId).innerHTML = template(data);
}

async function loadHeader(isSubpage = false) {
  const headerPath = isSubpage ? '../header.html' : 'header.html';
  const response = await fetch(headerPath);
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
}