
getToken = function (headers) {
   if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
         return parted[1];
      } else {
         return null;
      }
   } else {
      return null;
   }
};

checkSignIn = function(req,res,next) {
      var token = getToken(req.headers);
      if (token) {
         next();
      } else {
         var err = new Error("Not logged in");
         next(err);
      }
   
}



 module.exports = checkSignIn;