import { UploadFile } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import './BlogCreate.scss';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../../../utils/axios';

type ArticleCreateModel = {
  mainPicture: string;
  startText: string;
  mainText: string;
  title: string;
}


export const BlogCreate = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
      ['code']
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
    'indent',
    'link',
    'image',
    'code',
  ];

  const [startText, setStartText] = useState('');
  const [mainText, setMainText] = useState('');
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<Array<File>>([]);

  const saveFiles = (id: string) => {
    if (!files || !files?.length) return;
    const formData = new FormData();
    formData.append('id', id);
    if (files.length === 1)  {
      formData.append('image', files[0]);
      axiosInstance.post('/images/single', formData)
    }
    else {
      for (let i = 0; i < files.length; i++) {
        formData.append(`images`, files[i]);
      }
      axiosInstance.post('/images/multiple', formData)
    }
  }

  const setFile = (newFiles: FileList | null) => {
    if (!newFiles || !newFiles?.length) return;
    const names = Array.from(files).map(x => x.name);
    const filteredNewFiles = Array.from(newFiles).filter(x => !names.includes(x.name));
    setFiles([...files, ...filteredNewFiles]);
  }

  const saveArticle = async () => {
    const model: ArticleCreateModel = {
      mainPicture: files?.[0]?.name ?? '',
      mainText,
      startText,
      title,
    }
    const result = (await axiosInstance.post('/article', model)).data;
    saveFiles(result.id)
    clearForm();
  }
  const clearForm = () => {
    setFiles(new Array<File>());
    setTitle('');
    setMainText('');
    setStartText('');
  }

  return (
    <>
      <div className="create">
        <h2>Create</h2>
        <TextField
          className="create__name"
          label="Article name"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value)
          }}
        ></TextField>
        <div className="create__main-img">
          <h2>Load main img</h2>
          {files.map((x, index) => <div 
            key={index}
            className='img-block'
          >
            <img 
              src={URL.createObjectURL(x)}
            />
            <div>
              {x.name}
            </div>
            <div></div>
          </div>)}
          <Button
            component="label"
            variant="contained"
            startIcon={<UploadFile />}
          >
            Upload file
            <input
              className="create__hidden-input"
              type="file"
              multiple
              id="files"
              onChange={(e) => setFile(e.target?.files)}
            />
          </Button>
        </div>
        <div>
          <h2>Start Text</h2>
          <ReactQuill
            theme="snow"
            value={startText}
            onChange={setStartText}
            modules={modules}
            formats={formats}
          ></ReactQuill>
        </div>
        <div>
          <h2>Main Text</h2>
          <ReactQuill
            theme="snow"
            value={mainText}
            onChange={setMainText}
            modules={modules}
            formats={formats}
          ></ReactQuill>
        </div>
        <div className="create__actions">
          <Button
            variant="contained"
            color="success"
            onClick={() => saveArticle()}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};
