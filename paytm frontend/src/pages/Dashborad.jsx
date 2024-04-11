import Appbar from '../components/Appbar'
import Users from '../components/Users'
import Balance from '../components/Balance'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Dashboard = () => {
    const [balance, setBalance] = useState(0)
    useEffect(()=> {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorisation: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=> {
            setBalance(response.data.balance)
        })
    }, [])
    return (
        <div>
            <Appbar/>
            <div className="p-10">
                <Balance value = {balance}/>
                <Users/>
            </div>
        </div>
    )
}

export default Dashboard