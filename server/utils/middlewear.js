module.exports = async (req, res, next) => {
  console.log("This is the Middlewear");
  next();
};
