//phrase service that configs messages for CRUD
const PHRASES_API = BASE_API_URL+ '/phrases';

class PhrasesAPIService {
    getPhrases = () => _get(PHRASES_API, DEFAULT_OPTIONS_WITH_AUTH);

    createPhrase = (formData) => _post(PHRASES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    readPhrase = (_id) => _post(PHRASES_API, _id, DEFAULT_OPTIONS_WITH_AUTH);

    updatePhrase = (formData) => _post(PHRASES_API + '/' + formData._id, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deletePhrase = (_id) => _delete(PHRASES_API + '/' + _id, DEFAULT_OPTIONS_WITH_AUTH);
}