const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
	app.use(
		'/profile',
		createProxyMiddleware({
			target: 'http://stage.km-client.unicorn.km-union.ru/api/v1/profile/',
			pathRewrite: { '^/profile': '' },
			changeOrigin: true,
			secure: false,
		}),
	);
	app.use(
		'/auth',
		createProxyMiddleware({
			target: 'http://stage.km-client.unicorn.km-union.ru/api/v1/auth/',
			pathRewrite: { '^/auth': '' },
			changeOrigin: true,
			secure: false,
		})
	);
};
