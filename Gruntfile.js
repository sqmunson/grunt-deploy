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
      deploy: {
        command: ['cd /home/ec2-user', 'rm -r test', 'mkdir test', 'rm test.js', 'touch test.js'].join(' && '),
        options: {
          config: 'myserver'
        }
      }
    }
  });

  grunt.registerTask('deploy', ['sshexec:deploy']);
  grunt.loadNpmTasks('grunt-ssh');

};

