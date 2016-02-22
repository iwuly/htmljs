// Generated by CoffeeScript 1.9.3
(function() {
  var func_column;

  func_column = __F('column');

  module.exports = function(req, res, next) {
    return func_column.count({
      is_publish: 1
    }, function(error, count) {
      if (error) {
        next(error);
      } else {
        res.locals.total = count;
        res.locals.totalPage = Math.ceil(count / 30);
        res.locals.page = req.query.page || 1;
      }
      return func_column.getAll(res.locals.page, 30, null, "article_count desc", function(error, columns) {
        if (error) {
          return next(error);
        } else {
          columns.sort(function(r1, r2) {
            if (Math.random() > 0.5) {
              return 1;
            } else {
              return -1;
            }
          });
          res.locals.columns = columns.splice(0, 13);
          return next();
        }
      });
    });
  };

}).call(this);