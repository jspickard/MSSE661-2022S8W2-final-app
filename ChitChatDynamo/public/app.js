const accountPage = "home.html";

const icebreakersAPIService = new IcebreakersAPIService();
const subjectsAPIService = new SubjectsAPIService();
const phrasesAPIService = new PhrasesAPIService();

const phrasesService = new PhrasesService(phrasesAPIService);

phrasesService.init();

function functionNotAvailableYet() {
    alert('Function not available yet.');
}