// if (!Array.prototype.map) {
//     Array.prototype.map = function(callbackfn, thisArg) {
//         var k, len, result = [];
//         if (this == null) {
//             throw new TypeError('this is null or not defined');
//         }

//         if (typeof callbackfn !== 'function') {
//             throw new TypeError();
//         }
//         len = this.length;
//         k = 0;
//         while (k < len) {
//             if (k in this) {
//                 result.push(callbackfn.call(thisArg, this[k], k, this));
//             }
//             k = k + 1;
//         }
//         return result;
//     };
// }
// if (!Array.prototype.forEach) {
//     Array.prototype.forEach = function(callbackfn, thisArg) {
//         var k, len;
//         if (this == null) {
//             throw new TypeError('this is null or undefined');
//         }

//         if (typeof callbackfn !== 'function') {
//             throw new TypeError();
//         }

//         len = this.length;
//         k = 0;
//         while (k < len) {
//             if (k in this) {
//                 callbackfn.call(thisArg, this[k], k, this);
//             }
//             k = k + 1;
//         }
//     };
// }