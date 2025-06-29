import { useMutationObserver } from '../../hooks/useMutationServer';
import styles from './controlledTextArea.module.scss';
import { useState, useEffect, useRef } from 'react';

export default function ControlledTextArea() {
    const [text, setText] = useState('resizeMe');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    // Calculate dimensions on initial render, without this code snippet the textarea will not have dimensions on load, only after onChange event
    // This is because the textarea is empty initially, and its dimensions are not set until it has content.
    // The useEffect hook will run after the component mounts, ensuring that the textarea has been rendered and its dimensions can be measured.
    // This is useful for setting initial dimensions or for cases where the textarea might be styled to have a specific size.
    // This is especially important if the textarea is styled with CSS to have a specific width or height, as it will not have dimensions until it is rendered.
    useEffect(() => {
        const node = textAreaRef.current;
        if (node) {
            setWidth(node.offsetWidth);
            setHeight(node.offsetHeight);
        }
    }, []);

    useMutationObserver({
        targetNode: textAreaRef.current,
        config: { attributes: true, childList: true, subtree: true },
        callback: (mutationsList) => { // This callback will be called whenever a mutation occurs on the target node
            // mutationsList is an array of MutationRecord objects, each representing a change that occurred
            // You can iterate over the mutationsList to handle each mutation as needed
            // For example, you can check if the mutation is an attribute change or a child list change
            // and update the dimensions accordingly.
            // This is useful for dynamically updating the dimensions of the textarea when its content or attributes change.
            // For example, if the textarea's content changes and its size increases, this will ensure that the width and height state variables are updated accordingly.
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' || mutation.type === 'childList') {
                    const node = textAreaRef.current;
                    if (node) {
                        setWidth(node.offsetWidth);
                        setHeight(node.offsetHeight);
                    }
                }
            }
    }})
 

    return (
        <div className={styles.container}>
            <textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textarea}
            />
            <div className={styles.info}>
                <p>Width: {width}px</p>
                <p>Height: {height}px</p>
            </div>
        </div>
    );
}

// Note: The MutationObserver is used to listen for changes in the textarea's dimensions.
// This is useful if the textarea's size can change dynamically based on its content or styles.



/*
import styles from './controlledTextArea.module.scss';
import { useState, useEffect, useRef } from 'react';

export default function ControlledTextArea() {
    const [text, setText] = useState('');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const node = textAreaRef.current;
        if (node) {
            const updateDimensions = () => {
                setWidth(node.offsetWidth);
                setHeight(node.offsetHeight);
            };

            updateDimensions();

            const observer = new MutationObserver(updateDimensions);
            observer.observe(node, { attributes: true, childList: true, subtree: true });

            return () => observer.disconnect();
        }
    }, []);

    return (
        <div className={styles.container}>
            <textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textarea}
            />
            <div className={styles.info}>
                <p>Width: {width}px</p>
                <p>Height: {height}px</p>
            </div>
        </div>
    );
}

// Note: The MutationObserver is used to listen for changes in the textarea's dimensions.
// This is useful if the textarea's size can change dynamically based on its content or styles.
*/