<?php
import('lib.pkp.classes.plugins.ThemePlugin');

use APP\facades\Repo;

class PublicationsThemePlugin extends ThemePlugin {

    /**
     * Load the custom styles for our theme
     * @return null
     */
    public function init() {

        HookRegistry::register ('TemplateManager::display', array($this, 'loadTemplateData'));

        // Use the parent theme's unique plugin slug
        $this->setParent('defaultthemeplugin');

        // Register theme options
        $this->addOption('typography', 'FieldOptions', [
            'type' => 'radio',
            'label' => __('plugins.themes.default.option.typography.label'),
            'description' => __('plugins.themes.default.option.typography.description'),
            'options' => [
                [
                    'value' => 'notoSans',
                    'label' => __('plugins.themes.default.option.typography.notoSans'),
                ],
                [
                    'value' => 'notoSerif',
                    'label' => __('plugins.themes.default.option.typography.notoSerif'),
                ],
                [
                    'value' => 'notoSerif_notoSans',
                    'label' => __('plugins.themes.default.option.typography.notoSerif_notoSans'),
                ],
                [
                    'value' => 'notoSans_notoSerif',
                    'label' => __('plugins.themes.default.option.typography.notoSans_notoSerif'),
                ],
                [
                    'value' => 'lato',
                    'label' => __('plugins.themes.default.option.typography.lato'),
                ],
                [
                    'value' => 'lora',
                    'label' => __('plugins.themes.default.option.typography.lora'),
                ],
                [
                    'value' => 'lora_openSans',
                    'label' => __('plugins.themes.default.option.typography.lora_openSans'),
                ],
                [
                    'value' => 'cargan_openSans',
                    'label' => __('plugins.themes.publications-theme.option.typography.cargan_openSans'),
                ],
            ],
            'default' => 'notoSans',
        ]);

        // Store additional LESS variables to process based on options
        $additionalLessVariables = array();

        if ($this->getOption('typography') === 'notoSerif') {
            $this->addStyle('font', 'styles/fonts/notoSerif.less');
            $additionalLessVariables[] = '@font: "Noto Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif;';
        } elseif (strpos($this->getOption('typography'), 'notoSerif') !== false) {
            $this->addStyle('font', 'styles/fonts/notoSans_notoSerif.less');
            if ($this->getOption('typography') == 'notoSerif_notoSans') {
                $additionalLessVariables[] = '@font-heading: "Noto Serif", serif;';
            } elseif ($this->getOption('typography') == 'notoSans_notoSerif') {
                $additionalLessVariables[] = '@font: "Noto Serif", serif;@font-heading: "Noto Sans", serif;';
            }
        } elseif ($this->getOption('typography') == 'lato') {
            $this->addStyle('font', 'styles/fonts/lato.less');
            $additionalLessVariables[] = '@font: Lato, sans-serif;';
        } elseif ($this->getOption('typography') == 'lora') {
            $this->addStyle('font', 'styles/fonts/lora.less');
            $additionalLessVariables[] = '@font: Lora, serif;';
        } elseif ($this->getOption('typography') == 'lora_openSans') {
            $this->addStyle('font', 'styles/fonts/lora_openSans.less');
            $additionalLessVariables[] = '@font: "Open Sans", sans-serif;@font-heading: Lora, serif;';

        // dai-specific: add Cargan font combinded with OpenSans
        } elseif ($this->getOption('typography') == 'cargan_openSans') {
            $this->addStyle('font', 'styles/fonts/cargan_openSans.less');
            $additionalLessVariables[] = '@font: "Open Sans", sans-serif;@font-heading: Cargan, serif;';
        } else {
            $this->addStyle('font', 'styles/fonts/notoSans.less');
        }

        // Pass additional LESS variables based on options
        if (!empty($additionalLessVariables)) {
            $this->modifyStyle('stylesheet', array('addLessVariables' => join("\n", $additionalLessVariables)));
        }

        $this->addScript('idaiworld-dropdown', 'js/idai-world.js');
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

    /**
     * load (additional) template aata:
     *
     * @param string $hookname
     * @param array $args [$templateMgr, $template, $sendContentType, $charset, $output]
     */
    public function loadTemplateData($hookName, $args) {

        // retrieve the templateManager
		$templateMgr = $args[0];

		// attach seriesFactory to templateManager
        $sectionFactory = Repo::section();
        if($sectionFactory) {
            $templateMgr->assign("sectionFactory",  $sectionFactory);
        }

        // attach orcidSVG as orcidIcon to templateManager (independent from orcidProfilePlugin)
        $orcidIconSvg = '
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve">
            <style type="text/css">
                svg{height:1rem;}
                .st0{fill:#A6CE39;}
                .st1{fill:#FFFFFF;}
            </style>
            <path class="st0" d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z"/>
            <g>
            <path class="st1" d="M86.3,186.2H70.9V79.1h15.4v48.4V186.2z"/>
            <path class="st1" d="M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5   c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z"/>
            <path class="st1" d="M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1   C84.2,46.7,88.7,51.3,88.7,56.8z"/>
            </g>
        </svg>';
        $templateMgr->assign("orcidIcon", $orcidIconSvg);
		return false;
    }
}
