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
refreshCards();

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
  refreshCards();
  dialogAddBook.close();
});
buttonFormCancel.addEventListener("click", () => {
  dialogAddBook.close();
});

function refreshCards() {
  const tableBody = document.querySelector(".table__body");
  tableBody.textContent = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const row = document.createElement("tr");
    row.classList.add("table__row");
    row.setAttribute("data-index", i);

    for (const prop in book) {
      const cell = document.createElement("td");
      cell.classList.add("table__cell");
      cell.classList.add("table__cell-" + prop);

      const statusButton = document.createElement("button");
      if (prop != "haveRead") {
        cell.textContent = book[prop];
      } else {
        statusButton.className = "button button--secondary";
        statusButton.textContent = book.haveRead ? "Read" : "Not read";

        cell.appendChild(statusButton);

        statusButton.addEventListener("click", () => {
          toggleReadStatus(Number(row.dataset.index));
        })
      }
      
      row.appendChild(cell);
    }
    
    const cell = document.createElement("td");
    cell.classList.add("table__cell");
    const deleteButton = document.createElement("button");
    deleteButton.className = "button button--secondary";
    deleteButton.textContent = "Delete";
    cell.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {removeBook(Number(row.dataset.index))});
    row.appendChild(cell);

    tableBody.appendChild(row);
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  refreshCards();
}

function toggleReadStatus(index) {
  myLibrary[index].haveRead = !myLibrary[index].haveRead;
  refreshCards();
}