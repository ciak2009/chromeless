/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {
  DIALOG_CHOOSE_ENGINE_CLOSE,
  DIALOG_CHOOSE_ENGINE_FORM_UPDATE,
  DIALOG_CHOOSE_ENGINE_OPEN,
} from '../../constants/actions';

import { installApp } from '../app-management/actions';
import {
  isNameExisted,
} from '../app-management/utils';

import { requestShowMessageBox } from '../../senders';

export const close = () => ({
  type: DIALOG_CHOOSE_ENGINE_CLOSE,
});

export const updateForm = (changes) => ({
  type: DIALOG_CHOOSE_ENGINE_FORM_UPDATE,
  changes,
});

export const create = () => (dispatch, getState) => {
  const state = getState();

  const { form } = state.dialogChooseEngine;

  const {
    engine, id, icon, name, url, opts,
  } = form;

  if (isNameExisted(name, state)) {
    requestShowMessageBox(`An app named ${name} already exists.`, 'error');
    return null;
  }

  dispatch(installApp(engine, id, name, url, icon, opts));

  dispatch(close());
  return null;
};

export const open = (id, name, url, icon, opts = {}) => (dispatch, getState) => {
  const state = getState();

  const { preferredEngine } = state.preferences;

  dispatch(updateForm({
    engine: preferredEngine,
    icon,
    id,
    name,
    url,
    opts,
  }));

  return dispatch({
    type: DIALOG_CHOOSE_ENGINE_OPEN,
    form: {
      engine: preferredEngine,
      icon,
      id,
      name,
      url,
      opts,
    },
  });
};
