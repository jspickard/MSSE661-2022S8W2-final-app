//auth related functions only
const doCreatePhrase = async (e) => { //_id unused here, but calling code is shared by doUpdatePhrase where _id is required 
    e.preventDefault();

    if (authService.isAuth()) {
        const phraseElement = document.getElementById("generatePhrase");
        const phrase = {
            icebreaker: phraseElement.icebreaker,
            subject: phraseElement.subject,
        };
        
        console.log(phrase);
    
        const res = await phrasesAPIService.createPhrase(phrase);
        
        console.log("doCreatePhrase res: "+res);
    
        if (res.msg === null || res.msg === undefined) {
            alert("New phrase made!"); 
        } 
        else{
            alert(res.msg); 
        }
    }
    else {alert("Please login first."); }
};

const doReadPhrase = (e, _id, formFieldRefs, isCancel) => {    
    e.preventDefault();

    if (!!isCancel) {
        formFieldRefs.ownerField.value = formFieldRefs.ownerField.valueOrig;
        formFieldRefs.phraseField.value = formFieldRefs.phraseField.valueOrig;
        formFieldRefs.episodeField.value = formFieldRefs.episodeField.valueOrig;
        formFieldRefs.air_dateField.value = formFieldRefs.air_dateField.valueOrig;
    }

    phrasesService.makePhraseRead(_id);
}

const doEditPhrase = (e, _id, formFieldRefs) => {
    e.preventDefault();

    phrasesService.makePhraseEdit(_id);
}

const doUpdatePhrase = async (e, _id, formFieldRefs) => {
    e.preventDefault();
    const owner = formFieldRefs.ownerField.value;
    const phrase = formFieldRefs.phraseField.value;
    const episode = formFieldRefs.episodeField.value;
    const air_date = formFieldRefs.air_dateField.value;
    console.log(air_date);
    
    console.log(owner);
    if (owner == "") {return alert("Must provide owner/speaker");}
    if (phrase == "") {return alert("Must provide phrase");}

    const phraseRecord = {
        _id: _id,
        owner: owner,
        phrase: phrase,
        episode: episode,
        air_date: air_date,
    };

    const res = await phrasesAPIService.updatePhrase(phraseRecord);
    
    console.log("doUpdatePhrase res: "+res);

    if (res.msg === null || res.msg === undefined) {
        alert("Phrase ID " + _id + " updated!"); 
        phrasesService.updateRow(phraseRecord);
    } 
    else{
        alert(res.msg); 
    }
};

const doDeletePhrase = (e, _id) => {
    e.preventDefault();
   
    console.log(_id);
    const res = phrasesAPIService.deletePhrase(_id);
    
    console.log(res);

    if (res.msg === null || res.msg === undefined) {
        alert("Phrase deleted!"); 
        phrasesService.deleteRow(_id);
    } 
    else{
        alert(res.msg); 
    }
};

const generatePhrase = async (e) => {
    e.preventDefault();
    const phraseDisplay = document.getElementById("generatePhrase");
    const icebreakerRes = await icebreakersAPIService.randomIcebreaker(); 
    phraseDisplay.icebreaker = icebreakerRes.icebreaker
    const subjectRes = await subjectsAPIService.randomSubject(); 
    phraseDisplay.subject = subjectRes.subject;
    phraseDisplay.innerText = phraseDisplay.icebreaker + " " + phraseDisplay.subject + "?";;
    phraseDisplay.innerHTML += '<button type="button" onclick="doCreatePhrase(event);">Save Phrase</button>'
};