#!/usr/bin/env node 
let fs = require('fs');
codebuf = fs.readFileSync("./target/wasm32-unknown-unknown/debug/ewasm_precompile_ecadd.wasm");

const input_data = [13, 14, 10, 13, 11, 14, 14, 15];
let scratch = null;

WebAssembly.instantiate(codebuf, {
	env: {
		bignum_add: function(arg1, arg2) {
		},
		ethereum_useGas: function() {
		},
		ethereum_callDataCopy: function(r, d, l) {
			for (let i = 0; i < l; i++) {
				scratch[r+i] = input_data[d+i];
			}
		},
		ethereum_getCallDataSize: function() {
			return input_data.length;
		},
		ethereum_finish: function(ptr) {
		}
	}
}).then(result => {
	scratch = result.instance.exports.memory;
	result.instance.exports.main();
});
