const modules = import.meta.glob('./src/assets/Video-sequence/*.jpg', { eager: true, import: 'default' });
console.log(Object.keys(modules).length);
