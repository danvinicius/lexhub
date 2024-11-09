import { FC } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.scss';

interface RichTextEditorProps {
    label: string;
    value: string;
    handleProcedureContentChange: any;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({ label, value, handleProcedureContentChange }: RichTextEditorProps) => {
    const myColors = ['#000000', '#785412', '#452632', '#856325', '#963254', '#254563', 'transparent'];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: ['right', 'center', 'justify'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: myColors }],
            [{ background: myColors }],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'color',
        'background',
        'align',
    ];

    return (
        <div className='rich-text-editor'>
            <p>{label}</p>
            <ReactQuill theme='snow' modules={modules} formats={formats} value={value} onChange={handleProcedureContentChange} />
        </div>
    );
};
