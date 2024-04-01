import { useEffect, useState } from 'react'
import Card from './components/Card'
import BookList from './components/BookList'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const[ highestRatedBook, setHighestRatedBook] = useState(null);
  const[ mostReadBook, setMostReadBook] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [titleInput, setTitleInput] = useState("*");
  const [authorInput, setAuthorInput] = useState("*");

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(`https://openlibrary.org/search.json?title=${titleInput}&author=${authorInput}&sort=rating&limit=500`);
      const catalog = await response.json();
      console.log(titleInput + " and " + authorInput)
      setTotalItems(catalog.numFound)
      setList(catalog.docs);
      setHighestRatedBook(catalog.docs[0]);
      findMostReadBook(catalog.docs);
    }
    fetchData().catch(console.error);
  },[list,totalItems,highestRatedBook,mostReadBook,titleInput,authorInput,filteredList]);

  const findMostReadBook = (catalog) => {
    let mostRead = catalog[0];
    catalog.forEach((book) => {
      if(book.readinglog_count > mostRead.readinglog_count){
        mostRead = book;
      }
    });
    setMostReadBook(mostRead);
  }

  const searchTitle = (searchValue) => {
    if(searchValue == ""){
      searchValue="*"
    }
    setTitleInput(searchValue);
    if(searchValue!="*"){
      var filteredBooks = list.filter((item) => {
        return item.title.includes(searchValue) == true
      })
      if(authorInput != "*"){
        filteredBooks = filteredBooks.filter((item) => {
          return item.author_name[0].toLowerCase().includes(authorInput.toLowerCase()) == true
        })  
      }
      setFilteredList(filteredBooks);
      findMostReadBook(filteredBooks)
      setHighestRatedBook(filteredBooks[0])
      setTotalItems(filteredBooks.length)
    } else {
        if(authorInput == "*"){
          setFilteredList(list);
        }
        else{
          const filteredBooks = list.filter((item) => {
            return item.author_name[0].toLowerCase().includes(authorInput.toLowerCase())  == true
        })
        setFilteredList(filteredBooks);
        findMostReadBook(filteredBooks)
        setHighestRatedBook(filteredBooks[0])
        setTotalItems(filteredBooks.length)
      }
    }
  }
  
  const searchAuthor = searchValue => {
    if(searchValue == ""){
      searchValue="*"
    }
    setAuthorInput(searchValue);
    if(searchValue!="*"){
      var filteredBooks = list.filter((item) => {
        return item.author_name[0].toLowerCase().includes(searchValue.toLowerCase()) == true
      })
      if(authorInput != "*"){
        filteredBooks = filteredBooks.filter((item) => {
          return item.title.includes(titleInput) == true
      })  
      }
      setFilteredList(filteredBooks);
      findMostReadBook(filteredBooks)
      setHighestRatedBook(filteredBooks[0])
      setTotalItems(filteredBooks.length)
    } else {
        if(authorInput == "*"){
          setFilteredList(list);
        }
        else{
          const filteredBooks = list.filter((item) => {
            return item.title.includes(titleInput)  
        })
        setFilteredList(filteredBooks);
        findMostReadBook(filteredBooks)
        setHighestRatedBook(filteredBooks[0])
        setTotalItems(filteredBooks.length)
      }
    }
  }

  return (
    <div>
      <h1>Library Dashboard</h1>
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
        {console.log(filteredList)}
        {titleInput != "*" || authorInput != "*"? 
          <BookList
            dataList={filteredList}
          />
          : 
          <BookList
              dataList={list}
          />
        }
      </div>
    </div>
  )
}

export default App
