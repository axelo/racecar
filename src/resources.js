function Resources() {
  'use strict'; 

  function load(resources, progressCallback, finishedCallback) {

    var noOfResources = resources.length;
    var resourceMap = {};
    var failed;

    function success(url, loadedRes) {
      --noOfResources;

      resourceMap[url] = loadedRes;

      progressCallback(undefined, url);

      if (noOfResources <= 0) finishedCallback(failed, resourceMap);
    }

    function failure(url) {
      if (!failed) failed = [];
      failed.push({ url: url, cause: 'Unknown resource format'});

      --noOfResources;

      progressCallback(url);

      if (noOfResources <= 0) finishedCallback(failed, resourceMap);
    }

    resources.forEach(function (url) {

      if (url.endsWith('.png')) {
        var image = new Image();
        image.onload = function () { success(url, image); };
        image.onerror = function () { failure(url); };
        image.src = url;
      }
      else {
        failure(url);
      }

    });

  }

  return {
    load: load
  };
}