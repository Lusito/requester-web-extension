import { h } from 'tsx-dom';

import './style.scss';

interface ResultPageProps {
    result: string;
    error?: boolean;
    goBack: () => void;
}

export default ({ result, error, goBack }: ResultPageProps) => {
    const textarea = <textarea readOnly autofocus>{result}</textarea> as HTMLTextAreaElement;
    return (
        <div class={error ? 'result-error' : 'result-success'}>
            <h4>{error ? 'An error occured!' : 'Success!'}</h4>
            {textarea}
            <div>
                <button onClick={goBack}>Back</button>
            </div>
        </div>
    );
};
