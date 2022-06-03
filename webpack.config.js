const webpack = require( 'webpack' );

module.exports = ( env, options ) => {
	return {
		
		node: {fs: 'empty'},
		externals: [
		    {'./cptable': 'var cptable'},
		    {'./jszip': 'jszip'}
		]
	}
};