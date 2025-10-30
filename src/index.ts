import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './request';

/**
 * Initialization data for the climb-jupyter-base extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'climb-jupyter-base:plugin',
  description: 'Base functionality for CLIMB JupyterLab Extensions.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null
  ) => {
    console.log('JupyterLab extension climb-jupyter-base is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log(
            'climb-jupyter-base settings loaded:',
            settings.composite
          );
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for climb-jupyter-base.',
            reason
          );
        });
    }

    requestAPI<any>('hello')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The climb_jupyter_base server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
