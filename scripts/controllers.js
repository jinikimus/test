var myApp = angular.module('myApp');

myApp.controller('MenuCtrl', function ($scope, $location) {
  $scope.go = function (target) {
    $location.path(target);
  };
});

myApp.controller('MsgCtrl', function ($scope, auth) {
  $scope.message = {text: ''};
});

myApp.controller('RootCtrl', function (auth, $scope) {
  $scope.auth = auth;
  $scope.$watch('auth.profile.name', function(name) {
    if (!name) {
      return;
    }
    $scope.message.text = 'Welcome ' + auth.profile.name + '!';
  });

});

myApp.controller('LoginCtrl', function (auth, $scope, $location, store) {
  $scope.user = '';
  $scope.pass = '';

  function onLoginSuccess(profile, token) {
    $scope.message.text = '';
    store.set('profile', profile);
    store.set('token', token);
    $location.path('/');
    $scope.loading = false;
  }

  function onLoginFailed() {
    $scope.message.text = 'invalid credentials';
    $scope.loading = false;
  }

  $scope.reset = function() {
    auth.reset({
      email: 'hello@bye.com',
      password: 'hello',
      connection: 'Username-Password-Authentication'
    });
  };

  $scope.mySQLLoginTest = function (email, password, callback) {
      var mysql      = require('mysql');
      var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '1',
          database : 'fms1'
          });

      console.log(connection);

      connection.connect(function(err) {
          if (err) {
              console.error('error connecting: ' + err.stack);
              return;
          }

          console.log('connected as id ' + connection.threadId);
      });

          /*connection.connect();

          var query = "SELECT id, nickname, email, password " +
              "FROM users WHERE email = ?";

          connection.query(query, [email], function (err, results) {
              if (err) return callback(err);
              if (results.length === 0) return callback();
              var user = results[0];

              if (!bcrypt.compareSync(password, user.password)) {
                  return callback();
              }

              callback(null,   {
                  id:          user.id.toString(),
                  nickname:    user.nickname,
                  email:       user.email
              });

          })*/
  };

  $scope.submit = function () {
    $scope.message.text = 'loading...';
    $scope.loading = true;
    auth.signin({
      connection: 'Username-Password-Authentication',
      username: $scope.user,
      password: $scope.pass,
      authParams: {
        scope: 'openid name email'
      }
    }, onLoginSuccess, onLoginFailed);

  };

  $scope.doGoogleAuthWithPopup = function () {
    $scope.message.text = 'loading...';
    $scope.loading = true;

    auth.signin({
      popup: true,
      connection: 'google-oauth2',
      scope: 'openid name email'
    }, onLoginSuccess, onLoginFailed);
  };

});

myApp.controller('LogoutCtrl', function (auth, $scope, $location, store) {
  auth.signout();
  $scope.$parent.message = '';
  store.remove('profile');
  store.remove('token');
  $location.path('/login');
});
