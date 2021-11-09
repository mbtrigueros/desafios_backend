const localUrl = 'mongodb://localhost:27017/mongoDBlocal';
const atlasUrl = 'link-a-atlas';
const config = {
	localUrl,
	atlasUrl,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};


module.exports = config;
