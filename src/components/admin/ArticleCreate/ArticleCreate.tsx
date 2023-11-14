import { UploadFile } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import './ArticleCreate.scss';
import ReactQuill, { Quill } from 'react-quill';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../../../utils/axios';
// @ts-ignore
import ImageUploader from "quill-image-uploader";
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import { v4, validate } from "uuid";
import { useLocation } from 'react-router';
import article from '../../../api/article';
import { Article } from '../../../store/articles/types';
import {AiFillDelete} from 'react-icons/ai';
import * as _ from 'lodash';

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['14px', '16px', '18px', '20px', '24px', '30px'];
Quill.register(Size, true);

type ArticleCreateModel = {
  mainPicture: string;
  startText: string;
  mainText: string;
  title: string;
  uuid: string,
}

Quill.register('modules/imageUploader', ImageUploader)
Quill.register('modules/imageResize', ImageResize)

let prevUuid = v4();
const modules = {
  toolbar: {
    container: [
      [{ 'size': Size.whitelist }],
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
  },
  imageUploader: {
    upload: (file: File) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);
        axiosInstance.post(`/images/single?uuid=${prevUuid}`, formData);
        setTimeout(() => {
          resolve(`${process.env.REACT_APP_IMG_PATH}/${prevUuid}-${file.name}`);
        }, 3500);
      });
    },
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
 }
};

export const ArticleCreate = () => {

  const [startText, setStartText] = useState('');
  const [mainText, setMainText] = useState('');
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<Array<File>>([]);
  const [editModel, setEditModel] = useState<Article | null>(null);


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
  const location = useLocation();

  const initEditData = (model: Article) => {
    setStartText(model?.startText ?? '');
    setTitle(model?.title ?? '');
    setMainText(model?.mainText ?? '');
  }

  useEffect(() => {
    const arr = location.pathname.split('/');
    const articleUuid = arr[arr.length - 1];
    if(validate(articleUuid)) {
      article.getArticle(articleUuid).then(data => {
        setEditModel(data);
        initEditData(data);
      })
    }
  }, []);

  const saveFiles = (id: string) => {
    if (!files || !files?.length) return;
    const formData = new FormData();
    if (files.length === 1)  {
      formData.append('image', files[0]);
      axiosInstance.post(`/images/single?uuid=${prevUuid}`, formData)
    } else {
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
    if (!editModel) {
      const model: ArticleCreateModel = {
        mainPicture: files?.[0]?.name ?? '',
        mainText,
        startText,
        title,
        uuid: prevUuid,
      }
      const result = (await axiosInstance.post('/article', model)).data;
      saveFiles(result.id)
      clearForm();
    } else {
      const model: Article = {
        ...editModel,
        mainPicture: files?.[0]?.name ?? '',
        mainText,
        startText,
        title,
      }
      if (files?.[0]) saveFiles(editModel.id);
      const result = (await axiosInstance.put(`/article/${editModel.uuid}`, model)).data;

    }
  }
  const clearForm = () => {
    setFiles(new Array<File>());
    setTitle('');
    setMainText('');
    setStartText('');
  }
  const removeImage = (imgObject: string | File) => {
    if (typeof imgObject === 'string') {
      const copy = _.cloneDeep({
        ...editModel,
      });
      copy.mainPicture = '';
      setEditModel(copy as Article); // проблема с изображением, надо его как-то обнулять
    } else {
      setFiles(files.filter(x => x.name !== imgObject.name));
    }
  }
  const ImgBlock = (imgObject: string | File) => {
    return (<>
      { typeof imgObject === 'string'
      ?  <img  src={`${process.env.REACT_APP_IMG_PATH}/${editModel?.uuid}-${editModel?.mainPicture}`} />
      : <img src={URL.createObjectURL(imgObject)} alt="" />
      }
      <div className='img-actions'>
        <IconButton onClick={() => removeImage(imgObject)}>
          <AiFillDelete></AiFillDelete>
        </IconButton>
      </div>
    </>)
  }

  return (
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
          {!editModel?.mainPicture 
          ?  files.map((x, index) => <div 
            key={index}
            className='img-block'
          > {ImgBlock(x)}
          </div>)
          : <div className='img-block'>
            {ImgBlock(editModel.mainPicture)}
            </div>}
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
  );
};
