console.log('base');

export function equal (a, b) {
	console.log('修改2');

	return Math.abs(a - b) < Number.EPSILON;
}
console.log(equal(0.1 + 0.2, 0.3));

console.log('修改3');