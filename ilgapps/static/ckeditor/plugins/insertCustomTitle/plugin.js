/**
 * Created by wangx on 16-8-22.
 */
CKEDITOR.plugins.add('insertCustomTitle', {
    lang:['zh-cn','en'],
    requires: ['dialog'],
    init: function(a){
        var b = a.addCommand('insertCustomTitle', new CKEDITOR.dialogCommand('insertCustomTitle'));
        a.ui.addButton('insertCustomTitle', {
            label: a.lang.insertCustomTitle.tbTip,
            command: 'insertCustomTitle',
            icon: this.path + 'images/insertCustomTitle.png',
            width: '35px'
        });
        CKEDITOR.dialog.add('insertCustomTitle', this.path + 'dialogs/insertCustomTitle.js');
    }
});