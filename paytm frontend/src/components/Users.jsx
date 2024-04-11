import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router";
const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    useEffect(()=> {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorisation: "Bearer " + localStorage.getItem("token")

            }
        } ).then((response)=>{
            setUsers(response.data.user)
        })
    }, [filter])

    return (
        <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange = {(e)=>setFilter(e.target.value)} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
        </>
    )
}

export default Users


const User = ({user}) => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick = {()=>navigate(`/sendmoney?id=${user._id}&name=${user.firstname}`)} />
        </div>
    </div>
    )
}