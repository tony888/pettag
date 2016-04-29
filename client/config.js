/*
Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: true,
  restrictCreationByEmailDomain: "school.edu",
  loginExpirationDays: 30,
  oauthSecretKey: "wgporjigrpqgdfg",
});
*/
Accounts.ui.config({
  requestPermissions: {
     facebook: ['user_likes']
  },
  //requestOfflineToken: {},
  passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL",
});
