const webpack = require( 'webpack' );

module.exports = ( env, options ) => {
	return {
		vendor: [
	        'xlsx',
	        'file-saver'
		],
		node: {fs: 'empty'},
		externals: [
		    {'./cptable': 'var cptable'},
		    {'./jszip': 'jszip'}
		]
	}
};