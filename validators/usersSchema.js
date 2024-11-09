const yup = require("./customYupMethod");

    const userDataSchema = yup.object().shape({
        email: yup
        .string()
        .required("Email can not be blank.")
        .email("Email format is incorrect.")
        .min(6, "Email must be 6 or more characters long.")
        .max(254, "Email can not be more than 254 characters long.")
        .trim(),
        password: yup
        .string()
        .required("Password can not be blank.")
        .min(8, "Password must be at least 8 characters")
        .max(254, "Password can not be more than 254 characters long")
        // .matches(
        //   passwordRegex,
        //   "Password should contain at least one uppercase character, one lowercase character and a number"
        // )
        .trim(),
      });

      module.exports={
        userDataSchema
      }