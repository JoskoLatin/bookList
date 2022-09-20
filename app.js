//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor

function UI() {}

//add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  //create tr element
  const row = document.createElement('tr');
  //inster cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

//show alert
UI.prototype.showAlert = function (massage, className) {
  //create div
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  //add Text
  div.appendChild(document.createTextNode(massage));
  //get parrent
  const conatiner = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  conatiner.insertBefore(div, form);

  //timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

//delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

//clear fileds func
UI.prototype.clearFileds = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

//event listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //get Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  //instate UI
  const ui = new UI();

  //validate
  if (title === '' || author === '' || isbn === '') {
    //error alert
    ui.showAlert('Please fill the fileds', 'error');
  } else {
    //add book to list
    ui.addBookToList(book);

    //show sucsess
    ui.showAlert('Book Addes', 'sucsess');

    //clear fileds
    ui.clearFileds();
  }

  e.preventDefault();
});

//event listener for delete

document.getElementById('book-list').addEventListener('click', function (e) {
  //instate UI
  const ui = new UI();
  ui.deleteBook(e.target);

  //show alert
  ui.showAlert('Book Removed', 'sucsess');
  e.preventDefault();
});
