import Application from "../models/application.js";
import mongoose from "mongoose";

export const getApplicationsByApplicantId = async (req, res) => {
    const { id: _applicantId} = req.params;
    
    try {
        const applications = await Application.find({ applicantId: _applicantId }).sort({ _id: -1 }); // get the posts for the current page
        res.status(200).json({ data: applications }); // return the posts and the number of pages
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getApplicationsByActivityId = async (req, res) => {
    const { activityId } = req.query;
    try {
        const applications = await Application.find({ activityId: activityId }).sort({ _id: -1 }); // get the posts for the current page
        res.status(200).json({ data: applications}); // return the posts and the number of pages
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateApplication = async (req, res) => {
    const { id: _id } = req.params;
    const { status, introduction, creatorId, activityId, applicantId } = req.body;
    const updatedApplication = {
        status, introduction, creatorId, activityId, applicantId 
    };

    try {
        const application = await Application.findById(_id);
        if (!application) {
            return res.status(404).send('No application found with that id');
        }
        const updated = await Application.findByIdAndUpdate(_id, updatedApplication, { new: true });

        res.status(200).json({ message: 'successfully updated' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to update application' });
    }
}

/* export const createApplication = async (req, res) => {
    const [introduction, creatorId, activityId, applicantId] = req.body;

    const newApplication = new Application({
        status: 'pending',
        introduction,
        creatorId,
        activityId,
        applicantId,
    });

    try {
        await newApplication.save();
        res.status(201).json(newApplication)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
} */

export const createApplication = async (req, res) => {
    const [ introduction, creatorId, activityId, applicantId ] = req.body;

    try {
        let application = await Application.findOne({ applicantId, activityId, creatorId });

        if (application) {
            application.introduction = introduction;
            application.status = 'pending';
            await application.save();
            res.status(200).json({ message: 'Successfully updated existing application', application });
        } else {
            const newApplication = new Application({
                status: 'pending',
                introduction,
                creatorId,
                activityId,
                applicantId,
            });
            await newApplication.save();
            res.status(201).json(newApplication);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteApplication = async (req, res) => {
    const { id } = req.params;    
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No application with that id");
  
    await Application.findByIdAndRemove(id);
    
    res.json({ message: "Application deleted successfully" });
  };





