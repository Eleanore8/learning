import './styles/index.less';
import './styles/basic.less';
// import { equal } from './base';
// import '@babel/polyfill';

const add = (a, b) => (a + b);
console.log(add(1,11));
console.log('哈哈');

// equal();

// module.hot.accept('./base', function () {
// 	equal();
// });

import('./base').then(({equal}) => {
	equal();
}).catch();
