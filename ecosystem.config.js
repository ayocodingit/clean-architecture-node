// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "clean-architecture-node",
        script: "./build/src/app.js", // sesuaikan dengan entry point hasil build
        instances: 1,
        exec_mode: "fork", // atau "cluster" jika ingin multi-core
        watch: false,
      },
    ],
  };
  
