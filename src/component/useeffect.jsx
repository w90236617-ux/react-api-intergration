import { useEffect, useState } from "react"
import { getuser } from "../api/userlist"

const ApiCalling = () => {
    const [id, setId] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [users, setUsers] = useState([])
    const [notFound, setNotFound] = useState(false)   // 👈 naya state add kiya

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (id.trim() !== "") {
            const matchedUser = allUsers.find(
                (u) => String(u.id) === id.trim()
            )

            if (matchedUser) {
                const otherUsers = allUsers.filter(
                    (u) => String(u.id) !== id.trim()
                )
                setUsers([matchedUser, ...otherUsers])
                setNotFound(false)          // match mil gaya
            } else {
                setUsers([])                // list khaali kar do
                setNotFound(true)           // 👈 no user found trigger karo
            }
        } else {
            setUsers(allUsers)
            setNotFound(false)
        }
    }, [id, allUsers])

    const fetchUsers = async () => {
        try {
            const data = await getuser  ()
            setAllUsers(data.users)
            setUsers(data.users)
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="User ID se search karein..."
                value={id}
                onChange={(e) => setId(e.target.value)}
                style={{
                    margin: "20px",
                    padding: "10px",
                    width: "250px",
                    fontSize: "16px",
                }}
            />

            {/* 👇 No user found message */}
            {notFound && (
                <h2 style={{ color: "red", marginLeft: "20px" }}>
                    No user found
                </h2>
            )}

            <div>
                {users.map((v, i) => (
                    <div
                        key={v.id ?? i}
                        style={{
                            border: "1px solid red",
                            width: "200px",
                            display: "inline-block",
                            height: "200px",
                            padding: "20px",
                            margin: "20px",
                        }}
                    >
                        <h1>{v.firstName}</h1>
                        <p>ID: {v.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ApiCalling