import React, { Component } from 'react';
import { Link } from 'react-router';
import './base.scss';
import { ipcRenderer } from 'electron';
import { setTimeout } from 'timers';

class App extends Component {

  constructor(){
    super();
    this.mapMenu = this.mapMenu.bind(this);
    //监听主进程消息
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(event);
    });
    
    let myNotification = new Notification('进程启动', {
      hasReply: true,
      body: '启动正常'
    })
    
    myNotification.onclick = () => {
      console.log('通知被点击');
      console.log(this.root_frame);
    }
  }

  state = {
    menu: [
      {
        code: 'folder1',
        desc: '一个文件夹',
        type: 'folder',
        child: [
          {
            code: 'first',
            desc: '第一个页面',
            type: 'node',
            child: null,
          },
          {
            code: 'second',
            desc: '第二个页面',
            type: 'node',
            child: null,
          },
          {
            code: 'folder2',
            desc: '是一个文件夹',
            type: 'folder',
            child: [
              {
                code: 'third',
                desc: '第三个页面',
                type: 'node',
                child: null,
              },
              {
                code: 'fourth',
                desc: '第四个页面',
                type: 'node',
                child: null,
              },
            ],
          }
        ],
      },
      {
        code: 'folder3',
        desc: '还是一个文件夹',
        type: 'folder',
        child: [
          {
            code: 'fifth',
            desc: '第五个页面',
            type: 'node',
            child: null,
          },
        ]
      }
    ]
  }

  mapMenu(params) {
    let menu = [], path = location.hash.slice(2, location.hash.length);
    if(Array.isArray(params)) {
      params.map((menuItem) => {
        if(menuItem.type === 'folder') {
          menu.push(<div key={menuItem.code} className={`folder__menu`}>{menuItem.desc}
            <ul className={`root_frame__main--slid__list`}>
            {
              menuItem.child.map((child) => {
                if(child.type === 'node') {
                  return (
                    <li key={child.code}><Link to={`/${child.code}`}>{child.desc}</Link></li>
                  );
                }else if(child.type === 'folder'){
                  return this.mapMenu([child]);
                }
              })
            }
          </ul>
          </div>);
        }
      });
    }
    console.log('根据menu构建菜单',menu,2,3,4,5);
    return menu;
  }

  render() {
    let { menu } = this.state;
    console.log('开始渲染');
    return (
      <div className="root_frame" ref={target => this.root_frame = target}>
        <nav><span className="close__single" onClick={() => {ipcRenderer.send('asynchronous-message', 'ping')}}>X</span></nav>
        <div className="root_frame__main">
          <div className="root_frame__main--slid">
            <ul className="root_frame__main--slid__list">{this.mapMenu(menu)}</ul>
          </div>
          <div className="root_frame__main--content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;