import { boot } from 'quasar/wrappers';
import { createPlugins } from '../plugins';
import { BubbleAPI } from '../api';
export const api = BubbleAPI.getInstance();
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: BubbleAPI;
  }
}
export default boot(async ({ app }) => {
  createPlugins(app);
});
