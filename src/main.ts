import Quill from "quill";
import QuillCursors from 'quill-cursors'
import 'quill/dist/quill.snow.css'
import { QuillBinding } from "y-quill";

import * as Y from 'yjs';

Quill.register('modules/cursor', QuillCursors);

const quill = new Quill(document.querySelector('#editor')!, {
  modules: {
    cursors: true,
    toolbar: [
      [{ header: [1, 2, false] }], 
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ],
    history: {
      userOnly: true
    }
  },
  placeholder: '前端西瓜哥...',
  theme: 'snow',
})


const ydoc = new Y.Doc() // yjs 文档，保存共享数据

const ytext = ydoc.getText('quill') // 定一个鹅哥共享文本类型？

const binding = new QuillBinding(ytext, quill);



