const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    let userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({error: 'user already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    try{
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        res.status(201).json({
            message: 'user registered successfully'
        });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();// 6 digit
        console.log(`OTP for ${email}: ${otp}`);

        
    } catch(error) {
        res.status(400).json({
            error: error.message
        });
    };
}

