/*
Article's Source Editor
Author: Krerkkiat Chusap
License: MIT
Based on Dek-D's Story Editor
Powered by CodeMirror, js-beautify, require.js, Font Awesome, and jQuery
*/
//var editorHost = 'http://localhost:8000/';
var editorHost = 'https://krerkkiat.github.io/dekd/article-source-editor/';

var Util = {};
Util.getCSS = function(href) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', href);
    document.getElementsByTagName('head')[0].appendChild(link);
};

var ArticleSourceEditor = {};

// Initialize the application.
ArticleSourceEditor.init = function () {
    this.state = 'hidden';
    
    this._setupStyle();
    this._createContainer();
    this._createExternalMenuItem();

    this.attach();
    
    this._loadResources();
};

// Load the application style.
ArticleSourceEditor._setupStyle = function () {
    Util.getCSS(editorHost + 'css/style.css');
};

ArticleSourceEditor._createContainer = function () {
    var that = this;
    
    this.container = document.createElement('div');
    this.container.id = 'aae-container';
    
    $(this.container).addClass('hide');
    
    this.infoDialog = document.createElement('div');
    this.infoDialog.id = 'infoDialog';
    // Too lazy to create elements.
    this.infoDialog.innerHTML = '<h3 class="title">About</h3><div class="content"><p><b>Article\'s Source Editor</b></p><p>Author: Krerkkiat Chusap</p><p>License: MIT</p><p>Based on Dek-D\'s Story Editor</p><p>Powered by <a href="http://codemirror.net/" target="_blank">CodeMirror</a>, <a href="https://github.com/beautify-web/js-beautify" target="_blank">js-beautify</a>, <a href="http://requirejs.org/" target="_blank">require.js</a>, <a href="http://fortawesome.github.io/Font-Awesome" target="_blank">Font Awesome</a>, and <a href="http://jquery.com/" target="_blank">jQuery</a>.</p><p>Code can be found at <a href="https://github.com/krerkkiat/article-source-editor" target="_blank">github</a>.</p></div>';
    
    this.backdrop = document.createElement('div');
    this.backdrop.id = 'aaeBackdrop';
    this.backdrop.addEventListener('click', function (e) {
        $(that.infoDialog).hide();
        $(that.backdrop).hide();
    });
    
    $(this.container).append($(this.infoDialog));
    $(this.infoDialog).hide();
    
    $(document.body).append($(this.backdrop));
    $(this.backdrop).hide();
};

ArticleSourceEditor._createExternalMenuItem = function () {
    var that = this;
    
    var showToggleBtn = document.createElement('a');
    showToggleBtn.id = 'showToggleBtn';
    showToggleBtn.href = '#';
    showToggleBtn.innerHTML = '<i class="fa fa-terminal"></i> View source';
    showToggleBtn.className = 'btn-action btn-raised btn-orange-theme';
    showToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (that.state == 'hidden') {
            that.showEditor();
        } else if (that.state == 'shown') {
            that.hideEditor();
        }
    });
    
    var showInfoBtn = document.createElement('a');
    showInfoBtn.id = 'showInfoBtn';
    showInfoBtn.href = '#';
    showInfoBtn.innerHTML = '<i class="fa fa-info" aria-hidden="true"></i>';
    showInfoBtn.className = 'btn-action btn-raised btn-orange-theme';
    showInfoBtn.addEventListener('click', function (e) {
        e.preventDefault();
        $(that.infoDialog).show();
        $(that.backdrop).show();
    });
    
    $('.btn-action-wrapper').append($(showToggleBtn));
    $('.btn-action-wrapper').append($(showInfoBtn));
    
    $('#showInfoBtn').hide();
};

// Load essential resources, and set them up.
ArticleSourceEditor._loadResources = function () {
    var that = this;
    Util.getCSS(editorHost + 'codemirror/lib/codemirror.css');
    Util.getCSS(editorHost + 'codemirror/addon/fold/foldgutter.css');
    Util.getCSS(editorHost + 'codemirror/addon/hint/show-hint.css');
    
    $.getScript(editorHost + 'requirejs/require.js', function () {
        require([editorHost + 'requirejs/config'], function () {
            // Load our editor and its addon.
            require(['codemirror/lib/codemirror',
                'codemirror/mode/javascript/javascript',
                'codemirror/mode/css/css',
                'codemirror/mode/xml/xml',
                'codemirror/mode/htmlmixed/htmlmixed',
                'codemirror/addon/fold/xml-fold',
                'codemirror/addon/edit/matchbrackets',
                'codemirror/addon/edit/matchtags',
                'codemirror/addon/selection/active-line',
                'codemirror/addon/hint/show-hint',
                'codemirror/addon/hint/xml-hint',
                'codemirror/addon/hint/html-hint',
                'codemirror/addon/fold/foldcode',
                'codemirror/addon/fold/foldgutter',
                'codemirror/addon/fold/brace-fold',
                'codemirror/addon/fold/xml-fold',
                'codemirror/addon/fold/markdown-fold',
                'codemirror/addon/fold/comment-fold'
            ], function (CodeMirror) {
                that.codeMirror = CodeMirror(that.container, {
                    lineWrapping: true,
                    lineNumbers: true,
                    mode: {
                        name: "htmlmixed"
                    },
                    matchBrackets: true,
                    matchTags: true,
                    styleActiveLine: true,
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    extraKeys: {"Ctrl-Space": "autocomplete"}
                });
            });

            // Load and setup the js-beautify.
            require(['js-beautify/js/lib/beautify'], function (result) {
                that.js_beautify = result.js_beautify;
            });

            require(['js-beautify/js/lib/beautify-css'], function (result) {
                that.css_beautify = result.css_beautify;
            });

            require(['js-beautify/js/lib/beautify-html'], function (result) {
                that.html_beautify = result.html_beautify;
            });
        });
    });
};

ArticleSourceEditor.showEditor = function () {
    this.state = 'shown';
    $('#showToggleBtn')[0].innerHTML = '<i class="fa fa-terminal"></i> View text';
    
    WYSIWYG.viewSource('story-content');

    // Get text and write to our editor
    var existText = this.html_beautify(editor_1.find('body').text());
    this.codeMirror.setValue(existText);

    // Hide Dek-D's editor.
    $('div.main-container').hide();
    $('#story-editor-footer').hide();
    
    // Hide #side-nav
    $('#side-nav').hide();
    $('.page-wrapper').addClass('-side-collapse');
    //$('div.chapter-li-wrapper').hide();
    
    // Hide floating autosave button.
    $('.action-autosave-wrapper').hide();
    
    // Add shadow to #story-editor-toolbar
    $('#story-editor-toolbar').addClass('shadow');
    
    // Hide components in #story-editor-toolbar
    $('.btn-action-view').hide();
    $('.btn-action-save').hide();
    //$('.btn-action-save-reapprove').hide();
    $('.btn-action-publish').hide();
    
    

    // Show our editor.
    $(this.container).removeClass('hide').addClass('show');
    $('#showInfoBtn').show();

    // Re-initialize our editor.
    this.codeMirror.refresh();
    this.codeMirror.matchBrackets();
};

ArticleSourceEditor.hideEditor = function () {
    this.state = 'hidden';
    $('#showToggleBtn')[0].innerHTML = '<i class="fa fa-terminal"></i> View source';
    
    // Write text back
    var existText = this.codeMirror.getValue();
    editor_1.find("body").text(existText);

    // Show Dek-D's editor.
    $('div.main-container').show();
    $('#story-editor-footer').show();
    
    // Show #side-nav
    $('#side-nav').show();
    $('.page-wrapper').removeClass('-side-collapse');
    //$('div.chapter-li-wrapper').show();
    
    // Show floating autosave button.
    $('.action-autosave-wrapper').show();
    
    // Remove shadow to #story-editor-toolbar
    $('#story-editor-toolbar').removeClass('shadow');
    
    // Show components in #story-editor-toolbar
    $('.btn-action-view').show();
    $('.btn-action-save').show();
    //$('.btn-action-save-reapprove').show();
    $('.btn-action-publish').show();
    
    
    
    // Hide our editor.
    $(this.container).removeClass('show').addClass('hide');
    $('#showInfoBtn').hide();

    WYSIWYG.viewText('story-content');
};

ArticleSourceEditor.detach = function () {
    $(this.container).detach();
};

ArticleSourceEditor.attach = function () {
    document.querySelector('.main-container-wrapper').appendChild(this.container);
};

// Initialize the whole process.
ArticleSourceEditor.init();

/* Note during the development (might be outdated).
// An idea to get raw text and rich text.
$('#wysiwygstory-content').contents().find('body')
    .text
    .html

// Story Editor's internal API
story_editor.save()
story_editor.save_publish()
story_editor.editor.hide_html()
story_editor.editor.show_html()

// Code to change mode of the WYSIWYG.
WYSIWYG.viewSource('story-content')
WYSIWYG.viewText('story-content')

// Get text from Dek-D's editor.
editor_1.find('body').text()
OR $('#wysiwygstory-content').contents().find('body').text()

Potential Editors:
    codemirror
        how to use http://lesstester.com/
    ace
        Used by Drive Notepad
        https://ace.c9.io/

Procedure:

Prerequisites:
    use python to serve local code
    use $.getScript to fetch local code
        $.getScript("//127.0.0.1:8080/lib/codemirror.js");

Initialization &
Reload
    change WYSIWYG's mode to viewSource
    activate our editor 
    load text to it

Editing
    use jQuery to edit source code
    do not write them back

Saving
    call by click on our save btn
    put the code back to dek-d's editor
    change the mode back to viewText
    call dek-d's save function

    anticipate that code filtering occur in this step

Problem: This method will require DevTools to be always open
Suggestion: Create chrome extension that can always inject the script & lib

*/