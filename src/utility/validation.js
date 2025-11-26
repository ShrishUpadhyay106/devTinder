const validator = require("validator");

const validateSignUpdata = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is required");
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email format");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong");
    }
};

module.exports = { validateSignUpdata };
