
async function loadJSON(path) {
  const response = await fetch(path);
  return await response.json();
}

async function insertJSON(path, elementId, template) {
  const data = await loadJSON(path);
  document.getElementById(elementId).innerHTML = template(data);
}
