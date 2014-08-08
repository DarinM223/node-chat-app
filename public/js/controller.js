'use strict';

var chatApp = angular.module('chatApp');

// main controller for the application, controls the
// message and user lists and the current logged in user
chatApp.controller('listControl', function ($scope, $rootScope, socket, 
    messageListFactory, userListFactory, socketService) {
  $scope.messageList = messageListFactory;
  $scope.userList = userListFactory.list;
  $scope.hiddenUsers = {};
  $scope.selectedIndex = -1;
  $scope.dropdownText = 'Message text';

  // grab current list of users at the start
  socket.emit('list');


  $scope.matchMessage = function(query) {
    return function(message) {
      if ($scope.dropdownText === 'Message text') {
        if (message.message) {
          return message.message.match(query);
        } else {
          return message.error.match(query);
        }
      } else {
        if (message.username) {
          return message.username.match(query);
        } else {
          return 'Server'.match(query);
        }
      }
    };
  };

  /**
   * @param {string} chatMessage
   * @param {string} username
   * @param {string} receiver
   * @param {function} callback
   */
  function sendMessage(chatMessage, username, receiver, callback) {
    var newMessage = {
      'username': username,
      'message': chatMessage,
    };
    if (receiver) {
      newMessage.receiver = receiver;
    }
    socket.emit('send', newMessage, callback);
  }


  /**
   * @param {string} chatMessage
   */
  $scope.onSend = function(chatMessage) {
    if ($scope.selectedIndex !== -1) {
      sendMessage(chatMessage, $rootScope.my_username, $scope.userList[$scope.selectedIndex]);
    } else {
      sendMessage(chatMessage, $rootScope.my_username, null);
    }
    $scope.chatInput = '';
  };

  $scope.onLogout = function() {
    $rootScope.my_username = null;
    socket.restart();
  };

  /**
   * @param {message} message
   * @return {string}
   */
  $scope.messageColorSelect = function(message) {
    if (message.error) {
      return 'alert-danger';
    } else if (message.receiver) {
      return 'alert-info';
    } else if (message.username) {
      return 'alert-success';
    } else {
      return 'alert-warning';
    }
  };

  /**
   * @param {string} username
   * @return {boolean}
   */
  $scope.isUserHidden = function(username) {
    if ($scope.hiddenUsers[username]) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @param {string} name
   * @return {string}
   */
  $scope.labelColorSelect = function(name) {
    if (name === $rootScope.my_username) {
      return 'label-success';
    } else if (name) {
      return 'label-primary';
    } else {
      return 'label-default';
    }
  };

  /**
   * @param {string} name
   * @return {string}
   */
  $scope.labelNameSelect = function(name) {
    if ($rootScope && $rootScope.my_username && name === $rootScope.my_username) {
      return 'You';
    } else if (name) {
      return name;
    } else {
      return 'Server';
    }
  };

  /**
   * @param {number} index
   */
  $scope.removeMessage = function(index) {
    $scope.messageList.splice(index, 1);
  };

  /**
   * @param {number} index
   */
  $scope.userClicked = function(index) {
    if ($scope.selectedIndex === index) {
      $scope.selectedIndex = -1;
    } else {
      $scope.selectedIndex = index;
    }
  };
});
