class Book {
  constructor(title, author, pages, haveRead) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._haveRead = haveRead;
  }

  toggleRead() {
    this._haveRead = !this._haveRead;
  }

  getAuthor() {
    return this._author;
  }

  getTitle() {
    return this._title;
  }

  getPages() {
    return this._pages;
  }

  getRead() {
    return this._haveRead;
  }

  getAllProps() {
    return {
      title: this._title,
      author: this._author,
      pages: this._pages,
      haveRead: this._haveRead,
    };
  }
}

class BookLibrary {
  _library = [];

  addBook(author, title, pages, haveRead) {
    const book = new Book(author, title, pages, haveRead);
    this._library.push(book);
  }

  removeBook(index) {
    this._library.splice(index, 1);
  }

  getBook(index) {
    return this._library[index];
  }

  getLibrary() {
    return this._library;
  }

  getLibraryLength() {
    return this._library.length;
  }
}

function ScreenController() {
  const library = new BookLibrary();

  const dialogAddBook = document.querySelector('.dialog-add-book');
  const buttonAddBook = document.querySelector('.button-add-book');
  buttonAddBook.addEventListener('click', openModal);
  handleModal();

  updateTable();

  function updateTable() {
    const tableBody = document.querySelector('.table__body');
    tableBody.textContent = '';

    for (let i = 0; i < library.getLibraryLength(); i++) {
      const book = library.getBook(i);
      const bookProps = book.getAllProps();

      const row = document.createElement('div');
      row.classList.add('table__row');
      row.setAttribute('data-index', i);

      for (const prop in bookProps) {
        const cell = document.createElement('div');
        cell.classList.add('table__cell');
        cell.classList.add('table__cell--' + prop);

        if (prop != 'haveRead') {
          cell.textContent = bookProps[prop];
        } else {
          handleReadButton(book, cell);
        }

        row.appendChild(cell);
      }

      row.appendChild(handleRemoveButton(row.dataset.index));

      tableBody.appendChild(row);
    }
  }

  function handleRemoveButton(rowIndex) {
    const cell = document.createElement('div');
    cell.classList.add('table__cell');

    const deleteButton = document.createElement('button');
    deleteButton.className = 'button button--secondary table__button';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';

    cell.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
      library.removeBook(parseInt(rowIndex));
      updateTable();
    });

    return cell;
  }

  function handleReadButton(book, cell) {
    const statusButton = document.createElement('button');
    statusButton.className = 'button button--secondary table__button';
    statusButton.type = 'button';
    statusButton.textContent = book._haveRead ? 'Read' : 'Not read';

    cell.appendChild(statusButton);

    statusButton.addEventListener('click', () => {
      book.toggleRead();
      updateTable();
    });
  }

  function openModal() {
    dialogAddBook.showModal();
  }

  function handleModal() {
    const buttonFormAddBook = document.querySelector('.form__button-add-book');
    const buttonFormCancel = document.querySelector('.form__button-cancel');
    const inputFormTitle = document.querySelector('#title');
    const inputFormAuthor = document.querySelector('#author');
    const inputFormPages = document.querySelector('#pages');
    const inputFormRead = document.querySelector('#read');
    const inputFormNotRead = document.querySelector('#not-read');

    buttonFormAddBook.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateForm()) {
        library.addBook(
          inputFormTitle.value,
          inputFormAuthor.value,
          inputFormPages.value,
          inputFormRead.checked
        );
        updateTable();
        dialogAddBook.close();
      }
    });

    buttonFormCancel.addEventListener('click', () => {
      dialogAddBook.close();
    });
  }

  function validateForm() {
    let numOfErrors = 0;

    const inputFormTitle = document.querySelector('#title');
    const inputFormAuthor = document.querySelector('#author');
    const inputFormPages = document.querySelector('#pages');
    const inputFormRead = document.querySelector('#read');
    const inputFormNotRead = document.querySelector('#not-read');

    if (inputFormTitle.validity.valueMissing) {
      const errorTitle = document.querySelector('.form__error-title');
      errorTitle.textContent = 'Title cannot be empty';
      numOfErrors += 1;
    }
    if (inputFormAuthor.validity.valueMissing) {
      const errorAuthor = document.querySelector('.form__error-author');
      errorAuthor.textContent = 'Author cannot be empty';
      numOfErrors += 1;
    }
    if (
      inputFormPages.validity.valueMissing ||
      inputFormPages.validity.rangeUnderflow ||
      inputFormPages.validity.typeMismatch
    ) {
      const errorPages = document.querySelector('.form__error-pages');
      errorPages.textContent = 'Book must have at least 1 page';
      numOfErrors += 1;
    }
    if (!inputFormRead.checked && !inputFormNotRead.checked) {
      const errorRead = document.querySelector('.form__error-read');
      errorRead.textContent = 'Select a status';
      numOfErrors += 1;
    }

    return !numOfErrors;
  }
}

ScreenController();
