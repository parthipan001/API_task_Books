document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('book-form').addEventListener('submit', fetchBooks);
});

function fetchBooks(event) {
    event.preventDefault();
    const query = document.getElementById('query').value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching books data:', error);
        });
}

function displayBooks(books) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const bookCard = createCard(
            bookInfo.title,
            bookInfo.authors ? `Authors: ${bookInfo.authors.join(', ')}` : 'No authors available',
            bookInfo.description || 'No description available',
            bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x195.png?text=No+Image'
        );
        contentDiv.appendChild(bookCard);
    });
}

function createCard(title, authors, description, imageUrl) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.src = imageUrl;
    cardImg.alt = title;

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;

    const cardAuthors = document.createElement('p');
    cardAuthors.className = 'card-text';
    cardAuthors.innerHTML = authors;

    const cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.innerHTML = description;

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardAuthors);
    cardBodyDiv.appendChild(cardDescription);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}