import { useEffect, useMemo } from "react"
import { useParams } from "react-router";
import io from "socket.io-client";
function RoomPage() {
    
    let { room } = useParams()
    let client: SocketIOClient.Socket;

    useMemo(() => {
        client = io("http://localhost:3000");

        client.connect();

        client.on("join", console.log)

        client.emit("join", {
            room,
            name: localStorage.getItem("pp-name")
        })

    }, [])

    return (
        <h1>I am the Room Page!</h1>
    )
}

export default RoomPage