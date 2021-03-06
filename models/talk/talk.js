// Generated by CoffeeScript 1.9.3
(function() {
  module.exports = {
    id: {
      type: "int",
      autoIncrement: true,
      primaryKey: true
    },
    uuid: "varchar(40)",
    user_id: "int",
    user_nick: "varchar(100)",
    user_headpic: "varchar(100)",
    md: "text",
    html: {
      type:"text",
      set: function(v) {
        return this.setDataValue('html', xss(v));
      }
    },
    time: "bigint"
  };

}).call(this);
