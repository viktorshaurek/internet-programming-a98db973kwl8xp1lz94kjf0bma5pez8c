let episodesData = [];
let currentSort = 'rank';
let currentSortOrder = 'asc';

document.addEventListener("DOMContentLoaded", async () => {
    episodesData = await loadData();
    populateFilters(episodesData);
    displayEpisodes(episodesData);
    addSortListeners();
    addFilterListeners();
});

async function loadData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/sweko/internet-programming-a98db973kwl8xp1lz94kjf0bma5pez8c/refs/heads/main/data/doctor-who-episodes.json');
        const data = await response.json();
        return data.episodes;
    } catch (error) {
        console.error("Error loading data:", error);
        return [];
    }
}

function displayEpisodes(episodes) {
    const container = document.getElementById("episode-container");
    container.querySelectorAll(".episode-row").forEach(row => row.remove());

    episodes.forEach(displayEpisode);
}

function displayEpisode(episode) {
    const container = document.getElementById("episode-container");
    const row = document.createElement("div");
    row.classList.add("episode-row");

    row.appendChild(makeEpisodeDataDiv(episode.rank));
    row.appendChild(makeEpisodeDataDiv(episode.title));
    row.appendChild(makeEpisodeDataDiv(episode.series));
    row.appendChild(makeEpisodeDataDiv(episode.era));
    row.appendChild(makeEpisodeDataDiv(new Date(episode.broadcast_date).getFullYear()));
    row.appendChild(makeEpisodeDataDiv(episode.director));
    row.appendChild(makeEpisodeDataDiv(episode.writer));
    row.appendChild(makeEpisodeDataDiv(`${episode.doctor.actor} (${episode.doctor.incarnation})`));
    row.appendChild(makeEpisodeDataDiv(episode.companion ? `${episode.companion.actor} (${episode.companion.character})` : "N/A"));
    row.appendChild(makeEpisodeDataDiv(episode.cast.length));

    container.appendChild(row);
}

function makeEpisodeDataDiv(data) {
    const div = document.createElement("div");
    div.classList.add("episode-cell");
    div.textContent = data;
    return div;
}

function populateFilters(episodes) {
    const eraFilter = document.getElementById("era-filter");
    const doctorFilter = document.getElementById("doctor-filter");
    const companionFilter = document.getElementById("companion-filter");

    const uniqueEras = [...new Set(episodes.map(ep => ep.era))];
    uniqueEras.forEach(era => addOptionToSelect(eraFilter, era));

    const uniqueDoctors = [...new Set(episodes.map(ep => ep.doctor.actor))];
    uniqueDoctors.forEach(doctor => addOptionToSelect(doctorFilter, doctor));

    const uniqueCompanions = [...new Set(episodes.flatMap(ep => ep.companion ? [ep.companion.actor] : []))];
    uniqueCompanions.forEach(companion => addOptionToSelect(companionFilter, companion));
}

function addOptionToSelect(selectElement, value) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
}

function addSortListeners() {
    document.querySelectorAll(".header-cell").forEach(header => {
        header.addEventListener("click", () => {
            const sortBy = header.getAttribute("data-sort");
            if (sortBy) {
                toggleSortOrder(sortBy);
                applyFilters();

                updateSortIndicator(header);
            }
        });
    });
}

function toggleSortOrder(column) {
    currentSortOrder = (currentSort === column && currentSortOrder === 'asc') ? 'desc' : 'asc';
    currentSort = column;
}

function updateSortIndicator(header) {
    document.querySelectorAll(".header-cell").forEach(h => {
        h.classList.remove("sorted-asc", "sorted-desc");
    });
   
    if (currentSortOrder === 'asc') {
        header.classList.add("sorted-asc");
    } else {
        header.classList.add("sorted-desc");
    }
}

function sortEpisodes(episodes) {
    const sortOrder = currentSortOrder === 'asc' ? 1 : -1;

    return episodes.slice().sort((a, b) => {
        if (currentSort === 'rank' || currentSort === 'series') {
            return (a[currentSort] - b[currentSort]) * sortOrder;
        } else if (currentSort === 'era') {
            const eraOrder = { 'Classic': 1, 'Modern': 2, 'Recent': 3 };
            return (eraOrder[a.era] - eraOrder[b.era]) * sortOrder;
        } else if (currentSort === 'doctor') {
            return a.doctor.actor.localeCompare(b.doctor.actor) * sortOrder;
        } else if (currentSort === 'companion') {
            return (a.companion?.actor || '').localeCompare(b.companion?.actor || '') * sortOrder;
        } else if (currentSort === 'castCount') {
            return (a.cast.length - b.cast.length) * sortOrder;
        } else {
            return a[currentSort].localeCompare(b[currentSort]) * sortOrder;
        }
    });
}

function addFilterListeners() {
    document.getElementById("name-filter").addEventListener("input", applyFilters);
    document.getElementById("era-filter").addEventListener("change", applyFilters);
    document.getElementById("doctor-filter").addEventListener("change", applyFilters);
    document.getElementById("companion-filter").addEventListener("change", applyFilters);
}

function applyFilters() {
    const nameFilter = document.getElementById("name-filter").value.toLowerCase();
    const eraFilter = document.getElementById("era-filter").value;
    const doctorFilter = document.getElementById("doctor-filter").value;
    const companionFilter = document.getElementById("companion-filter").value;

    let filteredEpisodes = episodesData.filter(episode => {
        const matchesName = episode.title.toLowerCase().includes(nameFilter);
        const matchesEra = !eraFilter || episode.era === eraFilter;
        const matchesDoctor = !doctorFilter || episode.doctor.actor === doctorFilter;
        const matchesCompanion = !companionFilter || (episode.companion && episode.companion.actor === companionFilter);

        return matchesName && matchesEra && matchesDoctor && matchesCompanion;
    });

    filteredEpisodes = sortEpisodes(filteredEpisodes);

    displayEpisodes(filteredEpisodes);
}