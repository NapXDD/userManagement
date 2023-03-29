import PaginatedItems from "./PageInation/PageInation";
import "./userlist.css"

export default function UserList(){
    return(
        <div className="user-list-container">
            <PaginatedItems itemsPerPage={9}/>
        </div>
    )
}