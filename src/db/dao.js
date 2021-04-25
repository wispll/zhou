var db;

export function openDB(onSuccess) {
  if (db !== undefined) {
    onSuccess();
    return;
  }

  var request = window.indexedDB.open("work", 1);

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore;
    if (!db.objectStoreNames.contains("zhou")) {
      objectStore = db.createObjectStore("zhou", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("day", ["day", "month", "year"], {
        unique: false,
      });
      objectStore.createIndex("month", ["month", "year"], { unique: false });
    }
  };

  request.onerror = function () {
    console.log("数据库打开报错");
  };
  request.onsuccess = function () {
    db = request.result;
    console.log("数据库打开成功");
    onSuccess();
  };
}

export function add(onSuccess, item) {
  var request = db
    .transaction(["zhou"], "readwrite")
    .objectStore("zhou")
    .add(item);

  request.onerror = function () {
    console.log("数据写入失败");
  };
  request.onsuccess = function () {
    console.log("数据写入成功");
    onSuccess();
  };
}

export function get(onSuccess, { day, month, year }) {
  var transaction = db.transaction(["zhou"]);
  var objectStore = transaction.objectStore("zhou");
  var request;
  if (day && month && year) {
    request = objectStore.index("day").getAll([day, month, year]);
  } else if (month && year) {
    request = objectStore.index("month").getAll([month, year]);
  } else {
    return;
  }

  request.onerror = function () {
    console.log("读取失败");
  };

  request.onsuccess = function () {
    if (request.result) {
      onSuccess(request.result);
    } else {
      console.log("未获得数据记录");
    }
  };
}

export function update(onSuccess, item) {
  var request = db
    .transaction(["zhou"], "readwrite")
    .objectStore("zhou")
    .put(item);

  request.onsuccess = function () {
    onSuccess(request.result);
    console.log("数据更新成功");
  };

  request.onerror = function () {
    console.log("数据更新失败");
  };
}

export function remove(onSuccess, key) {
  var request = db
    .transaction(["zhou"], "readwrite")
    .objectStore("zhou")
    .delete(key);

  request.onsuccess = function () {
    console.log("数据删除成功");
    onSuccess();
  };
  request.onerror = function () {
    console.log("数据删除失败");
  };
}
