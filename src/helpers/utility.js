const Language = require('@shypes/language-translator');

Language._({
    __basedir : process.env.PWD ? process.env.PWD : process.cwd(),
    langFolder : 'src/lang'
});

const sendSuccessResponse = async (res, content, message)  => {
    let responseData = {'message' : '', 'param' : ''};
    if(typeof message == 'string'){
        responseData['message'] = message;
        message = {};
    }
    responseData = {...responseData, ...message};
    let translated = await Language.get(responseData['message'], res.language, responseData['param']);
    const langKey = !(res.langKey == "true" || res.langKey == "1") ? false : true;
    const responseKey = {
        'data': langKey ? Language.text('DATA') : 'data',
        'message': langKey ? Language.text('MESSAGE') : 'message',
        'success': langKey ? Language.text('SUCCESS') : 'success'
    };
    let data = {};
    data[responseKey['success']] =  true;
    data[responseKey['message']] =  translated;
    data[responseKey['data']] =  content;
    res.status(200).json(data);
};


const sendErrorResponse = async (res, content, message, status) => {
    status = !status ? 400 : status;
    let responseData = {'message' : '', 'param' : ''};
    if(typeof message == 'string'){
        responseData['message'] = message;
        message = {};
    }
    responseData = {...responseData, ...message};
    let translated;
    if(responseData['message'] == 'MISSING_REQUIRED_FIELDS') {
        const msgStrings = [];
        for (let i = 0; i < content.required.length; i++) { 
            let msg = await Language.get(content.required[i].message, res.language, content.required[i].param);
            msgStrings.push(msg);
        } 
        content.required =  msgStrings;
        translated = [msgStrings.slice(0, -1).join(', '), msgStrings.slice(-1)[0]].join(msgStrings.length < 2 ? '' : ' and ');
    } else {
        translated = await Language.get(responseData['message'], res.language, responseData['param']);
    }
    const langKey = !(res.langKey == "true" || res.langKey == "1") ? false : true;
    const responseKey = {
        'data': langKey ? Language.text('DATA') : 'data',
        'message': langKey ? Language.text('MESSAGE') : 'message',
        'success': langKey ? Language.text('SUCCESS') : 'success'
    };
    let data = {};
    data[responseKey['success']] =  false;
    data[responseKey['message']] =  translated;
    data[responseKey['data']] = content;
    res.status(status).json(data);
};

module.exports = {sendSuccessResponse, sendErrorResponse};