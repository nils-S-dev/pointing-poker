import { FormEvent, useState } from "react";
import Button from "../components/partials/Button";
import Headline from "../components/partials/Headline";
import { useNavigate } from "react-router";
import { DropdownOption } from "../types/DropdownOption";
import { procedures } from "../constants/procedures/procedures";
import DropdownField from "../components/partials/fields/DropdownField";
import { tokenStorage } from "../util/StorageUtil";
import Section from "../components/partials/Section";
import TextField from "../components/partials/fields/TextField";
import { API_URL } from "../constants/api";
import { EstimationProcedure } from "../types/EstimationProcedure";
import { fibonacciProcedure } from "../constants/procedures/fibonacci";
import FormContainer from "../components/partials/FormContainer";

function HomePage() {

    // all available estimation procedures
    const dropdownOptions: Array<DropdownOption<string>> = procedures.map((p: EstimationProcedure) => ({
        label: p.label ?? p.name,
        value: p.name
    }))

    const [name, setName] = useState<string>("");

    // use fibonacci as default
    const [procedureOption, setProcedureOption] = useState<DropdownOption<string>>(dropdownOptions.find(o => o.value === fibonacciProcedure.name) as DropdownOption<string>);

    const navigate = useNavigate()

    const createRoom = () => {
        fetch(`${API_URL}/rooms`, { 
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
            <FormContainer onSubmit={ createRoom }>
                <TextField className="mb-3" type="text" name="name" state={ [name, setName] }>Your Name</TextField>
                <DropdownField<string> name="procedure" state={ [procedureOption, setProcedureOption] } options={ dropdownOptions }>Estimation Procedure</DropdownField>
                <Button.default>Go for it!</Button.default>
            </FormContainer>
        </Section>
    )
}

export default HomePage