const User = require("../Models/UserModel");

const updateUserRole = async (req, res) => {
	try{
		const {email, role} = req.body; 
		if(!email || !role){
			return res.status(400).json({message: "Email and role are required."});
		}

		const user = await User.findOneAndUpdate({email}, {role}, {new: true});

		if(!user){
			return res.status(404).json({message: "user not found."})
		}
		const userResponse = {
			email: user.email,
			role: user.role
		};
		res.json({ message: "Role updated successfully", user: userResponse });

	}catch(err){
		res.status(500).json({ message: "Error updating role", error: error.message });
	}
}

module.exports = { updateUserRole };