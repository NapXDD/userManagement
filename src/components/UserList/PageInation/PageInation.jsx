import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllUser, getUserbyID } from '../../../utilities/apiClientGet';
import UserCard from '../UserCard/UserCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/features/setAuth';
import { userListData } from '../../../Redux/features/setUseList';
import { allUserListData } from '../../../Redux/features/setAllUserList';


export function Items({currentItems}){

    const currentUser = useSelector(state => state.currentUser.data)

    return(
        <div className='user-list-content'>
            {currentItems &&
            currentItems.map((item, index) => (
                <UserCard key={index} data={item} currentUser={currentUser}/>
            ))}
        </div>
    )
}

export default function PaginatedItems({ itemsPerPage }){

    const token = localStorage.getItem("accessToken")
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const array = []
    const items = useSelector(state => state.userList.list)

    //const [items, setItems] = useState([])

    const handleGetAllUsers = async () => {
        try{
            const {data: res} = await getAllUser(token)
            const {data: currentUser } = await getUserbyID(userId, token)
            res.forEach((user, index) => {
                if(currentUser._id !== user._id)
                {
                    array.push(user)
                }
            })
            dispatch(userListData([...array]))
            dispatch(allUserListData([...array]))
            array.length = 0  //hot fix
        }catch(err){
            console.error(err)
            localStorage.clear()
            dispatch(logout())
            navigate("/signin")
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
    const handlePageClick = (e, page) => {
        const newOffset = ((page-1) * itemsPerPage) % items.length
        console.log(
            `User requested page number ${page-1}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    }

    return(
        <div className='pageInation-container'>
            <Items currentItems={currentItems} />
            <Stack spacing={2}>
                <Pagination count={pageCount} onChange={(e, page) => handlePageClick(e, page)} variant="outlined" shape="rounded" />
            </Stack>
        </div>
    )
}