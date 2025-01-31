import React, { useEffect, useRef, useState } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Editor } from '@toast-ui/react-editor';
import { toast } from "react-hot-toast";

function TextEditor({ text }) {
    const editorRef = useRef();

    const [editorHeight, setEditorHeight] = useState(`${window.innerHeight * 0.6}px`);

    const adjustHeight = () => {
        const newHeight = `${window.innerHeight * 0.6}px`;
        setEditorHeight(newHeight);
    };

    useEffect(() => {
        adjustHeight();
        window.addEventListener("resize", adjustHeight);

        return () => {
            window.removeEventListener("resize", adjustHeight);
        };
    }, []);

    // Copy function
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = async () => {
        if (!text) {
            toast.error("Please generate content before copying.")
            return;
        }

        try {
            await navigator.clipboard.writeText(result);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            toast.error("Failed to copy text: ", error)
        }
    };

    if (text && text.length > 0) {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(text);
    }

    return (
        <div className="px-4 py-2 mx-auto bg-whiteCard text-purpleText shadow h-full">
            <div className="flex w-full justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Your Results</h1>
                <button className="bg-mainPurple text-white px-4 py-1 rounded flex gap-2 items-center text-sm" onClick={handleCopy}>
                    {isCopied ? <FaCheck /> : <MdContentCopy />}
                    {isCopied ? "Copied" : "Copy"}
                </button>
            </div>
            <div className="bg-white">
                <Editor
                    ref={editorRef}
                    initialValue="Maverick's AI Generated content will appear here."
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    height={editorHeight}
                    autofocus={false}
                    onChange={() => (editorRef.current.getInstance().getMarkdown())}
                />
            </div>
        </div>
    );
}

export default TextEditor;
