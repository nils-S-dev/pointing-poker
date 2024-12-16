import { Procedure } from "../enums/Procedure";
import { DropdownOption } from "../types/DropdownOption";
import { EstimationProcedure } from "../types/EstimationProcedure";

export const fibonacci: EstimationProcedure = {
    name: Procedure.FIBONACCI,
    options: [
        {
            label: "1",
            numeric: 1
        },
        {
            label: "2",
            numeric: 2
        },
        {
            label: "3",
            numeric: 3
        },
        {
            label: "5",
            numeric: 5
        },
        {
            label: "8",
            numeric: 8
        },
        {
            label: "13",
            numeric: 13
        },
        {
            label: "20",
            numeric: 20
        },
        {
            label: "100",
            numeric: 100
        },
    ]
}

export const dropdownOptions: Array<DropdownOption<Procedure>> = [
    {
        label: "Fibonacci",
        value: Procedure.FIBONACCI
    },
    {
        label: "Custom",
        value: Procedure.FIBONACCI
    }
]