import {  useLayoutEffect, useRef } from "react";

type UseMutationObserverOptions = {
    targetNode: HTMLElement | null;
    config: MutationObserverInit;
    callback: MutationCallback;
};

export const useMutationObserver = ({
    targetNode,
    config,
    callback,
}: UseMutationObserverOptions): void => {
    const observerRef = useRef<MutationObserver | null>(null);

    useLayoutEffect(() => {
        if (!targetNode || !callback) return;
        // Create a new MutationObserver instance
        const observer = new MutationObserver(callback);
        observerRef.current = observer;

        // Start observing the target node
        observer.observe(targetNode, config);

        // Cleanup function to disconnect the observer
        return () => {
            observer.disconnect();
            observerRef.current = null;
        };
    }, [targetNode, config, callback]); // Dependencies to re-observe when they change
};