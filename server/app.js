var express = require("express"),
	path = require("path"),
	fs = require("fs"),
	promisify = require("util").promisify,
	fork = require("child_process").fork,
	cookieParser = require("cookie-parser"),
	renderer = path.resolve(__dirname, `./ssr-build/index.js`);

var dom = "";
var readFile = promisify(fs.readFile);
var PORT = process.env.PORT || 80;
var app = express();
var router = express.Router();

var serverRenderer = function (req, res, next) {
	console.log(`Fetching rendered HTML`);
	var cmd = fork(`${renderer}`, {}, (error, stdout, stderr) => {
		if (error || stderr) console.log(error || stderr);
	});
	cmd.send({
		path: req.url,
		cookie: req.cookies,
	});
	cmd.on("message", (data) => {
		console.log(`Server side rendering successful for path ${req.url}`);
		var reduxState = {};
		return res.send(
			dom.replace(
				'<div id="root"></div>',
				`
				<div id="root">${data.renderedHTML}</div>
				<script>
					window.initialState = ${JSON.stringify(data.initialState)}
				</script>
				`
			)
		);
	});
};
readFile(path.resolve("../build/index.html"), "utf8").then(function (data) {
	dom = data;
	app.use(cookieParser());
	app.use("/assets", express.static(path.resolve("../build/assets")));
	app.use("/static", express.static(path.resolve("../build/static")));

	app.route("/*").get(serverRenderer);
	app.listen(PORT, () => {
		console.log(`SSR running on port ${PORT}`);
	});
});
