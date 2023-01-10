const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");

 class Person {
     constructor () {
         this.hooks = {
             go: new SyncHook(['address']),
             talk: new AsyncParallelHook(['name'])
         }
     }
     tap () {
         this.hooks.go.tap('class1', (add) => {
             console.log('class1', add);
             return 11;
         })
         this.hooks.go.tap('class2', (add) => {
            console.log('class2', add);
        })

        this.hooks.talk.tapAsync('talk1', (name, cb) => {
            setTimeout(() => {
                console.log('talk1', name);
                cb();
            }, 1000);
        });
     }
     start () {
         this.hooks.go.call('ad1');
         this.hooks.talk.callAsync('我是name', () => {
             // 所有钩子都触发结束再触发
             console.log('end~');
         });
     }
 }

 const p = new Person();
 p.tap();
 p.start();