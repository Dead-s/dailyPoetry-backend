const allowedOrigin = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (origin == undefined) {
      return callback(new Error("Not allowed by CORS"));
    }
    if (
      allowedOrigin.indexOf(origin) !== -1 ||
      origin.includes("http://localhost") ||
      origin.includes("https://daily-poetry-frontend.vercel.app/")
    ) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
