import { useEffect, useState } from 'react'
import Card from './components/Card'
import BookList from './components/BookList'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [highestRatedBook, setHighestRatedBook] = useState(null);
  const [mostReadBook, setMostReadBook] = useState(null);
  const [titleInput, setTitleInput] = useState("*");
  const [authorInput, setAuthorInput] = useState("*");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      const response = await fetch(`https://openlibrary.org/search.json?title=${titleInput}&author=${authorInput}&sort=readinglog&limit=20&page=${pageNumber}`);
      const catalog = await response.json();
      console.log(catalog);
      console.log(titleInput + " and " + authorInput)
      setTotalItems(catalog.numFound)
      setList(catalog.docs);
      findHighestRating();
      findMostReadBook();
    }
    fetchData().catch((error) => {
      setList([]);
      setLoading(false);
      console.log(error);
    });
  },[titleInput,authorInput,pageNumber]);

  const findHighestRating = async() => {
    const response = await fetch(`https://openlibrary.org/search.json?title=${titleInput}&author=${authorInput}&sort=rating&limit=1`);
    const catalog = await response.json();
    let highestRated = catalog.docs[0];
    setHighestRatedBook(highestRated);
    setLoading(false);
  }
  const findMostReadBook = async() => {
    const response = await fetch(`https://openlibrary.org/search.json?title=${titleInput}&author=${authorInput}&sort=already_read&limit=1`);
    const catalog = await response.json();
    let mostRead = catalog.docs[0];
    setMostReadBook(mostRead);
    setLoading(false);
  }

  const searchTitle = (searchValue) => {
    if(searchValue == ""){
      searchValue="*"
    }
    setTitleInput(searchValue);
  }
  
  const searchAuthor = searchValue => {
    if(searchValue == ""){
      searchValue="*"
    }
    setAuthorInput(searchValue);
  }
  

  return (
    <div className='full-page'>
      <h1>Library Dashboard</h1>
      <div className='search-container'>
        <input 
          type="text"
          placeholder="Search by Title"
          name='title'
          onChange={(inputString) => searchTitle(inputString.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Author"
          name='author'
          onChange={(inputString) => searchAuthor(inputString.target.value)}
        />
        </div>
      {loading ?
          <div className='loading'>Loading...</div>
          :
          list.length == 0 ?
          <div>No results found</div>
          :
          <>
          <div className='card-container'> 
            {totalItems ? 
              <Card 
                catName="Number of Results"
                catMainData={totalItems}
              />
              : 
              <Card 
                catName="Number of Results"
                catMainData={0}
              />
            }
            {highestRatedBook ? 
              <Card 
                catName="Highest Rated Book"
                catMainData={highestRatedBook.title+ " by " + highestRatedBook.author_name[0]}
                catSubData={highestRatedBook.ratings_average}
              />
              : 
              <Card 
                catName="Highest Rating Book"
              />
            }
            {mostReadBook ? 
              <Card 
                catName="Most Read Book"
                catMainData={mostReadBook.title+ " by " + mostReadBook.author_name[0]}
                catSubData={mostReadBook.readinglog_count + " readers"}
              />
              : 
              <Card 
                catName="Most Read Book"
              />
            }
          </div>
          <div className='list-container'>
            <BookList
              dataList={list}
            />        
          </div>
          <div className='page-container'>
            {pageNumber>1 ? 
              <>
                <button className='other-page-button' onClick={() => setPageNumber(1)}>First</button>
                <button className='other-page-button' onClick={() => setPageNumber(pageNumber-1)}>{pageNumber-1}</button>
              </>
              : 
              null
            }
            <button className='current-page-button'>{pageNumber}</button>
            {pageNumber<Math.ceil(totalItems/20)? 
              <>
                <button className='other-page-button' onClick={() => setPageNumber(pageNumber+1)}>{pageNumber+1}</button>
                <button className='other-page-button' onClick={() => setPageNumber(Math.ceil(totalItems/20))}>Last</button>
              </>
              : 
              null
            }
          </div>
        </>
    }
    </div>
  )
}

export default App
