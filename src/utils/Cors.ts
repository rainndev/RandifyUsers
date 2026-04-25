export const toCorsSafeImageUrl = (rawUrl: string) => {
  const withoutProtocol = rawUrl.replace(/^https?:\/\//, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(withoutProtocol)}&w=768&h=768&fit=cover`;
};
