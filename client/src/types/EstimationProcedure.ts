import { Procedure } from "../enums/Procedure";
import { EstimationOption } from "./EstimationOption";

/**
 * This interface models a procedure that can be used to estimate the issues defined by a list of options unique to it
 *
 * @interface EstimationProcedure
 * @member {Method} label the unique name of the procedure
 * @member {options} Array<EstimationOption> the list of options available to choose from
 */
export interface EstimationProcedure {
    name: Procedure,
    options: Array<EstimationOption>
}