import { connect } from 'react-redux';
import LanguageSelector from './LanguageSelector';
import { changeLanguage, getLanguages, getCurrentLanguage } from "./../../../reducers/common/localization";

const mapStateToProps = state => {
    return {
        currentLanguage: getCurrentLanguage(state),
        languages: getLanguages(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeLanguage: (lang) => {
            dispatch(changeLanguage(lang));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
