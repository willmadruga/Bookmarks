/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(["N/ui/serverWidget", "./ns-faas"], function(_ui, _faas) {

  function createColumns(list) {
    list.addColumn({
      id : 'category',
      type : _ui.FieldType.TEXT,
      label : 'Category',
      align : _ui.LayoutJustification.CENTER
    });

    list.addColumn({
      id : 'name',
      type : _ui.FieldType.TEXT,
      label : 'Name',
      align : _ui.LayoutJustification.LEFT
    });

    list.addColumn({
      id : 'url',
      type : _ui.FieldType.URL,
      label : 'URL',
      align : _ui.LayoutJustification.LEFT
    });
  }

  function onRequest(context) {

    var list = _ui.createList({ title: "My Bookmarks" });

    list.clientScriptModulePath = "/SuiteScripts/ns-faas/ns-client.js";
    list.style = _ui.ListStyle.GRID;

    list.addButton({
      id: "custpage_new_bookmark",
      label: "New bookmark",
      functionName: "createBookmark"
    });

    var bookmarks = _faas.list();

    createColumns(list);
    bookmarks.forEach(function(e) {
      list.addRow({
        row: {
          category: e.category,
          name: e.name,
          url: e.url
        }
      });
    });

    context.response.writePage(list);
  }

  return {
    onRequest: onRequest
  };
});
