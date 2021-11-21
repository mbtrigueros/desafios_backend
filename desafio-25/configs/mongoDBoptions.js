const localUrl = 'mongodb://localhost:27017/mongoDBlocal';
const atlasUrl = 'mongodb+srv://<mbtrigueros>:<4ZDWy6iIrVPhowiY>@cluster0.ez0kn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const config = {
	localUrl,
	atlasUrl,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};


module.exports = config;
