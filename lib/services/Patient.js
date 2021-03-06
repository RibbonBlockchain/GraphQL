const { pick } = require("lodash");
const uuid = require("uuid/v4");

const { save, list } = require("../models/Patient");

module.exports = {
  createPatientEntry: async (fields, callback) => {
    let allowedParameters = [
      "firstName",
      "lastName",
      "phoneNumber",
      "userId",
      "walletAddress"
    ];

    let data = pick(fields, allowedParameters);
    data["id"] = uuid();
    data["createdAt"] = new Date().toISOString();

    await save(data, response => {
      if (response.error) {
        callback({ error: true, message: response.message.message });
      } else {
        callback({ error: false, data: response });
      }
    });
  },

  listPatients: async callback => {
    await list(response => {
      let data = response.Items;
      callback({ error: false, data });
    });
  }
};
