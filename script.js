// ======= CONFIG =======
// Change this to the URL of the site you want to fetch games from
const targetSiteJSON = 'https://example.com/games.json'; // <-- Replace with actual URL

// Your Cloudflare Worker proxy URL
const proxyBase = 'https://embed-proxy.aj-xanman-47e.workers.dev/';
// ======================

const container = document.getElementById('game-buttons');
const searchInput = document.getElementById('search');

// Encode the target URL and append it to the proxy
const proxyURL = `${proxyBase}?url=${encodeURIComponent(targetSiteJSON)}`;

// Fetch the JSON via the Cloudflare Worker proxy
fetch(proxyURL)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(games => {
    // Sort alphabetically
    games.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

    // Display function
    function displayGames(filtered) {
      container.innerHTML = '';
      if (filtered.length === 0) {
        container.textContent = 'No games found.';
        return;
      }

      filtered.forEach(game => {
        const button = document.createElement('button');
        button.className = 'game-btn';
        button.textContent = game.label;
        button.onclick = () => window.location.href = game.path;
        container.appendChild(button);
      });
    }

    // Initial load
    displayGames(games);

    // Search filter
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = games.filter(g => g.label.toLowerCase().includes(query));
      displayGames(filtered);
    });
  })
  .catch(err => {
    console.error('Error loading games:', err);
    container.textContent = 'Failed to load games.';
  });
