function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) => accA.name.last.toLowerCase() > accB.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let borrows = 0
  for (let i of books) {
    for (let j of i.borrows) {
      if (j.id === account.id) {
        borrows ++
      }
    }
  }
  return borrows
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((acc, book) => {
    let cb = {...book.borrows[0]}
    const thisBook = {...book}
    if (cb.id === account.id && !cb.returned) {
      thisBook.author = authors.find((author) => author.id === thisBook.authorId)
      acc.push(thisBook)
    }
    return acc
  }, [])
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
