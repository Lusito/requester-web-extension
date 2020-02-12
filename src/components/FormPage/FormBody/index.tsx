import { h } from 'tsx-dom';
import { RequesterConfig, ParamConfigVisible, StringMap } from '../../../types';

import './style.scss';
import Input from '../Input';

interface FormProps {
    config: RequesterConfig;
    run: (config: RequesterConfig, data: StringMap) => void;
}

export default ({ config, run }: FormProps) => {
    const data: StringMap = {};

    const urlOption = typeof config.url === 'string' ? null : (
        <Input param={config.url} data={data} />
    );
    const paramsToRender = config.params.filter((o) => o.type !== 'hidden') as ParamConfigVisible[];
    const onSubmit = () => {
        if (config.params.every((p) => p.type !== 'required' || data[p.name]))
            run(config, data);
    };
    return (
        <div class="form-body">
            <table>
                {urlOption}
                {paramsToRender.map((param) => <Input param={param} data={data} />)}
            </table>
            <div>
                <button onClick={onSubmit}>Submit</button>
                <button onClick={() => { window.open('index.html'); window.close(); }}>Show as Tab</button>
            </div>
        </div>
    );
}
