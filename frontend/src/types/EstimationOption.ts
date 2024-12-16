/**
 * This interface models an option which can be chosen for estimation by a user
 *
 * @interface EstimationOption
 * @member {string} label the text to show in the frontend
 * @member {string} numeric the numerical value represented by the option
 */
export interface EstimationOption {
    label: string;
    numeric: number;
}