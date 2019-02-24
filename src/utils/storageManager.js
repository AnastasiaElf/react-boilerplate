const LANGUAGE_ID = "project_lang";

export class StorageManager {    
    static setLanguage(language) {
        localStorage.setItem(LANGUAGE_ID, language);
    }

    static getLanguage() {
        return localStorage.getItem(LANGUAGE_ID);
    }
}