import React from 'react';
import { Quill } from 'react-quill';

// mathquill4quill include

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
function CustomUndo() {
    return (
        <svg viewBox="0 0 18 18">
            <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
            <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
        </svg>
    );
}

// Redo button icon component for Quill editor
function CustomRedo() {
    return (
        <svg viewBox="0 0 18 18">
            <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
            <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
        </svg>
    );
}

// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('attributors/class/font');
Font.whitelist = ['roboto', 'open-sans', 'poppins', 'ubuntu', 'inter', 'hind-siliguri'];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: '#toolbar',
        handlers: {
            undo: undoChange,
            redo: redoChange,
        },
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
    formula: true,
};

// Formats objects for setting up the Quill editor
export const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'link',
    'formula',
    'color',
    'code-block',
];

// Quill Toolbar component
export function QuillToolbar() {
    return (
        <div id="toolbar">
            <span className="ql-formats">
                <select className="ql-font" defaultValue="arial">
                    <option value="roboto">Roboto</option>
                    <option value="open-sans">Open Sans</option>
                    <option value="ubuntu">Ubuntu</option>
                    <option value="inter">Inter</option>
                    <option value="poppins">Poppins</option>
                    <option value="hind-siliguri">Bengali</option>
                </select>
                <select className="ql-size" defaultValue="medium">
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                </select>
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-bold" />
                <button type="button" className="ql-italic" />
                <button type="button" className="ql-underline" />
                <button type="button" className="ql-strike" />
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-list" value="ordered" />
                <button type="button" className="ql-list" value="bullet" />
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-script" value="super" />
                <button type="button" className="ql-script" value="sub" />
                <button type="button" className="ql-blockquote" />
            </span>
            <span className="ql-formats">
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-link" />
                <button type="button" className="ql-formula" />
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-code-block" />
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-undo">
                    <CustomUndo />
                </button>
                <button type="button" className="ql-redo">
                    <CustomRedo />
                </button>
            </span>
        </div>
    );
}

export default QuillToolbar;
