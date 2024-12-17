import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router";
import io from "socket.io-client";
import { tokenStorage } from "../util/StorageUtil";
import { useRoomGuard } from "../hooks/useRoomGuard";

function RoomPage() {

    /** @TODO check if user has name, else redirect to NameRoute (and remember room to redirect to) **/
    let { room } = useParams()

    const isReady = useRoomGuard();
    
    let client: SocketIOClient.Socket;

    useEffect(() => {

        console.log('memo')

        if(!isReady) return;

        client = io("http://localhost:3000");

        client.connect();

        client.on("join", console.log)

        client.emit("join", {
            token: tokenStorage.get()
        })

    }, [isReady])

    return (
        <>
            {
                isReady ? <h1>Ready!!!!!!</h1> : <h1>Loading...</h1>
            }
        </>
    )
}

export default RoomPage