import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router";
import Section from "../components/partials/Section";
import Headline from "../components/partials/Headline";
import Button from "../components/partials/Button";
import { tokenStorage } from "../util/StorageUtil";
import TextField from "../components/partials/fields/TextField";
import { API_URL } from "../constants/api";
import FormContainer from "../components/partials/FormContainer";

function JoinPage() {

    const [name, setName] = useState<string>("");
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate()
    const room = searchParams.get("room");

    const joinRoom = () => {
        fetch(`${API_URL}/auth`, { 
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
            tokenStorage.setValue(token);
            navigate(`/room/${room}`)
        })
        .catch(console.error)
    }

    return (
        <Section>
            <Headline.h2>Join Session</Headline.h2>
            <p className="mb-3">Join an existing pointing poker session by choosing a name for yourself and pressing the button. You will be able to invite your colleagues once your session is set up.</p>
            <FormContainer onSubmit={ joinRoom }>
                <TextField className="mb-3" type="text" name="name" state={ [name, setName] }>Your Name</TextField>
                <Button.default onClick={ joinRoom }>Jump on it!</Button.default>
            </FormContainer>
        </Section>
    )
}

export default JoinPage