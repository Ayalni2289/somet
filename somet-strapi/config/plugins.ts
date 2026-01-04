module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('dkrfbwpd3'),
        api_key: env('825612239194576'),
        api_secret: env('YHv2lWbLqylaj7chIWnrpGchRvA'),
      },
    },
  },
});
