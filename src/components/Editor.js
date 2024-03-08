import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import MainText from './MainText';


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


export default function Editor({ value, onChangeValue, errorMessage }) {



    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link',],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };


    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];





    return (

        <div className='flex flex-col' style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <QuillEditor
                value={value}
                onChange={onChangeValue}
                modules={quillModules}
                formats={quillFormats}
                className="w-full bg-white"
            />
            {errorMessage && (
                <MainText style={{ width: "200px" }} fontSize={12} color="red">
                    {errorMessage}
                </MainText>
            )}
        </div>
    );
}