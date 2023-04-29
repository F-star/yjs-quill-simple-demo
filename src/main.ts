import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import 'quill/dist/quill.snow.css';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

import * as Y from 'yjs';

Quill.register('modules/cursors', QuillCursors);

const quill = new Quill(document.querySelector('#editor')!, {
  modules: {
    cursors: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
    history: {
      userOnly: true,
    },
  },
  placeholder: '前端西瓜哥...',
  theme: 'snow',
});

const ydoc = new Y.Doc(); // yjs 文档，保存共享数据
const ytext = ydoc.getText('quill');

const roomName = 'quill-demo-room';

const persistence = new IndexeddbPersistence(roomName, ydoc);

persistence.on('synced', () => {
  console.log('同步内容到本地');
});

const provider = new WebsocketProvider('wss://demos.yjs.dev', roomName, ydoc);

const awareness = provider.awareness;
// 绑定
const binding = new QuillBinding(ytext, quill, awareness);

// 感知对象的变化（这里指的是光标）
awareness.on('change', () => {
  console.log(Array.from(awareness.getStates().values()));
});

// 给要进行传播的 awareness 对象加上一个 user 字段
// 这个字段会通过 QuillBinding 加到虚拟光标的末尾。
awareness.setLocalStateField('user', {
  name: '西瓜',
  color: '#f04',
});
