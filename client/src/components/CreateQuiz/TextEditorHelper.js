import React from 'react';

// Modules object for setting up the Quill editor
// export const modules = {
//     toolbar: {
//         container: '#ques-toolbar',
//     },
//     history: {
//         delay: 500,
//         maxStack: 100,
//         userOnly: true,
//     },
// };

// Formats objects for setting up the Quill editor
export const formats = ['bold', 'italic', 'underline', 'link', 'color'];

// Quill Toolbar component
function TextEditorHelper({ moduleId }) {
    return (
        <div id={`ques-toolbar${moduleId}`}>
            <span className="ql-formats">
                <button type="button" className="ql-bold" />
                <button type="button" className="ql-italic" />
                <button type="button" className="ql-underline" />
            </span>
            <span className="ql-formats">
                <select className="ql-color" />
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-link" />
            </span>
        </div>
    );
}

export default TextEditorHelper;
