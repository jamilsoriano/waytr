const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: "Unauthorized - only admins can add other admins" };
  }
  // get user and add custom claim(admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: "Success " + data.email + " has been made an admin"
      };
    })
    .catch(err => {
      return err;
    });
});

exports.addRestaurantManager = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return {
      error:
        "Unauthorized - only admins can give Restaurant Managers privileges"
    };
  }
  // get user and add custom claim(admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        restaurantID: data.restaurantID
      });
    })
    .then(() => {
      return {
        message: "Success " + data.email + " has been made a Restaurant Manager"
      };
    })
    .catch(err => {
      return err;
    });
});
