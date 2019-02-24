import { connect } from 'react-redux';
import App from './App';
import { getTranslationData } from "../reducers/common/localization";

const mapStateToProps = state => {
    return {
        translation: getTranslationData(state)
    };
};

export default connect(mapStateToProps)(App);
