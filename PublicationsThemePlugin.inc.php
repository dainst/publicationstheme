<?php
import('lib.pkp.classes.plugins.ThemePlugin');
class PublicationsThemePlugin extends ThemePlugin {

    /**
     * Load the custom styles for our theme
     * @return null
     */
    public function init() {

        // Use the parent theme's unique plugin slug
        $this->setParent('defaultthemeplugin');
        $this->addScript('idaiworld-dropdown', 'js/idai-world.js', $url);

        $this->modifyStyle('stylesheet', array('addLess' => array('styles/index.less')));
    }

   /**
   * Get the display name of this theme
   * @return string
   */
  function getDisplayName() {
    return __('plugins.themes.publications-theme.name');
  }

  /**
   * Get the description of this plugin
   * @return string
   */
  function getDescription() {
      return __('plugins.themes.publications-theme.description');
  }
}
