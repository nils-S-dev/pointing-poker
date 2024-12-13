import { useState } from "react";
import Button from "../components/partials/Button";
import TextField from "../components/partials/TextField";
import Headline from "../components/partials/Headline";
import { useNavigate } from "react-router";

function HomePage() {

    const [name, setName] = useState<string>("");

    const navigate = useNavigate()

    const createRoom = () => {
        let url: string;
        /** @TODO move to .env / Pipeline **/
        fetch("http://localhost:3000/rooms", { method: "POST" })
            .then(response => response.json())
            .then((room) => {
                url = `/room/${room.name}`
                return fetch("http://localhost:3000/auth", { 
                    method: "POST", 
                    body: JSON.stringify({
                        name,
                        room: room.name
                    }) 
                })
            })
            .then(response => response.json())
            .then(({ token }) => {
                 /** @TODO make utils, declare pp-token a constant **/
                localStorage.setItem("pp-token", token);
                navigate(url)
            })
            .catch(console.error)
    }

    return (
        <section className="w-full flex flex-col items-start">
            <Headline>Start Session</Headline>
            <p className="mb-3">Start a new pointing poker session by choosing a name for yourself and pressing the button. You will be able to invite your colleagues once your session is set up.</p>
            <TextField state={ [name, setName] } />
            <Button onClick={ createRoom }>Go for it!</Button>
        </section>
    )
}

export default HomePage