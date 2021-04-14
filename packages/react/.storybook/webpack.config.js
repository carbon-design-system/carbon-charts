const path = require('path')

module.exports = {
    module: {
     rules: [
     {
		test: /\.scss$/,
		use: [
		  require.resolve("style-loader"),
		  require.resolve("css-loader"),
		  {
			loader: require.resolve("sass-loader"),
			options: {
			  sassOptions: {
				includePaths: ['node_modules']
			  }
			}
		  }
		]
     }
   ]
 }
}
