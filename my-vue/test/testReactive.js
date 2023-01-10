// 测试响应式
import observe from '../src/reactive/observe';
import Watcher from '../src/reactive/Watcher';

var obj = {
    type: 1,
    name: '哈哈',
    age: 18,
    city: {
        name: 'hz',
        part: 'scq'
    },
    hobby: [1,2,3,4]
};

observe(obj);

// console.log(obj.age);
// console.log(obj.city);
// console.log(obj.city.name);

// obj.hobby.push({name: 'haha'});
// console.log(obj.hobby.splice(2,0,6));

// obj.age = 10;

// console.log(obj);

new Watcher(obj, 'city.name', (val) => {
    console.log('***', val);
});

obj.city.name = 'shh'