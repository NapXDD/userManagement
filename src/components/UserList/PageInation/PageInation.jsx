import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllUser, getUserbyID } from '../../../utilities/apiClientGet';
import UserCard from '../UserCard/UserCard';


export function Items({currentItems}){
    return(
        <div className='user-list-content'>
            {currentItems &&
            currentItems.map((item, index) => (
                <div key={index}>
                    {item}
                </div>
            ))}
        </div>
    )
}

export default function PaginatedItems({ itemsPerPage }){

    const token = localStorage.getItem("accessToken")
    const userId = localStorage.getItem("userId")

    const [items, setItems] = useState([])

    const handleGetAllUsers = async () => {
        try{
            const {data: res} = await getAllUser(token)
            const {data: currentUser } = await getUserbyID(userId, token)
            res.map((user, index) => {
                if(currentUser._id !== user._id)
                {
                    items.push(<UserCard key={index} data={user} currentUser={currentUser}/>)
                }
            })
            setItems(items => [...items])
            
        }catch(err){
            console.error(err)
        }
    }
    useEffect(() => {
        handleGetAllUsers() 
    }, [])

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0)
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    let currentItems = items.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(items.length / itemsPerPage)

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    }

    return(
        <div className='pageInation-container'>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                className='pagination'
                renderOnZeroPageCount={null}
            />
        </div>
    )
}