import parse from '../src/ast/parse';

const templateStr = `<div>
        <h3 class="tittle hover" id="name">你好</h3>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>`;

const ast = parse(templateStr);

console.log(ast);
