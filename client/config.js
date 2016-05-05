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

AdminLTEOptions = {
    //Enable sidebar expand on hover effect for sidebar mini
    //This option is forced to true if both the fixed layout and sidebar mini
    //are used together
    sidebarExpandOnHover: true,
    //BoxRefresh Plugin
    enableBoxRefresh: true,
    //Bootstrap.js tooltip
    enableBSToppltip: true
  };
