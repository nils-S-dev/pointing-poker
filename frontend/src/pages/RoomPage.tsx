import { useEffect, useMemo, useRef, useState } from "react"
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
import Section from "../components/partials/Section";

interface SocketResponse {
    user: User,
    room: Room
}

function RoomPage() {

    const isReady = useRoomGuard();
    let socket = useRef<SocketIOClient.Socket>();
    const [room, setRoom] = useState<Nullable<Room>>(null);

    useEffect(() => {

        if(!isReady) return;

        socket.current = io(import.meta.env.VITE_API_URL)

        socket.current.connect();

        /** @TODO make shared (with BE) enum */
        socket.current.emit("join", {
            token: tokenStorage.get()
        })

        /** @TODO make shared (with BE) enum */
        socket.current.on("join", (data: SocketResponse) => setRoom(data.room))

        /** @TODO make shared (with BE) enum */
        socket.current.on("estimate", (data: SocketResponse) => setRoom(data.room))

        /** @TODO make shared (with BE) enum */
        socket.current.on("reveal", (data: SocketResponse) => setRoom(data.room))

        /** @TODO make shared (with BE) enum */
        socket.current.on("reset", (data: SocketResponse) => setRoom(data.room))

    }, [isReady])

    // computed property
    const user = useMemo(() => {
        return room?.users.find(u => u.socketId === socket.current?.id);
      }, [room]);

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
                isReady && room && user
                    ?   <section className="w-full flex flex-col gap-10 pb-28 lg:gap-12 lg:pb-0">
                            <Actions onReset={ reset } onReveal={ reveal } />
                            <div className="flex flex-col md:gap-8 md:flex-row">
                                <Board className="w-full px-4 mx-auto lg:pr-5" { ...room } />
                                <Section className="w-full fixed bottom-0 left-0 py-6 shadow-2xl bg-steel px-4 mx-auto md:py-0 md:px-0 md:static md:shadow-none md:bg-transparent">
                                    {
                                        room.procedure === Procedure.CUSTOM
                                            && <Input  onClick={ estimate } />
                                    }
                                    {
                                        room.procedure === Procedure.FIBONACCI
                                            && <Options className="w-full px-4 mx-auto sm:max-w-[400px] md:max-w-none md:px-0" estimation={ user.estimation } onClick={ estimate } options={ procedures[0].options } />
                                    }
                                </Section>
                            </div>
                        </section>
                    :   <>Loading ...</>
            }
        </>
    )

}

export default RoomPage