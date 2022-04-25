//builds list of phrases and inserts into web page
console.log('enter phrase.service.js');

class PhrasesService{
    list = document.createElement('ul');
    phrasesAPIService;
    
    constructor(phrasesAPIService) {
        this.phrasesAPIService = phrasesAPIService;
    }
    
    init() {
        this.render();
    }

    makePhraseEdit = (_id) => {
        console.log("enter makePhraseEdit");
        
        //get current elements
        const block = document.getElementById(_id);
        const readOwner = block.getElementsByClassName('owner-text')[0];
        const readPhrase = block.getElementsByClassName('phrase-text')[0];
        const readEpisode = block.getElementsByClassName('episode-text')[0];
        const readAir_date = block.getElementsByClassName('air_date-text')[0];
    
        let readAir_dateFormatted = "";
        if (!!readAir_date.value) {readAir_dateFormatted = readAir_date.value.substring(0,10);}
        
        //phrase values
        const phraseRecord = {
            _id: _id,
            owner: readOwner.value,
            phrase: readPhrase.value,
            episode: readEpisode.value,
            air_date: readAir_dateFormatted,
        }
    
        //build form
        const submitForm = new SubmitForm(phraseRecord, !!1);  
        
        //replace read only fields with edit forms
        block.replaceChild(submitForm.submitBlock, block.childNodes[0]); //this replaces all nodes
    
        console.log("exit makePhraseEdit");
    }
    
    makePhraseRead = (_id) => {
        console.log("enter makePhraseRead");
        
        //get current elements
        const editBlock = document.getElementById(_id);
        const editNode = editBlock.childNodes[0];
        console.log(editNode);
        const editOwner = editBlock.getElementsByClassName('ownerField')[0];
        console.log(editOwner);
        const editPhrase = editBlock.getElementsByClassName('phraseField')[0];
        const editEpisode = editBlock.getElementsByClassName('episodeField')[0];
        const editAir_date = editBlock.getElementsByClassName('air_dateField')[0];
        
        //phrase values
        const phraseRecord = {
            _id: _id,
            owner: editOwner.value,
            phrase: editPhrase.value,
            episode: editEpisode.value,
            air_date: editAir_date.value,
        }
    
        //build read display
        const readDisplay = new ReadDisplay(phraseRecord);
        
        //replace read only fields with edit forms
        editBlock.replaceChild(readDisplay.displayblock, editNode); //this replaces all nodes
    
        console.log("exit makePhraseRead");
    }
    
    addRow = (phraseRecord) => {
        const record = new ReadDisplay(phraseRecord);
    
        this.list.appendChild(record.displayblock);
    }
    
    updateRow = (phraseRecord) => {
        //updating done inheritantly through element "value" parameter, this converts elements back to read only text
        this.makePhraseRead(phraseRecord._id);
    }
    
    deleteRow = (_id) => {
        let element = null;
        for (let index = 0; index < this.list.childNodes.length; index++) {
            if (this.list.childNodes[index].id == _id)
            {
                element = this.list.childNodes[index];
                break;
            }
        }  
        if (!!element) {this.list.removeChild(element);}
    }
    
    //create pages (run immediately)
    render = async () => {
        console.log('buidling page...');
        //get div
        const phrasesDisplay = document.getElementById('new-phrase-form-div');
        //build form
        const createForm = new SubmitForm(0, !!0);
        //replace read only fields with edit forms
        if (!!phrasesDisplay) {phrasesDisplay.replaceChild(createForm.submitBlock, phrasesDisplay.childNodes[1]);} //this replaces all nodes
    
        const phrases = await phrasesAPIService.getPhrases();
        console.log("phrases: " + phrases);
        console.log("phrases.length: "+phrases.length);
    
        if (phrases.length) {
            //record display       
            const phrasesDisplay = document.getElementById('phrases-display');
            if (!!phrasesDisplay) {
                const phrasesDisplayChild = phrasesDisplay.childNodes[1];
    
                phrasesDisplay.replaceChild(this.list, phrasesDisplayChild);
        
                //populate list
                phrases.map((phraseRecord) => {
                    const record = new ReadDisplay(phraseRecord);
        
                    this.list.appendChild(record.displayblock);
                });
            }
            console.log('page built');
        }
        else if (phrases.msg === "Invalid Token") {
            const phrasesFormDiv = document.getElementById('new-phrase-form-div');
            const phrasesForm = phrasesFormDiv.childNodes[1];
            const messageText = document.createElement('form');
            phrasesFormDiv.replaceChild(messageText, phrasesForm);
            messageText.innerText = "Login to add phrases."
            
            const phrasesDisplay = document.getElementById('phrases-display');
            const phrasesDisplayChild = phrasesDisplay.childNodes[1];
            phrasesDisplayChild.innerText = "Login to see stored phrases."
        }
    };
}


class SubmitForm {
    
    constructor(phraseRecord, isUpdate) {this.buildForm(phraseRecord, isUpdate);}

    buildForm = (phraseRecord, isUpdate) => {
        this.submitBlock = document.createElement('div');
        this.submitBlock.id = phraseRecord._id;
        this.submitNode = document.createElement('div');
        this.submitBlock.appendChild(this.submitNode);

        this.editForm = document.createElement('form');
        this.editForm.className = "phrase-form";
        this.editForm.dir="row";
        this.editForm.id = phraseRecord._id;
        this.submitNode.appendChild(this.editForm);
       
        this.ownerLabel = document.createElement('label');
        this.ownerLabel.for = "owner";
        this.ownerLabel.innerText = "Owner: ";
        this.ownerField = document.createElement('input');
        this.ownerField.id = "editOwner";
        this.ownerField.className = "ownerField";
        this.ownerField.type = "text";
        if (!!phraseRecord.owner) {
            this.ownerField.value = phraseRecord.owner;
            this.ownerField.valueOrig = phraseRecord.owner;
        }
        this.ownerLabel.appendChild(this.ownerField);
        this.editForm.appendChild(this.ownerLabel);
    
        this.phraseLabel = document.createElement('label');
        this.phraseLabel.for = "phrase";
        this.phraseLabel.innerText = "Phrase: ";
        this.phraseField = document.createElement('input');
        this.phraseField.id = "editPhrase";
        this.phraseField.className = "phraseField";
        this.phraseField.type = "text";
        if (!!phraseRecord.phrase) {
            this.phraseField.value = phraseRecord.phrase;
            this.phraseField.valueOrig = phraseRecord.phrase;
        }
        this.phraseLabel.appendChild(this.phraseField);
        this.editForm.appendChild(this.phraseLabel);
    
        this.episodeLabel = document.createElement('label');
        this.episodeLabel.for = "episode";
        this.episodeLabel.innerText = "Episode: ";
        this.episodeField = document.createElement('input');
        this.episodeField.id = "editEpisode";
        this.episodeField.className = "episodeField";
        this.episodeField.type = "number";
        if (!!phraseRecord.episode) {
            this.episodeField.value = phraseRecord.episode;
            this.episodeField.valueOrig = phraseRecord.episode;
        }
        this.episodeLabel.appendChild(this.episodeField);
        this.editForm.appendChild(this.episodeLabel);
    
        this.air_dateLabel = document.createElement('label');
        this.air_dateLabel.for = "air_date";
        this.air_dateLabel.innerText = "Air_date: ";
        this.air_dateField = document.createElement('input');
        this.air_dateField.id = "editAir_date";
        this.air_dateField.className = "air_dateField";
        this.air_dateField.type = "date";
        console.log(phraseRecord.air_date);
        if (!!phraseRecord.air_date) {
            this.air_dateField.value = phraseRecord.air_date;
            this.air_dateField.valueOrig = phraseRecord.air_date;
        }
        this.air_dateLabel.appendChild(this.air_dateField);
        this.editForm.appendChild(this.air_dateLabel);
    
        let submitText = "Create";
        if (!!isUpdate) {submitText = "Update";}
        this.buttonDiv = document.createElement('div');
        this.buttonDiv.innerHTML += '<button onclick="do'+submitText+'Phrase(event, _id, formFieldRefs)">'+submitText+'</button>';
        this.submitButton = this.buttonDiv.firstChild;
        this.submitButton.className = "submit-button";
        this.submitButton._id = phraseRecord._id;
        this.submitButton.formFieldRefs = {ownerField: this.ownerField, phraseField: this.phraseField, episodeField: this.episodeField, air_dateField: this.air_dateField};
        this.editForm.appendChild(this.submitButton);
        
        if (!!isUpdate) {
            this.cancelDiv = document.createElement('div');
            this.cancelDiv.innerHTML += '<button onclick="doReadPhrase(event, _id, formFieldRefs, isCancel)">Cancel</button>';
            this.cancelButton = this.cancelDiv.firstChild;
            this.cancelButton.className = "cancel-button";
            this.cancelButton._id = phraseRecord._id;
            this.cancelButton.formFieldRefs = {ownerField: this.ownerField, phraseField: this.phraseField, episodeField: this.episodeField, air_dateField: this.air_dateField};
            this.cancelButton.isCancel = 1; //true
            this.editForm.appendChild(this.cancelButton);
        }
    }
}


class ReadDisplay {

    constructor(phraseRecord) {this.buildDisplay(phraseRecord);}

    buildDisplay = (phraseRecord) => {
        this.displayblock = document.createElement('div');
        this.displayblock.id = phraseRecord._id;
        this.displayNode = document.createElement('div');
        this.displayNode.className = 'phrase-record-block';
        this.displayblock.appendChild(this.displayNode);

        
        this.phraseText = document.createElement('p');
        this.phraseText.className = 'phrase-text';
        this.phraseText.icebreaker = phraseRecord.icebreaker;
        this.phraseText.subject = phraseRecord.subject;
        this.phraseText.innerText = phraseRecord.icebreaker+" "+phraseRecord.subject+"?";
        this.displayNode.appendChild(this.phraseText);

        this.editDiv = document.createElement('div');
        this.editDiv.innerHTML += '<button onclick="functionNotAvailableYet()">Edit</button>';
        this.editButton = this.editDiv.firstChild;
        this.editButton.className = "phrase-edit";
        this.editButton._id = phraseRecord._id;
        this.displayNode.appendChild(this.editButton);

        this.deleteDiv = document.createElement('div');
        this.deleteDiv.innerHTML += '<button onclick="functionNotAvailableYet()">Delete</button>';
        this.deleteButton = this.deleteDiv.firstChild;
        this.deleteButton.className = "phrase-delete";
        this.deleteButton._id = phraseRecord._id;
        this.displayNode.appendChild(this.deleteButton);
    }
}
