const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BioSchema = new Schema({
    accuracy: {
        type: Number,
        min: 0,
        max:100,
        required:true
    }, shortbio: {
        type: String,
        max:500
    }, fullbio: {
        type: String,
        required: true
    }
}, { timestamps: true });

const customerSchema = new Schema ({
    id: {
        type: Number,
        required: true,
        unique: true
    }, firstname: {
        type: String,
        required: true
    }, middlename: {
        type: String,
        required: true
    }, lastname: {
        type: String,
        required: true
    }, fullname: {
        type: String,
        required: true
    }, birthdate: {
        type: Date,
        required: true
    }, sex: {
        type: String,
        required: true
    }, address: {
        type: String,
        required: true
    }, tel: {
        type: Number, 
        required: true
    }, country: {
        type: String,
        required: true,
        unique: true
    }, bio: [BioSchema]
}, {timestamps: true});

var Customers = mongoose.model('customers', customerSchema);
module.exports = Customers;