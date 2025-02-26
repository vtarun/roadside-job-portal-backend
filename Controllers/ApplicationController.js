const applyToJob = async (req, res) => {
	console.log(req.body);
	res.status(200).json({message: "hola "})
}

const updateApplicationStatus = async (req, res) => {

}

const getApplications = async (req, res) => {

}

module.exports = {applyToJob, getApplications, updateApplicationStatus};