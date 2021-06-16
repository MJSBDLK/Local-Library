function getTotalBooksCount(books) {
  return Object.keys(books).length
}

function getTotalAccountsCount(accounts) {
  return Object.keys(accounts).length
}

function getBooksBorrowedCount(books) {
  books.forEach((book) => console.log(book.borrows[0]))
  return books.filter((book) => !book.borrows[0].returned).length
}

function formatNeedlessObject(name, count) {
  return {name: name, count: count}
} //for helper function requirement

function getMostCommonGenres(books) {
  const genresLogged = {}
  let genres = books.reduce((acc, book) => {
    const genreKey = book.genre
    if (!genresLogged[genreKey]) {
      genresLogged[genreKey] = 'logged'
      acc.push({name: genreKey, count: Object.keys(books.filter((book) => book.genre === genreKey)).length})
    }
    return acc
  }, []).sort((countA, countB) => countA.count < countB.count ? 1 : -1).slice(0, 5) // sort 'em and slice 'em
  // console.log(genres) //test
  return genres
} //good lord this was difficult

function getMostPopularBooks(books) {
// initialize 'topBooks' array
  let topBooks = []
// loop through books
  books.forEach((book) => {
// for each iteration, push an object to topBooks with the book's name and its number of borrows
    topBooks.push(formatNeedlessObject(book.title, book.borrows.length))
    //topBooks.push({name: book.title, count: book.borrows.length})
  })
// sort and slice
  console.log(topBooks)
  return topBooks.sort((a,b) => a.count < b.count ? 1 : -1).slice(0,5)
}

// It returns an array containing top 5 objects (or fewer) listing the most popular authors. popularity = total borrows
function getMostPopularAuthors(books, authors) {
//create an array of all authors
  const allAuthors = [...authors]
//loop through allAuthors
  allAuthors.forEach((author) => {
//at each author, add totalBorrows key, then loop through allBooks
    author.totalBorrows = 0
    books.forEach((book) => {
//if author.id === book.authorId, push book to author.allBooks and increment author.totalBorrows by += book.borrows.length
      if (book.authorId === author.id) {
        author.totalBorrows += book.borrows.length
      }
    })
  })
  allAuthors.sort((a,b) => a.totalBorrows < b.totalBorrows ? 1 : -1)
  let topAuthors = []
  //allAuthors.forEach((author) => topAuthors.push({name: `${author.name.first} ${author.name.last}`, count: author.totalBorrows}))
  allAuthors.forEach((author) => topAuthors.push(formatNeedlessObject(`${author.name.first} ${author.name.last}`, author.totalBorrows)))
  return topAuthors.slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
