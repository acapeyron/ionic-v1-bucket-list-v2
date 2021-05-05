angular.module('starter.services', [])

  .factory('BucketList', function ($http, db) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data

    // Will ad an if statement that distribute the data
    // between "fulfilled" and "toFulfill" arrays
    // when I'll use $http requests and a DB
    return {
      all: function () {
        return $http.get(db.db + '/_design/bucket-list/_view/all');
      },
      fulfilled: function () {
        return $http.get(db.db + '/_design/bucket-list/_view/fulfilled');
      },
      toFulfill: function () {
        return $http.get(db.db + '/_design/bucket-list/_view/toFulfill');
      },
      getItem: function (bucketListItemId) {
        return $http.get(db.db + '/' + bucketListItemId);
      },
      removeItem: function (bucketListItemId) {
        return $http.get(db.db + '/' + bucketListItemId).then(function(response){
          $http.delete(db.db + '/' + bucketListItemId+'?rev='+response.data._rev);
        });
      },
      addItem: function (bucketListItem) {
        return $http.post(db.db, bucketListItem);
      },
      complete: function(bucketListItemId){
        var today = new Date();
        var jsonDate = JSON.stringify(today);
        return $http.get(db.db + '/' + bucketListItemId).then(function(response){
          $http.put(db.db + '/' +bucketListItemId,
          {
            "_id": response.data._id,
            "_rev": response.data._rev,
            "created": response.data.created,
            "title": response.data.title,
            "description": response.data.description,
            "deadline": response.data.deadline,
            "photo": response.data.photo,
            "completed": true,
            "completedDate": jsonDate
          });
        });
      }
    };
  });