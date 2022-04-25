const phrasesAPIService = new PhrasesAPIService();
const phrasesService = new PhrasesService(phrasesAPIService);

describe('ChitChat Dynamo', () => {
  it('should initialize some HTML', () => {
    spyOn(phrasesService, 'init');
    phrasesService.init();

    expect(phrasesService.init).toHaveBeenCalled();
  });

  it('should add a phrase', async () => {
    const newPhrase = {
      _id: 1337,
      icebreaker: "Do you like",
      subject: "Chit Chat Dynamo",
    };

    const initialCount = phrasesService.list.childNodes.length;

    await phrasesService.addRow(newPhrase);

    expect(phrasesService.list.childNodes.length).toBe(initialCount+1);
  });

  it('should delete a phrase', async () => {
    const _id = "1337";

    const initialCount = phrasesService.list.childNodes.length;

    await phrasesService.deleteRow(_id);

    expect(phrasesService.list.childNodes.length).toBe(initialCount-1);
  });

  it('should update an individual phrase', () => {
    //no functionality to test (see method notes)
    const _id = "1337";
    const updatePhraseServiceSpy = spyOn(phrasesService, 'updateRow');

    phrasesService.updateRow(_id);

    expect(updatePhraseServiceSpy).toHaveBeenCalled();
  });
});
