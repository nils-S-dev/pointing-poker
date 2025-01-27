import { EstimationOption } from "./EstimationOption";

export type EstimationProcedure = {
    name: string,
    label?: string,
    options: Array<EstimationOption>
}