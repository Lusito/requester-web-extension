import { RequesterConfig } from "./types";

export const sampleConfig: RequesterConfig = {
    label: 'My Config',
    type: 'form-data',
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: [
        {
            type: 'hidden',
            name: 'userId',
            value: '1'
        },
        {
            type: 'required',
            name: 'title',
            label: 'Title',
            value: 'Some title content',
            suggestions: [
                'more',
                {
                    value: 'even more',
                    label: 'Moar'
                }
            ],
            suggestionSeparator: ', '
        },
        {
            type: 'required',
            name: 'body',
            label: 'Body',
            value: 'A little more body content',
            suggestions: [
                {
                    value: 'A little different body content',
                    label: 'Something different'
                }
            ]
        },
    ],
    resultAttribute: 'id'
};
