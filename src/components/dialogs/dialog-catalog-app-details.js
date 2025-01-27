/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import EnhancedDialogTitle from '../shared/enhanced-dialog-title';

import extractHostname from '../../helpers/extract-hostname';
import connectComponent from '../../helpers/connect-component';
import isUrl from '../../helpers/is-url';
import generateUrlWithRef from '../../helpers/generate-url-with-ref';

import { close } from '../../state/dialog-catalog-app-details/actions';

import {
  requestOpenInBrowser,
} from '../../senders';

import AppCard from '../shared/app-card';

const styles = (theme) => ({
  dialogContent: {
    paddingBottom: theme.spacing(4),
  },
  status: {
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  appDesc: {
    width: '100%',
  },
  appDescSection: {
    marginTop: theme.spacing(2),
    '& h5': {
      ...theme.typography.h6,
      margin: 0,
    },
    '& h5 + p': {
      marginTop: 0,
    },
  },
  legal: {
    marginTop: theme.spacing(1),
  },
  shareInput: {
    marginTop: theme.spacing(4),
  },
  appInfoName: {
    color: theme.palette.text.secondary,
  },
  helpButton: {
    marginLeft: theme.spacing(0.5),
    marginTop: -3,
  },
  ul: {
    margin: 0,
  },
  li: {
    marginLeft: '-0.8rem',
    cursor: 'pointer',
  },
});

const DialogCatalogAppDetails = ({
  classes,
  onClose,
  open,
  details,
}) => {
  const hostname = details ? extractHostname(details.url) : null;

  return (
    <Dialog
      className={classes.root}
      onClose={onClose}
      open={open}
      fullWidth
    >
      <EnhancedDialogTitle onClose={onClose} />
      <DialogContent className={classes.dialogContent}>
        {details ? (
          <>
            {details.err ? (
              <Typography variant="body2" className={classes.status}>
                Failed to Load App Information.
              </Typography>
            ) : (
              <>
                <AppCard
                  id={details.id}
                  name={details.name}
                  url={details.url}
                  category={details.category}
                  icon={details.icon}
                  iconThumbnail={isUrl(details.icon256) ? details.icon256 : `file://${details.icon256}`}
                  inDetailsDialog
                />
                <div className={classes.appDesc}>
                  {(details.url || details.id.startsWith('group-')) && (
                    <Typography variant="body2" color="textSecondary" className={classes.legal}>
                      {`We are not affiliated, associated, authorized, endorsed by or in any way officially connected to ${details.name}${hostname ? ` (${hostname})` : ''}, except for the fact that we use their websites to develop and provide you this app. All product names, logos, and brands are property of their respective owners.`}
                    </Typography>
                  )}

                  <div className={classes.appDescSection}>
                    {details.url && (
                      <Typography variant="body2">
                        <span className={classes.appInfoName}>URL: </span>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={(e) => {
                            e.preventDefault();
                            requestOpenInBrowser(generateUrlWithRef(details.url));
                          }}
                        >
                          {details.url}
                        </Link>
                      </Typography>
                    )}
                    {details.category && (
                      <Typography variant="body2">
                        <span className={classes.appInfoName}>Category: </span>
                        {details.category}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      <span className={classes.appInfoName}>ID: </span>
                      {details.id}
                    </Typography>
                    {details.relatedPaths && (
                      <Typography variant="body2" component="div">
                        <span className={classes.appInfoName}>Related Files & Directories: </span>
                        <ul className={classes.ul}>
                          {details.relatedPaths.map((pathDetails) => (
                            <li
                              key={pathDetails.path}
                              className={classes.li}
                            >
                              <Link onClick={() => window.remote.shell.showItemInFolder(pathDetails.path)}>
                                {pathDetails.path}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Typography>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <Typography variant="body2" className={classes.status}>
            Loading...
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

DialogCatalogAppDetails.defaultProps = {
  details: null,
};

DialogCatalogAppDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  details: PropTypes.object,
};

const mapStateToProps = (state) => ({
  open: state.dialogCatalogAppDetails.open,
  details: state.dialogCatalogAppDetails.details,
});

const actionCreators = {
  close,
};

export default connectComponent(
  DialogCatalogAppDetails,
  mapStateToProps,
  actionCreators,
  styles,
);
