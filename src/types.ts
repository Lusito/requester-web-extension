/** Describes a configuration object as it's expected by the web-extension */
export interface RequesterConfig {
    /** The label is shown in the dropdown and must be unique */
    label: string;
    /** How to send the data */
    type: 'form-data' | 'form-url-encoded';
    /** Either a hardcoded URL or a param configuration, so the user can change the URL */
    url: string | ParamConfigRequired;
    /** A list of parameter configurations */
    params: ParamConfig[];
    /** Optional: If the response is a JSON object, you can automatically extract an attribute from it to show as result */
    resultAttribute?: string;
}

/** A hidden parameter will not be shown in the UI. */
export interface ParamConfigHidden {
    type: 'hidden';
    /** The parameter name */
    name: string;
    /** The parameter value */
    value: string;
}

/** A visible parameter will be shown in the UI. */
export interface ParamConfigVisible {
    /** Type specifies how to handle empty values. `'omit-empty'` means it won't appear in the request at all. */
    type: 'required' | 'omit-empty' | 'allow-empty';
    /** The parameter name */
    name: string;
    /** Optional: The value to prefill the UI formular with */
    value?: string;
    /** Optional: The label will be shown to the user. If a label is not given, name will be used. */
    label?: string;
    /** Optional: The list of suggestions will be shown in a dropdown menu next to the input field */
    suggestions?: Suggestion[];
    /** Optional: If you specify a suggestion separator, the suggestion value will be appended rather than replacing the content. */
    suggestionSeparator?: string;
}

/** This parameter must never be empty */
export interface ParamConfigRequired extends ParamConfigVisible {
    type: 'required';
}

/** Either a hidden or a visible parameter */
export type ParamConfig = ParamConfigHidden | ParamConfigVisible;

/** A suggestion is either a string (value = label) or an object containing value and label separately */
export type Suggestion = string | {
    value: string;
    label: string;
};

/** Internal type, can be ignored */
export type StringMap = { [s: string]: string };
