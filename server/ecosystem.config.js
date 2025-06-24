module.exports = {
  apps: [
    {
      name: "sprinta",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
