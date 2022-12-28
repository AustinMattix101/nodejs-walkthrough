const { ObjectID } = require("bson");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const residentSchema = new Schema({
    state: {
        type: String,
        required: true,
        unique: true
    },
    // myself: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }, 
    // fiance: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "myself"
    // }
}, { timestamps: true });

const BioSchema = new Schema({
    accuracy: {
        type: Number,
        min: 0,
        max:100,
        required:true 
    }, 
        shortbio: {
        type: String,
        maxlenght:500
    }, 
        fullbio: {
        type: String,
        required: true
    }
}, { timestamps: true });

const profileSchema = new Schema ({
    id: {
        type: ObjectID,
        required: true,
        unique: true
    }, 
        firstname: {
        type: String,
        required: true
    }, 
        middlename: {
        type: String,
        required: true
    }, 
        lastname: {
        type: String,
        required: true
    }, 
        fullname: {
        type: String,
        required: true
    }, 
        birthdate: {
        type: Date,
        required: true
    }, 
        sex: {
        type: String,
        required: true
    }, 
        address: {
        type: String,
        required: true
    }, 
        tel: {
        type: Number, 
        required: true
    }, 
        resident: [residentSchema], 

        bio: [BioSchema], 

        image: {
        type: String,
        required: true,
    }, 
        category: {
        type: String,
        required: true
    }, 
        label: {
        type: String
    }, 
        income: {
        type: Currency,
        required:true,
        min: 0
    }, 
        featured: {
        type: Boolean,
        default: false
    },
    referred: {
        type: Boolean,
        required: true
    },
    referraldetails: {
        type: String,
        minlenght: 3,
        maxlenght: 50
    }, 
    accepttos: {
        type: Boolean,
        truthy: "Yes",
        valid: true,
        required: true
    }
}, {timestamps: true});

var Profiles = mongoose.model('profiles', profileSchema);
module.exports = Profiles;