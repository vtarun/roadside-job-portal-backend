const User = require("../Models/UserModel");

const updateUserRole = async (req, res) => {
	try{
		const {role} = req.body;
		const {email} = req.user;
		if(!email || !role){
			return res.status(400).json({message: "Id and role are required."});
		}

		const user = await User.findOneAndUpdate({email}, {role}, {new: true});

		if(!user){
			return res.status(404).json({message: "user not found."})
		}
		const userResponse = {
			email: user.email,
			user_id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			role: user.role,
      		profilePic: user.profilePic,
			createdAt: user.createdAt,
		  };
		res.json({ message: "Role updated successfully", user: userResponse });

	}catch(err){
		res.status(500).json({ message: "Error updating role", error: error.message });
	}
}

const updateUser = async (req, res) => {
	try{
		const {email, firstname, lastname, password} = req.body;
		if(!email){
			return res.status(400).json({message: "Email is required."});
		}

		const payload = {};

		if(firstname){
			payload.firstname = firstname;
		}

		if(lastname){
			payload.lastname = lastname;
		}

		if(password){
			const salt = await bcrypt.genSalt(12);
			payload.password = await bcrypt.hash(password, salt);
		}


		const user = await User.findOneAndUpdate({email}, payload, {new: true});

		if(!user){
			return res.status(404).json({message: "user not found."})
		}
		const userResponse = {
			email: user.email,
			user_id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			role: user.role,
      		profilePic: user.profilePic,
			createdAt: user.createdAt,
		  };
		res.json({ message: "User updated successfully", user: userResponse });

	}catch(err){
		res.status(500).json({ message: "Error updating role", error: error.message });
	}
}

const updateSavedJobs = async (req, res) => {
	const { jobId }= req.params;

	if(!jobId){
		return res.status(400).json({message: "jobId is required."});
	}

	try{

		const { _id } = req.user;

		const user = await User.findOne({_id});
		const savedJobs = user.savedJobs;

		const jobObjectId = new mongoose.Types.ObjectId(jobId);
	    const savedJobIndex = user.savedJobs.findIndex(id => id.equals(jobObjectId));

		if(savedJobIndex === -1) {
			user.savedJobs.push(jobObjectId);
		}else {
			user.savedJobs.splice(savedJobIndex, 1);
		}

		await user.save();

		res.json({ message: "Job saved successfully", jobs: user.savedJobs});
	}catch (error) {
   	 	console.error(error);
    	res.status(500).json({ message: "Error updating saved jobs", error: error.message });
  	}

}

module.exports = { updateUser, updateUserRole, updateSavedJobs };