
export function replaceWith(original: HTMLElement, replacement: HTMLElement) {
    const parent = original.parentNode;
    if (parent) {
        parent.replaceChild(replacement, original);
        const autofocus = replacement.querySelector('[autofocus]') as HTMLElement;
        autofocus && autofocus.focus();
    }
    return replacement;
}
