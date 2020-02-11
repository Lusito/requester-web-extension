import { h } from 'tsx-dom';

import FormHeader from './FormHeader';
import { RequesterConfig, StringMap } from '../../types';
import { replaceWith } from '../../utils';
import FormBody from './FormBody';
import { browser } from 'webextension-polyfill-ts';

interface FormPageProps {
    configs: RequesterConfig[];
    selectedConfig?: string;
    run: (config: RequesterConfig, data: StringMap) => void;
    onCreateConfig: () => void;
    onConfigEdit: (config: RequesterConfig) => void;
}

export default ({ run, onCreateConfig, configs, selectedConfig, onConfigEdit }: FormPageProps) => {
    let content = <div />;
    const createContent = (config: RequesterConfig) => <FormBody config={config} run={run} />;
    function onConfigSelect(config?: RequesterConfig) {
        content = replaceWith(content, config ? createContent(config) : <div />);
        browser.storage.local.set({
            selectedConfig: config?.label,
        });
    }
    return (
        <div class="form">
            <FormHeader configs={configs} selectedConfig={selectedConfig} onConfigSelect={onConfigSelect} onCreateConfig={onCreateConfig} onConfigEdit={onConfigEdit} />
            {content}
        </div>
    );
};
