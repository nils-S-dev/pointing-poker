import { useState } from "react";
import { UIComponentProps } from "../../types/UIComponent";
import Headline from "../partials/Headline";
import Section from "../partials/Section";
import InputField from "../partials/InputField";
import Button from "../partials/Button";

type Props = UIComponentProps & {
    onClick: (val: number) => void,
}

function Input({ onClick, className }: Props) {
    const [value, setValue] = useState<string>("");
    return (
        <Section className={ className }>
            <Headline.h3 className="mb-6">Make Estimation</Headline.h3>
            <InputField type="number" name="name" state={ [value, setValue] }>Estimation</InputField>
            <Button onClick={ () => onClick(parseInt(value)) }>Estimate</Button>
        </Section>
    )
}

export default Input