/**
 *
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 *
 */
define(['./ns-faas'], function(_faas) {
  function pageInit() {}

  function createBookmark() {
    
    var bookmark = {
      category: '',
      name: '',
      url: ''
    };

    // TODO: Can I use promises here? please say yes...!

    Ext.MessageBox.prompt("New Bookmark", "Please enter the bookmark category:", function(btnId, value) {
      bookmark.category = value;

      Ext.MessageBox.prompt("New Bookmark", "Please enter the bookmark name:", function(btnId, value) {
        bookmark.name = value;

        Ext.MessageBox.prompt("New Bookmark", "Please enter the bookmark URL:", function(btnId, value) {
          bookmark.url = value;

          _faas.create(bookmark);

        });
      });
    });

  }

  return {
    pageInit: pageInit,
    createBookmark: createBookmark
  };
});
