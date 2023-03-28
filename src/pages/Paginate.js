import React from 'react'
import './Pagination.css'

const Paginate = ({totalPosts,postsPerPage,setCurrentPage,currentPage}) => {
    let pages = []

    const totalPages = Math.ceil(totalPosts/postsPerPage)
    for(let i=1; i<= totalPages; i++){
        pages.push(i)
    }
  return (
    <div className='pagination'>
         <button onClick={() => setCurrentPage(currentPage - 1)}>
         &laquo;
         </button>    
      {
        pages.map((page,index)=>{
            return( 
                <button key={index} 
                onClick = {()=> setCurrentPage(page)}
                className = {page == currentPage ? "active" : ""}
                >{page}</button>)
        })
      }
             <button onClick={() => setCurrentPage(currentPage + 1)}>
             &raquo;
             </button>
             
    </div>
  )
}

export default Paginate
