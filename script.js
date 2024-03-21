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

const bookList = document.querySelector(".book-list");
for (let book of myLibrary) {
  fillTable(book);
}

const buttonAddBook = document.querySelector(".button-add-book");
const dialogAddBook = document.querySelector(".dialog-add-book");
buttonAddBook.addEventListener("click", () => {
  dialogAddBook.showModal();
});

const buttonFormAddBook = document.querySelector(".form__button-add-book");
const buttonFormCancel = document.querySelector(".form__button-cancel");
const inputFormAuthor = document.querySelector("#author");
const inputFormTitle = document.querySelector("#title");
const inputFormPages = document.querySelector("#pages");
const inputFormRead = document.querySelector("#read");
buttonFormAddBook.addEventListener("click", () => {
  event.preventDefault();

  const book = new Book(
    inputFormAuthor.value,
    inputFormTitle.value,
    inputFormPages.value,
    inputFormRead.checked
  )
  
  myLibrary.push(book);
  fillTable(book);
  dialogAddBook.close();
});
buttonFormCancel.addEventListener("click", () => {
  dialogAddBook.close();
});

function fillTable(book) {
  let rowItem = document.createElement("tr");
  let author = document.createElement("td");
  let title = document.createElement("td");
  let numOfPages = document.createElement("td");
  let haveRead = document.createElement("td");
  let remove = document.createElement("td");

  author.textContent = book.author;
  title.textContent = book.title;
  numOfPages.textContent = book.numOfPages;
  haveRead.textContent = book.haveRead;
  remove.textContent = "delete";

  rowItem.classList.add("book-list-row");
  author.classList.add("book-list-cell");
  title.classList.add("book-list-cell");
  numOfPages.classList.add("book-list-cell");
  haveRead.classList.add("book-list-cell");
  remove.classList.add("material-symbols-outlined");

  rowItem.appendChild(author);
  rowItem.appendChild(title);
  rowItem.appendChild(numOfPages);
  rowItem.appendChild(haveRead);
  rowItem.appendChild(remove);
  bookList.appendChild(rowItem);
}
