const jwt = require("jsonwebtoken");

const middleware_jwt = {
    checkJwt: async (req, res, next) => {
        try {
          const token = req.headers.authorization.slice(7);
          const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);
      
          if (decoded) {
            next();
          } else {
            res.status(401).json({
              status: false,
              message: "Token error",
              data: [],
            });
          }
        } catch (error) {
          res.status(401).json({
            status: false,
            message: "Token error",
            data: [],
          });
        }
    },
}

module.exports = middleware_jwt