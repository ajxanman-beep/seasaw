const fs = require('fs').promises;
const path = require('path');

// Folder to scan
const MOVIES_DIR = path.join(__dirname, 'Misc/Movies');

// Output file
const OUTPUT = path.join(__dirname, 'movies.json');

// Format the label nicely
function formatLabel(name) {
  return name
    .replace(/\.[^/.]+$/, '') // remove file extension
    .replace(/_/g, ' ')       // underscores to spaces
    .replace(/\b\w/g, c => c.toUpperCase()); // capitalize words
}

async function generateMovies() {
  const items = await fs.readdir(MOVIES_DIR, { withFileTypes: true });
  const moviesList = [];

  for (const item of items) {
    const itemPath = path.join(MOVIES_DIR, item.name);

    // 🎬 Standalone Movie
    if (item.isFile() && item.name.endsWith('.mp4')) {
      moviesList.push({
        type: 'movie',
        label: formatLabel(item.name),
        path: `Movies/${item.name}`
      });
    }

    // 📺 TV Show (folder)
    else if (item.isDirectory()) {
      const episodeFiles = await fs.readdir(itemPath);
      const episodes = episodeFiles
        .filter(file => file.endsWith('.mp4'))
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }))
        .map(file => ({
          label: formatLabel(file),
          path: `Movies/${item.name}/${file}`
        }));

      if (episodes.length > 0) {
        moviesList.push({
          type: 'tvshow',
          label: formatLabel(item.name),
          episodes
        });
      }
    }
  }

  // 🔤 Sort everything alphabetically by label (case-insensitive)
  moviesList.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true }));

  // ✍️ Write to movies.json
  await fs.writeFile(OUTPUT, JSON.stringify(moviesList, null, 2));
  console.log(`✅ movies.json generated with ${moviesList.length} entries.`);
}

generateMovies().catch(err => console.error('❌ Error generating movies.json:', err));