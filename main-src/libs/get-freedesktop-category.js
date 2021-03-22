/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const linuxCategories = require('./constants/freedesktop-categories-map');

// get freedesktop.org category from WebCatalog app category
const getFreedesktopCategory = (category) => {
  if (category && linuxCategories[category]) {
    return linuxCategories[category];
  }
  return {
    freedesktopMainCategory: 'Network',
    freedesktopAdditionalCategory: 'WebBrowser',
  };
};

module.exports = getFreedesktopCategory;
