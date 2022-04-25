//subject service that configs messages for CRUD
const SUBJECTS_API = BASE_API_URL+ '/subjects';

class SubjectsAPIService {
    getSubjects = () => _get(SUBJECTS_API, DEFAULT_OPTIONS);

    createSubject = (formData) => _post(SUBJECTS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    readSubject = (_id) => _post(SUBJECTS_API, _id, DEFAULT_OPTIONS);

    updateSubject = (formData) => _post(SUBJECTS_API + '/' + formData._id, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deleteSubject = (_id) => _delete(SUBJECTS_API + '/' + _id, DEFAULT_OPTIONS);
    
    randomSubject = () => _get(SUBJECTS_API + '/getrandom', DEFAULT_OPTIONS);
}