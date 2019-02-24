import React, { Component } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import './LanguageSelector.scss';
import { Utils } from './../../../utils/utils';

class LanguageSelector extends Component {
    render() {
        return (
            <Input bsSize="sm" type="select" value={this.props.currentLanguage} onChange={(e) => this.props.onChangeLanguage(e.target.value)}>
                {Utils.getLanguagesOptions(this.props.languages)}
            </Input>
        );
    }
}

LanguageSelector.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    languages: PropTypes.object.isRequired,
    onChangeLanguage: PropTypes.func.isRequired
};

export default LanguageSelector;
