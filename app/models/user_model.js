import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  authorname: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function beforeyYourModelSave(next) {
 // where does this go?

  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;


  // TODO: do stuff here
  // generate a salt then run callback

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      return next();
    });
    // return next(); // why do we need this??
  });

  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch); // is it ok to return this??
  });
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
