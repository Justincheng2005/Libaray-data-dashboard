function BookList({dataList}){

    return(
    <div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Rating</th>
                    <th>Readers</th>
                </tr>
            </thead>
            <tbody>
                {dataList.map((book, index) => (
                    <tr key={index}>
                        <td className="table-title">{book.title}</td>
                        <td>{book.author_name[0]}</td>
                        {book.ratings_average=="NaN" ? 
                            <td>"-" </td>
                            :
                            <td>{Math.round(book.ratings_average * 100) / 100}</td>
                        }
                        
                        <td>{book.readinglog_count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default BookList;