import { Dispatch, FC } from 'react';
import ReactQuill from 'react-quill';

import { useHelpers } from '../../../hooks/useHelpers';

import Error from '../../helper/Error';
import './RichTextEditor.scss';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
    label: string;
    value: string;
    setValue: any;
    error?: string | null;
    setError: Dispatch<string>;
    onBlur: () => void;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({ label, value, setValue, error, setError, onBlur }: RichTextEditorProps) => {
    const { getRawText } = useHelpers();
    const myColors = ['#3d3d3d', '#785412', '#452632', '#856325', '#963254', '#254563', 'transparent'];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: null }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: myColors }],
            [{ background: myColors }],
        ],
    };

    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'color', 'background', 'align'];

    return (
        <div className={`rich-text-editor flex column gap-25 ${error ? 'error' : ''}`}>
            <p className='flex w-100 space-between'>
                {label}
                <span className={getRawText(value).length > 5000 ? 'error' : ''}>{getRawText(value).length}/5000</span>
            </p>
            <ReactQuill
                theme='snow'
                modules={modules}
                formats={formats}
                value={value}
                onChange={setValue}
                onBlur={onBlur}
                onKeyDown={() => setError('')}
            />
            <Error error={error} />
        </div>
    );
};
