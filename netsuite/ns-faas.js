/**
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 *
 */
define(["N/https", "N/record"], function (_https, _record) {
  var url = "";

  function getBaseURL() {
    if (url.length === 0 || !url.startsWith('http')) {
      var conf = _record.load({ type: 'customrecord_wmad_faas_config', id: 1 });
      url = conf.getValue('custrecord_wmad_faas_url');
    }
    return url;
  }

  function list() {

    var response = _https.get(getBaseURL() + 'list');
    if (response.code === 200) {
      return JSON.parse(response.body);
    } else {
      console.error(reason);
      return [];
    }

  }

  function create(bookmark) {
    _https.post.promise({
      url: getBaseURL() + 'create',
      body: bookmark
    }).then(function (response) {
      Ext.MessageBox.alert('Success', response.body);
    }).catch(function onRejected(reason) {
      console.error(reason);
    });
  }

  return {
    create: create,
    list: list
  };
});
