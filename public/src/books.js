function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

/*
function partitionBooksByBorrowedStatus(books) {
  const result = []
  const loaned = [...books.filter((book) => !book.borrows[0].returned)]
  const returned = [...books.filter((book) => book.borrows[0].returned)]
  result.push(loaned, returned)
  return result
} */

function partitionBooksByBorrowedStatus(books) {
  const result = []
  const loaned = books.filter((book) => !book.borrows[0].returned)
  const returned = books.filter((book) => book.borrows[0].returned)
  result.push(loaned, returned)
  return result
}

function getBorrowersForBook(book, accounts) {
  let borrowers = book.borrows.map((borrow) => {
    const someGuy = findAccountById(borrow.id)
    return {...borrow, ...someguy}
  })
  return borrowers
} //reqrote to use map and it looks better :)


/* //old code
function getBorrowersForBook(book, accounts) {
  let borrows = book.borrows.slice(0,10)
  return borrows.forEach((borrow) => {
    const thisBorrow = {...borrow}
    const user = accounts.find((account) => account.id === borrow.id)
    Object.assign(thisBorrow, user)
    return thisBorrow
  })
}
*/

function getBorrowersForBook(book, accounts) {
  let borrows = book.borrows.slice(0,10)
  let borrowers = []
  borrows.forEach((borrow) => {
    const someGuy = accounts.find((account) => account.id === borrow.id)
    let borrower = {...borrow, ...someGuy}
    borrowers.push(borrower)
    })
  /* //for testing
  console.log(book)
  console.log(accounts)
  console.log(borrowers)
  */
  return borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
