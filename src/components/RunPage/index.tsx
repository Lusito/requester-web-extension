import { h } from 'tsx-dom';
import { performRequest } from '../../performRequest';
import { RequesterConfig, StringMap } from '../../types';
import { replaceWith } from '../../utils';
import ResultPage from '../ResultPage';

interface RunPageProps {
    config: RequesterConfig;
    data: StringMap;
    goBack: () => void;
}

export default ({ config, data, goBack }: RunPageProps) => {
    let content = <div><h4>Loading...</h4><button onClick={goBack}>Cancel</button></div>;
    const run = async () => {
        try {
            const result = await performRequest(config, data);
            content = replaceWith(content, <ResultPage result={result} goBack={goBack} />);
        } catch (e) {
            console.error(e);
            content = replaceWith(content, <ResultPage result={e.toString()} error goBack={goBack} />);
        }
    };
    run();
    return <div>{content}</div>;
};
