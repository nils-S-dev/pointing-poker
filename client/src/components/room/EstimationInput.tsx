import { useState } from "react";
import Headline from "../partials/Headline";
import InputField from "../partials/fields/TextField";
import Button from "../partials/Button";
import { UIComponentProps } from "../../types/UIComponent";
import FormContainer from "../partials/FormContainer";

interface Props extends UIComponentProps {
    onClick: (val: number) => void,
}

function EstimationInput({ onClick, className }: Props) {
    const [value, setValue] = useState<string>("");
    return (
            <div className={ `flex flex-col md:items-start ${ className }` }>
                <Headline.h3 className="hidden mb-6 md:block">Make Estimation</Headline.h3>
                <FormContainer onSubmit={ () => onClick(parseInt(value.replace(/,/g, ''), 10)) }>
                    <InputField className="[&>*]:w-full mb-2 lg:w-auto [&>*]:lg:w-[400px]" type="number" name="name" state={ [value, setValue] }></InputField>
                    <Button.default onClick={ () => onClick(parseInt(value)) }>Estimate</Button.default>
                </FormContainer>
            </div>
    )
}

export default EstimationInput