require("dotenv").config();

const bodyParser    = require("body-parser");
const cookieParser  = require("cookie-parser");
const express       = require("express");
const favicon       = require("serve-favicon");
const hbs           = require("hbs");
const mongoose      = require("mongoose");
const logger        = require("morgan");
const path          = require("path");
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const bcrypt        = require("bcryptjs");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash         = require("connect-flash");

const User          = require("./models/User");

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});

const app_name = require("./package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("node-sass-middleware")({
  src:  path.join(__dirname, "public"),
  dest: path.join(__dirname, "public"),
  sourceMap: true
}));

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({username}, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {message: "Incorrect username"});
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {message: "Incorrect password"});
    }
    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.locals.title = "No BS!";

app.use((req, res, next)=>{
  res.locals.user = req.user;
  next();
})

app.use("/", require("./routes/mainRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/post", require("./routes/postRoutes"));
app.use("/comment", require("./routes/commentRoutes"));

module.exports = app;