import React, { Component } from 'react';
import './index.scss';

class Dashboard extends Component {

  render() {
    console.log(location.host)
    return (
      <div>
        <h1>查看版本</h1>
        <div>
          <a href={`/log`} download="cheese.log">下载日志</a>
        </div>
      </div>
    );
  }
} 

export default Dashboard;