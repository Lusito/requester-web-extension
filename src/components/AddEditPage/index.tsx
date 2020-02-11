import { h } from 'tsx-dom';

import './style.scss';
import { RequesterConfig } from '../../types';
import { validateConfig } from '../../validation';
import { browser } from 'webextension-polyfill-ts';
import { sampleConfig } from '../../sampleConfig';


interface AddEditPageProps {
    goBack: () => void;
    configs: RequesterConfig[];
    configToUpdate?: RequesterConfig;
    onConfigConfirmDelete?: () => void;
}

export default ({ goBack, configs, configToUpdate, onConfigConfirmDelete }: AddEditPageProps) => {
    let existingLabels = configs.map((c) => c.label);
    if (configToUpdate)
        existingLabels = existingLabels.filter((label) => label !== configToUpdate.label);
    const validationMessage = <div />;
    const validateInput = () => {
        try {
            const config = validateConfig(textarea.value, existingLabels);
            validationMessage.textContent = '';
            return config;
        } catch (e) {
            validationMessage.textContent = e.toString();
            return null;
        }
    };
    const textarea = <textarea onChange={validateInput}>{JSON.stringify(configToUpdate || sampleConfig, null, 2)}</textarea> as HTMLTextAreaElement;
    const onCreateConfig = () => {
        const config = validateInput();
        if (config) {
            const newConfigs = configToUpdate ? configs.map((c) => c.label === configToUpdate.label ? config : c) : [...configs, config];
            browser.storage.local.set({
                configs: newConfigs,
                selectedConfig: config.label,
            });
        }
    };
    const title = configToUpdate ? `Update config '${configToUpdate.label}'` : 'Add a new config';
    const buttonText = configToUpdate ? 'Update' : 'Create';
    return (
        <div class="add-edit-page">
            <h4>{title}</h4>
            {textarea}
            {validationMessage}
            <div>
                <button onClick={goBack}>Back</button>
                <button onClick={() => { window.open('https://github.com/lusito/requester-web-extension'); window.close(); }}>Help</button>
                {onConfigConfirmDelete ? <button onClick={onConfigConfirmDelete}>Delete</button> : null}
                <button onClick={onCreateConfig}>{buttonText}</button>
            </div>
        </div>
    );
};
