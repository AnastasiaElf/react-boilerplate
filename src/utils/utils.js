
import React from 'react';
import _ from 'lodash';

export class Utils {    
    static getLanguagesOptions(languages) {
        return _.map(languages, (label, code) => (
            <option value={code} key={code} title={label}>{_.toUpper(code)}</option>
        ));
    }
}