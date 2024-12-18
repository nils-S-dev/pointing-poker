import { useEffect, useRef, useState } from "react"
import io from "socket.io-client";
import { tokenStorage } from "../util/StorageUtil";
import { useRoomGuard } from "../hooks/useRoomGuard";
import Options from "../components/room/Options";
import { procedures } from "../constants/Procedures";
import Actions from "../components/room/Actions";
import Board from "../components/room/Board";
import { Nullable } from "../types/Nullable";
import { Room } from "../types/Room";
import { User } from "../types/User";
import { Procedure } from "../enums/Procedure";
import Input from "../components/room/Input";

interface SocketResponse {
    user: User,
    room: Room
}

function RoomPage() {

    const isReady = useRoomGuard();
    let socket = useRef<SocketIOClient.Socket>();
    const [room, setRoom] = useState<Nullable<Room>>(null);

    useEffect(() => {

        console.log('memo')

        if(!isReady) return;

        console.log('Assigning socket');
        socket.current = io("http://localhost:3000")

        socket.current.connect();

        /** @TODO make shared (with BE) enum */
        socket.current.emit("join", {
            token: tokenStorage.get()
        })

        /** @TODO make shared (with BE) enum */
        socket.current.on("join", (data: SocketResponse) => {
            console.log('On: Join', data);
            setRoom(data.room);
        })

        socket.current.on("estimate", (data: SocketResponse) => {
            console.log('On: estimate', data);
            setRoom(data.room);
        })

        socket.current.on("reveal", (data: SocketResponse) => {
            console.log('On: reveal', data);
            setRoom(data.room);
        })

        socket.current.on("reset", (data: SocketResponse) => {
            console.log('On: reset', data);
            setRoom(data.room);
        })

    }, [isReady])

    const estimate = (estimation: number) => {
        /** @TODO make shared (with BE) enum */
        socket.current?.emit("estimate", {
            estimation
        })
    }

    const reset = () => {
        /** @TODO make shared (with BE) enum */
        socket.current?.emit("reset")
    }

    const reveal = () => {
        /** @TODO make shared (with BE) enum */
        socket.current?.emit("reveal")
    }

    return (
        <>
            {
                isReady && room
                    ?   <section className="w-full flex flex-col gap-10 lg:gap-12">
                            <Actions onReset={ reset } onReveal={ reveal } />
                            <div className="contents lg:flex">
                                <Board className="w-full px-4 mx-auto lg:pr-5" { ...room } />
                                {
                                    room.procedure === Procedure.CUSTOM
                                        && <Input className="w-full px-4 mx-auto lg:pl-5" onClick={ estimate } />
                                }
                                {
                                    room.procedure === Procedure.FIBONACCI
                                        && <Options className="w-full px-4 mx-auto lg:pl-5" onClick={ estimate } options={ procedures[0].options } />
                                }
                            </div>
                        </section>
                    :   <>Loading ...</>
            }
        </>
    )

}

export default RoomPage