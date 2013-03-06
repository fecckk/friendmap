// Generated by CoffeeScript 1.3.3
(function() {
  var $, Socket, User;

  $ = function(id) {
    return document.getElementById(id);
  };

  Socket = void 0;

  if (typeof WebSocket === "function") {
    Socket = WebSocket;
  }

  if (typeof MozWebSocket === "function") {
    Socket = MozWebSocket;
  }

  Socket.prototype.sendJSON = function(j) {
    var json;
    json = JSON.stringify(j);
    return this.send(json);
  };

  Socket.prototype.decodeJSON = function(j) {
    var coordinates, data, json;
    json = JSON.parse(j.data)["SUBSCRIBE"];
    if (!(json[0] === "message")) {
      return false;
    }
    coordinates = json[2].split(',');
    data = {
      user: new User(json[1]),
      location: {
        x: parseFloat(coordinates[0]),
        y: parseFloat(coordinates[1])
      }
    };
    return data;
  };

  User = (function() {

    function User(name) {
      this.name = name;
      this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    return User;

  })();

  window.Socket = Socket;

  window.User = User;

}).call(this);