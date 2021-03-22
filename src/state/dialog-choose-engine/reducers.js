/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { combineReducers } from 'redux';

import {
  DIALOG_CHOOSE_ENGINE_CLOSE,
  DIALOG_CHOOSE_ENGINE_FORM_UPDATE,
  DIALOG_CHOOSE_ENGINE_OPEN,
} from '../../constants/actions';

const open = (state = false, action) => {
  switch (action.type) {
    case DIALOG_CHOOSE_ENGINE_CLOSE: return false;
    case DIALOG_CHOOSE_ENGINE_OPEN: return true;
    default: return state;
  }
};

const formInitialState = {
  engine: 'firefox',
  icon: null,
  id: '',
  name: '',
  url: '',
  opts: null,
};
const form = (state = formInitialState, action) => {
  switch (action.type) {
    case DIALOG_CHOOSE_ENGINE_OPEN: return {
      ...formInitialState,
      ...action.form,
    };
    case DIALOG_CHOOSE_ENGINE_CLOSE: return formInitialState;
    case DIALOG_CHOOSE_ENGINE_FORM_UPDATE: {
      const { changes } = action;
      return { ...state, ...changes };
    }
    default: return state;
  }
};

export default combineReducers({
  form,
  open,
});
