// Generated by CoffeeScript 1.9.3
(function() {
  var Articles, Blog, func_article, uuid;

  Articles = __M('blog/articles');

  Articles.sync();

  Blog = __M('blog/blogs');

  Blog.hasOne(Articles, {
    foreignKey: "blog_id"
  });

  Articles.belongsTo(Blog, {
    foreignKey: "blog_id"
  });

  uuid = require('node-uuid');

  func_article = {
    getAll: function(page, count, condition, order, include, callback) {
      var query;
      if (arguments.length === 4) {
        callback = order;
        order = null;
        include = null;
      } else if (arguments.length === 5) {
        callback = include;
        include = null;
      }
      query = {
        offset: (page - 1) * count,
        limit: count,
        order: order || "id desc",
        raw: true,
        include: [Blog]
      };
      if (condition) {
        query.where = condition;
      }
      if (include) {
        query.include = include;
      }
      return Articles.findAll(query).success(function(ms) {
        return callback(null, ms);
      }).error(function(e) {
        return callback(e);
      });
    },
    getByUrl: function(url, callback) {
      return Articles.find({
        where: {
          url: url
        }
      }).success(function(article) {
        if (article) {
          return callback(null, article);
        } else {
          return callback(new Error('不存在的博文'));
        }
      }).error(function(e) {
        return callback(e);
      });
    },
    add: function(data, callback) {
      return Articles.find({
        where: {
          url: data.url
        }
      }).success(function(article) {
        if (article) {
          return callback(new Error('已经存在的文章'));
        } else {
          data.uuid = uuid.v4();
          return Articles.create(data).success(function(m) {
            return callback && callback(null, m);
          }).error(function(error) {
            return callback && callback(error);
          });
        }
      }).error(function(e) {
        return callback(e);
      });
    }
  };

  __FC(func_article, Articles, ['add', 'getById', 'update', 'count', 'addCount', 'delete']);

  module.exports = func_article;

}).call(this);