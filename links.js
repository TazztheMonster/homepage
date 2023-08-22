const linksData = [
    {
        url: 'https://www.dungeonsndinos.pape.rocks',
        description: 'Unsere erste Instanz für Pen and Paper',
        tags: ['PnP', 'MyProject']
    },
    {
        url: 'https://www.dungeonsandotters.pape.rocks',
        description: 'Unsere zweite Instanz für Pen and Paper',
        tags: ['PnP', 'MyProject']
    },
    {
        url: 'https://www.youtube.com/watch?v=N4kfsxF8Tio',
        description: 'A cool cyber security blog',
        tags: ['Youtube', 'Video', 'CyberSec']
    },
    {
        url: 'https://www.youtube.com/watch?v=N4kfsxF8Tio',
        description: 'TEST',
        tags: ['Youtube', 'PnP']
    },
    {
        url: 'https://www.youtube.com/watch?v=N4kfsxF8Tio',
        description: 'This is a pretty long test! The text is super long in contrast to the rest! Really! SUUUUUUPER LONG!!!!!!! TEST',
        tags: ['Youtube', 'PnP']
    }
];

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter button');
    filterButtons.forEach(button => {
        if (button.classList.contains('reset-filter')) {
            button.addEventListener('click', resetFilter);
        } else {
            button.addEventListener('click', (e) => {
                filterByTag(e.target.textContent);
            });
        }
    });
}

function populateCards() {
    const container = document.querySelector('.cards-container');
    container.innerHTML = ''; // Clear existing cards

    // Iterate through the links data and create clickable cards with title and tags
    linksData.forEach(link => {
        const card = document.createElement('div'); // Create div for card
        card.className = 'card';
        card.innerHTML = `<a href="${link.url}"><h3>${link.title}</h3><p>${link.description}</p><div class="tags">${link.tags.join(', ')}</div></a>`;
        container.appendChild(card);
    });
}

function populateFilters() {
    const uniqueTags = [...new Set(linksData.flatMap(link => link.tags))];
    const filterContainer = document.querySelector('.filter');
    uniqueTags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.addEventListener('click', () => filterByTag(tag));
        filterContainer.appendChild(button);
    });
}

function filterByTag(tag) {
    const container = document.querySelector('.cards-container');
    const cards = Array.from(document.querySelectorAll('.card'));

    // Array to hold the reappearing cards
    const reappearingCards = [];

    // Iterate through the cards and filter based on tag
    cards.forEach(card => {
        const containsTag = card.querySelector('.tags').textContent.includes(tag);
        if (!containsTag) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
            reappearingCards.unshift(card); // Add to the beginning of the array
        }
    });

    // Append the reappearing cards at the beginning
    reappearingCards.forEach(card => {
        container.prepend(card);
    });

    // Append the reappearing cards at the beginning
    reappearingCards.forEach(card => {
        container.prepend(card);
    });
}

function resetFilter() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('fall', 'fly-in-from-left', 'fly-in-from-right');
    });
}

function shuffle() {
    for (let i = linksData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [linksData[i], linksData[j]] = [linksData[j], linksData[i]];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.cards-container')) {
        populateCards();
        populateFilters();
        setupFilterButtons();
    }
});

document.querySelector('.reset-filter').addEventListener('click', () => {
    // Clear existing cards
    const container = document.querySelector('.cards-container');
    container.innerHTML = '';

    // Shuffle the links data
    shuffle();

    // Re-populate the cards in the shuffled order
    populateCards();
});
