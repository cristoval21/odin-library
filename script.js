function Book(author, title, numOfPages, haveRead) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

const myLibrary = [
  new Book("Weir, Andy", "The Martian", 369, false),
  new Book("Roth, Veronica", "Divergent", 487, false),
  new Book("Sheldon, Sidney", "Bloodline", 464, true)
];

function addBookToLibrary(author, title, numOfPages, haveRead) {
  const book = new Book(author, title, numOfPages, haveRead);
  myLibrary.push(book);
}

const bookList = document.querySelector(".book-list");
for (let book of myLibrary) {
  let rowItem = document.createElement("tr");
  let author = document.createElement("td");
  let title = document.createElement("td");
  let numOfPages = document.createElement("td");
  let haveRead = document.createElement("td");

  author.textContent = book.author;
  title.textContent = book.title;
  numOfPages.textContent = book.numOfPages;
  haveRead.textContent = book.haveRead;

  rowItem.appendChild(author);
  rowItem.appendChild(title);
  rowItem.appendChild(numOfPages);
  rowItem.appendChild(haveRead);
  bookList.appendChild(rowItem);
}