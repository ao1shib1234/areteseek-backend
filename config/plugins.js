module.exports = ({ env }) => {
  // 生产环境使用 Cloudinary，本地开发使用本地存储
  if (env('CLOUDINARY_NAME')) {
    return {
      upload: {
        config: {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
    };
  }
  // 本地：使用默认本地存储
  return {};
};
