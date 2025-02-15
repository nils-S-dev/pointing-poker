import { FormEvent, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    onSubmit: Function
}

function FormContainer(props: Props) {
    const handle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit()
    }
    return <form className="contents" onSubmit={ handle }>
        { props.children }
    </form>
}

export default FormContainer 