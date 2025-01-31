import React, { useEffect, useRef, useState } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Editor } from '@toast-ui/react-editor';
import { toast } from "react-hot-toast";

function TextEditor({ text }) {
    const editorRef = useRef();
    const [editorHeight, setEditorHeight] = useState("auto");
    const [isCopied, setIsCopied] = useState(false);

    const adjustHeight = () => {
        if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            const editorContent = editorInstance.getMarkdown();

            if (editorContent) {
                const lineHeight = 25;
                const minHeight = 500;

                const calculatedHeight = Math.min(
                    Math.max(editorContent.split("\n").length * lineHeight, minHeight)
                );

                setEditorHeight(`${calculatedHeight}px`);
            }
        }
    };

    useEffect(() => {
        adjustHeight();
        window.addEventListener("resize", adjustHeight);
        return () => window.removeEventListener("resize", adjustHeight);
    }, []);

    useEffect(() => {
        if (text && text.length > 0) {
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setMarkdown(text);
        }
    }, [text]);

    // Copy function
    const handleCopy = async () => {
        if (!text) {
            toast.error("Please generate content before copying.");
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            toast.error("Failed to copy text.");
        }
    };

    return (
        <div className="px-4 py-2 mx-auto bg-whiteCard text-purpleText shadow">
            <div className="flex w-full justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Your Results</h1>
                <button
                    className="bg-mainPurple text-white px-4 py-1 rounded flex gap-2 items-center text-sm"
                    onClick={handleCopy}
                >
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
                    autofocus={false}
                    height={editorHeight}
                    onChange={() => setTimeout(adjustHeight, 300)}
                />
            </div>
        </div>
    );
}

export default TextEditor;
