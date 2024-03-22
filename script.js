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
  const libraryWrapper = document.querySelector(".library-wrapper");
  libraryWrapper.textContent = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const cardAuthor = document.createElement("p");
    const cardPages = document.createElement("p");
    const cardTitle = document.createElement("p");
    const cardButtons = document.createElement("div");
    const cardReadButton = document.createElement("button");
    const cardDeleteButton = document.createElement("button");
  
    card.setAttribute("data-index", i);
    card.classList.add("book-card");
    cardHeader.classList.add("book-card__header");
    cardAuthor.className = "book-card__author book-card__pill";
    cardPages.className = "book-card__pages book-card__pill";
    cardTitle.classList.add("book-card__title");
    cardButtons.classList.add("book-card__buttons");
    cardReadButton.className = "book-card__button button material-symbols-outlined";
    cardDeleteButton.className = "book-card__button button button--secondary material-symbols-outlined";

    if (book.haveRead) {
      cardReadButton.classList.add("button--primary");
    } else {
      cardReadButton.classList.add("button--secondary");
    }
  
    cardAuthor.textContent = book.author;
    cardPages.textContent = book.numOfPages;
    cardTitle.textContent = book.title;
    cardReadButton.textContent = "check_circle";
    cardDeleteButton.textContent = "delete";

    cardDeleteButton.addEventListener("click", removeBook(card.getAttribute("data-index")));
  
    cardHeader.appendChild(cardAuthor);
    cardHeader.appendChild(cardPages);
    
    cardButtons.appendChild(cardReadButton);
    cardButtons.appendChild(cardDeleteButton);
  
    card.appendChild(cardHeader);
    card.appendChild(cardTitle);
    card.appendChild(cardButtons);
  
    libraryWrapper.appendChild(card);
  }
}

function removeBook(index) {
  // myLibrary.splice(index, 1);
}