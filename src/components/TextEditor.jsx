import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/Context";
import '@toast-ui/editor/dist/toastui-editor.css';
import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Editor } from '@toast-ui/react-editor';
import { toast } from "react-toastify";

function TextEditor() {
    const editorRef = useRef();
    const { result } = useContext(Context);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {

        if (!result) {
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

    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(result);
    }, [result])

    return (
        <div className="px-4 py-2 mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded shadow h-full">
            <div className="flex w-full justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Your Results</h1>
                <button className="bg-primary text-white px-4 py-1 rounded flex gap-2 items-center text-sm" onClick={handleCopy}>
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
                    height='400px'
                    onChange={() => (editorRef.current.getInstance().getMarkdown())}
                />
            </div>
        </div>
    );
}

export default TextEditor;
