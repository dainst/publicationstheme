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
        $this->addScript('idaiworld-dropdown', 'js/idai-world.js');
        $this->modifyStyle('stylesheet', array('addLess' => array('styles/index.less')));

        $this->addStyle('font', 'styles/fonts/Cargan.less');
        $additionalLessVariables[] = '@font: Cargan, serif;';

        // Pass additional LESS variables
        if (!empty($additionalLessVariables)) {
            $this->modifyStyle('stylesheet', array('addLessVariables' => join("\n", $additionalLessVariables)));
        }
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
