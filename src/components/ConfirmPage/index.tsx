import { h } from 'tsx-dom';

import './style.scss';

interface ConfirmPageProps {
    title: string;
    content: string;
    button: string;
    goBack: () => void;
    onConfirm: () => void;
}

export default ({ goBack, onConfirm, title, content, button }: ConfirmPageProps) => {
    return (
        <div class="confirm-page">
            <h4>{title}</h4>
            <p>{content}</p>
            <div>
                <button onClick={goBack}>Back</button>
                <button onClick={onConfirm}>{button}</button>
            </div>
        </div>
    );
};
