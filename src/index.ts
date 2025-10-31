import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { requestAPI } from './request';

export const PLUGIN_NAME = 'climb-jupyter-base';
const PLUGIN_ID = `${PLUGIN_NAME}:plugin`;

/**
 * Initialization data for the climb-jupyter-base extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  description: 'Base functionality for CLIMB JupyterLab Extensions.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null
  ) => {
    console.log(`JupyterLab extension ${PLUGIN_NAME} is activated!`);

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log(`${PLUGIN_NAME} settings loaded:`, settings.composite);
        })
        .catch(reason => {
          console.error(`Failed to load settings for ${PLUGIN_NAME}.`, reason);
        });
    }

    // Retrieve extension version and log to the console
    let version = '';
    requestAPI<any>('version')
      .then(data => {
        version = data['version'];
        console.log(`JupyterLab extension ${PLUGIN_NAME} version: ${version}`);
      })
      .catch(error =>
        console.error(`Failed to fetch ${PLUGIN_NAME} version: ${error}`)
      );
  }
};

export default plugin;
