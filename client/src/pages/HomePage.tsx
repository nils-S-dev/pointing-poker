import { useState } from "react";
import Button from "../components/partials/Button";
import Headline from "../components/partials/Headline";
import { useNavigate } from "react-router";
import { Procedure } from "../enums/Procedure";
import { DropdownOption } from "../types/DropdownOption";
import { dropdownOptions } from "../constants/procedures";
import DropdownField from "../components/partials/fields/DropdownField";
import { tokenStorage } from "../util/StorageUtil";
import Section from "../components/partials/Section";
import TextField from "../components/partials/fields/TextField";

function HomePage() {

    const [name, setName] = useState<string>("");
    const [procedureOption, setProcedureOption] = useState<DropdownOption<Procedure>>(dropdownOptions.find(o => o.value === Procedure.FIBONACCI) as DropdownOption<Procedure>);

    const navigate = useNavigate()

    const createRoom = () => {
        fetch(`${import.meta.env.VITE_API_URL}/rooms`, { 
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                user: name,
                procedure: procedureOption.value
            })
        })
        .then(response => response.json())
        .then(({ token, room }) => {
            tokenStorage.setValue(token);
            navigate(`/room/${room.name}`)
        })
        .catch(console.error)
    }

    return (
        <Section>
            <Headline.h2>Start Session</Headline.h2>
            <p className="mb-3">Start a new pointing poker session by choosing a name for yourself and pressing the button. You will be able to invite your colleagues once your session is set up.</p>
            <TextField className="mb-3" type="text" name="name" state={ [name, setName] }>Your Name</TextField>
            <DropdownField<Procedure> name="procedure" state={ [procedureOption, setProcedureOption] } options={ dropdownOptions }>Estimation Procedure</DropdownField>
            <Button.default onClick={ createRoom }>Go for it!</Button.default>
        </Section>
    )
}

export default HomePage