export const generateUniqueId = () =>
  '_' + Math.random().toString(36).substr(2, 9);
