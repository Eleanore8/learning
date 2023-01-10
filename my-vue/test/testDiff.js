import h from '../src/diff/h';
import patch from '../src/diff/patch';

const res1 = h('section', {}, [
    h('p', {key: '1'}, '1'),
    h('p', {key: '3'}, '3'),
    h('p', {key: '4'}, '4'),
    h('p', {key: '5'}, '5'),
]);

const res2 = h('h1', {}, 'title');

const res3 = h('section', {}, '改变了文案');

const res4 = h('section', {}, [
    h('p', {key: '1'}, '1'),
    h('p', {key: '3'}, '3'),
    h('p', {key: '4'}, '4'),
    h('p', {key: '5'}, '5'),
    h('p', {key: '6'}, '6'),
    h('p', {key: '7'}, '7'),

]);

const dom = document.getElementById('app');

// 第一次挂载
patch(dom, res1);

const btn = document.getElementById('btn');
btn.onclick = function() {
    patch(res1, res4);
}