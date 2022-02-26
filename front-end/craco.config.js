const CracoLessPlugin = require('craco-less');

module.exports = {
    vendor: [
        'xlsx',
        'file-saver'
    ],
    node: { fs: 'empty' },
    externals: [
        { './cptable': 'var cptable' },
        { './jszip': 'jszip' }
    ],
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {

                        javascriptEnabled: true,
                        modifyVars: {
                            '@primary-color': '#258fe6f7', // primary color for all components
                            '@link-color': '#1890ff', // link color
                            '@success-color': '#52c41a', // success state color
                            '@warning-color': '#faad14', // warning state color
                            '@error-color': '#f5222d', // error state color
                            '@font-size-base': '14px', // major text font size
                            '@heading-color': '#001529',
                            '@text-color': 'black', // major text color
                            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
                            '@disabled-color': '#d8d0d0', // disable state color
                            '@disabled-bg': '#d8d0d0',
                            '@border-radius-base': '0px', // major border radius
                            // '@border-color-base': '#40a9ffb5', // major border color
                            '@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers
                            '@btn-disable-color': 'black',
                            '@btn-disable-bg': '@disabled-color',
                            '@btn-disable-border': '@disabled-color',
                            // @table-bg: @component-background;
                            '@table-header-bg': '#71bdfbd9',
                            '@table-header-color': '#001529', // thead table bg
                            '@table-header-sort-bg': '#86c6fbd9',
                            '@table-body-sort-bg': '#fafafa',
                            '@table-row-hover-bg': '#ffcab0',
                            '@input-disabled-color': 'black',
                            // @table-selected-row-color: inherit;
                            // @table-selected-row-bg: @primary-1;
                            // @table-body-selected-sort-bg: @table-selected-row-bg;
                            '@table-selected-row-hover-bg': '#ffcab0',
                            '@table-expanded-row-bg': 'rgba(78, 174, 242, 0.22)',
                            '@table-expand-icon-bg': 'orange',
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
                            '@menu-dark-bg': '#001529',
                            '@menu-dark-arrow-color': '#fff',
                            // @menu-dark-inline-submenu-bg: #000c17;
                            // @menu-dark-highlight-color: #fff;
                            // @menu-dark-item-active-bg: @primary-color;
                            // @menu-dark-item-active-danger-bg: @error-color;
                            // @menu-dark-selected-item-icon-color: @white;
                            // @menu-dark-selected-item-text-color: @white;


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
                            '@menu-dark-item-hover-bg': '#258fe6f7',

                            // Form
                            // ---
                            // @label-required-color: @highlight-color;
                            '@label-color': 'black',
                            // @form-warning-input-bg: @input-bg;
                            '@form-item-margin-bottom': '0px',
                            // @form-item-trailing-colon: true;
                            '@form-vertical-label-padding': '0 0 2px 2px',
                            // @form-vertical-label-margin: 0;
                            // @form-item-label-font-size: @font-size-base;
                            // @form-item-label-height: @input-height-base;
                            // @form-item-label-colon-margin-right: 8px;
                            // @form-item-label-colon-margin-left: 2px;
                            // @form-error-input-bg: @input-bg;


                            // Collapse
                            // ---
                            // '@collapse-header-padding':'5px';
                            // @collapse-header-padding-extra: 40px;
                            '@collapse-header-bg': '#40a9ffb5',
                            '@collapse-content-padding': '5px',
                            '@collapse-content-bg': '#fbfbfbd4',
                            // @collapse-header-arrow-left: 16px;

                            // Card
                            // ---
                            '@card-head-color': 'black',
                            '@card-head-background': '#e2b768',
                            // @card-head-font-size: @font-size-lg;
                            // @card-head-font-size-sm: @font-size-base;
                            '@card-head-padding': '16px',
                            '@card-head-padding-sm': '5px',
                            '@card-head-height': '24px',
                            // @card-head-height-sm: 36px;
                            '@card-inner-head-padding': '5px',
                            '@card-padding-base': '12px',
                            // @card-padding-base-sm: (@card-padding-base / 2);
                            // @card-actions-background: @component-background;
                            // @card-actions-li-margin: 12px 0;
                            // @card-skeleton-bg: #cfd8dc;
                            // @card-background: @component-background;
                            // @card-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
                            //   0 5px 12px 4px rgba(0, 0, 0, 0.09);
                            // @card-radius: @border-radius-base;
                            // @card-head-tabs-margin-bottom: -17px;
                            // @card-head-extra-color: @text-color;

                            // Radio
                            // @radio-size: 16px;
                            // @radio-top: 0.2em;
                            // @radio-border-width: 1px;
                            // @radio-dot-size: @radio-size - 8px;
                            // @radio-dot-color: @primary-color;
                            // @radio-dot-disabled-color: fade(@black, 20%);
                            // @radio-solid-checked-color: @component-background;

                            // Radio buttons
                            // @radio-button-bg: @btn-default-bg;
                            '@radio-button-checked-bg': 'orange',
                            // @radio-button-color: @btn-default-color;
                            // @radio-button-hover-color: @primary-5;
                            '@radio-button-active-color': 'orange',
                            // @radio-disabled-button-checked-bg: @disabled-active-bg;
                            // @radio-disabled-button-checked-color: @disabled-color;
                            // @radio-wrapper-margin-right: 8px;

                            // checkbox

                            // Modal
                            // --
                            // @modal-header-padding-vertical: @padding-md;
                            // @modal-header-padding-horizontal: @padding-lg;
                            // @modal-body-padding: @padding-lg;
                            '@modal-header-bg': '#6aafd8',
                            // @modal-header-padding: @modal-header-padding-vertical @modal-header-padding-horizontal;
                            // @modal-header-border-width: @border-width-base;
                            // @modal-header-border-style: @border-style-base;
                            // @modal-header-title-line-height: 22px;
                            // @modal-header-title-font-size: @font-size-lg;
                            // @modal-header-border-color-split: @border-color-split;
                            // @modal-header-close-size: 56px;
                            // @modal-content-bg: @component-background;
                            // @modal-heading-color: @heading-color;
                            // @modal-close-color: @text-color-secondary;
                            // @modal-footer-bg: transparent;
                            // @modal-footer-border-color-split: @border-color-split;
                            // @modal-footer-border-style: @border-style-base;
                            // @modal-footer-padding-vertical: 10px;
                            // @modal-footer-padding-horizontal: 16px;
                            // @modal-footer-border-width: @border-width-base;
                            // @modal-mask-bg: fade(@black, 45%);
                            // @modal-confirm-body-padding: 32px 32px 24px;

                            // Transfer
                            // // ---
                            // @transfer-header-height: 40px;
                            // @transfer-item-height: @height-base;
                            // @transfer-disabled-bg: @disabled-bg;
                            // @transfer-list-height: 200px;
                            '@transfer-item-hover-bg': '@table-row-hover-bg',
                            // @transfer-item-padding-vertical: 6px;
                            // @transfer-list-search-icon-top: 12px;




                        },
                    },
                },
            },
        },
    ],
};