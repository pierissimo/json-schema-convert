

module.exports = {
  authId: {
    type: "string",
    index: true
  },
  active: {
    type: "Boolean",
    default: true
  },
  name: {
    type: "String",
    required: true
  },
  email: {
    type: "String",
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: "String",
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: "String",
    required: true
  },
  admin: {
    type: "Boolean",
    default: false
  },
  service: {
    type: "Boolean",
    default: false
  },
  hpUserId: {
    type: "String"
  },
  defaultAccount: {
    type: "string"
  },
  productionUser: {
    type: "Boolean",
    default: false
  },
  smartCardNumber: {
    type: "String",
    unique: true
  },
  homepage: {
    type: "String",
    default: "/"
  },
  homestate: {
    type: "String",
    default: 'app.home'
  },
  accountRoles: [{
    accountId: {
      type:"string"
    }, //this will eventually replace id <- incorrectly named
    id: {
      type: "string",
      required: true
    },
    name: {
      type: "String"
    },
    role: {
      type: "String",
      default: "basic"
    },
    token: {
      type: "String",
      unique: true,
      index: true
    },
    secret: {
      type: "String"
    }
  }],
  accounts: [{
    type: "string",
    ref: 'Account'
  }],
  invitations: [{
    invitationId: {
      type: "string"
    },
    date: {
      type: "Date"
    }
  }]
};
