import type { Action } from "svelte/action";

interface InViewOptions {
    threshold?: number;
    rootMargin?: string;
}

export const inView: Action<
    HTMLElement,
    InViewOptions | undefined,
    { onenter: (e: CustomEvent) => void; onexit: (e: CustomEvent) => void }
> = (node, options = {}) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    node.dispatchEvent(new CustomEvent("enter"));
                } else {
                    node.dispatchEvent(new CustomEvent("exit"));
                }
            });
        },
        {
            threshold: options.threshold ?? 0.1,
            rootMargin: options.rootMargin ?? "0px",
        }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        },
    };
};
