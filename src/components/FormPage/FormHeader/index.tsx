import { h } from 'tsx-dom';

import { RequesterConfig } from '../../../types';
import './style.scss';

interface HeaderProps {
    configs: RequesterConfig[];
    selectedConfig?: string;
    onConfigSelect: (config?: RequesterConfig) => void;
    onCreateConfig: () => void;
    onConfigEdit: (config: RequesterConfig) => void;
}

export default ({ configs, selectedConfig, onConfigSelect, onCreateConfig, onConfigEdit }: HeaderProps) => {
    const elements: HTMLElement[] = [];
    if (configs.length) {
        const select = (
            <select onChange={() => onConfigSelect(configs[select.selectedIndex])}>
                {configs.map((config) => <option selected={config.label === selectedConfig}>{config.label}</option>)}
            </select>
        ) as HTMLSelectElement;
        onConfigSelect(configs[select.selectedIndex]);

        elements.push(select);
        elements.push(<button onClick={() => onConfigEdit(configs[select.selectedIndex])} title="Edit or delete config">edit</button>);
    } else {
        onConfigSelect();
        elements.push(<span>Add a config first</span>);
    }
    elements.push();
    return (
        <div class="form-header">
            {elements}
            <button onClick={onCreateConfig} title="Add new config">+</button>
        </div>
    );
};
