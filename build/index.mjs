// dist/worker.js
(() => {
  var __webpack_modules__ = {
    "./node_modules/base64-js/index.js": (__unused_webpack_module, exports) => {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
        }
        return parts.join("");
      }
    },
    "./node_modules/cross-fetch/dist/browser-ponyfill.js": function(module, exports) {
      var global = typeof self !== "undefined" ? self : this;
      var __self__ = function() {
        function F() {
          this.fetch = false;
          this.DOMException = global.DOMException;
        }
        F.prototype = global;
        return new F();
      }();
      (function(self2) {
        var irrelevant = function(exports2) {
          var support = {
            searchParams: "URLSearchParams" in self2,
            iterable: "Symbol" in self2 && "iterator" in Symbol,
            blob: "FileReader" in self2 && "Blob" in self2 && function() {
              try {
                new Blob();
                return true;
              } catch (e) {
                return false;
              }
            }(),
            formData: "FormData" in self2,
            arrayBuffer: "ArrayBuffer" in self2
          };
          function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
          }
          if (support.arrayBuffer) {
            var viewClasses = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]"
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
              return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
          }
          function normalizeName(name) {
            if (typeof name !== "string") {
              name = String(name);
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
              throw new TypeError("Invalid character in header field name");
            }
            return name.toLowerCase();
          }
          function normalizeValue(value) {
            if (typeof value !== "string") {
              value = String(value);
            }
            return value;
          }
          function iteratorFor(items) {
            var iterator = {
              next: function() {
                var value = items.shift();
                return { done: value === void 0, value };
              }
            };
            if (support.iterable) {
              iterator[Symbol.iterator] = function() {
                return iterator;
              };
            }
            return iterator;
          }
          function Headers2(headers) {
            this.map = {};
            if (headers instanceof Headers2) {
              headers.forEach(function(value, name) {
                this.append(name, value);
              }, this);
            } else if (Array.isArray(headers)) {
              headers.forEach(function(header) {
                this.append(header[0], header[1]);
              }, this);
            } else if (headers) {
              Object.getOwnPropertyNames(headers).forEach(function(name) {
                this.append(name, headers[name]);
              }, this);
            }
          }
          Headers2.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ", " + value : value;
          };
          Headers2.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
          };
          Headers2.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
          };
          Headers2.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
          };
          Headers2.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
          };
          Headers2.prototype.forEach = function(callback, thisArg) {
            for (var name in this.map) {
              if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
              }
            }
          };
          Headers2.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push(name);
            });
            return iteratorFor(items);
          };
          Headers2.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
              items.push(value);
            });
            return iteratorFor(items);
          };
          Headers2.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push([name, value]);
            });
            return iteratorFor(items);
          };
          if (support.iterable) {
            Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
          }
          function consumed(body) {
            if (body.bodyUsed) {
              return Promise.reject(new TypeError("Already read"));
            }
            body.bodyUsed = true;
          }
          function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
              reader.onload = function() {
                resolve(reader.result);
              };
              reader.onerror = function() {
                reject(reader.error);
              };
            });
          }
          function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
          }
          function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsText(blob);
            return promise;
          }
          function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);
            for (var i = 0; i < view.length; i++) {
              chars[i] = String.fromCharCode(view[i]);
            }
            return chars.join("");
          }
          function bufferClone(buf) {
            if (buf.slice) {
              return buf.slice(0);
            } else {
              var view = new Uint8Array(buf.byteLength);
              view.set(new Uint8Array(buf));
              return view.buffer;
            }
          }
          function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
              this._bodyInit = body;
              if (!body) {
                this._bodyText = "";
              } else if (typeof body === "string") {
                this._bodyText = body;
              } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
              } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
              } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                this._bodyInit = new Blob([this._bodyArrayBuffer]);
              } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
              } else {
                this._bodyText = body = Object.prototype.toString.call(body);
              }
              if (!this.headers.get("content-type")) {
                if (typeof body === "string") {
                  this.headers.set("content-type", "text/plain;charset=UTF-8");
                } else if (this._bodyBlob && this._bodyBlob.type) {
                  this.headers.set("content-type", this._bodyBlob.type);
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                  this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
              }
            };
            if (support.blob) {
              this.blob = function() {
                var rejected = consumed(this);
                if (rejected) {
                  return rejected;
                }
                if (this._bodyBlob) {
                  return Promise.resolve(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                } else if (this._bodyFormData) {
                  throw new Error("could not read FormData body as blob");
                } else {
                  return Promise.resolve(new Blob([this._bodyText]));
                }
              };
              this.arrayBuffer = function() {
                if (this._bodyArrayBuffer) {
                  return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                } else {
                  return this.blob().then(readBlobAsArrayBuffer);
                }
              };
            }
            this.text = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as text");
              } else {
                return Promise.resolve(this._bodyText);
              }
            };
            if (support.formData) {
              this.formData = function() {
                return this.text().then(decode);
              };
            }
            this.json = function() {
              return this.text().then(JSON.parse);
            };
            return this;
          }
          var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
          }
          function Request(input, options) {
            options = options || {};
            var body = options.body;
            if (input instanceof Request) {
              if (input.bodyUsed) {
                throw new TypeError("Already read");
              }
              this.url = input.url;
              this.credentials = input.credentials;
              if (!options.headers) {
                this.headers = new Headers2(input.headers);
              }
              this.method = input.method;
              this.mode = input.mode;
              this.signal = input.signal;
              if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
              }
            } else {
              this.url = String(input);
            }
            this.credentials = options.credentials || this.credentials || "same-origin";
            if (options.headers || !this.headers) {
              this.headers = new Headers2(options.headers);
            }
            this.method = normalizeMethod(options.method || this.method || "GET");
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal;
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && body) {
              throw new TypeError("Body not allowed for GET or HEAD requests");
            }
            this._initBody(body);
          }
          Request.prototype.clone = function() {
            return new Request(this, { body: this._bodyInit });
          };
          function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
              if (bytes) {
                var split = bytes.split("=");
                var name = split.shift().replace(/\+/g, " ");
                var value = split.join("=").replace(/\+/g, " ");
                form.append(decodeURIComponent(name), decodeURIComponent(value));
              }
            });
            return form;
          }
          function parseHeaders(rawHeaders) {
            var headers = new Headers2();
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
            preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
              var parts = line.split(":");
              var key = parts.shift().trim();
              if (key) {
                var value = parts.join(":").trim();
                headers.append(key, value);
              }
            });
            return headers;
          }
          Body.call(Request.prototype);
          function Response2(bodyInit, options) {
            if (!options) {
              options = {};
            }
            this.type = "default";
            this.status = options.status === void 0 ? 200 : options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in options ? options.statusText : "OK";
            this.headers = new Headers2(options.headers);
            this.url = options.url || "";
            this._initBody(bodyInit);
          }
          Body.call(Response2.prototype);
          Response2.prototype.clone = function() {
            return new Response2(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new Headers2(this.headers),
              url: this.url
            });
          };
          Response2.error = function() {
            var response = new Response2(null, { status: 0, statusText: "" });
            response.type = "error";
            return response;
          };
          var redirectStatuses = [301, 302, 303, 307, 308];
          Response2.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
              throw new RangeError("Invalid status code");
            }
            return new Response2(null, { status, headers: { location: url } });
          };
          exports2.DOMException = self2.DOMException;
          try {
            new exports2.DOMException();
          } catch (err) {
            exports2.DOMException = function(message, name) {
              this.message = message;
              this.name = name;
              var error = Error(message);
              this.stack = error.stack;
            };
            exports2.DOMException.prototype = Object.create(Error.prototype);
            exports2.DOMException.prototype.constructor = exports2.DOMException;
          }
          function fetch(input, init) {
            return new Promise(function(resolve, reject) {
              var request = new Request(input, init);
              if (request.signal && request.signal.aborted) {
                return reject(new exports2.DOMException("Aborted", "AbortError"));
              }
              var xhr = new XMLHttpRequest();
              function abortXhr() {
                xhr.abort();
              }
              xhr.onload = function() {
                var options = {
                  status: xhr.status,
                  statusText: xhr.statusText,
                  headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                };
                options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                var body = "response" in xhr ? xhr.response : xhr.responseText;
                resolve(new Response2(body, options));
              };
              xhr.onerror = function() {
                reject(new TypeError("Network request failed"));
              };
              xhr.ontimeout = function() {
                reject(new TypeError("Network request failed"));
              };
              xhr.onabort = function() {
                reject(new exports2.DOMException("Aborted", "AbortError"));
              };
              xhr.open(request.method, request.url, true);
              if (request.credentials === "include") {
                xhr.withCredentials = true;
              } else if (request.credentials === "omit") {
                xhr.withCredentials = false;
              }
              if ("responseType" in xhr && support.blob) {
                xhr.responseType = "blob";
              }
              request.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value);
              });
              if (request.signal) {
                request.signal.addEventListener("abort", abortXhr);
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    request.signal.removeEventListener("abort", abortXhr);
                  }
                };
              }
              xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
            });
          }
          fetch.polyfill = true;
          if (!self2.fetch) {
            self2.fetch = fetch;
            self2.Headers = Headers2;
            self2.Request = Request;
            self2.Response = Response2;
          }
          exports2.Headers = Headers2;
          exports2.Request = Request;
          exports2.Response = Response2;
          exports2.fetch = fetch;
          Object.defineProperty(exports2, "__esModule", { value: true });
          return exports2;
        }({});
      })(__self__);
      __self__.fetch.ponyfill = true;
      delete __self__.fetch.polyfill;
      var ctx = __self__;
      exports = ctx.fetch;
      exports.default = ctx.fetch;
      exports.fetch = ctx.fetch;
      exports.Headers = ctx.Headers;
      exports.Request = ctx.Request;
      exports.Response = ctx.Response;
      module.exports = exports;
    },
    "./node_modules/faunadb/index.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      var query = __webpack_require__2("./node_modules/faunadb/src/query.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var parseJSON = __webpack_require__2("./node_modules/faunadb/src/_json.js").parseJSON;
      module.exports = util.mergeObjects({
        Client: __webpack_require__2("./node_modules/faunadb/src/Client.js"),
        Expr: __webpack_require__2("./node_modules/faunadb/src/Expr.js"),
        PageHelper: __webpack_require__2("./node_modules/faunadb/src/PageHelper.js"),
        RequestResult: __webpack_require__2("./node_modules/faunadb/src/RequestResult.js"),
        clientLogger: __webpack_require__2("./node_modules/faunadb/src/clientLogger.js"),
        errors: __webpack_require__2("./node_modules/faunadb/src/errors.js"),
        values: __webpack_require__2("./node_modules/faunadb/src/values.js"),
        query,
        parseJSON
      }, query);
    },
    "./node_modules/faunadb/package.json": (module) => {
      "use strict";
      module.exports = JSON.parse('{"name":"faunadb","version":"4.5.2","apiVersion":"4","description":"FaunaDB Javascript driver for Node.JS and Browsers","homepage":"https://fauna.com","repository":"fauna/faunadb-js","license":"MPL-2.0","keywords":["database","fauna","official","driver"],"bugs":{"url":"https://github.com/fauna/faunadb-js/issues"},"files":["index.d.ts","src/","dist/","tools/printReleaseNotes.js"],"main":"index.js","scripts":{"doc":"jsdoc -c ./jsdoc.json","browserify":"browserify index.js --standalone faunadb -o dist/faunadb.js","browserify-min":"browserify index.js --standalone faunadb | terser -c -m --keep-fnames --keep-classnames -o dist/faunadb-min.js","prettify":"prettier --write \\"{src,test}/**/*.{js,ts}\\"","test":"jest --env=node --verbose=true --forceExit ./test","posttest":"node ./test/afterComplete","semantic-release":"semantic-release","wp":"webpack","postinstall":"node ./tools/printReleaseNotes","postupdate":"node ./tools/printReleaseNotes","load-test":"node ./tools/loadTest"},"types":"index.d.ts","dependencies":{"base64-js":"^1.2.0","boxen":"^5.0.1","btoa-lite":"^1.0.0","chalk":"^4.1.1","cross-fetch":"^3.1.5","dotenv":"^8.2.0","fn-annotate":"^1.1.3","node-abort-controller":"^3.0.1","object-assign":"^4.1.0","util-deprecate":"^1.0.2"},"devDependencies":{"ansi-regex":">=5.0.1","browserify":"^16.2.2","eslint":"^5.3.0","eslint-config-prettier":"^6.5.0","eslint-plugin-prettier":"^3.1.1","husky":"^7.0.4","jest":"^27.4.7","jsdoc":"^3.6.10","json-schema":">=0.4.0","lint-staged":">=8","marked":">=4.0.10","prettier":"1.18.2","semantic-release":"^17.2.3","terser":"^4.3.9","webpack":"^5.23.0","webpack-cli":"^4.5.0","yargs":"^16.2.0"},"lint-staged":{"*.{js,css,json,md}":["prettier --write","git add"],"*.js":["eslint --fix","git add"]},"release":{"branches":["main"]},"browser":{"http2":false,"http":false,"https":false,"os":false,"util":false,"boxen":false,"chalk":false}}');
    },
    "./node_modules/faunadb/src/Client.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var packageJson = __webpack_require__2("./node_modules/faunadb/package.json");
      var PageHelper = __webpack_require__2("./node_modules/faunadb/src/PageHelper.js");
      var RequestResult = __webpack_require__2("./node_modules/faunadb/src/RequestResult.js");
      var errors = __webpack_require__2("./node_modules/faunadb/src/errors.js");
      var http = __webpack_require__2("./node_modules/faunadb/src/_http/index.js");
      var json = __webpack_require__2("./node_modules/faunadb/src/_json.js");
      var query = __webpack_require__2("./node_modules/faunadb/src/query.js");
      var stream = __webpack_require__2("./node_modules/faunadb/src/stream.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var values = __webpack_require__2("./node_modules/faunadb/src/values.js");
      function Client(options) {
        var http2SessionIdleTime = getHttp2SessionIdleTime();
        options = util.applyDefaults(options, {
          domain: "db.fauna.com",
          scheme: "https",
          port: null,
          secret: null,
          timeout: 60,
          observer: null,
          keepAlive: true,
          headers: {},
          fetch: void 0,
          queryTimeout: null,
          http2SessionIdleTime: http2SessionIdleTime.value,
          checkNewVersion: false
        });
        if (http2SessionIdleTime.shouldOverride) {
          options.http2SessionIdleTime = http2SessionIdleTime.value;
        }
        this._observer = options.observer;
        this._http = new http.HttpClient(options);
        this.stream = stream.StreamAPI(this);
      }
      Client.apiVersion = packageJson.apiVersion;
      Client.prototype.query = function(expression, options) {
        return this._execute("POST", "", query.wrap(expression), null, options);
      };
      Client.prototype.paginate = function(expression, params, options) {
        params = util.defaults(params, {});
        options = util.defaults(options, {});
        return new PageHelper(this, expression, params, options);
      };
      Client.prototype.ping = function(scope, timeout) {
        return this._execute("GET", "ping", null, { scope, timeout });
      };
      Client.prototype.getLastTxnTime = function() {
        return this._http.getLastTxnTime();
      };
      Client.prototype.syncLastTxnTime = function(time) {
        this._http.syncLastTxnTime(time);
      };
      Client.prototype.close = function(opts) {
        return this._http.close(opts);
      };
      Client.prototype._execute = function(method, path, data, query2, options) {
        query2 = util.defaults(query2, null);
        if (path instanceof values.Ref || util.checkInstanceHasProperty(path, "_isFaunaRef")) {
          path = path.value;
        }
        if (query2 !== null) {
          query2 = util.removeUndefinedValues(query2);
        }
        var startTime = Date.now();
        var self2 = this;
        var body = ["GET", "HEAD"].indexOf(method) >= 0 ? void 0 : JSON.stringify(data);
        return this._http.execute(Object.assign({}, options, {
          path,
          query: query2,
          method,
          body
        })).then(function(response) {
          var endTime = Date.now();
          var responseObject = json.parseJSON(response.body);
          var result = new RequestResult(method, path, query2, body, data, response.body, responseObject, response.status, response.headers, startTime, endTime);
          self2._handleRequestResult(response, result, options);
          return responseObject["resource"];
        });
      };
      Client.prototype._handleRequestResult = function(response, result, options) {
        var txnTimeHeaderKey = "x-txn-time";
        if (response.headers[txnTimeHeaderKey] != null) {
          this.syncLastTxnTime(parseInt(response.headers[txnTimeHeaderKey], 10));
        }
        var observers = [this._observer, options && options.observer];
        observers.forEach((observer) => {
          if (typeof observer == "function") {
            observer(result, this);
          }
        });
        errors.FaunaHTTPError.raiseForStatusCode(result);
      };
      function getHttp2SessionIdleTime() {
        var fromEnv = util.getEnvVariable("FAUNADB_HTTP2_SESSION_IDLE_TIME");
        var parsed = fromEnv === "Infinity" ? Infinity : parseInt(fromEnv, 10);
        var useEnvVar = !isNaN(parsed);
        return {
          shouldOverride: useEnvVar,
          value: useEnvVar ? parsed : 500
        };
      }
      module.exports = Client;
    },
    "./node_modules/faunadb/src/Expr.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      function Expr(obj) {
        this.raw = obj;
      }
      Expr.prototype._isFaunaExpr = true;
      Expr.prototype.toJSON = function() {
        return this.raw;
      };
      Expr.prototype.toFQL = function() {
        return exprToString(this.raw);
      };
      var varArgsFunctions = [
        "Do",
        "Call",
        "Union",
        "Intersection",
        "Difference",
        "Equals",
        "Add",
        "BitAnd",
        "BitOr",
        "BitXor",
        "Divide",
        "Max",
        "Min",
        "Modulo",
        "Multiply",
        "Subtract",
        "LT",
        "LTE",
        "GT",
        "GTE",
        "And",
        "Or"
      ];
      var specialCases = {
        containsstrregex: "ContainsStrRegex",
        containsstr: "ContainsStr",
        endswith: "EndsWith",
        findstr: "FindStr",
        findstrregex: "FindStrRegex",
        gt: "GT",
        gte: "GTE",
        is_nonempty: "is_non_empty",
        lowercase: "LowerCase",
        lt: "LT",
        lte: "LTE",
        ltrim: "LTrim",
        ngram: "NGram",
        rtrim: "RTrim",
        regexescape: "RegexEscape",
        replacestr: "ReplaceStr",
        replacestrregex: "ReplaceStrRegex",
        startswith: "StartsWith",
        substring: "SubString",
        titlecase: "TitleCase",
        uppercase: "UpperCase"
      };
      function isExpr(expression) {
        return expression instanceof Expr || util.checkInstanceHasProperty(expression, "_isFaunaExpr");
      }
      function printObject(obj) {
        return "{" + Object.keys(obj).map(function(k) {
          return '"' + k + '": ' + exprToString(obj[k]);
        }).join(", ") + "}";
      }
      function printArray(arr, toStr) {
        return arr.map(function(item) {
          return toStr(item);
        }).join(", ");
      }
      function convertToCamelCase(fn) {
        if (fn in specialCases)
          fn = specialCases[fn];
        return fn.split("_").map(function(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }).join("");
      }
      var exprToString = function(expr, caller) {
        if (isExpr(expr)) {
          if ("value" in expr)
            return expr.toString();
          expr = expr.raw;
        }
        if (expr === null) {
          return "null";
        }
        switch (typeof expr) {
          case "string":
            return JSON.stringify(expr);
          case "symbol":
          case "number":
          case "boolean":
            return expr.toString();
          case "undefined":
            return "undefined";
        }
        if (Array.isArray(expr)) {
          var array = printArray(expr, exprToString);
          return varArgsFunctions.indexOf(caller) != -1 ? array : "[" + array + "]";
        }
        if ("match" in expr) {
          var matchStr = exprToString(expr["match"]);
          var terms = expr["terms"] || [];
          if (isExpr(terms))
            terms = terms.raw;
          if (Array.isArray(terms) && terms.length == 0)
            return "Match(" + matchStr + ")";
          if (Array.isArray(terms)) {
            return "Match(" + matchStr + ", [" + printArray(terms, exprToString) + "])";
          }
          return "Match(" + matchStr + ", " + exprToString(terms) + ")";
        }
        if ("paginate" in expr) {
          var exprKeys = Object.keys(expr);
          if (exprKeys.length === 1) {
            return "Paginate(" + exprToString(expr["paginate"]) + ")";
          }
          var expr2 = Object.assign({}, expr);
          delete expr2["paginate"];
          return "Paginate(" + exprToString(expr["paginate"]) + ", " + printObject(expr2) + ")";
        }
        if ("let" in expr && "in" in expr) {
          var letExpr = "";
          if (Array.isArray(expr["let"]))
            letExpr = "[" + printArray(expr["let"], printObject) + "]";
          else
            letExpr = printObject(expr["let"]);
          return "Let(" + letExpr + ", " + exprToString(expr["in"]) + ")";
        }
        if ("object" in expr)
          return printObject(expr["object"]);
        if ("merge" in expr) {
          if (expr.lambda) {
            return "Merge(" + exprToString(expr.merge) + ", " + exprToString(expr.with) + ", " + exprToString(expr.lambda) + ")";
          }
          return "Merge(" + exprToString(expr.merge) + ", " + exprToString(expr.with) + ")";
        }
        if ("lambda" in expr) {
          return "Lambda(" + exprToString(expr["lambda"]) + ", " + exprToString(expr["expr"]) + ")";
        }
        if ("filter" in expr) {
          return "Filter(" + exprToString(expr["collection"]) + ", " + exprToString(expr["filter"]) + ")";
        }
        if ("call" in expr) {
          return "Call(" + exprToString(expr["call"]) + ", " + exprToString(expr["arguments"]) + ")";
        }
        if ("map" in expr) {
          return "Map(" + exprToString(expr["collection"]) + ", " + exprToString(expr["map"]) + ")";
        }
        if ("foreach" in expr) {
          return "Foreach(" + exprToString(expr["collection"]) + ", " + exprToString(expr["foreach"]) + ")";
        }
        var keys = Object.keys(expr);
        var fn = keys[0];
        fn = convertToCamelCase(fn);
        var args = keys.filter((k) => expr[k] !== null || keys.length > 1).map((k) => exprToString(expr[k], fn)).join(", ");
        return fn + "(" + args + ")";
      };
      Expr.toString = exprToString;
      module.exports = Expr;
    },
    "./node_modules/faunadb/src/PageHelper.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var query = __webpack_require__2("./node_modules/faunadb/src/query.js");
      var objectAssign = __webpack_require__2("./node_modules/object-assign/index.js");
      function PageHelper(client, set, params, options) {
        if (params === void 0) {
          params = {};
        }
        if (options === void 0) {
          options = {};
        }
        this.reverse = false;
        this.params = {};
        this.before = void 0;
        this.after = void 0;
        objectAssign(this.params, params);
        var cursorParams = this.params.cursor || this.params;
        if ("before" in cursorParams) {
          this.before = cursorParams.before;
          delete cursorParams.before;
        } else if ("after" in cursorParams) {
          this.after = cursorParams.after;
          delete cursorParams.after;
        }
        this.options = {};
        objectAssign(this.options, options);
        this.client = client;
        this.set = set;
        this._faunaFunctions = [];
      }
      PageHelper.prototype.map = function(lambda) {
        var rv = this._clone();
        rv._faunaFunctions.push(function(q) {
          return query.Map(q, lambda);
        });
        return rv;
      };
      PageHelper.prototype.filter = function(lambda) {
        var rv = this._clone();
        rv._faunaFunctions.push(function(q) {
          return query.Filter(q, lambda);
        });
        return rv;
      };
      PageHelper.prototype.each = function(lambda) {
        return this._retrieveNextPage(this.after, false).then(this._consumePages(lambda, false));
      };
      PageHelper.prototype.eachReverse = function(lambda) {
        return this._retrieveNextPage(this.before, true).then(this._consumePages(lambda, true));
      };
      PageHelper.prototype.previousPage = function() {
        var self2 = this;
        return this._retrieveNextPage(this.before, true).then(this._adjustCursors.bind(self2));
      };
      PageHelper.prototype.nextPage = function() {
        var self2 = this;
        return this._retrieveNextPage(this.after, false).then(this._adjustCursors.bind(self2));
      };
      PageHelper.prototype._adjustCursors = function(page) {
        if (page.after !== void 0) {
          this.after = page.after;
        }
        if (page.before !== void 0) {
          this.before = page.before;
        }
        return page.data;
      };
      PageHelper.prototype._consumePages = function(lambda, reverse) {
        var self2 = this;
        return function(page) {
          lambda(page.data);
          var nextCursor;
          if (reverse) {
            nextCursor = page.before;
          } else {
            nextCursor = page.after;
          }
          if (nextCursor !== void 0) {
            return self2._retrieveNextPage(nextCursor, reverse).then(self2._consumePages(lambda, reverse));
          } else {
            return Promise.resolve();
          }
        };
      };
      PageHelper.prototype._retrieveNextPage = function(cursor, reverse) {
        var opts = {};
        objectAssign(opts, this.params);
        var cursorOpts = opts.cursor || opts;
        if (cursor !== void 0) {
          if (reverse) {
            cursorOpts.before = cursor;
          } else {
            cursorOpts.after = cursor;
          }
        } else {
          if (reverse) {
            cursorOpts.before = null;
          }
        }
        var q = query.Paginate(this.set, opts);
        if (this._faunaFunctions.length > 0) {
          this._faunaFunctions.forEach(function(lambda) {
            q = lambda(q);
          });
        }
        return this.client.query(q, this.options);
      };
      PageHelper.prototype._clone = function() {
        return Object.create(PageHelper.prototype, {
          client: { value: this.client },
          set: { value: this.set },
          _faunaFunctions: { value: this._faunaFunctions },
          before: { value: this.before },
          after: { value: this.after },
          params: { value: this.params }
        });
      };
      module.exports = PageHelper;
    },
    "./node_modules/faunadb/src/RequestResult.js": (module) => {
      "use strict";
      function RequestResult(method, path, query, requestRaw, requestContent, responseRaw, responseContent, statusCode, responseHeaders, startTime, endTime) {
        this.method = method;
        this.path = path;
        this.query = query;
        this.requestRaw = requestRaw;
        this.requestContent = requestContent;
        this.responseRaw = responseRaw;
        this.responseContent = responseContent;
        this.statusCode = statusCode;
        this.responseHeaders = responseHeaders;
        this.startTime = startTime;
        this.endTime = endTime;
      }
      Object.defineProperty(RequestResult.prototype, "timeTaken", {
        get: function() {
          return this.endTime - this.startTime;
        }
      });
      module.exports = RequestResult;
    },
    "./node_modules/faunadb/src/_http/errors.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      function TimeoutError(message) {
        Error.call(this);
        this.message = message || "Request aborted due to timeout";
        this.isTimeoutError = true;
      }
      util.inherits(TimeoutError, Error);
      function AbortError(message) {
        Error.call(this);
        this.message = message || "Request aborted";
        this.isAbortError = true;
      }
      util.inherits(AbortError, Error);
      module.exports = {
        TimeoutError,
        AbortError
      };
    },
    "./node_modules/faunadb/src/_http/fetchAdapter.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var { AbortController } = __webpack_require__2("./node_modules/node-abort-controller/browser.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var faunaErrors = __webpack_require__2("./node_modules/faunadb/src/errors.js");
      var errors = __webpack_require__2("./node_modules/faunadb/src/_http/errors.js");
      function FetchAdapter(options) {
        options = options || {};
        this.type = "fetch";
        this._closed = false;
        this._fetch = util.resolveFetch(options.fetch);
        this._pendingRequests = new Map();
        if (util.isNodeEnv() && options.keepAlive) {
          this._keepAliveEnabledAgent = new (options.isHttps ? __webpack_require__2("?cc45") : __webpack_require__2("?e2f0")).Agent({ keepAlive: true, timeout: 3e3 });
        }
      }
      FetchAdapter.prototype.execute = function(options) {
        if (this._closed) {
          return Promise.reject(new faunaErrors.ClientClosed("The Client has already been closed", "No subsequent requests can be issued after the .close method is called. Consider creating a new Client instance"));
        }
        var self2 = this;
        var timerId = null;
        var isStreaming = options.streamConsumer != null;
        var useTimeout = !options.signal && !!options.timeout;
        var ctrl = new AbortController();
        var pendingRequest = {
          isStreaming,
          isAbortedByClose: false,
          onComplete: null
        };
        self2._pendingRequests.set(ctrl, pendingRequest);
        var onComplete = function() {
          self2._pendingRequests.delete(ctrl);
          if (options.signal) {
            options.signal.removeEventListener("abort", onAbort);
          }
          if (pendingRequest.onComplete) {
            pendingRequest.onComplete();
          }
        };
        var onSettle = function() {
          if (timerId) {
            clearTimeout(timerId);
          }
        };
        var onResponse = function(response) {
          onSettle();
          var headers = responseHeadersAsObject(response.headers);
          var processStream = isStreaming && response.ok;
          if (!processStream) {
            onComplete();
            return response.text().then(function(content) {
              return {
                body: content,
                headers,
                status: response.status
              };
            });
          }
          attachStreamConsumer(response, options.streamConsumer, onComplete);
          return {
            body: "[stream]",
            headers,
            status: response.status
          };
        };
        var onError = function(error) {
          onSettle();
          onComplete();
          return Promise.reject(remapIfAbortError(error, function() {
            if (!isStreaming && pendingRequest.isAbortedByClose) {
              return new faunaErrors.ClientClosed("The request is aborted due to the Client#close call with the force=true option");
            }
            return useTimeout ? new errors.TimeoutError() : new errors.AbortError();
          }));
        };
        var onAbort = function() {
          ctrl.abort();
        };
        if (useTimeout) {
          timerId = setTimeout(function() {
            timerId = null;
            ctrl.abort();
          }, options.timeout);
        }
        if (options.signal) {
          options.signal.addEventListener("abort", onAbort);
        }
        return this._fetch(util.formatUrl(options.origin, options.path, options.query), {
          method: options.method,
          headers: options.headers,
          body: options.body,
          agent: this._keepAliveEnabledAgent,
          signal: ctrl.signal
        }).then(onResponse).catch(onError);
      };
      FetchAdapter.prototype.close = function(opts) {
        opts = opts || {};
        this._closed = true;
        var promises = [];
        var abortOrWait = function(pendingRequest, ctrl) {
          var shouldAbort = pendingRequest.isStreaming || opts.force;
          if (shouldAbort) {
            pendingRequest.isAbortedByClose = true;
            return ctrl.abort();
          }
          promises.push(new Promise(function(resolve) {
            pendingRequest.onComplete = resolve;
          }));
        };
        this._pendingRequests.forEach(abortOrWait);
        var noop = function() {
        };
        return Promise.all(promises).then(noop);
      };
      function attachStreamConsumer(response, consumer, onComplete) {
        var onError = function(error) {
          onComplete();
          consumer.onError(remapIfAbortError(error));
        };
        if (util.isNodeEnv()) {
          response.body.on("error", onError).on("data", consumer.onData).on("end", function() {
            onComplete();
            consumer.onError(new TypeError("network error"));
          });
          return;
        }
        try {
          let pump = function() {
            return reader.read().then(function(msg) {
              if (!msg.done) {
                var chunk = decoder.decode(msg.value, { stream: true });
                consumer.onData(chunk);
                return pump();
              }
              onComplete();
              consumer.onError(new TypeError("network error"));
            });
          };
          var reader = response.body.getReader();
          var decoder = new TextDecoder("utf-8");
          pump().catch(onError);
        } catch (err) {
          throw new faunaErrors.StreamsNotSupported("Please, consider providing a Fetch API-compatible function with streamable response bodies. " + err);
        }
      }
      function remapIfAbortError(error, errorFactory) {
        var isAbortError = error && error.name === "AbortError";
        if (!isAbortError) {
          return error;
        }
        if (errorFactory) {
          return errorFactory();
        }
        return new errors.AbortError();
      }
      function responseHeadersAsObject(headers) {
        var result = {};
        for (var header of headers.entries()) {
          var key = header[0];
          var value = header[1];
          result[key] = value;
        }
        return result;
      }
      module.exports = FetchAdapter;
    },
    "./node_modules/faunadb/src/_http/http2Adapter.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var http2 = __webpack_require__2("?a526");
      var errors = __webpack_require__2("./node_modules/faunadb/src/_http/errors.js");
      var faunaErrors = __webpack_require__2("./node_modules/faunadb/src/errors.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var STREAM_PREFIX = "stream::";
      function Http2Adapter(options) {
        this.type = "http2";
        this._sessionMap = {};
        this._http2SessionIdleTime = options.http2SessionIdleTime;
        this._closed = false;
      }
      Http2Adapter.prototype._resolveSessionFor = function(origin, isStreaming) {
        var sessionKey = isStreaming ? STREAM_PREFIX + origin : origin;
        if (this._sessionMap[sessionKey]) {
          return this._sessionMap[sessionKey];
        }
        var self2 = this;
        var timerId = null;
        var ongoingRequests = 0;
        var cleanup = function() {
          self2._cleanupSessionFor(origin, isStreaming);
        };
        var clearInactivityTimeout = function() {
          if (timerId) {
            clearTimeout(timerId);
            timerId = null;
          }
        };
        var setInactivityTimeout = function() {
          clearInactivityTimeout();
          if (self2._http2SessionIdleTime === Infinity) {
            return;
          }
          var onTimeout = function() {
            timerId = null;
            if (ongoingRequests === 0) {
              cleanup();
            }
          };
          timerId = setTimeout(onTimeout, self2._http2SessionIdleTime);
        };
        var close = function(force) {
          clearInactivityTimeout();
          var shouldDestroy = force || isStreaming;
          if (shouldDestroy) {
            session.destroy();
            return Promise.resolve();
          }
          return new Promise(function(resolve) {
            session.close(resolve);
          });
        };
        var onRequestStart = function() {
          ++ongoingRequests;
          clearInactivityTimeout();
        };
        var onRequestEnd = function() {
          --ongoingRequests;
          var noOngoingRequests = ongoingRequests === 0;
          var isSessionClosed = self2._closed || session.closed || session.destroyed;
          if (noOngoingRequests && !isSessionClosed) {
            setInactivityTimeout();
          }
        };
        var session = http2.connect(origin).once("error", cleanup).once("goaway", cleanup);
        var sessionInterface = {
          session,
          close,
          onRequestStart,
          onRequestEnd
        };
        this._sessionMap[sessionKey] = sessionInterface;
        return sessionInterface;
      };
      Http2Adapter.prototype._cleanupSessionFor = function(origin, isStreaming) {
        var sessionKey = isStreaming ? STREAM_PREFIX + origin : origin;
        if (this._sessionMap[sessionKey]) {
          this._sessionMap[sessionKey].session.close();
          delete this._sessionMap[sessionKey];
        }
      };
      Http2Adapter.prototype.execute = function(options) {
        if (this._closed) {
          return Promise.reject(new faunaErrors.ClientClosed("The Client has already been closed", "No subsequent requests can be issued after the .close method is called. Consider creating a new Client instance"));
        }
        var self2 = this;
        var isStreaming = options.streamConsumer != null;
        return new Promise(function(resolvePromise, rejectPromise) {
          var isPromiseSettled = false;
          var isCanceled = false;
          var resolve = function(value) {
            isPromiseSettled = true;
            resolvePromise(value);
          };
          var rejectOrOnError = function(error) {
            var remapped = remapHttp2Error({ error, isClosed: self2._closed });
            if (isPromiseSettled && isStreaming) {
              return options.streamConsumer.onError(remapped);
            }
            isPromiseSettled = true;
            rejectPromise(remapped);
          };
          var onSettled = function() {
            sessionInterface.onRequestEnd();
            if (options.signal) {
              options.signal.removeEventListener("abort", onAbort);
            }
          };
          var onError = function(error) {
            onSettled();
            rejectOrOnError(error);
          };
          var onAbort = function() {
            isCanceled = true;
            onSettled();
            request.close(http2.constants.NGHTTP2_CANCEL);
            rejectOrOnError(new errors.AbortError());
          };
          var onTimeout = function() {
            isCanceled = true;
            onSettled();
            request.close(http2.constants.NGHTTP2_CANCEL);
            rejectOrOnError(new errors.TimeoutError());
          };
          var onResponse = function(responseHeaders) {
            var status = responseHeaders[http2.constants.HTTP2_HEADER_STATUS];
            var isOkStatus = status >= 200 && status < 400;
            var processStream = isOkStatus && isStreaming;
            var responseBody = "";
            var onData = function(chunk) {
              if (processStream) {
                return options.streamConsumer.onData(chunk);
              }
              responseBody += chunk;
            };
            var onEnd = function() {
              if (!isCanceled) {
                onSettled();
              }
              if (!processStream) {
                return resolve({
                  body: responseBody,
                  headers: responseHeaders,
                  status
                });
              }
              if (!isCanceled && !self2._closed) {
                options.streamConsumer.onError(new TypeError("network error"));
              }
            };
            if (processStream) {
              resolve({
                body: "[stream]",
                headers: responseHeaders,
                status
              });
            }
            request.on("data", onData).on("end", onEnd);
          };
          try {
            var pathname = (options.path[0] === "/" ? options.path : "/" + options.path) + util.querystringify(options.query, "?");
            var requestHeaders = Object.assign({}, options.headers, {
              [http2.constants.HTTP2_HEADER_PATH]: pathname,
              [http2.constants.HTTP2_HEADER_METHOD]: options.method
            });
            var sessionInterface = self2._resolveSessionFor(options.origin, isStreaming);
            var request = sessionInterface.session.request(requestHeaders).setEncoding("utf8").on("error", onError).on("response", onResponse);
            sessionInterface.onRequestStart();
            if (!options.signal && options.timeout) {
              request.setTimeout(options.timeout, onTimeout);
            }
            if (options.signal) {
              options.signal.addEventListener("abort", onAbort);
            }
            if (options.body != null) {
              request.write(options.body);
            }
            request.end();
          } catch (error) {
            self2._cleanupSessionFor(options.origin, isStreaming);
            rejectOrOnError(error);
          }
        });
      };
      Http2Adapter.prototype.close = function(opts) {
        opts = opts || {};
        this._closed = true;
        var noop = function() {
        };
        return Promise.all(Object.values(this._sessionMap).map(function(sessionInterface) {
          return sessionInterface.close(opts.force);
        })).then(noop);
      };
      function remapHttp2Error({ error, isClosed }) {
        var shouldRemap = isClosed && (error.code === "ERR_HTTP2_GOAWAY_SESSION" || error.code === "ERR_HTTP2_STREAM_CANCEL");
        if (shouldRemap) {
          return new faunaErrors.ClientClosed("The request is aborted due to the Client#close call");
        }
        return error;
      }
      module.exports = Http2Adapter;
    },
    "./node_modules/faunadb/src/_http/index.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var packageJson = __webpack_require__2("./node_modules/faunadb/package.json");
      const { getBrowserOsDetails } = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var errors = __webpack_require__2("./node_modules/faunadb/src/_http/errors.js");
      function HttpClient(options) {
        var isHttps = options.scheme === "https";
        if (!options.port) {
          options.port = isHttps ? 443 : 80;
        }
        var useHttp2Adapter = !options.fetch && util.isNodeEnv() && isHttp2Supported();
        this._adapter = useHttp2Adapter ? new (__webpack_require__2("./node_modules/faunadb/src/_http/http2Adapter.js"))({
          http2SessionIdleTime: options.http2SessionIdleTime
        }) : new (__webpack_require__2("./node_modules/faunadb/src/_http/fetchAdapter.js"))({
          isHttps,
          fetch: options.fetch,
          keepAlive: options.keepAlive
        });
        this._baseUrl = options.scheme + "://" + options.domain + ":" + options.port;
        this._secret = options.secret;
        this._headers = Object.assign({}, options.headers, getDefaultHeaders());
        this._queryTimeout = options.queryTimeout;
        this._lastSeen = null;
        this._timeout = Math.floor(options.timeout * 1e3);
      }
      HttpClient.prototype.getLastTxnTime = function() {
        return this._lastSeen;
      };
      HttpClient.prototype.syncLastTxnTime = function(time) {
        if (this._lastSeen == null || this._lastSeen < time) {
          this._lastSeen = time;
        }
      };
      HttpClient.prototype.close = function(opts) {
        return this._adapter.close(opts);
      };
      HttpClient.prototype.execute = function(options) {
        options = options || {};
        var invalidStreamConsumer = options.streamConsumer && (typeof options.streamConsumer.onData !== "function" || typeof options.streamConsumer.onError !== "function");
        if (invalidStreamConsumer) {
          return Promise.reject(new TypeError('Invalid "streamConsumer" provided'));
        }
        var secret = options.secret || this._secret;
        var queryTimeout = options.queryTimeout || this._queryTimeout;
        var headers = this._headers;
        headers["Authorization"] = secret && secretHeader(secret);
        headers["X-Last-Seen-Txn"] = this._lastSeen;
        headers["X-Query-Timeout"] = queryTimeout;
        return this._adapter.execute({
          origin: this._baseUrl,
          path: options.path || "/",
          query: options.query,
          method: options.method || "GET",
          headers: util.removeNullAndUndefinedValues(headers),
          body: options.body,
          signal: options.signal,
          timeout: this._timeout,
          streamConsumer: options.streamConsumer
        });
      };
      function secretHeader(secret) {
        return "Bearer " + secret;
      }
      function getDefaultHeaders() {
        var driverEnv = {
          driver: ["javascript", packageJson.version].join("-")
        };
        var isServiceWorker;
        try {
          isServiceWorker = __webpack_require__2.g instanceof ServiceWorkerGlobalScope;
        } catch (error) {
          isServiceWorker = false;
        }
        try {
          if (util.isNodeEnv()) {
            driverEnv.runtime = ["nodejs", process.version].join("-");
            driverEnv.env = util.getNodeRuntimeEnv();
            var os = __webpack_require__2("?5dfa");
            driverEnv.os = [os.platform(), os.release()].join("-");
          } else if (isServiceWorker) {
            driverEnv.runtime = "Service Worker";
          } else {
            driverEnv.runtime = util.getBrowserDetails();
            driverEnv.env = "browser";
            driverEnv.os = getBrowserOsDetails();
          }
        } catch (_) {
        }
        var headers = {
          "X-FaunaDB-API-Version": packageJson.apiVersion
        };
        if (util.isNodeEnv()) {
          headers["X-Driver-Env"] = Object.keys(driverEnv).map((key) => [key, driverEnv[key].toLowerCase()].join("=")).join("; ");
        }
        return headers;
      }
      function isHttp2Supported() {
        try {
          __webpack_require__2("?a526");
          return true;
        } catch (_) {
          return false;
        }
      }
      module.exports = {
        HttpClient,
        TimeoutError: errors.TimeoutError,
        AbortError: errors.AbortError
      };
    },
    "./node_modules/faunadb/src/_json.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var values = __webpack_require__2("./node_modules/faunadb/src/values.js");
      function toJSON(object, pretty) {
        pretty = typeof pretty !== "undefined" ? pretty : false;
        if (pretty) {
          return JSON.stringify(object, null, "  ");
        } else {
          return JSON.stringify(object);
        }
      }
      function parseJSON(json) {
        return JSON.parse(json, json_parse);
      }
      function parseJSONStreaming(content) {
        var values2 = [];
        try {
          values2.push(parseJSON(content));
          content = "";
        } catch (err) {
          while (true) {
            var pos = content.indexOf("\n") + 1;
            if (pos <= 0) {
              break;
            }
            var slice = content.slice(0, pos).trim();
            if (slice.length > 0) {
              values2.push(parseJSON(slice));
            }
            content = content.slice(pos);
          }
        }
        return {
          values: values2,
          buffer: content
        };
      }
      function json_parse(_, val) {
        if (typeof val !== "object" || val === null) {
          return val;
        } else if ("@ref" in val) {
          var ref = val["@ref"];
          if (!("collection" in ref) && !("database" in ref)) {
            return values.Native.fromName(ref["id"]);
          }
          var col = json_parse("collection", ref["collection"]);
          var db = json_parse("database", ref["database"]);
          return new values.Ref(ref["id"], col, db);
        } else if ("@obj" in val) {
          return val["@obj"];
        } else if ("@set" in val) {
          return new values.SetRef(val["@set"]);
        } else if ("@ts" in val) {
          return new values.FaunaTime(val["@ts"]);
        } else if ("@date" in val) {
          return new values.FaunaDate(val["@date"]);
        } else if ("@bytes" in val) {
          return new values.Bytes(val["@bytes"]);
        } else if ("@query" in val) {
          return new values.Query(val["@query"]);
        } else {
          return val;
        }
      }
      module.exports = {
        toJSON,
        parseJSON,
        parseJSONStreaming
      };
    },
    "./node_modules/faunadb/src/_util.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var packageJson = __webpack_require__2("./node_modules/faunadb/package.json");
      var chalk = __webpack_require__2("?d932");
      var boxen = __webpack_require__2("?8c06");
      var crossGlobal = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof __webpack_require__2.g !== "undefined" ? __webpack_require__2.g : self;
      function inherits(ctor, superCtor) {
        if (ctor === void 0 || ctor === null) {
          throw new TypeError('The constructor to "inherits" must not be null or undefined');
        }
        if (superCtor === void 0 || superCtor === null) {
          throw new TypeError('The super constructor to "inherits" must not be null or undefined');
        }
        if (superCtor.prototype === void 0) {
          throw new TypeError('The super constructor to "inherits" must have a prototype');
        }
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
      function isNodeEnv() {
        return typeof window === "undefined" && typeof process !== "undefined" && process.versions != null && process.versions.node != null;
      }
      function getEnvVariable(envKey) {
        var areEnvVarsAvailable = !!(typeof process !== "undefined" && process && process.env);
        if (areEnvVarsAvailable && process.env[envKey] != null) {
          return process.env[envKey];
        }
      }
      function getBrowserDetails() {
        var browser = navigator.appName;
        var browserVersion = "" + parseFloat(navigator.appVersion);
        var nameOffset, verOffset, ix;
        if ((verOffset = navigator.userAgent.indexOf("Opera")) != -1) {
          browser = "Opera";
          browserVersion = navigator.userAgent.substring(verOffset + 6);
          if ((verOffset = navigator.userAgent.indexOf("Version")) != -1) {
            browserVersion = navigator.userAgent.substring(verOffset + 8);
          }
        } else if ((verOffset = navigator.userAgent.indexOf("MSIE")) != -1) {
          browser = "Microsoft Internet Explorer";
          browserVersion = navigator.userAgent.substring(verOffset + 5);
        } else if (browser == "Netscape" && navigator.userAgent.indexOf("Trident/") != -1) {
          browser = "Microsoft Internet Explorer";
          browserVersion = navigator.userAgent.substring(verOffset + 5);
          if ((verOffset = navigator.userAgent.indexOf("rv:")) != -1) {
            browserVersion = navigator.userAgent.substring(verOffset + 3);
          }
        } else if ((verOffset = navigator.userAgent.indexOf("Chrome")) != -1) {
          browser = "Chrome";
          browserVersion = navigator.userAgent.substring(verOffset + 7);
        } else if ((verOffset = navigator.userAgent.indexOf("Safari")) != -1) {
          browser = "Safari";
          browserVersion = navigator.userAgent.substring(verOffset + 7);
          if ((verOffset = navigator.userAgent.indexOf("Version")) != -1) {
            browserVersion = navigator.userAgent.substring(verOffset + 8);
          }
          if (navigator.userAgent.indexOf("CriOS") != -1) {
            browser = "Chrome";
          }
        } else if ((verOffset = navigator.userAgent.indexOf("Firefox")) != -1) {
          browser = "Firefox";
          browserVersion = navigator.userAgent.substring(verOffset + 8);
        } else if ((nameOffset = navigator.userAgent.lastIndexOf(" ") + 1) < (verOffset = navigator.userAgent.lastIndexOf("/"))) {
          browser = navigator.userAgent.substring(nameOffset, verOffset);
          browserVersion = navigator.userAgent.substring(verOffset + 1);
          if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
          }
        }
        if ((ix = browserVersion.indexOf(";")) != -1)
          browserVersion = browserVersion.substring(0, ix);
        if ((ix = browserVersion.indexOf(" ")) != -1)
          browserVersion = browserVersion.substring(0, ix);
        if ((ix = browserVersion.indexOf(")")) != -1)
          browserVersion = browserVersion.substring(0, ix);
        return [browser, browserVersion].join("-");
      }
      function getBrowserOsDetails() {
        var os = "unknown";
        var clientStrings = [
          { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
          { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
          { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
          { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
          { s: "Windows Vista", r: /Windows NT 6.0/ },
          { s: "Windows Server 2003", r: /Windows NT 5.2/ },
          { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
          { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
          { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
          { s: "Windows 98", r: /(Windows 98|Win98)/ },
          { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
          { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
          { s: "Windows CE", r: /Windows CE/ },
          { s: "Windows 3.11", r: /Win16/ },
          { s: "Android", r: /Android/ },
          { s: "Open BSD", r: /OpenBSD/ },
          { s: "Sun OS", r: /SunOS/ },
          { s: "Chrome OS", r: /CrOS/ },
          { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
          { s: "iOS", r: /(iPhone|iPad|iPod)/ },
          { s: "Mac OS X", r: /Mac OS X/ },
          { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
          { s: "QNX", r: /QNX/ },
          { s: "UNIX", r: /UNIX/ },
          { s: "BeOS", r: /BeOS/ },
          { s: "OS/2", r: /OS\/2/ },
          {
            s: "Search Bot",
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
          }
        ];
        for (var id in clientStrings) {
          var cs = clientStrings[id];
          if (cs.r.test(navigator.userAgent)) {
            os = cs.s;
            break;
          }
        }
        var osVersion = "unknown";
        if (/Windows/.test(os)) {
          osVersion = /Windows (.*)/.exec(os)[1];
          os = "Windows";
        }
        switch (os) {
          case "Mac OS":
          case "Mac OS X":
          case "Android":
            osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(navigator.userAgent)[1];
            break;
          case "iOS":
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
            osVersion = osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
            break;
        }
        return [os, osVersion].join("-");
      }
      function getNodeRuntimeEnv() {
        var runtimeEnvs = [
          {
            name: "Netlify",
            check: function() {
              return process.env.hasOwnProperty("NETLIFY_IMAGES_CDN_DOMAIN");
            }
          },
          {
            name: "Vercel",
            check: function() {
              return process.env.hasOwnProperty("VERCEL");
            }
          },
          {
            name: "Heroku",
            check: function() {
              return process.env.hasOwnProperty("PATH") && process.env.PATH.indexOf(".heroku") !== -1;
            }
          },
          {
            name: "AWS Lambda",
            check: function() {
              return process.env.hasOwnProperty("AWS_LAMBDA_FUNCTION_VERSION");
            }
          },
          {
            name: "GCP Cloud Functions",
            check: function() {
              return process.env.hasOwnProperty("_") && process.env._.indexOf("google") !== -1;
            }
          },
          {
            name: "GCP Compute Instances",
            check: function() {
              return process.env.hasOwnProperty("GOOGLE_CLOUD_PROJECT");
            }
          },
          {
            name: "Azure Cloud Functions",
            check: function() {
              return process.env.hasOwnProperty("WEBSITE_FUNCTIONS_AZUREMONITOR_CATEGORIES");
            }
          },
          {
            name: "Azure Compute",
            check: function() {
              return process.env.hasOwnProperty("ORYX_ENV_TYPE") && process.env.hasOwnProperty("WEBSITE_INSTANCE_ID") && process.env.ORYX_ENV_TYPE === "AppService";
            }
          },
          {
            name: "Mongo Stitch",
            check: function() {
              return typeof crossGlobal.StitchError === "function";
            }
          },
          {
            name: "Render",
            check: function() {
              return process.env.hasOwnProperty("RENDER_SERVICE_ID");
            }
          },
          {
            name: "Begin",
            check: function() {
              return process.env.hasOwnProperty("BEGIN_DATA_SCOPE_ID");
            }
          }
        ];
        var detectedEnv = runtimeEnvs.find((env) => env.check());
        return detectedEnv ? detectedEnv.name : "unknown";
      }
      function defaults(obj, def) {
        if (obj === void 0) {
          return def;
        } else {
          return obj;
        }
      }
      function applyDefaults(provided, defaults2) {
        var out = {};
        for (var providedKey in provided) {
          if (!(providedKey in defaults2)) {
            throw new Error("No such option " + providedKey);
          }
          out[providedKey] = provided[providedKey];
        }
        for (var defaultsKey in defaults2) {
          if (!(defaultsKey in out)) {
            out[defaultsKey] = defaults2[defaultsKey];
          }
        }
        return out;
      }
      function removeNullAndUndefinedValues(object) {
        var res = {};
        for (var key in object) {
          var val = object[key];
          if (val !== null && val !== void 0) {
            res[key] = val;
          }
        }
        return res;
      }
      function removeUndefinedValues(object) {
        var res = {};
        for (var key in object) {
          var val = object[key];
          if (val !== void 0) {
            res[key] = val;
          }
        }
        return res;
      }
      function checkInstanceHasProperty(obj, prop) {
        return typeof obj === "object" && obj !== null && Boolean(obj[prop]);
      }
      function formatUrl(base, path, query) {
        query = typeof query === "object" ? querystringify(query) : query;
        return [
          base,
          path ? path.charAt(0) === "/" ? "" : "/" + path : "",
          query ? query.charAt(0) === "?" ? "" : "?" + query : ""
        ].join("");
      }
      function querystringify(obj, prefix) {
        prefix = prefix || "";
        var pairs = [], value, key;
        if (typeof prefix !== "string")
          prefix = "?";
        for (key in obj) {
          if (checkInstanceHasProperty(obj, key)) {
            value = obj[key];
            if (!value && (value === null || value === void 0 || isNaN(value))) {
              value = "";
            }
            key = encode(key);
            value = encode(value);
            if (key === null || value === null)
              continue;
            pairs.push(key + "=" + value);
          }
        }
        return pairs.length ? prefix + pairs.join("&") : "";
      }
      function encode(input) {
        try {
          return encodeURIComponent(input);
        } catch (e) {
          return null;
        }
      }
      function mergeObjects(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
          obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
          obj3[attrname] = obj2[attrname];
        }
        return obj3;
      }
      function resolveFetch(fetchOverride) {
        if (typeof fetchOverride === "function") {
          return fetchOverride;
        }
        if (typeof crossGlobal.fetch === "function") {
          return crossGlobal.fetch.bind(crossGlobal);
        }
        return __webpack_require__2("./node_modules/cross-fetch/dist/browser-ponyfill.js");
      }
      module.exports = {
        crossGlobal,
        mergeObjects,
        formatUrl,
        querystringify,
        inherits,
        isNodeEnv,
        getEnvVariable,
        defaults,
        applyDefaults,
        removeNullAndUndefinedValues,
        removeUndefinedValues,
        checkInstanceHasProperty,
        getBrowserDetails,
        getBrowserOsDetails,
        getNodeRuntimeEnv,
        resolveFetch
      };
    },
    "./node_modules/faunadb/src/clientLogger.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var json = __webpack_require__2("./node_modules/faunadb/src/_json.js");
      function logger(loggerFunction) {
        return function(requestResult, client) {
          return loggerFunction(showRequestResult(requestResult), client);
        };
      }
      function showRequestResult(requestResult) {
        var query = requestResult.query, method = requestResult.method, path = requestResult.path, requestContent = requestResult.requestContent, responseHeaders = requestResult.responseHeaders, responseContent = requestResult.responseContent, statusCode = requestResult.statusCode, timeTaken = requestResult.timeTaken;
        var out = "";
        function log(str) {
          out = out + str;
        }
        log("Fauna " + method + " /" + path + _queryString(query) + "\n");
        if (requestContent != null) {
          log("  Request JSON: " + _showJSON(requestContent) + "\n");
        }
        log("  Response headers: " + _showJSON(responseHeaders) + "\n");
        log("  Response JSON: " + _showJSON(responseContent) + "\n");
        log("  Response (" + statusCode + "): Network latency " + timeTaken + "ms\n");
        return out;
      }
      function _indent(str) {
        var indentStr = "  ";
        return str.split("\n").join("\n" + indentStr);
      }
      function _showJSON(object) {
        return _indent(json.toJSON(object, true));
      }
      function _queryString(query) {
        if (query == null) {
          return "";
        }
        var keys = Object.keys(query);
        if (keys.length === 0) {
          return "";
        }
        var pairs = keys.map(function(key) {
          return key + "=" + query[key];
        });
        return "?" + pairs.join("&");
      }
      module.exports = {
        logger,
        showRequestResult
      };
    },
    "./node_modules/faunadb/src/errors.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      function FaunaError(name, message, description) {
        Error.call(this);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        } else
          this.stack = new Error().stack;
        this.name = name;
        this.message = message;
        this.description = description;
      }
      util.inherits(FaunaError, Error);
      function InvalidValue(message) {
        FaunaError.call(this, "InvalidValue", message);
      }
      util.inherits(InvalidValue, FaunaError);
      function InvalidArity(min, max, actual, callerFunc) {
        var arityInfo = `${callerFunc} function requires ${messageForArity(min, max)} argument(s) but ${actual} were given`;
        var documentationLink = logDocumentationLink(callerFunc);
        FaunaError.call(this, "InvalidArity", `${arityInfo}
${documentationLink}`);
        this.min = min;
        this.max = max;
        this.actual = actual;
        function messageForArity(min2, max2) {
          if (max2 === null)
            return "at least " + min2;
          if (min2 === null)
            return "up to " + max2;
          if (min2 === max2)
            return min2;
          return "from " + min2 + " to " + max2;
        }
        function logDocumentationLink(functionName) {
          var docsURL = "https://docs.fauna.com/fauna/current/api/fql/functions/";
          return `For more info, see the docs: ${docsURL}${functionName.toLowerCase()}`;
        }
      }
      util.inherits(InvalidArity, FaunaError);
      function FaunaHTTPError(name, requestResult) {
        var response = requestResult.responseContent;
        var errors = response.errors;
        var message = errors.length === 0 ? '(empty "errors")' : errors[0].code;
        var description = errors.length === 0 ? '(empty "errors")' : errors[0].description;
        FaunaError.call(this, name, message, description);
        this.requestResult = requestResult;
      }
      util.inherits(FaunaHTTPError, FaunaError);
      FaunaHTTPError.prototype.errors = function() {
        return this.requestResult.responseContent.errors;
      };
      FaunaHTTPError.raiseForStatusCode = function(requestResult) {
        var code = requestResult.statusCode;
        if (code < 200 || code >= 300) {
          switch (code) {
            case 400:
              throw new BadRequest(requestResult);
            case 401:
              throw new Unauthorized(requestResult);
            case 403:
              throw new PermissionDenied(requestResult);
            case 404:
              throw new NotFound(requestResult);
            case 405:
              throw new MethodNotAllowed(requestResult);
            case 429:
              throw new TooManyRequests(requestResult);
            case 500:
              throw new InternalError(requestResult);
            case 503:
              throw new UnavailableError(requestResult);
            default:
              throw new FaunaHTTPError("UnknownError", requestResult);
          }
        }
      };
      function BadRequest(requestResult) {
        FaunaHTTPError.call(this, "BadRequest", requestResult);
      }
      util.inherits(BadRequest, FaunaHTTPError);
      function Unauthorized(requestResult) {
        FaunaHTTPError.call(this, "Unauthorized", requestResult);
        this.message = this.message += ". Check that endpoint, schema, port and secret are correct during client’s instantiation";
      }
      util.inherits(Unauthorized, FaunaHTTPError);
      function PermissionDenied(requestResult) {
        FaunaHTTPError.call(this, "PermissionDenied", requestResult);
      }
      util.inherits(PermissionDenied, FaunaHTTPError);
      function NotFound(requestResult) {
        FaunaHTTPError.call(this, "NotFound", requestResult);
      }
      util.inherits(NotFound, FaunaHTTPError);
      function MethodNotAllowed(requestResult) {
        FaunaHTTPError.call(this, "MethodNotAllowed", requestResult);
      }
      util.inherits(MethodNotAllowed, FaunaHTTPError);
      function TooManyRequests(requestResult) {
        FaunaHTTPError.call(this, "TooManyRequests", requestResult);
      }
      util.inherits(TooManyRequests, FaunaHTTPError);
      function InternalError(requestResult) {
        FaunaHTTPError.call(this, "InternalError", requestResult);
      }
      util.inherits(InternalError, FaunaHTTPError);
      function UnavailableError(requestResult) {
        FaunaHTTPError.call(this, "UnavailableError", requestResult);
      }
      util.inherits(UnavailableError, FaunaHTTPError);
      function StreamError(name, message, description) {
        FaunaError.call(this, name, message, description);
      }
      util.inherits(StreamError, FaunaError);
      function StreamsNotSupported(description) {
        FaunaError.call(this, "StreamsNotSupported", "streams not supported", description);
      }
      util.inherits(StreamsNotSupported, StreamError);
      function StreamErrorEvent(event) {
        var error = event.data || {};
        FaunaError.call(this, "StreamErrorEvent", error.code, error.description);
        this.event = event;
      }
      util.inherits(StreamErrorEvent, StreamError);
      function ClientClosed(message, description) {
        FaunaError.call(this, "ClientClosed", message, description);
      }
      util.inherits(ClientClosed, FaunaError);
      module.exports = {
        FaunaError,
        ClientClosed,
        FaunaHTTPError,
        InvalidValue,
        InvalidArity,
        BadRequest,
        Unauthorized,
        PermissionDenied,
        NotFound,
        MethodNotAllowed,
        TooManyRequests,
        InternalError,
        UnavailableError,
        StreamError,
        StreamsNotSupported,
        StreamErrorEvent
      };
    },
    "./node_modules/faunadb/src/query.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var annotate = __webpack_require__2("./node_modules/fn-annotate/index.js");
      var deprecate = __webpack_require__2("./node_modules/util-deprecate/browser.js");
      var Expr = __webpack_require__2("./node_modules/faunadb/src/Expr.js");
      var errors = __webpack_require__2("./node_modules/faunadb/src/errors.js");
      var values = __webpack_require__2("./node_modules/faunadb/src/values.js");
      var objectAssign = __webpack_require__2("./node_modules/object-assign/index.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      function Ref() {
        arity.between(1, 2, arguments, Ref.name);
        switch (arguments.length) {
          case 1:
            return new Expr({ "@ref": wrap(arguments[0]) });
          case 2:
            return new Expr({ ref: wrap(arguments[0]), id: wrap(arguments[1]) });
        }
      }
      function Bytes(bytes) {
        arity.exact(1, arguments, Bytes.name);
        return new values.Bytes(bytes);
      }
      function Abort(msg) {
        arity.exact(1, arguments, Abort.name);
        return new Expr({ abort: wrap(msg) });
      }
      function At(timestamp, expr) {
        arity.exact(2, arguments, At.name);
        return new Expr({ at: wrap(timestamp), expr: wrap(expr) });
      }
      function Let(vars, expr) {
        arity.exact(2, arguments, Let.name);
        var bindings = [];
        if (Array.isArray(vars)) {
          bindings = vars.map(function(item) {
            return wrapValues(item);
          });
        } else {
          bindings = Object.keys(vars).filter(function(k) {
            return vars[k] !== void 0;
          }).map(function(k) {
            var b = {};
            b[k] = wrap(vars[k]);
            return b;
          });
        }
        if (typeof expr === "function") {
          if (Array.isArray(vars)) {
            var expr_vars = [];
            vars.forEach(function(item) {
              Object.keys(item).forEach(function(name) {
                expr_vars.push(Var(name));
              });
            });
            expr = expr.apply(null, expr_vars);
          } else {
            expr = expr.apply(null, Object.keys(vars).map(function(name) {
              return Var(name);
            }));
          }
        }
        return new Expr({ let: bindings, in: wrap(expr) });
      }
      function Var(varName) {
        arity.exact(1, arguments, Var.name);
        return new Expr({ var: wrap(varName) });
      }
      function If(condition, then, _else) {
        arity.exact(3, arguments, If.name);
        return new Expr({ if: wrap(condition), then: wrap(then), else: wrap(_else) });
      }
      function Do() {
        arity.min(1, arguments, Do.name);
        var args = argsToArray(arguments);
        return new Expr({ do: wrap(args) });
      }
      var objectFunction = function(fields) {
        arity.exact(1, arguments, objectFunction.name);
        return new Expr({ object: wrapValues(fields) });
      };
      function Lambda() {
        arity.between(1, 2, arguments, Lambda.name);
        switch (arguments.length) {
          case 1:
            var value = arguments[0];
            if (typeof value === "function") {
              return _lambdaFunc(value);
            } else if (value instanceof Expr || util.checkInstanceHasProperty(value, "_isFaunaExpr")) {
              return value;
            } else {
              throw new errors.InvalidValue("Lambda function takes either a Function or an Expr.");
            }
          case 2:
            var var_name = arguments[0];
            var expr = arguments[1];
            return _lambdaExpr(var_name, expr);
        }
      }
      function _lambdaFunc(func) {
        var vars = annotate(func);
        switch (vars.length) {
          case 0:
            throw new errors.InvalidValue("Provided Function must take at least 1 argument.");
          case 1:
            return _lambdaExpr(vars[0], func(Var(vars[0])));
          default:
            return _lambdaExpr(vars, func.apply(null, vars.map(function(name) {
              return Var(name);
            })));
        }
      }
      function _lambdaExpr(var_name, expr) {
        return new Expr({ lambda: wrap(var_name), expr: wrap(expr) });
      }
      function Call(ref) {
        arity.min(1, arguments, Call.name);
        var args = argsToArray(arguments);
        args.shift();
        return new Expr({ call: wrap(ref), arguments: wrap(varargs(args)) });
      }
      function Query(lambda) {
        arity.exact(1, arguments, Query.name);
        return new Expr({ query: wrap(lambda) });
      }
      function Map2(collection, lambda_expr) {
        arity.exact(2, arguments, Map2.name);
        return new Expr({ map: wrap(lambda_expr), collection: wrap(collection) });
      }
      function Foreach(collection, lambda_expr) {
        arity.exact(2, arguments, Foreach.name);
        return new Expr({ foreach: wrap(lambda_expr), collection: wrap(collection) });
      }
      function Filter(collection, lambda_expr) {
        arity.exact(2, arguments, Filter.name);
        return new Expr({ filter: wrap(lambda_expr), collection: wrap(collection) });
      }
      function Take(number, collection) {
        arity.exact(2, arguments, Take.name);
        return new Expr({ take: wrap(number), collection: wrap(collection) });
      }
      function Drop(number, collection) {
        arity.exact(2, arguments, Drop.name);
        return new Expr({ drop: wrap(number), collection: wrap(collection) });
      }
      function Prepend(elements, collection) {
        arity.exact(2, arguments, Prepend.name);
        return new Expr({ prepend: wrap(elements), collection: wrap(collection) });
      }
      function Append(elements, collection) {
        arity.exact(2, arguments, Append.name);
        return new Expr({ append: wrap(elements), collection: wrap(collection) });
      }
      function IsEmpty(collection) {
        arity.exact(1, arguments, IsEmpty.name);
        return new Expr({ is_empty: wrap(collection) });
      }
      function IsNonEmpty(collection) {
        arity.exact(1, arguments, IsNonEmpty.name);
        return new Expr({ is_nonempty: wrap(collection) });
      }
      function IsNumber(expr) {
        arity.exact(1, arguments, IsNumber.name);
        return new Expr({ is_number: wrap(expr) });
      }
      function IsDouble(expr) {
        arity.exact(1, arguments, IsDouble.name);
        return new Expr({ is_double: wrap(expr) });
      }
      function IsInteger(expr) {
        arity.exact(1, arguments, IsInteger.name);
        return new Expr({ is_integer: wrap(expr) });
      }
      function IsBoolean(expr) {
        arity.exact(1, arguments, IsBoolean.name);
        return new Expr({ is_boolean: wrap(expr) });
      }
      function IsNull(expr) {
        arity.exact(1, arguments, IsNull.name);
        return new Expr({ is_null: wrap(expr) });
      }
      function IsBytes(expr) {
        arity.exact(1, arguments, IsBytes.name);
        return new Expr({ is_bytes: wrap(expr) });
      }
      function IsTimestamp(expr) {
        arity.exact(1, arguments, IsTimestamp.name);
        return new Expr({ is_timestamp: wrap(expr) });
      }
      function IsDate(expr) {
        arity.exact(1, arguments, IsDate.name);
        return new Expr({ is_date: wrap(expr) });
      }
      function IsString(expr) {
        arity.exact(1, arguments, IsString.name);
        return new Expr({ is_string: wrap(expr) });
      }
      function IsArray(expr) {
        arity.exact(1, arguments, IsArray.name);
        return new Expr({ is_array: wrap(expr) });
      }
      function IsObject(expr) {
        arity.exact(1, arguments, IsObject.name);
        return new Expr({ is_object: wrap(expr) });
      }
      function IsRef(expr) {
        arity.exact(1, arguments, IsRef.name);
        return new Expr({ is_ref: wrap(expr) });
      }
      function IsSet(expr) {
        arity.exact(1, arguments, IsSet.name);
        return new Expr({ is_set: wrap(expr) });
      }
      function IsDoc(expr) {
        arity.exact(1, arguments, IsDoc.name);
        return new Expr({ is_doc: wrap(expr) });
      }
      function IsLambda(expr) {
        arity.exact(1, arguments, IsLambda.name);
        return new Expr({ is_lambda: wrap(expr) });
      }
      function IsCollection(expr) {
        arity.exact(1, arguments, IsCollection.name);
        return new Expr({ is_collection: wrap(expr) });
      }
      function IsDatabase(expr) {
        arity.exact(1, arguments, IsDatabase.name);
        return new Expr({ is_database: wrap(expr) });
      }
      function IsIndex(expr) {
        arity.exact(1, arguments, IsIndex.name);
        return new Expr({ is_index: wrap(expr) });
      }
      function IsFunction(expr) {
        arity.exact(1, arguments, IsFunction.name);
        return new Expr({ is_function: wrap(expr) });
      }
      function IsKey(expr) {
        arity.exact(1, arguments, IsKey.name);
        return new Expr({ is_key: wrap(expr) });
      }
      function IsToken(expr) {
        arity.exact(1, arguments, IsToken.name);
        return new Expr({ is_token: wrap(expr) });
      }
      function IsCredentials(expr) {
        arity.exact(1, arguments, IsCredentials.name);
        return new Expr({ is_credentials: wrap(expr) });
      }
      function IsRole(expr) {
        arity.exact(1, arguments, IsRole.name);
        return new Expr({ is_role: wrap(expr) });
      }
      function Get(ref, ts) {
        arity.between(1, 2, arguments, Get.name);
        ts = util.defaults(ts, null);
        return new Expr(params({ get: wrap(ref) }, { ts: wrap(ts) }));
      }
      function KeyFromSecret(secret) {
        arity.exact(1, arguments, KeyFromSecret.name);
        return new Expr({ key_from_secret: wrap(secret) });
      }
      function Reduce(lambda, initial, collection) {
        arity.exact(3, arguments, Reduce.name);
        return new Expr({
          reduce: wrap(lambda),
          initial: wrap(initial),
          collection: wrap(collection)
        });
      }
      function Paginate(set, opts) {
        arity.between(1, 2, arguments, Paginate.name);
        opts = util.defaults(opts, {});
        return new Expr(objectAssign({ paginate: wrap(set) }, wrapValues(opts)));
      }
      function Exists(ref, ts) {
        arity.between(1, 2, arguments, Exists.name);
        ts = util.defaults(ts, null);
        return new Expr(params({ exists: wrap(ref) }, { ts: wrap(ts) }));
      }
      function Create(collection_ref, params2) {
        arity.between(1, 2, arguments, Create.name);
        return new Expr({ create: wrap(collection_ref), params: wrap(params2) });
      }
      function Update(ref, params2) {
        arity.exact(2, arguments, Update.name);
        return new Expr({ update: wrap(ref), params: wrap(params2) });
      }
      function Replace(ref, params2) {
        arity.exact(2, arguments, Replace.name);
        return new Expr({ replace: wrap(ref), params: wrap(params2) });
      }
      function Delete(ref) {
        arity.exact(1, arguments, Delete.name);
        return new Expr({ delete: wrap(ref) });
      }
      function Insert(ref, ts, action, params2) {
        arity.exact(4, arguments, Insert.name);
        return new Expr({
          insert: wrap(ref),
          ts: wrap(ts),
          action: wrap(action),
          params: wrap(params2)
        });
      }
      function Remove(ref, ts, action) {
        arity.exact(3, arguments, Remove.name);
        return new Expr({ remove: wrap(ref), ts: wrap(ts), action: wrap(action) });
      }
      function CreateClass(params2) {
        arity.exact(1, arguments, CreateClass.name);
        return new Expr({ create_class: wrap(params2) });
      }
      function CreateCollection(params2) {
        arity.exact(1, arguments, CreateCollection.name);
        return new Expr({ create_collection: wrap(params2) });
      }
      function CreateDatabase(params2) {
        arity.exact(1, arguments, CreateDatabase.name);
        return new Expr({ create_database: wrap(params2) });
      }
      function CreateIndex(params2) {
        arity.exact(1, arguments, CreateIndex.name);
        return new Expr({ create_index: wrap(params2) });
      }
      function CreateKey(params2) {
        arity.exact(1, arguments, CreateKey.name);
        return new Expr({ create_key: wrap(params2) });
      }
      function CreateFunction(params2) {
        arity.exact(1, arguments, CreateFunction.name);
        return new Expr({ create_function: wrap(params2) });
      }
      function CreateRole(params2) {
        arity.exact(1, arguments, CreateRole.name);
        return new Expr({ create_role: wrap(params2) });
      }
      function CreateAccessProvider(params2) {
        arity.exact(1, arguments, CreateAccessProvider.name);
        return new Expr({ create_access_provider: wrap(params2) });
      }
      function Singleton(ref) {
        arity.exact(1, arguments, Singleton.name);
        return new Expr({ singleton: wrap(ref) });
      }
      function Events(ref_set) {
        arity.exact(1, arguments, Events.name);
        return new Expr({ events: wrap(ref_set) });
      }
      function Match(index) {
        arity.min(1, arguments, Match.name);
        var args = argsToArray(arguments);
        args.shift();
        return new Expr({ match: wrap(index), terms: wrap(varargs(args)) });
      }
      function Union() {
        arity.min(1, arguments, Union.name);
        return new Expr({ union: wrap(varargs(arguments)) });
      }
      function Merge(merge, _with, lambda) {
        arity.between(2, 3, arguments, Merge.name);
        return new Expr(params({ merge: wrap(merge), with: wrap(_with) }, { lambda: wrap(lambda) }));
      }
      function Intersection() {
        arity.min(1, arguments, Intersection.name);
        return new Expr({ intersection: wrap(varargs(arguments)) });
      }
      function Difference() {
        arity.min(1, arguments, Difference.name);
        return new Expr({ difference: wrap(varargs(arguments)) });
      }
      function Distinct(set) {
        arity.exact(1, arguments, Distinct.name);
        return new Expr({ distinct: wrap(set) });
      }
      function Join(source, target) {
        arity.exact(2, arguments, Join.name);
        return new Expr({ join: wrap(source), with: wrap(target) });
      }
      function Range(set, from, to) {
        arity.exact(3, arguments, Range.name);
        return new Expr({ range: wrap(set), from: wrap(from), to: wrap(to) });
      }
      function Login(ref, params2) {
        arity.exact(2, arguments, Login.name);
        return new Expr({ login: wrap(ref), params: wrap(params2) });
      }
      function Logout(delete_tokens) {
        arity.exact(1, arguments, Logout.name);
        return new Expr({ logout: wrap(delete_tokens) });
      }
      function Identify(ref, password) {
        arity.exact(2, arguments, Identify.name);
        return new Expr({ identify: wrap(ref), password: wrap(password) });
      }
      function Identity() {
        arity.exact(0, arguments, Identity.name);
        return new Expr({ identity: null });
      }
      function CurrentIdentity() {
        arity.exact(0, arguments, CurrentIdentity.name);
        return new Expr({ current_identity: null });
      }
      function HasIdentity() {
        arity.exact(0, arguments, HasIdentity.name);
        return new Expr({ has_identity: null });
      }
      function HasCurrentIdentity() {
        arity.exact(0, arguments, HasCurrentIdentity.name);
        return new Expr({ has_current_identity: null });
      }
      function CurrentToken() {
        arity.exact(0, arguments, CurrentToken.name);
        return new Expr({ current_token: null });
      }
      function HasCurrentToken() {
        arity.exact(0, arguments, HasCurrentToken.name);
        return new Expr({ has_current_token: null });
      }
      function Concat(strings, separator) {
        arity.min(1, arguments, Concat.name);
        separator = util.defaults(separator, null);
        return new Expr(params({ concat: wrap(strings) }, { separator: wrap(separator) }));
      }
      function Casefold(string, normalizer) {
        arity.min(1, arguments, Casefold.name);
        return new Expr(params({ casefold: wrap(string) }, { normalizer: wrap(normalizer) }));
      }
      function ContainsStr(value, search) {
        arity.exact(2, arguments, ContainsStr.name);
        return new Expr({ containsstr: wrap(value), search: wrap(search) });
      }
      function ContainsStrRegex(value, pattern) {
        arity.exact(2, arguments, ContainsStrRegex.name);
        return new Expr({ containsstrregex: wrap(value), pattern: wrap(pattern) });
      }
      function StartsWith(value, search) {
        arity.exact(2, arguments, StartsWith.name);
        return new Expr({ startswith: wrap(value), search: wrap(search) });
      }
      function EndsWith(value, search) {
        arity.exact(2, arguments, EndsWith.name);
        return new Expr({ endswith: wrap(value), search: wrap(search) });
      }
      function RegexEscape(value) {
        arity.exact(1, arguments, RegexEscape.name);
        return new Expr({ regexescape: wrap(value) });
      }
      function FindStr(value, find, start) {
        arity.between(2, 3, arguments, FindStr.name);
        start = util.defaults(start, null);
        return new Expr(params({ findstr: wrap(value), find: wrap(find) }, { start: wrap(start) }));
      }
      function FindStrRegex(value, pattern, start, numResults) {
        arity.between(2, 4, arguments, FindStrRegex.name);
        start = util.defaults(start, null);
        return new Expr(params({ findstrregex: wrap(value), pattern: wrap(pattern) }, { start: wrap(start), num_results: wrap(numResults) }));
      }
      function Length(value) {
        arity.exact(1, arguments, Length.name);
        return new Expr({ length: wrap(value) });
      }
      function LowerCase(value) {
        arity.exact(1, arguments, LowerCase.name);
        return new Expr({ lowercase: wrap(value) });
      }
      function LTrim(value) {
        arity.exact(1, arguments, LTrim.name);
        return new Expr({ ltrim: wrap(value) });
      }
      function NGram(terms, min, max) {
        arity.between(1, 3, arguments, NGram.name);
        min = util.defaults(min, null);
        max = util.defaults(max, null);
        return new Expr(params({ ngram: wrap(terms) }, { min: wrap(min), max: wrap(max) }));
      }
      function Repeat(value, number) {
        arity.between(1, 2, arguments, Repeat.name);
        number = util.defaults(number, null);
        return new Expr(params({ repeat: wrap(value) }, { number: wrap(number) }));
      }
      function ReplaceStr(value, find, replace) {
        arity.exact(3, arguments, ReplaceStr.name);
        return new Expr({
          replacestr: wrap(value),
          find: wrap(find),
          replace: wrap(replace)
        });
      }
      function ReplaceStrRegex(value, pattern, replace, first) {
        arity.between(3, 4, arguments, ReplaceStrRegex.name);
        first = util.defaults(first, null);
        return new Expr(params({
          replacestrregex: wrap(value),
          pattern: wrap(pattern),
          replace: wrap(replace)
        }, { first: wrap(first) }));
      }
      function RTrim(value) {
        arity.exact(1, arguments, RTrim.name);
        return new Expr({ rtrim: wrap(value) });
      }
      function Space(num) {
        arity.exact(1, arguments, Space.name);
        return new Expr({ space: wrap(num) });
      }
      function SubString(value, start, length) {
        arity.between(1, 3, arguments, SubString.name);
        start = util.defaults(start, null);
        length = util.defaults(length, null);
        return new Expr(params({ substring: wrap(value) }, { start: wrap(start), length: wrap(length) }));
      }
      function TitleCase(value) {
        arity.exact(1, arguments, TitleCase.name);
        return new Expr({ titlecase: wrap(value) });
      }
      function Trim(value) {
        arity.exact(1, arguments, Trim.name);
        return new Expr({ trim: wrap(value) });
      }
      function UpperCase(value) {
        arity.exact(1, arguments, UpperCase.name);
        return new Expr({ uppercase: wrap(value) });
      }
      function Format(string) {
        arity.min(1, arguments, Format.name);
        var args = argsToArray(arguments);
        args.shift();
        return new Expr({ format: wrap(string), values: wrap(varargs(args)) });
      }
      function Time(string) {
        arity.exact(1, arguments, Time.name);
        return new Expr({ time: wrap(string) });
      }
      function Epoch(number, unit) {
        arity.exact(2, arguments, Epoch.name);
        return new Expr({ epoch: wrap(number), unit: wrap(unit) });
      }
      function TimeAdd(base, offset, unit) {
        arity.exact(3, arguments, TimeAdd.name);
        return new Expr({
          time_add: wrap(base),
          offset: wrap(offset),
          unit: wrap(unit)
        });
      }
      function TimeSubtract(base, offset, unit) {
        arity.exact(3, arguments, TimeSubtract.name);
        return new Expr({
          time_subtract: wrap(base),
          offset: wrap(offset),
          unit: wrap(unit)
        });
      }
      function TimeDiff(start, finish, unit) {
        arity.exact(3, arguments, TimeDiff.name);
        return new Expr({
          time_diff: wrap(start),
          other: wrap(finish),
          unit: wrap(unit)
        });
      }
      function Date2(string) {
        arity.exact(1, arguments, Date2.name);
        return new Expr({ date: wrap(string) });
      }
      function Now() {
        arity.exact(0, arguments, Now.name);
        return new Expr({ now: wrap(null) });
      }
      function NextId() {
        arity.exact(0, arguments, NextId.name);
        return new Expr({ next_id: null });
      }
      function NewId() {
        arity.exact(0, arguments, NewId.name);
        return new Expr({ new_id: null });
      }
      function Database(name, scope) {
        arity.between(1, 2, arguments, Database.name);
        switch (arguments.length) {
          case 1:
            return new Expr({ database: wrap(name) });
          case 2:
            return new Expr({ database: wrap(name), scope: wrap(scope) });
        }
      }
      function Index(name, scope) {
        arity.between(1, 2, arguments, Index.name);
        switch (arguments.length) {
          case 1:
            return new Expr({ index: wrap(name) });
          case 2:
            return new Expr({ index: wrap(name), scope: wrap(scope) });
        }
      }
      function Class(name, scope) {
        arity.between(1, 2, arguments, Class.name);
        switch (arguments.length) {
          case 1:
            return new Expr({ class: wrap(name) });
          case 2:
            return new Expr({ class: wrap(name), scope: wrap(scope) });
        }
      }
      function Collection(name, scope) {
        arity.between(1, 2, arguments, Collection.name);
        switch (arguments.length) {
          case 1:
            return new Expr({ collection: wrap(name) });
          case 2:
            return new Expr({ collection: wrap(name), scope: wrap(scope) });
        }
      }
      function FunctionFn(name, scope) {
        arity.between(1, 2, arguments, FunctionFn.name);
        switch (arguments.length) {
          case 1:
            return new Expr({ function: wrap(name) });
          case 2:
            return new Expr({ function: wrap(name), scope: wrap(scope) });
        }
      }
      function Role(name, scope) {
        arity.between(1, 2, arguments, Role.name);
        scope = util.defaults(scope, null);
        return new Expr(params({ role: wrap(name) }, { scope: wrap(scope) }));
      }
      function AccessProviders(scope) {
        arity.max(1, arguments, AccessProviders.name);
        scope = util.defaults(scope, null);
        return new Expr({ access_providers: wrap(scope) });
      }
      function Classes(scope) {
        arity.max(1, arguments, Classes.name);
        scope = util.defaults(scope, null);
        return new Expr({ classes: wrap(scope) });
      }
      function Collections(scope) {
        arity.max(1, arguments, Collections.name);
        scope = util.defaults(scope, null);
        return new Expr({ collections: wrap(scope) });
      }
      function Databases(scope) {
        arity.max(1, arguments, Databases.name);
        scope = util.defaults(scope, null);
        return new Expr({ databases: wrap(scope) });
      }
      function Indexes(scope) {
        arity.max(1, arguments, Indexes.name);
        scope = util.defaults(scope, null);
        return new Expr({ indexes: wrap(scope) });
      }
      function Functions(scope) {
        arity.max(1, arguments, Functions.name);
        scope = util.defaults(scope, null);
        return new Expr({ functions: wrap(scope) });
      }
      function Roles(scope) {
        arity.max(1, arguments, Roles.name);
        scope = util.defaults(scope, null);
        return new Expr({ roles: wrap(scope) });
      }
      function Keys(scope) {
        arity.max(1, arguments, Keys.name);
        scope = util.defaults(scope, null);
        return new Expr({ keys: wrap(scope) });
      }
      function Tokens(scope) {
        arity.max(1, arguments, Tokens.name);
        scope = util.defaults(scope, null);
        return new Expr({ tokens: wrap(scope) });
      }
      function Credentials(scope) {
        arity.max(1, arguments, Credentials.name);
        scope = util.defaults(scope, null);
        return new Expr({ credentials: wrap(scope) });
      }
      function Equals() {
        arity.min(1, arguments, Equals.name);
        return new Expr({ equals: wrap(varargs(arguments)) });
      }
      function Contains(path, _in) {
        arity.exact(2, arguments, Contains.name);
        return new Expr({ contains: wrap(path), in: wrap(_in) });
      }
      function ContainsValue(value, _in) {
        arity.exact(2, arguments, ContainsValue.name);
        return new Expr({ contains_value: wrap(value), in: wrap(_in) });
      }
      function ContainsField(field, obj) {
        arity.exact(2, arguments, ContainsField.name);
        return new Expr({ contains_field: wrap(field), in: wrap(obj) });
      }
      function ContainsPath(path, _in) {
        arity.exact(2, arguments, ContainsPath.name);
        return new Expr({ contains_path: wrap(path), in: wrap(_in) });
      }
      function Select(path, from, _default) {
        arity.between(2, 3, arguments, Select.name);
        var exprObj = { select: wrap(path), from: wrap(from) };
        if (_default !== void 0) {
          exprObj.default = wrap(_default);
        }
        return new Expr(exprObj);
      }
      function SelectAll(path, from) {
        arity.exact(2, arguments, SelectAll.name);
        return new Expr({ select_all: wrap(path), from: wrap(from) });
      }
      function Abs(expr) {
        arity.exact(1, arguments, Abs.name);
        return new Expr({ abs: wrap(expr) });
      }
      function Add() {
        arity.min(1, arguments, Add.name);
        return new Expr({ add: wrap(varargs(arguments)) });
      }
      function BitAnd() {
        arity.min(1, arguments, BitAnd.name);
        return new Expr({ bitand: wrap(varargs(arguments)) });
      }
      function BitNot(expr) {
        arity.exact(1, arguments, BitNot.name);
        return new Expr({ bitnot: wrap(expr) });
      }
      function BitOr() {
        arity.min(1, arguments, BitOr.name);
        return new Expr({ bitor: wrap(varargs(arguments)) });
      }
      function BitXor() {
        arity.min(1, arguments, BitXor.name);
        return new Expr({ bitxor: wrap(varargs(arguments)) });
      }
      function Ceil(expr) {
        arity.exact(1, arguments, Ceil.name);
        return new Expr({ ceil: wrap(expr) });
      }
      function Divide() {
        arity.min(1, arguments, Divide.name);
        return new Expr({ divide: wrap(varargs(arguments)) });
      }
      function Floor(expr) {
        arity.exact(1, arguments, Floor.name);
        return new Expr({ floor: wrap(expr) });
      }
      function Max() {
        arity.min(1, arguments, Max.name);
        return new Expr({ max: wrap(varargs(arguments)) });
      }
      function Min() {
        arity.min(1, arguments, Min.name);
        return new Expr({ min: wrap(varargs(arguments)) });
      }
      function Modulo() {
        arity.min(1, arguments, Modulo.name);
        return new Expr({ modulo: wrap(varargs(arguments)) });
      }
      function Multiply() {
        arity.min(1, arguments, Multiply.name);
        return new Expr({ multiply: wrap(varargs(arguments)) });
      }
      function Round(value, precision) {
        arity.min(1, arguments, Round.name);
        precision = util.defaults(precision, null);
        return new Expr(params({ round: wrap(value) }, { precision: wrap(precision) }));
      }
      function Subtract() {
        arity.min(1, arguments, Subtract.name);
        return new Expr({ subtract: wrap(varargs(arguments)) });
      }
      function Sign(expr) {
        arity.exact(1, arguments, Sign.name);
        return new Expr({ sign: wrap(expr) });
      }
      function Sqrt(expr) {
        arity.exact(1, arguments, Sqrt.name);
        return new Expr({ sqrt: wrap(expr) });
      }
      function Trunc(value, precision) {
        arity.min(1, arguments, Trunc.name);
        precision = util.defaults(precision, null);
        return new Expr(params({ trunc: wrap(value) }, { precision: wrap(precision) }));
      }
      function Count(collection) {
        arity.exact(1, arguments, Count.name);
        return new Expr({ count: wrap(collection) });
      }
      function Sum(collection) {
        arity.exact(1, arguments, Sum.name);
        return new Expr({ sum: wrap(collection) });
      }
      function Mean(collection) {
        arity.exact(1, arguments, Mean.name);
        return new Expr({ mean: wrap(collection) });
      }
      function Any(collection) {
        arity.exact(1, arguments, Any.name);
        return new Expr({ any: wrap(collection) });
      }
      function All(collection) {
        arity.exact(1, arguments, All.name);
        return new Expr({ all: wrap(collection) });
      }
      function Acos(expr) {
        arity.exact(1, arguments, Acos.name);
        return new Expr({ acos: wrap(expr) });
      }
      function Asin(expr) {
        arity.exact(1, arguments, Asin.name);
        return new Expr({ asin: wrap(expr) });
      }
      function Atan(expr) {
        arity.exact(1, arguments, Atan.name);
        return new Expr({ atan: wrap(expr) });
      }
      function Cos(expr) {
        arity.exact(1, arguments, Cos.name);
        return new Expr({ cos: wrap(expr) });
      }
      function Cosh(expr) {
        arity.exact(1, arguments, Cosh.name);
        return new Expr({ cosh: wrap(expr) });
      }
      function Degrees(expr) {
        arity.exact(1, arguments, Degrees.name);
        return new Expr({ degrees: wrap(expr) });
      }
      function Exp(expr) {
        arity.exact(1, arguments, Exp.name);
        return new Expr({ exp: wrap(expr) });
      }
      function Hypot(value, side) {
        arity.min(1, arguments, Hypot.name);
        side = util.defaults(side, null);
        return new Expr(params({ hypot: wrap(value) }, { b: wrap(side) }));
      }
      function Ln(expr) {
        arity.exact(1, arguments, Ln.name);
        return new Expr({ ln: wrap(expr) });
      }
      function Log(expr) {
        arity.exact(1, arguments, Log.name);
        return new Expr({ log: wrap(expr) });
      }
      function Pow(value, exponent) {
        arity.min(1, arguments, Pow.name);
        exponent = util.defaults(exponent, null);
        return new Expr(params({ pow: wrap(value) }, { exp: wrap(exponent) }));
      }
      function Radians(expr) {
        arity.exact(1, arguments, Radians.name);
        return new Expr({ radians: wrap(expr) });
      }
      function Sin(expr) {
        arity.exact(1, arguments, Sin.name);
        return new Expr({ sin: wrap(expr) });
      }
      function Sinh(expr) {
        arity.exact(1, arguments, Sinh.name);
        return new Expr({ sinh: wrap(expr) });
      }
      function Tan(expr) {
        arity.exact(1, arguments, Tan.name);
        return new Expr({ tan: wrap(expr) });
      }
      function Tanh(expr) {
        arity.exact(1, arguments, Tanh.name);
        return new Expr({ tanh: wrap(expr) });
      }
      function LT() {
        arity.min(1, arguments, LT.name);
        return new Expr({ lt: wrap(varargs(arguments)) });
      }
      function LTE() {
        arity.min(1, arguments, LTE.name);
        return new Expr({ lte: wrap(varargs(arguments)) });
      }
      function GT() {
        arity.min(1, arguments, GT.name);
        return new Expr({ gt: wrap(varargs(arguments)) });
      }
      function GTE() {
        arity.min(1, arguments, GTE.name);
        return new Expr({ gte: wrap(varargs(arguments)) });
      }
      function And() {
        arity.min(1, arguments, And.name);
        return new Expr({ and: wrap(varargs(arguments)) });
      }
      function Or() {
        arity.min(1, arguments, Or.name);
        return new Expr({ or: wrap(varargs(arguments)) });
      }
      function Not(boolean) {
        arity.exact(1, arguments, Not.name);
        return new Expr({ not: wrap(boolean) });
      }
      function ToString(expr) {
        arity.exact(1, arguments, ToString.name);
        return new Expr({ to_string: wrap(expr) });
      }
      function ToNumber(expr) {
        arity.exact(1, arguments, ToNumber.name);
        return new Expr({ to_number: wrap(expr) });
      }
      function ToObject(expr) {
        arity.exact(1, arguments, ToObject.name);
        return new Expr({ to_object: wrap(expr) });
      }
      function ToArray(expr) {
        arity.exact(1, arguments, ToArray.name);
        return new Expr({ to_array: wrap(expr) });
      }
      function ToDouble(expr) {
        arity.exact(1, arguments, ToDouble.name);
        return new Expr({ to_double: wrap(expr) });
      }
      function ToInteger(expr) {
        arity.exact(1, arguments, ToInteger.name);
        return new Expr({ to_integer: wrap(expr) });
      }
      function ToTime(expr) {
        arity.exact(1, arguments, ToTime.name);
        return new Expr({ to_time: wrap(expr) });
      }
      function ToSeconds(expr) {
        arity.exact(1, arguments, ToSeconds.name);
        return new Expr({ to_seconds: wrap(expr) });
      }
      function ToMillis(expr) {
        arity.exact(1, arguments, ToMillis.name);
        return new Expr({ to_millis: wrap(expr) });
      }
      function ToMicros(expr) {
        arity.exact(1, arguments, ToMicros.name);
        return new Expr({ to_micros: wrap(expr) });
      }
      function DayOfWeek(expr) {
        arity.exact(1, arguments, DayOfWeek.name);
        return new Expr({ day_of_week: wrap(expr) });
      }
      function DayOfYear(expr) {
        arity.exact(1, arguments, DayOfYear.name);
        return new Expr({ day_of_year: wrap(expr) });
      }
      function DayOfMonth(expr) {
        arity.exact(1, arguments, DayOfMonth.name);
        return new Expr({ day_of_month: wrap(expr) });
      }
      function Hour(expr) {
        arity.exact(1, arguments, Hour.name);
        return new Expr({ hour: wrap(expr) });
      }
      function Minute(expr) {
        arity.exact(1, arguments, Minute.name);
        return new Expr({ minute: wrap(expr) });
      }
      function Second(expr) {
        arity.exact(1, arguments, Second.name);
        return new Expr({ second: wrap(expr) });
      }
      function Month(expr) {
        arity.exact(1, arguments, Month.name);
        return new Expr({ month: wrap(expr) });
      }
      function Year(expr) {
        arity.exact(1, arguments, Year.name);
        return new Expr({ year: wrap(expr) });
      }
      function ToDate(expr) {
        arity.exact(1, arguments, ToDate.name);
        return new Expr({ to_date: wrap(expr) });
      }
      function MoveDatabase(from, to) {
        arity.exact(2, arguments, MoveDatabase.name);
        return new Expr({ move_database: wrap(from), to: wrap(to) });
      }
      function Documents(collection) {
        arity.exact(1, arguments, Documents.name);
        return new Expr({ documents: wrap(collection) });
      }
      function Reverse(expr) {
        arity.exact(1, arguments, Reverse.name);
        return new Expr({ reverse: wrap(expr) });
      }
      function AccessProvider(name) {
        arity.exact(1, arguments, AccessProvider.name);
        return new Expr({ access_provider: wrap(name) });
      }
      function arity(min, max, args, callerFunc) {
        if (min !== null && args.length < min || max !== null && args.length > max) {
          throw new errors.InvalidArity(min, max, args.length, callerFunc);
        }
      }
      arity.exact = function(n, args, callerFunc) {
        arity(n, n, args, callerFunc);
      };
      arity.max = function(n, args, callerFunc) {
        arity(null, n, args, callerFunc);
      };
      arity.min = function(n, args, callerFunc) {
        arity(n, null, args, callerFunc);
      };
      arity.between = function(min, max, args, callerFunc) {
        arity(min, max, args, callerFunc);
      };
      function params(mainParams, optionalParams) {
        for (var key in optionalParams) {
          var val = optionalParams[key];
          if (val !== null && val !== void 0) {
            mainParams[key] = val;
          }
        }
        return mainParams;
      }
      function varargs(values2) {
        var valuesAsArr = Array.isArray(values2) ? values2 : Array.prototype.slice.call(values2);
        return values2.length === 1 ? values2[0] : valuesAsArr;
      }
      function argsToArray(args) {
        var rv = [];
        rv.push.apply(rv, args);
        return rv;
      }
      function wrap(obj) {
        arity.exact(1, arguments, wrap.name);
        if (obj === null) {
          return null;
        } else if (obj instanceof Expr || util.checkInstanceHasProperty(obj, "_isFaunaExpr")) {
          return obj;
        } else if (typeof obj === "symbol") {
          return obj.toString().replace(/Symbol\((.*)\)/, function(str, symbol) {
            return symbol;
          });
        } else if (typeof obj === "function") {
          return Lambda(obj);
        } else if (Array.isArray(obj)) {
          return new Expr(obj.map(function(elem) {
            return wrap(elem);
          }));
        } else if (obj instanceof Uint8Array || obj instanceof ArrayBuffer) {
          return new values.Bytes(obj);
        } else if (typeof obj === "object") {
          return new Expr({ object: wrapValues(obj) });
        } else {
          return obj;
        }
      }
      function wrapValues(obj) {
        if (obj !== null) {
          var rv = {};
          Object.keys(obj).forEach(function(key) {
            rv[key] = wrap(obj[key]);
          });
          return rv;
        } else {
          return null;
        }
      }
      module.exports = {
        Ref,
        Bytes,
        Abort,
        At,
        Let,
        Var,
        If,
        Do,
        Object: objectFunction,
        Lambda,
        Call,
        Query,
        Map: Map2,
        Foreach,
        Filter,
        Take,
        Drop,
        Prepend,
        Append,
        IsEmpty,
        IsNonEmpty,
        IsNumber,
        IsDouble,
        IsInteger,
        IsBoolean,
        IsNull,
        IsBytes,
        IsTimestamp,
        IsDate,
        IsString,
        IsArray,
        IsObject,
        IsRef,
        IsSet,
        IsDoc,
        IsLambda,
        IsCollection,
        IsDatabase,
        IsIndex,
        IsFunction,
        IsKey,
        IsToken,
        IsCredentials,
        IsRole,
        Get,
        KeyFromSecret,
        Reduce,
        Paginate,
        Exists,
        Create,
        Update,
        Replace,
        Delete,
        Insert,
        Remove,
        CreateClass: deprecate(CreateClass, "CreateClass() is deprecated, use CreateCollection() instead"),
        CreateCollection,
        CreateDatabase,
        CreateIndex,
        CreateKey,
        CreateFunction,
        CreateRole,
        CreateAccessProvider,
        Singleton,
        Events,
        Match,
        Union,
        Merge,
        Intersection,
        Difference,
        Distinct,
        Join,
        Range,
        Login,
        Logout,
        Identify,
        Identity: deprecate(Identity, "Identity() is deprecated, use CurrentIdentity() instead"),
        CurrentIdentity,
        HasIdentity: deprecate(HasIdentity, "HasIdentity() is deprecated, use HasCurrentIdentity() instead"),
        HasCurrentIdentity,
        CurrentToken,
        HasCurrentToken,
        Concat,
        Casefold,
        ContainsStr,
        ContainsStrRegex,
        StartsWith,
        EndsWith,
        FindStr,
        FindStrRegex,
        Length,
        LowerCase,
        LTrim,
        NGram,
        Repeat,
        ReplaceStr,
        ReplaceStrRegex,
        RegexEscape,
        RTrim,
        Space,
        SubString,
        TitleCase,
        Trim,
        UpperCase,
        Format,
        Time,
        TimeAdd,
        TimeSubtract,
        TimeDiff,
        Epoch,
        Date: Date2,
        Now,
        NextId: deprecate(NextId, "NextId() is deprecated, use NewId() instead"),
        NewId,
        Database,
        Index,
        Class: deprecate(Class, "Class() is deprecated, use Collection() instead"),
        Collection,
        Function: FunctionFn,
        Role,
        AccessProviders,
        Classes: deprecate(Classes, "Classes() is deprecated, use Collections() instead"),
        Collections,
        Databases,
        Indexes,
        Functions,
        Roles,
        Keys,
        Tokens,
        Credentials,
        Equals,
        Contains: deprecate(Contains, "Contains() is deprecated, use ContainsPath() instead"),
        ContainsPath,
        ContainsField,
        ContainsValue,
        Select,
        SelectAll: deprecate(SelectAll, "SelectAll() is deprecated. Avoid use."),
        Abs,
        Add,
        BitAnd,
        BitNot,
        BitOr,
        BitXor,
        Ceil,
        Divide,
        Floor,
        Max,
        Min,
        Modulo,
        Multiply,
        Round,
        Subtract,
        Sign,
        Sqrt,
        Trunc,
        Count,
        Sum,
        Mean,
        Any,
        All,
        Acos,
        Asin,
        Atan,
        Cos,
        Cosh,
        Degrees,
        Exp,
        Hypot,
        Ln,
        Log,
        Pow,
        Radians,
        Sin,
        Sinh,
        Tan,
        Tanh,
        LT,
        LTE,
        GT,
        GTE,
        And,
        Or,
        Not,
        ToString,
        ToNumber,
        ToObject,
        ToArray,
        ToDouble,
        ToInteger,
        ToTime,
        ToSeconds,
        ToMicros,
        ToMillis,
        DayOfMonth,
        DayOfWeek,
        DayOfYear,
        Second,
        Minute,
        Hour,
        Month,
        Year,
        ToDate,
        MoveDatabase,
        Documents,
        Reverse,
        AccessProvider,
        wrap
      };
    },
    "./node_modules/faunadb/src/stream.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var { AbortController } = __webpack_require__2("./node_modules/node-abort-controller/browser.js");
      var RequestResult = __webpack_require__2("./node_modules/faunadb/src/RequestResult.js");
      var errors = __webpack_require__2("./node_modules/faunadb/src/errors.js");
      var json = __webpack_require__2("./node_modules/faunadb/src/_json.js");
      var http = __webpack_require__2("./node_modules/faunadb/src/_http/index.js");
      var q = __webpack_require__2("./node_modules/faunadb/src/query.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var DefaultEvents = ["start", "error", "version", "history_rewrite", "set"];
      var DocumentStreamEvents = DefaultEvents.concat(["snapshot"]);
      function StreamClient(client, expression, options, onEvent) {
        options = util.applyDefaults(options, {
          fields: null
        });
        this._client = client;
        this._onEvent = onEvent;
        this._query = q.wrap(expression);
        this._urlParams = options.fields ? { fields: options.fields.join(",") } : null;
        this._abort = new AbortController();
        this._state = "idle";
      }
      StreamClient.prototype.snapshot = function() {
        var self2 = this;
        self2._client.query(q.Get(self2._query)).then(function(doc) {
          self2._onEvent({
            type: "snapshot",
            event: doc
          });
        }).catch(function(error) {
          self2._onEvent({
            type: "error",
            event: error
          });
        });
      };
      StreamClient.prototype.subscribe = function() {
        var self2 = this;
        if (self2._state === "idle") {
          self2._state = "open";
        } else {
          throw new Error("Subscription#start should not be called several times, consider instantiating a new stream instead.");
        }
        var body = JSON.stringify(self2._query);
        var startTime = Date.now();
        var buffer = "";
        function onResponse(response) {
          var endTime = Date.now();
          var parsed;
          try {
            parsed = json.parseJSON(response.body);
          } catch (_) {
            parsed = response.body;
          }
          var result = new RequestResult("POST", "stream", self2._urlParams, body, self2._query, response.body, parsed, response.status, response.headers, startTime, endTime);
          self2._client._handleRequestResult(response, result);
        }
        function onData(data) {
          var result = json.parseJSONStreaming(buffer + data);
          buffer = result.buffer;
          result.values.forEach(function(event) {
            if (event.txn !== void 0) {
              self2._client.syncLastTxnTime(event.txn);
            }
            if (event.event === "error") {
              onError(new errors.StreamErrorEvent(event));
            } else {
              self2._onEvent(event);
            }
          });
        }
        function onError(error) {
          if (error instanceof http.AbortError) {
            return;
          }
          self2._onEvent({
            type: "error",
            event: error
          });
        }
        self2._client._http.execute({
          method: "POST",
          path: "stream",
          body,
          query: self2._urlParams,
          signal: this._abort.signal,
          streamConsumer: {
            onError,
            onData
          }
        }).then(onResponse).catch(onError);
      };
      StreamClient.prototype.close = function() {
        if (this._state !== "closed") {
          this._state = "closed";
          this._abort.abort();
        }
      };
      function EventDispatcher(allowedEvents) {
        this._allowedEvents = allowedEvents;
        this._listeners = {};
      }
      EventDispatcher.prototype.on = function(type, callback) {
        if (this._allowedEvents.indexOf(type) === -1) {
          throw new Error("Unknown event type: " + type);
        }
        if (this._listeners[type] === void 0) {
          this._listeners[type] = [];
        }
        this._listeners[type].push(callback);
      };
      EventDispatcher.prototype.dispatch = function(event) {
        var listeners = this._listeners[event.type];
        if (!listeners) {
          return;
        }
        for (var i = 0; i < listeners.length; i++) {
          listeners[i].call(null, event.event, event);
        }
      };
      function Subscription(client, dispatcher) {
        this._client = client;
        this._dispatcher = dispatcher;
      }
      Subscription.prototype.on = function(type, callback) {
        this._dispatcher.on(type, callback);
        return this;
      };
      Subscription.prototype.start = function() {
        this._client.subscribe();
        return this;
      };
      Subscription.prototype.close = function() {
        this._client.close();
      };
      function StreamAPI(client) {
        var api = function(expression, options) {
          var dispatcher = new EventDispatcher(DefaultEvents);
          var streamClient = new StreamClient(client, expression, options, function(event) {
            dispatcher.dispatch(event);
          });
          return new Subscription(streamClient, dispatcher);
        };
        api.document = function(expression, options) {
          var buffer = [];
          var buffering = true;
          var dispatcher = new EventDispatcher(DocumentStreamEvents);
          var streamClient = new StreamClient(client, expression, options, onEvent);
          function onEvent(event) {
            switch (event.type) {
              case "start":
                dispatcher.dispatch(event);
                streamClient.snapshot();
                break;
              case "snapshot":
                resume(event);
                break;
              case "error":
                dispatcher.dispatch(event);
                break;
              default:
                if (buffering) {
                  buffer.push(event);
                } else {
                  dispatcher.dispatch(event);
                }
            }
          }
          function resume(snapshotEvent) {
            dispatcher.dispatch(snapshotEvent);
            for (var i = 0; i < buffer.length; i++) {
              var bufferedEvent = buffer[i];
              if (bufferedEvent.txn > snapshotEvent.event.ts) {
                dispatcher.dispatch(bufferedEvent);
              }
            }
            buffering = false;
            buffer = null;
          }
          return new Subscription(streamClient, dispatcher);
        };
        return api;
      }
      module.exports = {
        StreamAPI
      };
    },
    "./node_modules/faunadb/src/values.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      "use strict";
      var base64 = __webpack_require__2("./node_modules/base64-js/index.js");
      var deprecate = __webpack_require__2("./node_modules/util-deprecate/browser.js");
      var errors = __webpack_require__2("./node_modules/faunadb/src/errors.js");
      var Expr = __webpack_require__2("./node_modules/faunadb/src/Expr.js");
      var util = __webpack_require__2("./node_modules/faunadb/src/_util.js");
      var nodeUtil = util.isNodeEnv() ? __webpack_require__2("?374e") : null;
      var customInspect = nodeUtil && nodeUtil.inspect.custom;
      var stringify = nodeUtil ? nodeUtil.inspect : JSON.stringify;
      function Value() {
      }
      util.inherits(Value, Expr);
      Value.prototype._isFaunaValue = true;
      function Ref(id, collection, database) {
        if (!id)
          throw new errors.InvalidValue("id cannot be null or undefined");
        this.value = { id };
        if (collection)
          this.value["collection"] = collection;
        if (database)
          this.value["database"] = database;
      }
      util.inherits(Ref, Value);
      Ref.prototype._isFaunaRef = true;
      Object.defineProperty(Ref.prototype, "collection", {
        get: function() {
          return this.value["collection"];
        }
      });
      Object.defineProperty(Ref.prototype, "class", {
        get: deprecate(function() {
          return this.value["collection"];
        }, "class is deprecated, use collection instead")
      });
      Object.defineProperty(Ref.prototype, "database", {
        get: function() {
          return this.value["database"];
        }
      });
      Object.defineProperty(Ref.prototype, "id", {
        get: function() {
          return this.value["id"];
        }
      });
      Ref.prototype.toJSON = function() {
        return { "@ref": this.value };
      };
      wrapToString(Ref, function() {
        var constructors = {
          collections: "Collection",
          databases: "Database",
          indexes: "Index",
          functions: "Function",
          roles: "Role",
          access_providers: "AccessProvider"
        };
        var isNative = function(ref) {
          return ref.collection === void 0;
        };
        var toString = function(ref) {
          if (isNative(ref)) {
            var db = ref.database !== void 0 ? ref.database.toString() : "";
            if (ref.id === "access_providers")
              return "AccessProviders(" + db + ")";
            return ref.id.charAt(0).toUpperCase() + ref.id.slice(1) + "(" + db + ")";
          }
          if (isNative(ref.collection)) {
            var constructor = constructors[ref.collection.id];
            if (constructor !== void 0) {
              var db = ref.database !== void 0 ? ", " + ref.database.toString() : "";
              return constructor + '("' + ref.id + '"' + db + ")";
            }
          }
          return "Ref(" + toString(ref.collection) + ', "' + ref.id + '")';
        };
        return toString(this);
      });
      Ref.prototype.valueOf = function() {
        return this.value;
      };
      Ref.prototype.equals = function(other) {
        return (other instanceof Ref || util.checkInstanceHasProperty(other, "_isFaunaRef")) && this.id === other.id && (this.collection === void 0 && other.collection === void 0 || this.collection.equals(other.collection)) && (this.database === void 0 && other.database === void 0 || this.database.equals(other.database));
      };
      var Native = {
        COLLECTIONS: new Ref("collections"),
        INDEXES: new Ref("indexes"),
        DATABASES: new Ref("databases"),
        FUNCTIONS: new Ref("functions"),
        ROLES: new Ref("roles"),
        KEYS: new Ref("keys"),
        ACCESS_PROVIDERS: new Ref("access_providers")
      };
      Native.fromName = function(name) {
        switch (name) {
          case "collections":
            return Native.COLLECTIONS;
          case "indexes":
            return Native.INDEXES;
          case "databases":
            return Native.DATABASES;
          case "functions":
            return Native.FUNCTIONS;
          case "roles":
            return Native.ROLES;
          case "keys":
            return Native.KEYS;
          case "access_providers":
            return Native.ACCESS_PROVIDERS;
        }
        return new Ref(name);
      };
      function SetRef(value) {
        this.value = value;
      }
      util.inherits(SetRef, Value);
      wrapToString(SetRef, function() {
        return Expr.toString(this.value);
      });
      SetRef.prototype.toJSON = function() {
        return { "@set": this.value };
      };
      function FaunaTime(value) {
        if (value instanceof Date) {
          value = value.toISOString();
        } else if (!(value.charAt(value.length - 1) === "Z")) {
          throw new errors.InvalidValue("Only allowed timezone is 'Z', got: " + value);
        }
        this.value = value;
      }
      util.inherits(FaunaTime, Value);
      Object.defineProperty(FaunaTime.prototype, "date", {
        get: function() {
          return new Date(this.value);
        }
      });
      wrapToString(FaunaTime, function() {
        return 'Time("' + this.value + '")';
      });
      FaunaTime.prototype.toJSON = function() {
        return { "@ts": this.value };
      };
      function FaunaDate(value) {
        if (value instanceof Date) {
          value = value.toISOString().slice(0, 10);
        }
        this.value = value;
      }
      util.inherits(FaunaDate, Value);
      Object.defineProperty(FaunaDate.prototype, "date", {
        get: function() {
          return new Date(this.value);
        }
      });
      wrapToString(FaunaDate, function() {
        return 'Date("' + this.value + '")';
      });
      FaunaDate.prototype.toJSON = function() {
        return { "@date": this.value };
      };
      function Bytes(value) {
        if (value instanceof ArrayBuffer) {
          this.value = new Uint8Array(value);
        } else if (typeof value === "string") {
          this.value = base64.toByteArray(value);
        } else if (value instanceof Uint8Array) {
          this.value = value;
        } else {
          throw new errors.InvalidValue("Bytes type expect argument to be either Uint8Array|ArrayBuffer|string, got: " + stringify(value));
        }
      }
      util.inherits(Bytes, Value);
      wrapToString(Bytes, function() {
        return 'Bytes("' + base64.fromByteArray(this.value) + '")';
      });
      Bytes.prototype.toJSON = function() {
        return { "@bytes": base64.fromByteArray(this.value) };
      };
      function Query(value) {
        this.value = value;
      }
      util.inherits(Query, Value);
      wrapToString(Query, function() {
        return "Query(" + Expr.toString(this.value) + ")";
      });
      Query.prototype.toJSON = function() {
        return { "@query": this.value };
      };
      function wrapToString(type, fn) {
        type.prototype.toString = fn;
        type.prototype.inspect = fn;
        if (customInspect) {
          type.prototype[customInspect] = fn;
        }
      }
      module.exports = {
        Value,
        Ref,
        Native,
        SetRef,
        FaunaTime,
        FaunaDate,
        Bytes,
        Query
      };
    },
    "./node_modules/fn-annotate/index.js": (module) => {
      "use strict";
      module.exports = annotate;
      function annotate(fn) {
        if (typeof fn !== "function") {
          throw new Error("Could not parse function signature for injection dependencies: Object is not a function");
        }
        if (!fn.length)
          return [];
        var injects = /^()\(?([^)=]*)\)? *=>/.exec(fn + "") || /^[^(]+([^ \(]*) *\(([^\)]*)\)/.exec(fn + "");
        if (!injects) {
          throw new Error("Could not parse function signature for injection dependencies: " + fn + "");
        }
        var argumentString = injects[2].replace(/\/\*[\S\s]*?\*\//g, " ").replace(/\/\/.*/g, " ");
        function groupSubArguments(_, type, keys) {
          return type + keys.split(",").map(function(arg) {
            return arg && arg.trim();
          }).filter(Boolean).join("@");
        }
        argumentString = argumentString.replace(/(\{)([^}]*)\}/g, groupSubArguments);
        argumentString = argumentString.replace(/(\[)([^}]*)\]/g, groupSubArguments);
        return argumentString.split(",").map(function(arg) {
          return arg && arg.trim();
        }).map(function(arg) {
          if (arg[0] === "{") {
            return arg.substring(1).split("@");
          }
          if (arg[0] === "[") {
            return { items: arg.substring(1).split("@") };
          }
          return arg;
        }).filter(Boolean);
      }
    },
    "./node_modules/node-abort-controller/browser.js": (module) => {
      "use strict";
      const _global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : void 0;
      if (!_global) {
        throw new Error(`Unable to find global scope. Are you sure this is running in the browser?`);
      }
      if (!_global.AbortController) {
        throw new Error(`Could not find "AbortController" in the global scope. You need to polyfill it first`);
      }
      module.exports.AbortController = _global.AbortController;
    },
    "./node_modules/object-assign/index.js": (module) => {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    },
    "./node_modules/regexparam/dist/index.js": (__unused_webpack_module, exports) => {
      function parse(str, loose) {
        if (str instanceof RegExp)
          return { keys: false, pattern: str };
        var c, o, tmp, ext, keys = [], pattern = "", arr = str.split("/");
        arr[0] || arr.shift();
        while (tmp = arr.shift()) {
          c = tmp[0];
          if (c === "*") {
            keys.push("wild");
            pattern += "/(.*)";
          } else if (c === ":") {
            o = tmp.indexOf("?", 1);
            ext = tmp.indexOf(".", 1);
            keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
            pattern += !!~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
            if (!!~ext)
              pattern += (!!~o ? "?" : "") + "\\" + tmp.substring(ext);
          } else {
            pattern += "/" + tmp;
          }
        }
        return {
          keys,
          pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
        };
      }
      var RGX = /(\/|^)([:*][^/]*?)(\?)?(?=[/.]|$)/g;
      function inject(route, values) {
        return route.replace(RGX, (x, lead, key, optional) => {
          x = values[key == "*" ? "wild" : key.substring(1)];
          return x ? "/" + x : optional || key == "*" ? "" : "/" + key;
        });
      }
      exports.inject = inject;
      exports.parse = parse;
    },
    "./src/index.ts": function(__unused_webpack_module, exports, __webpack_require__2) {
      "use strict";
      var __importDefault = this && this.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      const worktop_1 = __webpack_require__2("./node_modules/worktop/router/index.js");
      const faunadb_1 = __importDefault(__webpack_require__2("./node_modules/faunadb/index.js"));
      const utils_1 = __webpack_require__2("./src/utils.ts");
      const router = new worktop_1.Router();
      const faunaClient = new faunadb_1.default.Client({
        secret: FAUNA_SECRET,
        domain: "db.us.fauna.com"
      });
      const { Create, Collection, Match, Index, Get, Ref, Paginate, Sum, Delete, Add, Select, Let, Var, Update } = faunadb_1.default.query;
      router.add("GET", "/", async (request, response) => {
        response.send(200, "hello world");
      });
      router.add("POST", "/products", async (request, response) => {
        const reqBody = await request.body();
        if (!reqBody) {
          return response.send(400, {
            code: "Invalid parameters",
            description: "Invalid parameters",
            status: "400"
          });
        }
        const { serialNumber, title, weightLbs } = reqBody;
        try {
          const result = await faunaClient.query(Create(Collection("Products"), {
            data: {
              serialNumber,
              title,
              weightLbs,
              quantity: 0
            }
          }));
          console.log("### result: ", result);
          response.send(200, {
            productId: result.ref.id
          });
        } catch (error) {
          const err = error;
          const faunaError = utils_1.getFaunaError(err);
          response.send(faunaError.status, faunaError);
        }
      });
      router.add("GET", "/products/:productId", async (request, response) => {
        const productId = request.params.productId;
        try {
          const result = await faunaClient.query(Get(Ref(Collection("Products"), productId)));
          response.send(200, result);
        } catch (error) {
          const err = error;
          const faunaError = utils_1.getFaunaError(err);
          response.send(faunaError.status, faunaError);
        }
      });
      router.add("DELETE", "/products/:productId", async (request, response) => {
        try {
          const productId = request.params.productId;
          const result = await faunaClient.query(Delete(Ref(Collection("Products"), productId)));
          response.send(200, result);
        } catch (error) {
          const err = error;
          const faunaError = utils_1.getFaunaError(err);
          response.send(faunaError.status, faunaError);
        }
      });
      worktop_1.listen(router.run);
    },
    "./src/utils.ts": (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getFaunaError = void 0;
      function getFaunaError(error) {
        const { code, description } = error.requestResult.responseContent.errors[0];
        let status;
        switch (code) {
          case "unauthorized":
          case "authentication failed":
            status = 401;
            break;
          case "permission denied":
            status = 403;
            break;
          case "instance not found":
            status = 404;
            break;
          case "instance not unique":
          case "contended transaction":
            status = 409;
            break;
          default:
            status = 500;
        }
        return { code, description, status };
      }
      exports.getFaunaError = getFaunaError;
    },
    "./node_modules/util-deprecate/browser.js": (module, __unused_webpack_exports, __webpack_require__2) => {
      module.exports = deprecate;
      function deprecate(fn, msg) {
        if (config("noDeprecation")) {
          return fn;
        }
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (config("throwDeprecation")) {
              throw new Error(msg);
            } else if (config("traceDeprecation")) {
              console.trace(msg);
            } else {
              console.warn(msg);
            }
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        return deprecated;
      }
      function config(name) {
        try {
          if (!__webpack_require__2.g.localStorage)
            return false;
        } catch (_) {
          return false;
        }
        var val = __webpack_require__2.g.localStorage[name];
        if (val == null)
          return false;
        return String(val).toLowerCase() === "true";
      }
    },
    "./node_modules/worktop/request/index.js": (__unused_webpack_module, exports) => {
      function n(e) {
        let r, t, a, o = {};
        for ([r, t] of e)
          o[r] = (a = o[r]) !== void 0 ? [].concat(a, t) : t;
        return o;
      }
      async function i(e, r) {
        if (!(!e.body || !r))
          return ~r.indexOf("application/json") ? e.json() : ~r.indexOf("multipart/form-data") || ~r.indexOf("application/x-www-form-urlencoded") ? e.formData().then(n) : ~r.indexOf("text/") ? e.text() : e.arrayBuffer();
      }
      function f(e) {
        let r = this, { request: t } = e, a = new URL(t.url);
        return r.url = t.url, r.method = t.method, r.headers = t.headers, r.extend = e.waitUntil.bind(e), r.cf = t.cf, r.params = {}, r.path = a.pathname, r.hostname = a.hostname, r.origin = a.origin, r.query = a.searchParams, r.search = a.search, r.body = i.bind(0, t, r.headers.get("content-type")), r.body.blob = t.blob.bind(t), r.body.text = t.text.bind(t), r.body.arrayBuffer = t.arrayBuffer.bind(t), r.body.formData = t.formData.bind(t), r.body.json = t.json.bind(t), r;
      }
      exports.ServerRequest = f;
    },
    "./node_modules/worktop/response/index.js": (__unused_webpack_module, exports, __webpack_require__2) => {
      const { byteLength: b } = __webpack_require__2("./node_modules/worktop/utils/index.js");
      var s = "content-type", i = "content-length";
      function h(u) {
        var e = this, r = e.headers = new Headers({
          "Cache-Control": "private, no-cache"
        });
        return e.body = "", e.finished = false, e.status = e.statusCode = 200, e.getHeaders = () => Object.fromEntries(r), e.getHeaderNames = () => [...r.keys()], e.hasHeader = r.has.bind(r), e.getHeader = r.get.bind(r), e.removeHeader = r.delete.bind(r), e.setHeader = r.set.bind(r), Object.defineProperty(e, "status", {
          set: (n) => {
            e.statusCode = n;
          },
          get: () => e.statusCode
        }), e.end = (n) => {
          e.finished || (e.finished = true, e.body = n);
        }, e.writeHead = (n, t) => {
          e.statusCode = n;
          for (let d in t)
            r.set(d, t[d]);
        }, e.send = (n, t, d) => {
          let a = typeof t, o = {};
          for (let p in d)
            o[p.toLowerCase()] = d[p];
          let f = o[i] || e.getHeader(i), l = o[s] || e.getHeader(s);
          t == null ? t = "" : a === "object" ? (t = JSON.stringify(t), l = l || "application/json;charset=utf-8") : a !== "string" && (t = String(t)), o[s] = l || "text/plain", o[i] = f || String(t.byteLength || b(t)), n === 204 || n === 205 || n === 304 ? (e.removeHeader(i), e.removeHeader(s), delete o[i], delete o[s], t = null) : u === "HEAD" && (t = null), e.writeHead(n, o), e.end(t);
        }, e;
      }
      exports.ServerResponse = h;
    },
    "./node_modules/worktop/router/index.js": (__unused_webpack_module, exports, __webpack_require__2) => {
      const { parse: f } = __webpack_require__2("./node_modules/regexparam/dist/index.js");
      const { ServerRequest: u } = __webpack_require__2("./node_modules/worktop/request/index.js");
      const { ServerResponse: R } = __webpack_require__2("./node_modules/worktop/response/index.js");
      var c = {
        "400": "Bad Request",
        "401": "Unauthorized",
        "403": "Forbidden",
        "404": "Not Found",
        "405": "Method Not Allowed",
        "406": "Not Acceptable",
        "409": "Conflict",
        "410": "Gone",
        "411": "Length Required",
        "413": "Payload Too Large",
        "422": "Unprocessable Entity",
        "426": "Upgrade Required",
        "428": "Precondition Required",
        "429": "Too Many Requests",
        "500": "Internal Server Error",
        "501": "Not Implemented",
        "502": "Bad Gateway",
        "503": "Service Unavailable",
        "504": "Gateway Timeout"
      };
      function m(t) {
        return (o) => o.respondWith(t(o));
      }
      function w(t) {
        addEventListener("fetch", m(t));
      }
      var l = false;
      function E(...t) {
        return async function(o, s) {
          let r, e, n = t.length;
          for (r of t)
            if (e = await d(r, --n <= 0 && !l, o, s))
              return e;
        };
      }
      async function d(t, o, s, r, ...e) {
        let n = await t(s, r, ...e);
        if (n instanceof Response)
          return n;
        if (o || r.finished)
          return new Response(r.body, r);
      }
      function y(t, o, s) {
        let r = {}, e, n, a, i, p;
        if (n = t[o]) {
          if (e = n.__s[s])
            return { params: r, handler: e.handler };
          for ([a, i] of n.__d)
            if (p = a.exec(s), p !== null) {
              if (p.groups !== void 0)
                for (e in p.groups)
                  r[e] = p.groups[e];
              else if (i.keys.length > 0)
                for (e = 0; e < i.keys.length; )
                  r[i.keys[e++]] = p[e];
              return { params: r, handler: i.handler };
            }
        }
      }
      function x() {
        let t, o = {};
        return t = {
          add(s, r, e) {
            let n = o[s];
            if (n === void 0 && (n = o[s] = {
              __d: new Map(),
              __s: {}
            }), r instanceof RegExp)
              n.__d.set(r, { keys: [], handler: e });
            else if (/[:|*]/.test(r)) {
              let { keys: a, pattern: i } = f(r);
              n.__d.set(i, { keys: a, handler: e });
            } else
              n.__s[r] = { keys: [], handler: e };
          },
          onerror(s, r, e, n) {
            let a = c[e = e || 500], i = n && n.message || a || String(e);
            return new Response(i, { status: e, statusText: a });
          },
          async run(s) {
            let r, e = new u(s), n = new R(e.method);
            if (l = !!t.prepare) {
              if (r = await d(t.prepare, false, e, n), r)
                return r;
              l = false;
            }
            return r = y(o, e.method, e.path), r ? (e.params = r.params, d(r.handler, true, e, n).catch((a) => d(t.onerror, true, e, n, 500, a))) : d(t.onerror, true, e, n, 404);
          }
        };
      }
      exports.Router = x;
      exports.STATUS_CODES = c;
      exports.compose = E;
      exports.listen = w;
      exports.reply = m;
    },
    "./node_modules/worktop/utils/index.js": (__unused_webpack_module, exports) => {
      var b = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
      function x(e) {
        let r = 0, n = "", t = new Uint8Array(e);
        for (; r < t.length; r++)
          n += b[t[r]];
        return n;
      }
      function p(e) {
        let r = 0, n = e.length, t = [];
        for (n & 1 && (e += "0", n++); r < n; r += 2)
          t.push(parseInt(e[r] + e[r + 1], 16));
        return new Uint8Array(t);
      }
      var A = () => crypto.randomUUID(), u = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_";
      function g(e) {
        for (var r = "", n = e || 11, t = f(n); n--; )
          r += u[t[n] & 63];
        return r;
      }
      var a = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
      function l() {
        for (var e = "", r = 16, n = Date.now(), t, c = a.length, o = f(r); r--; )
          t = o[r] / 255 * c | 0, t === c && (t = 31), e = a.charAt(t) + e;
        for (r = 10; r--; )
          t = n % c, n = (n - t) / c, e = a.charAt(t) + e;
        return e;
      }
      function f(e) {
        return crypto.getRandomValues(new Uint8Array(e));
      }
      var d = /* @__PURE__ */ new TextEncoder(), i = /* @__PURE__ */ new TextDecoder(), m = (e) => d.encode(e), y = (e, r = false) => i.decode(e, { stream: r });
      function h(e) {
        return e ? d.encode(e).byteLength : 0;
      }
      exports.Decoder = i;
      exports.Encoder = d;
      exports.HEX = b;
      exports.byteLength = h;
      exports.decode = y;
      exports.encode = m;
      exports.randomize = f;
      exports.toHEX = x;
      exports.uid = g;
      exports.ulid = l;
      exports.uuid = A;
      exports.viaHEX = p;
    },
    "?e2f0": () => {
    },
    "?a526": () => {
    },
    "?cc45": () => {
    },
    "?5dfa": () => {
    },
    "?8c06": () => {
    },
    "?d932": () => {
    },
    "?374e": () => {
    }
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== void 0) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    __webpack_require__.g = function() {
      if (typeof globalThis === "object")
        return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (typeof window === "object")
          return window;
      }
    }();
  })();
  var __webpack_exports__ = __webpack_require__("./src/index.ts");
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
