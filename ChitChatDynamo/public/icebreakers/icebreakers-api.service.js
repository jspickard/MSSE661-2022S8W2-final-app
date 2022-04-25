//icebreaker service that configs messages for CRUD
const ICEBREAKERS_API = BASE_API_URL+ '/icebreakers';

class IcebreakersAPIService {
    getIcebreakers = () => _get(ICEBREAKERS_API, DEFAULT_OPTIONS);

    createIcebreaker = (formData) => _post(ICEBREAKERS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    readIcebreaker = (_id) => _post(ICEBREAKERS_API, _id, DEFAULT_OPTIONS);

    updateIcebreaker = (formData) => _post(ICEBREAKERS_API + '/' + formData._id, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deleteIcebreaker = (_id) => _delete(ICEBREAKERS_API + '/' + _id, DEFAULT_OPTIONS_WITH_AUTH);

    randomIcebreaker = () => _get(ICEBREAKERS_API + '/getrandom', DEFAULT_OPTIONS);
}