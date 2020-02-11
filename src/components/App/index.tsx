import { h } from 'tsx-dom';
import { browser } from 'webextension-polyfill-ts';

import FormPage from '../FormPage';
import { replaceWith } from '../../utils';
import RunPage from '../RunPage';
import { StringMap, RequesterConfig } from '../../types';
import AddEditPage from '../AddEditPage';
import ConfirmPage from '../ConfirmPage';

export default () => {
    let configs: RequesterConfig[] = [];
    let selectedConfig: string | undefined;
    let page = <div>Loading...</div>;
    const refreshConfigs = () => {
        browser.storage.local.get(['configs', 'selectedConfig']).then((data) => {
            configs = data.configs || [];
            selectedConfig = data.selectedConfig || undefined;
        }).finally(() => goBack());
    }
    browser.storage.onChanged.addListener((changes) => {
        if (changes['configs'])
            refreshConfigs();
    });
    refreshConfigs();
    const showEditPage = (config: RequesterConfig) => {

        const onConfigConfirmDelete = () => {
            const deleteConfig = () => {
                const index = configs.findIndex((o) => o.label === config.label);
                if (index >= 0) {
                    configs.splice(index, 1);
                    browser.storage.local.set({ configs });
                }
            };
            page = replaceWith(page, <ConfirmPage onConfirm={deleteConfig} goBack={goBack} title="Delete Config?" content={`Do you really want to delete the config '${config.label}'?`} button="Delete" />);
        };
        page = replaceWith(page, <AddEditPage goBack={goBack} configs={configs} configToUpdate={config} onConfigConfirmDelete={onConfigConfirmDelete} />);
    };
    const createFormPage = () => <FormPage run={run} onCreateConfig={showAddPage} configs={configs} selectedConfig={selectedConfig} onConfigEdit={showEditPage}/>;
    const goBack = () => { page = replaceWith(page, createFormPage()); };
    const showAddPage = () => { page = replaceWith(page, <AddEditPage goBack={goBack} configs={configs} />); };
    const run = (config: RequesterConfig, data: StringMap) => { page = replaceWith(page, <RunPage config={config} data={data} goBack={goBack} />); };
    return page;
};
