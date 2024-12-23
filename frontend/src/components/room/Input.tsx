import { useState } from "react";
import Headline from "../partials/Headline";
import InputField from "../partials/InputField";
import Button from "../partials/Button";

interface Props {
    onClick: (val: number) => void,
}

function Input({ onClick }: Props) {
    const [value, setValue] = useState<string>("");
    return (
            <>
                <Headline.h3 className="mb-6">Make Estimation</Headline.h3>
                <InputField type="number" name="name" state={ [value, setValue] }>Estimation</InputField>
                <Button onClick={ () => onClick(parseInt(value)) }>Estimate</Button>
            </>
    )
}

export default Input