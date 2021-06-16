/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

//CKEDITOR.editorConfig = function( config )
//{
//	// Define changes to default configuration here. For example:
//	// config.language = 'fr';
//	// config.uiColor = '#AADC6E';
//
//	config.language = 'zh-cn';
//
//	config.toolbar_MyBasic = [
//		[ 'Bold', 'Italic', '-', 'NumberedList','BulletedList' ],
//		['-', 'Link', 'Unlink', 'Image', 'helloworld']
//	];
//
//	//config.extraPlugins += (config.extraPlugins ? ',helloworld' : 'helloworld');
//	config.extraPlugins += (config.extraPlugins ? ',helloworld' : 'helloworld');
//};
CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.language = 'zh-cn';
    config.image_previewText = ' ';
    config.filebrowserImageUploadUrl = "/utils/api/uploadDescImg/";
    config.width = 600;
    config.height = 672;
    config.toolbar = 'MyToolbar';
    config.disableNativeTableHandles = true;
    config.allowedContent = true;
    config.contentsCss = ['/static/css/reset.css','/static/css/square.css'];
    //
    //config.toolbar_MyToolbar =
    //    [
    //        {name: 'document', items: ['Source', 'NewPage', 'Preview']},
    //        {name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']},
    //        {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
    //        {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']},
    //        '/',
    //        {name: 'styles', items: ['Styles', 'Format']},
    //        {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']},
    //        {
    //            name: 'insert', items: ['Image', '-', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'
    //            , 'Iframe']
    //        },
    //        {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
    //        {name: 'tools', items: ['Maximize', '-', 'About','insertCustomTitle']}
    //    ];
    config.toolbar_MyToolbar =
        [
            {name: 'document', items: ['Source', '-', '-']},
            {name: 'styles', items: ['Styles', 'Format']},
            {
                name: 'insert', items: ['Image', '-', '-', '-', '-', '-'
                , '-']
            },
            {name: 'tools', items: ['insertCustomTitle']}
        ];
    config.extraPlugins += (config.extraPlugins ? ',insertCustomTitle' : 'insertCustomTitle');
}