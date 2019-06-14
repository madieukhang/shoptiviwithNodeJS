CKEDITOR.editorConfig = function (config) {
	config.language = 'vi';
	config.skin = 'office2013';
	config.toolbarGroups = [
		{ name: 'document', groups: ['mode', 'document', 'doctools'] },
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
		{ name: 'forms', groups: ['forms'] },
		'/',
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
		{ name: 'links', groups: ['links'] },
		{ name: 'insert', groups: ['insert'] },
		'/',
		{ name: 'styles', groups: ['styles'] },
		{ name: 'colors', groups: ['colors'] },
		{ name: 'tools', groups: ['tools'] },
		{ name: 'others', groups: ['others'] },
		{ name: 'about', groups: ['about'] }
	];

	config.removeButtons = 'Link,Unlink,Anchor,Language,BidiLtr,CreateDiv,Blockquote,Outdent,Indent,ShowBlocks,Maximize,About,PageBreak,Iframe,HorizontalRule,Table,Flash,Image,Smiley,SpecialChar,Source,NewPage,Save,Print,Preview,Templates,Cut,PasteText,PasteFromWord,Paste,Copy,Redo,Undo,Find,SelectAll,Replace,Form,Scayt,Checkbox,Radio,Textarea,TextField,Select,Button,HiddenField,ImageButton,RemoveFormat,CopyFormatting';
};