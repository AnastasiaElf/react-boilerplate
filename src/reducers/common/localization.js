import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { translations } from "../../translations";
import { StorageManager } from "../../utils/storageManager";
import moment from 'moment';

//- Actions
export const setCurrentLanguage = createAction('CURRENT_LANGUAGE_SET', language => language);

export const getDefaultLanguage = () => {
    let newLanguage = StorageManager.getLanguage();
    if (_.isNil(newLanguage)) {
        let topLanguage = window.navigator.language;
        let languages = window.navigator.languages;
        if (_.isArray(languages)) {
            newLanguage = _.find(languages, language => _.includes(_.keys(translations), language.substring(0, 2))).substring(0, 2) || DEFAULT_LANGUAGE;
        } else if (!_.isNil(topLanguage) && _.includes(_.keys(translations), topLanguage.substring(0, 2))) {
            newLanguage = topLanguage.substring(0, 2);
        } else {
            newLanguage = DEFAULT_LANGUAGE;
        }
    }
    return newLanguage;
};

export const changeLanguage = (language) => (dispatch) => {
    dispatch(setCurrentLanguage(language));
    StorageManager.setLanguage(language);
};

const DEFAULT_LANGUAGE = 'en';

//- State
const initialState = {
    currentLanguage: DEFAULT_LANGUAGE,
    translation: null,
    translations
};

//- Reducers
export default handleActions({
    CURRENT_LANGUAGE_SET: (state, action) => {
        let languageCode = action.payload;
        if (_.has(state.translations, languageCode)) {
            let locale = state.translations[languageCode].momentLocale;
            _.includes(moment.locales(), locale) ? moment.locale(locale) : moment.locale(DEFAULT_LANGUAGE);
        } else {
            languageCode = DEFAULT_LANGUAGE;
            moment.locale(DEFAULT_LANGUAGE);
        }

        return { ...state, currentLanguage: languageCode };
    }
}, initialState);

//- Selectors
export const getLocalization = state => state.localization;

export const getCurrentLanguage = state => getLocalization(state).currentLanguage;

export const getTranslationsData = state => getLocalization(state).translations;

export const getCurrentTranslation = state => _.isNil(getTranslationsData(state)) || !_.has(getTranslationsData(state), getCurrentLanguage(state)) ? null : getTranslationsData(state)[getCurrentLanguage(state)];

export const getTranslationData = state => _.isNil(getCurrentTranslation(state)) ? null : getCurrentTranslation(state).translation;

export const getLanguages = state => _.mapValues(getTranslationsData(state), translation => translation.label);