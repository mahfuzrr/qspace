import React from 'react';
import { Quill } from 'react-quill';

// mathquill4quill include

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
        container: '#post-toolbar',
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
    'strike',
    'script',
    'background',
    'list',
    'bullet',
    'link',
    'formula',
    'color',
    'code-block',
];

// Quill Toolbar component
export function PostEditorToolBar() {
    return (
        <div id="post-toolbar">
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
            </span>
            <span className="ql-formats">
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
        </div>
    );
}

export default PostEditorToolBar;
