function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
       
        fetchBooks(searchTerm);
    } else {
        alert('Please enter a search term.');
    }
}

function fetchBooks(searchTerm) {
    
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayBooks(books) {
    const bookListContainer = document.getElementById('bookList');
    bookListContainer.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');

        const title = book.volumeInfo.title;
        const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';

        bookItem.innerHTML = `<h3>${title}</h3><p>By: ${author}</p><button onclick="toggleDetails(this)">Details</button>`;
        bookListContainer.appendChild(bookItem);
    });
}

function toggleDetails(button) {
    const bookDetailsContainer = document.getElementById('bookDetails');
    const bookDetails = button.parentNode.querySelector('.book-details');

    if (bookDetails) {
        bookDetailsContainer.innerHTML = '';
        bookDetailsContainer.appendChild(bookDetails.cloneNode(true));
    } else {
        const title = button.parentNode.querySelector('h3').innerText;
        const details = document.createElement('div');
        details.classList.add('book-details');

        
        details.innerHTML = `<p>Details for ${title}</p>`;

        bookDetailsContainer.innerHTML = '';
        bookDetailsContainer.appendChild(details);
    }
}


function addToBookshelf(title) {
    const myBookshelfContainer = document.getElementById('myBookshelf');
    const bookshelfItem = document.createElement('div');
    bookshelfItem.classList.add('my-bookshelf');

    bookshelfItem.innerHTML = `<p>${title}</p><button onclick="removeFromBookshelf(this)">Remove</button>`;
    myBookshelfContainer.appendChild(bookshelfItem);

   
    saveBookToLocalStorage(title);
}

function removeFromBookshelf(button) {
    const myBookshelfContainer = document.getElementById('myBookshelf');
    myBookshelfContainer.removeChild(button.parentNode);

    
    updateLocalStorage();
}

function saveBookToLocalStorage(title) {
    let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];
    myBookshelf.push(title);
    localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));
}

function updateLocalStorage() {
    const myBookshelfContainer = document.getElementById('myBookshelf');
    const bookTitles = Array.from(myBookshelfContainer.querySelectorAll('p')).map(p => p.innerText);

    localStorage.setItem('myBookshelf', JSON.stringify(bookTitles));
}


function loadMyBookshelf() {
    const myBookshelfContainer = document.getElementById('myBookshelf');
    const myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];

    myBookshelf.forEach(title => {
        const bookshelfItem = document.createElement('div');
        bookshelfItem.classList.add('my-bookshelf');
        bookshelfItem.innerHTML = `<p>${title}</p><button onclick="removeFromBookshelf(this)">Remove</button>`;
        myBookshelfContainer.appendChild(bookshelfItem);
    });
}


window.onload = loadMyBookshelf;
