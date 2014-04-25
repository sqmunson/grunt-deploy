module.exports = function(grunt) {
  var secret = grunt.file.readJSON('private.json');

  grunt.initConfig({
    sshconfig: {
      myserver: {
        privateKey: grunt.file.read(secret.privateKey),
        host: secret.host,
        username: secret.username,
        agent: secret.agent
      }
    },
    sshexec: {
      serverstart: {
        command: ['cd /home/ec2-user/server', './node_modules/forever/bin/forever start index.js'].join(' && '),
        options: {
          config: 'myserver'
        }
      },
      serverstop: {
        command: ['cd /home/ec2-user/server', './node_modules/forever/bin/forever stop index.js'].join(' && '),
        options: {
          config: 'myserver'
        }
      }
    }
  });

  grunt.registerTask('serverstart', ['sshexec:serverstart']);
  grunt.registerTask('serverstop', ['sshexec:serverstop']);
  grunt.loadNpmTasks('grunt-ssh');

};

