var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    google_id:{
        type:String,required:true,
        unique:true
    },
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    fullName:{
        type:String, required:true
    },
    firstName:{
        type:String, required:true
    },
    lastName:{
        type:String, required:true
    },
    bar:{
        type:Schema.Types.ObjectId, ref:'Bar'
      //bar id if they are either a bartender or barOwner
        //of a bar, gets checked on login
    },
    googleProvider: {
        type: {
            access_token: String,
            token_type: String,
            refresh_token:String,
            id_token:String,
            expiry_date:Date
        }
    }
});

UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.upsertGoogleUser = function(profile,cb) {
    var that = this;
    return this.findOne({
        'google_id': profile.google_id
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            var newUser = new that({
                google_id:profile.google_id,
                fullName: profile.fullName,
                firstName: profile.firstName,
                lastName:profile.lastName,
                email: profile.email,
                googleProvider: profile.googleProvider
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);