const CracoLessPlugin = require('craco-less');

module.exports = {
    vendor: [
        'xlsx',
        'file-saver'
    ],
    node: {fs: 'empty'},
    externals: [
        {'./cptable': 'var cptable'},
        {'./jszip': 'jszip'}
    ],
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {

                        javascriptEnabled: true,
                        modifyVars: {
                            '@primary-color': '#FF8303', // primary color for all components
                            '@link-color': '#1890ff', // link color
                            '@success-color': '#01937C', // success state color
                            '@warning-color': '#F7A440', // warning state color
                            '@error-color': '#CE1212', // error state color
                            '@font-size-base': '14px', // major text font size
                            '@heading-color': 'black',
                            '@text-color': 'black', // major text color
                            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
                            '@disabled-color': '#F0E3CA', // disable state color
                            '@border-radius-base': '0px', // major border radius
                            '@border-color-base': '#FF8303', // major border color
                            '@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers


                            // @table-bg: @component-background;
                            '@table-header-bg': '#FEA82F',
                            '@table-header-color': 'black', // thead table bg
                            '@table-header-sort-bg': '#86c6fbd9',
                            '@table-body-sort-bg': '#FCECDD',
                            '@table-row-hover-bg': '#FCECDD',
                            // @table-selected-row-color: inherit;
                            // @table-selected-row-bg: @primary-1;
                            // @table-body-selected-sort-bg: @table-selected-row-bg;
                            '@table-selected-row-hover-bg':  '#FCECDD',
                            // @table-expanded-row-bg: #fbfbfb;
                            '@table-padding-vertical': '7px',
                            '@table-padding-horizontal': '10px',
                            // @table-padding-vertical-md: (@table-padding-vertical * 3 / 4);
                            // @table-padding-horizontal-md: (@table-padding-horizontal / 2);
                            // @table-padding-vertical-sm: (@table-padding-vertical / 2);
                            // @table-padding-horizontal-sm: (@table-padding-horizontal / 2);
                            // @table-border-color: @border-color-split;
                            // @table-border-radius-base: @border-radius-base;
                            // @table-footer-bg: @background-color-light;
                            // @table-footer-color: @heading-color;
                            // @table-header-bg-sm: @table-header-bg;
                            // @table-font-size: @font-size-base;
                            // @table-font-size-md: @table-font-size;
                            // @table-font-size-sm: @table-font-size;
                            // @table-header-cell-split-color: rgba(0, 0, 0, 0.06)


                            // dark theme
                            // @menu-dark-color: @text-color-secondary-dark;
                            // @menu-dark-danger-color: @error-color;
                            '@menu-dark-bg': 'linear-gradient(90deg, #ab6d2d, #FF8303)',
                            '@menu-dark-arrow-color': '#FCECDD',
                            // @menu-dark-inline-submenu-bg: #000c17;
                            // @menu-dark-highlight-color: #fff;
                            // @menu-dark-item-active-bg: @primary-color;
                            // @menu-dark-item-active-danger-bg: @error-color;
                            // @menu-dark-selected-item-icon-color: @white;
                            // @menu-dark-selected-item-text-color: @white;
                            // @menu-dark-item-hover-bg: transparent;


                            // dark theme
                            // @menu-dark-color: @text-color-secondary-dark;
                            // @menu-dark-danger-color: @error-color;
                            // @menu-dark-bg: @layout-header-background;
                            // @menu-dark-arrow-color: #fff;
                            // @menu-dark-inline-submenu-bg: #000c17;
                            // @menu-dark-highlight-color: #fff;
                            // @menu-dark-item-active-bg: @primary-color;
                            // @menu-dark-item-active-danger-bg: @error-color;
                            // @menu-dark-selected-item-icon-color: @white;
                            // @menu-dark-selected-item-text-color: @white;
                            '@menu-dark-item-hover-bg': '#1B1A17',

                            // Form
                            // ---
                            // @label-required-color: @highlight-color;
                            '@label-color': 'black',
                            // @form-warning-input-bg: @input-bg;
                            // @form-item-margin-bottom: 24px;
                            // @form-item-trailing-colon: true;
                            '@form-vertical-label-padding': '0 0 2px 2px',
                            // @form-vertical-label-margin: 0;
                            // @form-item-label-font-size: @font-size-base;
                            // @form-item-label-height: @input-height-base;
                            // @form-item-label-colon-margin-right: 8px;
                            // @form-item-label-colon-margin-left: 2px;
                            // @form-error-input-bg: @input-bg;


                        },
                    },
                },
            },
        },
    ],
};