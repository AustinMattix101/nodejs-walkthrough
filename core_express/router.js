const express = require("express");
const Joi = require("joi");
const { validateSignup } = require("./validator");
const app = express();

app.use(express.json());

const registration = [];
const sample = [
    {
        "email":"songchimchek23712@gmail.com",
        "password":"password",
        "confirmPassword":"password",
        "address": {
            "state":"CA"
        },
        "DOB": "2014-03-17",
        "referred":"true",
        "referralDetails":"Full name: Austin Mattix",
        "acceptTos":"Yes"
    }
];

app.get("/", (req, res) => {
    res.status(200).send(registration);
});
app.post("/signup", (req, res) => {
    const { error, value } = validateSignup(req.body);
    registration.push(value);

    if (error) {
        console.log(error);
        return res.status(400).send(error.details);
    }

    res.status(200).send("Succesfully signed up!");
});

app.listen(4000, () => {
    console.log("Server started on port 4000!");
});