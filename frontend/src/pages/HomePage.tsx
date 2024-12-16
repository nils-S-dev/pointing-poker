import { useState } from "react";
import Button from "../components/partials/Button";
import TextField from "../components/partials/TextField";
import Headline from "../components/partials/Headline";
import { useNavigate } from "react-router";
import { Procedure } from "../enums/Procedure";
import { DropdownOption } from "../types/DropdownOption";
import { dropdownOptions } from "../constants/Procedures";
import { Optional } from "../types/Optional";
import DropdownField from "../components/partials/DropdownField";

function HomePage() {

    const [name, setName] = useState<string>("");
    const [procedureOption, setProcedureOption] = useState<DropdownOption<Procedure>>(dropdownOptions.find(o => o.value === Procedure.FIBONACCI) as DropdownOption<Procedure>);

    const navigate = useNavigate()

    const createRoom = () => {
        let url: string;
        console.log("body", JSON.stringify({
            procedure: procedureOption.value
        }))
        /** @TODO move to .env / Pipeline **/
        fetch("http://localhost:3000/rooms", { 
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                procedure: "fibonacci"
            })
        })
            .then(response => response.json())
            .then((room) => {
                debugger;
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
                localStorage.setItem("pp-name", name);
                localStorage.setItem("pp-token", token);
                navigate(url)
            })
            .catch(console.error)
    }

    return (
        <section className="w-full flex flex-col items-start">
            <Headline>Start Session</Headline>
            <p className="mb-3">Start a new pointing poker session by choosing a name for yourself and pressing the button. You will be able to invite your colleagues once your session is set up.</p>
            <TextField name="name" state={ [name, setName] }>Your Name</TextField>
            <DropdownField<Procedure> name="procedure" state={ [procedureOption, setProcedureOption] } options={ dropdownOptions }>Estimation Procedure</DropdownField>
            <Button onClick={ createRoom }>Go for it!</Button>
        </section>
    )
}

export default HomePage