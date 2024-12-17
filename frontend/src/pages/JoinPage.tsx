import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router";
import io from "socket.io-client";
import Section from "../components/partials/Section";
import Headline from "../components/partials/Headline";
import TextField from "../components/partials/TextField";
import Button from "../components/partials/Button";
import { tokenStorage } from "../util/StorageUtil";

function JoinPage() {

    const [name, setName] = useState<string>("");
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate()
    const room = searchParams.get("room");

    const joinRoom = () => {
        fetch("http://localhost:3000/auth", { 
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                user: name,
                room
            })
        })
        .then(response => response.json())
        .then(({ token }) => {
            tokenStorage.set(token);
            navigate(`/room/${room}`)
        })
        .catch(console.error)
    }

    return (
        <Section>
            <Headline>Join Session</Headline>
            <p className="mb-3">Join an existing pointing poker session by choosing a name for yourself and pressing the button. You will be able to invite your colleagues once your session is set up.</p>
            <TextField name="name" state={ [name, setName] }>Your Name</TextField>
            <Button onClick={ joinRoom }>Jump on it!</Button>
        </Section>
    )
}

export default JoinPage