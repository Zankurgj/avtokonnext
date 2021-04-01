const browserSyncConfig =  {
  server: './build',
  host: 'localhost',
  port: 3000,middleware: function (req, res, next) {
    if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
      console.log('[POST => GET] : ' + req.url);
      req.method = 'GET';
    }
    next();
  }
};

export default browserSyncConfig;
