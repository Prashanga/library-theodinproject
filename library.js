let myLibrary = []

function Book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read? 'read' : 'not read yet'}`
}


function renderCards() {
    let cards = ''

    myLibrary.forEach((book, index) => {
        cards += '<div class="card">'
        cards += '<h2 class="card-header">' + book.title + '</h2>'
        cards += '<p class="card-author">' + 'Author: ' + book.author + '</p>'
        cards += '<p class="card-numpages">' + 'Pages: ' + book.numPages + '</p>'
        cards += `<p class="card-isRead"> ${book.read? 'Read' : 'Not yet read'} </p>`
        cards += `<br><button class="card-delete" data-index=${index} onClick=deleteBook(this)>Delete</button>`
        cards += `<button class="card-toggle-read" data-index=${index} onClick=toggleRead(this.dataset.index)> Toggle Read</button>`
        cards += '</div>'     
    })

    document.getElementById("card-parent").innerHTML = cards

}

function addBookToLibrary(title, author, numPages, read=false) {
    let newBook = new Book(title, author, numPages, read)
    myLibrary.push(newBook)
    renderCards()
    resetNewBookForm()  
    document.location.hash = 'home'
}

function deleteBook(value) {
    let cardindex = value.dataset.index
    myLibrary.splice(cardindex,1)
    renderCards()
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read
    renderCards()
}

function resetNewBookForm() {
    document.querySelector('form').reset()
}

document.getElementById("addbook").addEventListener('click', function(e) {
    e.preventDefault()
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pages = parseInt(document.getElementById('pages').value)
    let read = document.getElementById('read').checked
    let isValid = document.querySelector('form').checkValidity()
    document.querySelector('form').reportValidity()

    if(isValid) {
        addBookToLibrary(title, author, pages, read)
    }

});

document.getElementById('close-popup').addEventListener('click', function(e) {
    resetNewBookForm()    
})

addBookToLibrary('The Richest man in Babylon', 'George S. Clason', 194)
addBookToLibrary('The Left Hand of Darkness', 'Ursula K. Le Guin', 286, true)

renderCards()
