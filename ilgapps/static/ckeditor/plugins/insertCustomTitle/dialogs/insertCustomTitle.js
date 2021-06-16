//CKEDITOR.dialog.add('helloworld', function (editor) {
//    var _escape = function (value) {
//        return value;
//    };
//    return {
//        title: editor.lang.dlgTitle,
//        resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
//        minWidth: 360,
//        minHeight: 150,
//        contents: [{
//            id: 'cb',
//            name: 'cb',
//            label: 'cb',
//            title: 'cb',
//            elements: [{
//                type: 'textarea',
//                required: true,
//                label: editor.lang.mytxt,
//                style: 'width:350px;height:100px',
//                rows: 6,
//                id: 'mytxt',
//                'default': 'Hello World'
//            }]
//        }],
//        onOk: function () {
//            var mytxt = this.getValueOf('cb', 'mytxt');
//            editor.insertHtml(mytxt);
//        },
//        onLoad: function () {
//        }
//    };
//});

CKEDITOR.dialog.add( 'insertCustomTitle', function( editor )
		{
			// CKEDITOR.dialog.definition
			var dialogDefinition =
			{
				title : '插入标题',
				minWidth : 390,
				minHeight : 130,
				contents : [
					{
						id : 'tab1',
						label : 'Label',
						title : 'Title',
						expand : true,
						padding : 0,
						elements :
						[
							{
								type : 'html',
								html : '<p>输入标题</p>'
							},
							{
								type : 'textarea',
								id : 'textareaId',
								rows : 4,
								cols : 40
							}
						]
					}
				],
				buttons : [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ],
				onOk : function() {
					// "this" is now a CKEDITOR.dialog object.
					// Accessing dialog elements:
					//var textareaObj = this.getContentElement( 'tab1', 'textareaId' );
					//alert( "You have entered: " + textareaObj.getValue() );
                    var dialog = this;
                    var myh2 = editor.document.createElement( 'h2' );
                    var myspan = editor.document.createElement( 'span' );
                    var rawtext = dialog.getValueOf( 'tab1', 'textareaId' );
                    myspan.setText(rawtext);
                    myspan.setAttribute('style','background:#f8aa01;padding: 3px 10px;');
                    myh2.append(myspan)
                    editor.insertElement( myh2 );
				}
			};

			return dialogDefinition;
		} );