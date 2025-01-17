// src/hooks.client.js
// 这个文件只在客户端执行
console.log(globalThis);
globalThis.x = {};

export function handleError(error) {
  console.error("客户端错误:", error);
}

export function init() {
  // console.log('客户端初始化');
}
