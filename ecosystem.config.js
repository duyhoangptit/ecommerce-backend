module.exports = {
  apps: [{
    name: 'ecommerce',
    script: 'npm',
    args: 'start',
    time: true,
    exec_mode: 'fork', // need explicitly declare mode otherwise it will fallback to cluster mode and cause infinite reload
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}

