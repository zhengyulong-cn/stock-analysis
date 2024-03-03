const instanceCount = 4;
const maxMemoryRestart = '1452M';
module.exports = {
  apps: [
    {
      name: 'nest',
      script: './dist/main.js',
      cwd: 'packages/server',
      // restart from memory
      max_memory_restart: maxMemoryRestart,
      exec_mode: 'cluster',
      instances: instanceCount,
      // exponential backoff restart delay
      exp_backoff_restart_delay: 100,
      // applications running for less time are considered to be abnormally started
      min_uptime: '5m',
      // maximum number of abnormal restarts, i.e. restarts with less than min_uptime runtime
      max_restarts: 30,
      // no log output
      out_file: '/dev/null',
      // no log output
      error_file: '/dev/null'
    }
  ]
};