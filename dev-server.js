const path = require('path');
const http = require('http');
const fs = require('fs');
const config = require('./webpack.config.js');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const port = 8009;
const options = {
	contentBase: './dist',
	hot: true,
	host: 'localhost',
	quiet: true,
	stats: {
		colors: true
	}
};

//日志
// const log4js = require('log4js');
// log4js.configure({
//   appenders: {
//     type: 'logLevelFilter',
//     level: 'DEBUG',
//     category: 'category'
//   }
// });
// const logger = log4js.getLogger('category');

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, 'localhost', function(data){
  //logger.debug('返回数据');
});

server.use('/log', function(req, res, next){
	console.log(req.url);
	fs.readFile('./test.log', function(err, data){
		if(err){
			res.writeHead(404, {"Content-Type": "text/javascript"});
		}else{
			res.writeHead(200, {"Content-Type": "text/javascript"});
			res.write(JSON.stringify(data));
		}
		res.end();
	})
});
server.listen(port);

//logger.info('服务启动在8009端口');