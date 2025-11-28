// Studio Ghibli API
const STUDIO_GHIBLI_API = "https://ghibliapi.vercel.app/films";

// Data storage
let allGhibliFilms = [];
let filteredFilms = [];

// Popular Ghibli Film IDs
const POPULAR_GHIBLI_IDS = [
  "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
  "4e236f34-b981-41c3-8c65-f8c9000b8e15"
];

// Custom image fallback
const GHIBLI_IMAGES = {
  "2baf70d1-42bb-4437-b551-e5fed5a87abe":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKeGEyHghdsmKRFfovvPwgNaZ9eDwgwPx2omhPeQ0vI-VGRbf_y8h9c-sUkdPPLFd7R3hqoA&s=10",
  "58611129-2dbc-4a81-a72f-77ddfc1b1b49":
    "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTFjOTA4MzQ3MzQxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
  "4e236f34-b981-41c3-8c65-f8c9000b8e15":
    "https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
  default: "https://via.placeholder.com/400x600?text=Studio+Ghibli+Film"
};

window.onload = () => {
  loadFilms();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") searchFilms();
    });
  }
};

// Load films from API
async function loadFilms() {
  const container = document.getElementById("ghibliMovies");
  container.innerHTML = '<div class="loading">Loading Studio Ghibli films...</div>';

  try {
    const response = await fetch(STUDIO_GHIBLI_API);
    if (!response.ok) throw new Error();

    allGhibliFilms = await response.json();

    const popularFilms = POPULAR_GHIBLI_IDS
      .map(id => allGhibliFilms.find(film => film.id === id))
      .filter(f => f);

    filteredFilms = popularFilms;
    renderFilms(filteredFilms);

  } catch {
    container.innerHTML = '<div class="error">Cannot load films. Try again later.</div>';
  }
}

// Render films
function renderFilms(films) {
  const container = document.getElementById("ghibliMovies");

  if (!films.length) {
    container.innerHTML = '<div class="error">No films found.</div>';
    return;
  }

  container.innerHTML = films
    .map(film => {
      const img = GHIBLI_IMAGES[film.id] || GHIBLI_IMAGES.default;
      const desc =
        film.description.length > 150
          ? film.description.substring(0, 150) + "..."
          : film.description;

      return `
        <div class="col-md-4 mb-4">
          <div class="ghibli-card">
            <img src="${img}" alt="${film.title}" class="ghibli-image"
                 onerror="this.src='${GHIBLI_IMAGES.default}'">
            <div class="ghibli-info">
              <h5 class="movie-title">${film.title}</h5>
              <p class="movie-genre">Release: ${film.release_date} • Director: ${film.director}</p>
              <p class="movie-genre">Producer: ${film.producer}</p>
              <p class="movie-genre">RT Score: ${film.rt_score}/100</p>
              <p class="movie-description">${desc}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

// Search films
function searchFilms() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();

  if (!searchTerm) {
    filteredFilms = POPULAR_GHIBLI_IDS
      .map(id => allGhibliFilms.find(film => film.id === id))
      .filter(f => f);
  } else {
    filteredFilms = allGhibliFilms.filter(film =>
      film.title.toLowerCase().includes(searchTerm) ||
      film.director.toLowerCase().includes(searchTerm) ||
      film.description.toLowerCase().includes(searchTerm)
    );
  }

  renderFilms(filteredFilms);
}
