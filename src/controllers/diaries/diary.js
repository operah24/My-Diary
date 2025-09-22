const DiaryModel = require("../../models/diary");
const { sendSuccessResponse, sendErrorResponse } = require("../../helpers/utility");


exports.addDiary = async (req, res) =>{
    try {
        const {userName} = req.user;
        const body = req.body;
        const newDiary = await new DiaryModel();
        newDiary.title = body. title;
        newDiary.body= body.body;
        newDiary.author = userName;
        newDiary.createdDate = Date.now();
        const diary = await newDiary.save();
        return await sendSuccessResponse(res, {diary}, 'DIARY_CREATED_SUCCESSFULLY');
    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, { error }, 'ERROR_CREATING_DIARY');
    }
};

exports.updateDiary = async(req, res) => {
    try {
        const { title, body } = req.body;
        const {id} = req.params;
        const diary = await DiaryModel.findOne({_id: id});
        if (!diary) {
            return sendErrorResponse(res, {}, 'DIARY_NOT_EXIST');
        }
        if(title){
            diary.title = title;
        }
        if(body){
            diary.body = body;
        }

        const updatedDiary = await diary.save();
        return await sendSuccessResponse(res, {updatedDiary}, 'DIARY_UPDATED_SUCCESSFULLY');
    } catch (error) {
        return sendErrorResponse(res, { error }, 'ERROR_UPDATING_DIARY');
    }
};

exports.getDiary = async(req, res) => {
    const {id} = req.params;
    try {
        const diary = await DiaryModel.findById(id);
        if (!diary) {
            return sendErrorResponse(res, {}, 'NO_DIARY_FOUND');
        }
        return sendSuccessResponse(res, {diary}, 'SINGLE_DIARY');
    } catch (error) {
        return sendErrorResponse(res, { error }, 'ERROR_GETTING_DIARY');
    }
};

// exports.getDiaries = async(req, res) =>{

// }
