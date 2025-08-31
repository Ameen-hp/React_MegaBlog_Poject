import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full mb-4 animate-fade-in'> 
            {label && <label className='inline-block mb-1 pl-1 font-medium text-gray-700'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='5lyyxgfiii1ofxz8ubl16j879gf794089500z4oworo5gyp9'
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: false, // Cleaner UI by removing the menubar
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: `
                                body { 
                                  font-family: 'Inter', sans-serif;
                                  font-size: 16px;
                                  color: #FFFFFF;
                                }
                                .tinymce-content {
                                  padding: 1rem;
                                }
                            `,
                            // Add attractive themes and styling to the editor itself
                            skin: "oxide-dark",
                            content_css: "dark",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}