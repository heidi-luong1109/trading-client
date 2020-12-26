(global as any).requestAnimationFrame = (callback: Function) => {
  setTimeout(callback, 0);
};
