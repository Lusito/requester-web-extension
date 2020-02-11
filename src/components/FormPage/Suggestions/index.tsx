import { h } from 'tsx-dom';
import { Suggestion } from '../../../types';

import './style.scss';

interface SuggestionsProps {
    label: string;
    suggestions: Suggestion[];
    onSelect: (value: string) => void;
}

const valueOf = (suggestion: Suggestion) => typeof suggestion === 'string' ? suggestion : suggestion.value;
const labelOf = (suggestion: Suggestion) => typeof suggestion === 'string' ? suggestion : suggestion.label;

export default ({ label, suggestions, onSelect }: SuggestionsProps) => {
    const onChange = () => {
        if (select.selectedIndex > 0) {
            onSelect(select.value);
            select.selectedIndex = 0;
        }
    };
    const select = (
        <select class="suggestions" onChange={onChange}>
            <option value="">{label}</option>
            {suggestions.map((suggestion) => <option value={valueOf(suggestion)}>{labelOf(suggestion)}</option>)}
        </select>
    ) as HTMLSelectElement;
    return select;
};
