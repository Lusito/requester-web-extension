import { ParamConfig, RequesterConfig } from './types';

const isObject = (o: any) => (o && typeof o === 'object' && !Array.isArray(o)) || false;

function expectKeys(json: { [s: string]: any }, requiredKeys: string[], optionalKeys: string[]) {
    for (const key of Object.keys(json)) {
        const index = requiredKeys.indexOf(key);
        if (index >= 0) {
            requiredKeys.splice(index, 1);
        } else if (!optionalKeys.includes(key)) {
            throw new Error(`Encountered unexpected key '${key}'`);
        }
    }
    if (requiredKeys.length) {
        throw new Error(`Missing required keys: '${requiredKeys.join('\', \'')}'`);
    }
}

function expectRequired(object: any, attribute: string) {
    if (!object[attribute])
        throw new Error(`Expected '${attribute}' to be set`);
}

function expectString(object: any, attribute: string, required?: boolean) {
    required && expectRequired(object, attribute);
    if (attribute in object && typeof object[attribute] !== 'string')
        throw new Error(`Expected '${attribute}' to be a string`);
}

function expectOneOf(object: any, attribute: string, possibleValues: string[]) {
    if (!possibleValues.includes(object[attribute]))
        throw new Error(`Expected '${attribute}' to be one of '${possibleValues.join('\', \'')}'`);
}

function expectArray(object: any, attribute: string, required?: boolean) {
    required && expectRequired(object, attribute);
    if (attribute in object && !Array.isArray(object[attribute]))
        throw new Error(`Expected '${attribute}' to be an array`);
}

function expectObject(object: any, attribute: string) {
    if (!isObject(object[attribute]))
        throw new Error(`Expected '${attribute}' to be an object, not ${JSON.stringify(object[attribute])}`);
}

function validateSuggestion(suggestion: any) {
    expectString(suggestion, 'value', true);
    expectString(suggestion, 'label', true);
}

function validateParam(param: any, expectedType?: ParamConfig['type']) {
    if (expectedType && param.type !== expectedType)
        throw new Error(`Expected type to be '${expectedType}' and not ${JSON.stringify(param.type)}`);

    expectKeys(param, ['type', 'name'], ['value', 'label', 'suggestions', 'suggestionSeparator']);
    expectOneOf(param, 'type', ['required', 'omit-empty', 'allow-empty', 'hidden']);
    expectString(param, 'name', true);
    expectString(param, 'value', param.type === 'hidden');
    expectString(param, 'label', param.type !== 'hidden');
    expectArray(param, 'suggestions');
    expectString(param, 'suggestionSeparator');
    if (param.suggestions) {
        for (const suggestion of param.suggestions) {
            if (typeof suggestion === 'string')
                expectString({ suggestion }, 'suggestion', true);
            else {
                expectObject({ suggestion }, 'suggestion');
                validateSuggestion(suggestion);
            }
        }
    }
}

export function validateConfig(text: string, existingLabels: string[]) {
    const json = JSON.parse(text);
    if (!isObject(json))
        throw new Error('Expected a config object');
    expectKeys(json, ['label', 'type', 'url', 'params'], ['resultAttribute']);
    expectString(json, 'label', true);
    if (existingLabels.includes(json.label))
        throw new Error('Label is already taken!');
    expectOneOf(json, 'type', ['form-data', 'form-url-encoded']);
    if (typeof json.url === 'string')
        expectString(json, 'url', true);
    else {
        expectObject(json, 'url');
        validateParam(json.url, 'required');
    }
    expectArray(json, 'params');
    for (const param of json.params) {
        expectObject({ param }, 'param');
        validateParam(param);
    }
    expectString(json, 'resultAttribute');
    return json as RequesterConfig;
}
