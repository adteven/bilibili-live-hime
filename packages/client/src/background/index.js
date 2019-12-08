var BilibiliLiveHimeBackground = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	const filesInDirectory = dir => new Promise (resolve =>

	    dir.createReader ().readEntries (entries =>

	        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>

	            e.isDirectory
	                ? filesInDirectory (e)
	                : new Promise (resolve => e.file (resolve))
	        ))
	        .then (files => [].concat (...files))
	        .then (resolve)
	    )
	);

	const timestampForFilesInDirectory = dir =>
	        filesInDirectory (dir).then (files =>
	            files.map (f => f.name + f.lastModifiedDate).join ());

	const reload = () => {

	    chrome.tabs.query ({ active: true, currentWindow: true }, tabs => { // NB: see https://github.com/xpl/crx-hotreload/issues/5

	        if (tabs[0]) { chrome.tabs.reload (tabs[0].id); }

	        chrome.runtime.reload ();
	    });
	};

	const watchChanges = (dir, lastTimestamp) => {

	    timestampForFilesInDirectory (dir).then (timestamp => {

	        if (!lastTimestamp || (lastTimestamp === timestamp)) {

	            setTimeout (() => watchChanges (dir, timestamp), 1000); // retry after 1s

	        } else {

	            reload ();
	        }
	    });

	};

	chrome.management.getSelf (self => {

	    if (self.installType === 'development') {

	        chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir));
	    }
	});

	var socket_io = createCommonjsModule(function (module, exports) {
	/*!
	 * Socket.IO v2.3.0
	 * (c) 2014-2019 Guillermo Rauch
	 * Released under the MIT License.
	 */
	!function(t,e){module.exports=e();}(commonjsGlobal,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function r(t,e){"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,r=o(t),i=r.source,u=r.id,p=r.path,h=c[u]&&p in c[u].nsps,f=e.forceNew||e["force new connection"]||!1===e.multiplex||h;return f?(a("ignoring socket cache for %s",i),n=s(i,e)):(c[u]||(a("new io instance for %s",i),c[u]=s(i,e)),n=c[u]),r.query&&!e.query&&(e.query=r.query),n.socket(r.path,e)}var o=n(1),i=n(7),s=n(15),a=n(3)("socket.io-client");t.exports=e=r;var c=e.managers={};e.protocol=i.protocol,e.connect=r,e.Manager=n(15),e.Socket=n(39);},function(t,e,n){function r(t,e){var n=t;e=e||"undefined"!=typeof location&&location,null==t&&(t=e.protocol+"//"+e.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?e.protocol+t:e.host+t),/^(https?|wss?):\/\//.test(t)||(i("protocol-less url %s",t),t="undefined"!=typeof e?e.protocol+"//"+t:"https://"+t),i("parse %s",t),n=o(t)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";var r=n.host.indexOf(":")!==-1,s=r?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+s+":"+n.port,n.href=n.protocol+"://"+s+(e&&e.port===n.port?"":":"+n.port),n}var o=n(2),i=n(3)("socket.io-client:url");t.exports=r;},function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");o!=-1&&i!=-1&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=n.exec(t||""),a={},c=14;c--;)a[r[c]]=s[c]||"";return o!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a};},function(t,e,n){(function(r){function o(){return !("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function i(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+t.exports.humanize(this.diff),this.useColors){var n="color: "+this.color;e.splice(1,0,n,"color: inherit");var r=0,o=0;e[0].replace(/%[a-zA-Z%]/g,function(t){"%%"!==t&&(r++,"%c"===t&&(o=r));}),e.splice(o,0,n);}}function s(){var t;return "object"===("undefined"==typeof console?"undefined":p(console))&&console.log&&(t=console).log.apply(t,arguments)}function a(t){try{t?e.storage.setItem("debug",t):e.storage.removeItem("debug");}catch(n){}}function c(){var t=void 0;try{t=e.storage.getItem("debug");}catch(n){}return !t&&"undefined"!=typeof r&&"env"in r&&(t=r.env.DEBUG),t}function u(){try{return localStorage}catch(t){}}var p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage=u(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.exports=n(5)(e);var h=t.exports.formatters;h.j=function(t){try{return JSON.stringify(t)}catch(e){return "[UnexpectedJSONParseError]: "+e.message}};}).call(e,n(4));},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(p===setTimeout)return setTimeout(t,0);if((p===n||!p)&&setTimeout)return p=setTimeout,setTimeout(t,0);try{return p(t,0)}catch(e){try{return p.call(null,t,0)}catch(e){return p.call(this,t,0)}}}function i(t){if(h===clearTimeout)return clearTimeout(t);if((h===r||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(e){try{return h.call(null,t)}catch(e){return h.call(this,t)}}}function s(){y&&l&&(y=!1,l.length?d=l.concat(d):m=-1,d.length&&a());}function a(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(l=d,d=[];++m<e;)l&&l[m].run();m=-1,e=d.length;}l=null,y=!1,i(t);}}function c(t,e){this.fun=t,this.array=e;}function u(){}var p,h,f=t.exports={};!function(){try{p="function"==typeof setTimeout?setTimeout:n;}catch(t){p=n;}try{h="function"==typeof clearTimeout?clearTimeout:r;}catch(t){h=r;}}();var l,d=[],y=!1,m=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new c(t,e)),1!==d.length||y||o(a);},c.prototype.run=function(){this.fun.apply(null,this.array);},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=u,f.addListener=u,f.once=u,f.off=u,f.removeListener=u,f.removeAllListeners=u,f.emit=u,f.prependListener=u,f.prependOnceListener=u,f.listeners=function(t){return []},f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return "/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0};},function(t,e,n){function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t){function e(t){for(var e=0,n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return o.colors[Math.abs(e)%o.colors.length]}function o(t){function n(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];if(n.enabled){var s=n,a=Number(new Date),c=a-(r||a);s.diff=c,s.prev=r,s.curr=a,r=a,e[0]=o.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");var u=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,function(t,n){if("%%"===t)return t;u++;var r=o.formatters[n];if("function"==typeof r){var i=e[u];t=r.call(s,i),e.splice(u,1),u--;}return t}),o.formatArgs.call(s,e);var p=s.log||o.log;p.apply(s,e);}}var r=void 0;return n.namespace=t,n.enabled=o.enabled(t),n.useColors=o.useColors(),n.color=e(t),n.destroy=i,n.extend=s,"function"==typeof o.init&&o.init(n),o.instances.push(n),n}function i(){var t=o.instances.indexOf(this);return t!==-1&&(o.instances.splice(t,1),!0)}function s(t,e){var n=o(this.namespace+("undefined"==typeof e?":":e)+t);return n.log=this.log,n}function a(t){o.save(t),o.names=[],o.skips=[];var e=void 0,n=("string"==typeof t?t:"").split(/[\s,]+/),r=n.length;for(e=0;e<r;e++)n[e]&&(t=n[e].replace(/\*/g,".*?"),"-"===t[0]?o.skips.push(new RegExp("^"+t.substr(1)+"$")):o.names.push(new RegExp("^"+t+"$")));for(e=0;e<o.instances.length;e++){var i=o.instances[e];i.enabled=o.enabled(i.namespace);}}function c(){var t=[].concat(r(o.names.map(p)),r(o.skips.map(p).map(function(t){return "-"+t}))).join(",");return o.enable(""),t}function u(t){if("*"===t[t.length-1])return !0;var e=void 0,n=void 0;for(e=0,n=o.skips.length;e<n;e++)if(o.skips[e].test(t))return !1;for(e=0,n=o.names.length;e<n;e++)if(o.names[e].test(t))return !0;return !1}function p(t){return t.toString().substring(2,t.toString().length-2).replace(/\.\*\?$/,"*")}function h(t){return t instanceof Error?t.stack||t.message:t}return o.debug=o,o["default"]=o,o.coerce=h,o.disable=c,o.enable=a,o.enabled=u,o.humanize=n(6),Object.keys(t).forEach(function(e){o[e]=t[e];}),o.instances=[],o.names=[],o.skips=[],o.formatters={},o.selectColor=e,o.enable(o.load()),o}t.exports=o;},function(t,e){function n(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*h;case"weeks":case"week":case"w":return n*p;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r(t){var e=Math.abs(t);return e>=u?Math.round(t/u)+"d":e>=c?Math.round(t/c)+"h":e>=a?Math.round(t/a)+"m":e>=s?Math.round(t/s)+"s":t+"ms"}function o(t){var e=Math.abs(t);return e>=u?i(t,e,u,"day"):e>=c?i(t,e,c,"hour"):e>=a?i(t,e,a,"minute"):e>=s?i(t,e,s,"second"):t+" ms"}function i(t,e,n,r){var o=e>=1.5*n;return Math.round(t/n)+" "+r+(o?"s":"")}var s=1e3,a=60*s,c=60*a,u=24*c,p=7*u,h=365.25*u;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return n(t);if("number"===i&&isFinite(t))return e["long"]?o(t):r(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};},function(t,e,n){function r(){}function o(t){var n=""+t.type;if(e.BINARY_EVENT!==t.type&&e.BINARY_ACK!==t.type||(n+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(n+=t.nsp+","),null!=t.id&&(n+=t.id),null!=t.data){var r=i(t.data);if(r===!1)return g;n+=r;}return f("encoded %j as %s",t,n),n}function i(t){try{return JSON.stringify(t)}catch(e){return !1}}function s(t,e){function n(t){var n=d.deconstructPacket(t),r=o(n.packet),i=n.buffers;i.unshift(r),e(i);}d.removeBlobs(t,n);}function a(){this.reconstructor=null;}function c(t){var n=0,r={type:Number(t.charAt(0))};if(null==e.types[r.type])return h("unknown packet type "+r.type);if(e.BINARY_EVENT===r.type||e.BINARY_ACK===r.type){for(var o="";"-"!==t.charAt(++n)&&(o+=t.charAt(n),n!=t.length););if(o!=Number(o)||"-"!==t.charAt(n))throw new Error("Illegal attachments");r.attachments=Number(o);}if("/"===t.charAt(n+1))for(r.nsp="";++n;){var i=t.charAt(n);if(","===i)break;if(r.nsp+=i,n===t.length)break}else r.nsp="/";var s=t.charAt(n+1);if(""!==s&&Number(s)==s){for(r.id="";++n;){var i=t.charAt(n);if(null==i||Number(i)!=i){--n;break}if(r.id+=t.charAt(n),n===t.length)break}r.id=Number(r.id);}if(t.charAt(++n)){var a=u(t.substr(n)),c=a!==!1&&(r.type===e.ERROR||y(a));if(!c)return h("invalid payload");r.data=a;}return f("decoded %s as %j",t,r),r}function u(t){try{return JSON.parse(t)}catch(e){return !1}}function p(t){this.reconPack=t,this.buffers=[];}function h(t){return {type:e.ERROR,data:"parser error: "+t}}var f=n(8)("socket.io-parser"),l=n(11),d=n(12),y=n(13),m=n(14);e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=r,e.Decoder=a;var g=e.ERROR+'"encode error"';r.prototype.encode=function(t,n){if(f("encoding packet %j",t),e.BINARY_EVENT===t.type||e.BINARY_ACK===t.type)s(t,n);else{var r=o(t);n([r]);}},l(a.prototype),a.prototype.add=function(t){var n;if("string"==typeof t)n=c(t),e.BINARY_EVENT===n.type||e.BINARY_ACK===n.type?(this.reconstructor=new p(n),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",n)):this.emit("decoded",n);else{if(!m(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");n=this.reconstructor.takeBinaryData(t),n&&(this.reconstructor=null,this.emit("decoded",n));}},a.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction();},p.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=d.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},p.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[];};},function(t,e,n){(function(r){function o(){return !("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function i(t){var n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),n){var r="color: "+this.color;t.splice(1,0,r,"color: inherit");var o=0,i=0;t[0].replace(/%[a-zA-Z%]/g,function(t){"%%"!==t&&(o++,"%c"===t&&(i=o));}),t.splice(i,0,r);}}function s(){return "object"===("undefined"==typeof console?"undefined":p(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t;}catch(n){}}function c(){var t;try{t=e.storage.debug;}catch(n){}return !t&&"undefined"!=typeof r&&"env"in r&&(t=r.env.DEBUG),t}function u(){try{return window.localStorage}catch(t){}}var p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e=t.exports=n(9),e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(e){return "[UnexpectedJSONParseError]: "+e.message}},e.enable(c());}).call(e,n(4));},function(t,e,n){function r(t){var n,r=0;for(n in t)r=(r<<5)-r+t.charCodeAt(n),r|=0;return e.colors[Math.abs(r)%e.colors.length]}function o(t){function n(){if(n.enabled){var t=n,r=+new Date,i=r-(o||r);t.diff=i,t.prev=o,t.curr=r,o=r;for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&s.unshift("%O");var c=0;s[0]=s[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;c++;var o=e.formatters[r];if("function"==typeof o){var i=s[c];n=o.call(t,i),s.splice(c,1),c--;}return n}),e.formatArgs.call(t,s);var u=n.log||e.log||console.log.bind(console);u.apply(t,s);}}var o;return n.namespace=t,n.enabled=e.enabled(t),n.useColors=e.useColors(),n.color=r(t),n.destroy=i,"function"==typeof e.init&&e.init(n),e.instances.push(n),n}function i(){var t=e.instances.indexOf(this);return t!==-1&&(e.instances.splice(t,1),!0)}function s(t){e.save(t),e.names=[],e.skips=[];var n,r=("string"==typeof t?t:"").split(/[\s,]+/),o=r.length;for(n=0;n<o;n++)r[n]&&(t=r[n].replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")));for(n=0;n<e.instances.length;n++){var i=e.instances[n];i.enabled=e.enabled(i.namespace);}}function a(){e.enable("");}function c(t){if("*"===t[t.length-1])return !0;var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return !1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return !0;return !1}function u(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o.debug=o["default"]=o,e.coerce=u,e.disable=a,e.enable=s,e.enabled=c,e.humanize=n(10),e.instances=[],e.names=[],e.skips=[],e.formatters={};},function(t,e){function n(t){if(t=String(t),!(t.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*p;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,p=365.25*u;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return n(t);if("number"===i&&isNaN(t)===!1)return e["long"]?o(t):r(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};},function(t,e,n){function r(t){if(t)return o(t)}function o(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments);}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,e);}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return !!this.listeners(t).length};},function(t,e,n){function r(t,e){if(!t)return t;if(s(t)){var n={_placeholder:!0,num:e.length};return e.push(t),n}if(i(t)){for(var o=new Array(t.length),a=0;a<t.length;a++)o[a]=r(t[a],e);return o}if("object"==typeof t&&!(t instanceof Date)){var o={};for(var c in t)o[c]=r(t[c],e);return o}return t}function o(t,e){if(!t)return t;if(t&&t._placeholder)return e[t.num];if(i(t))for(var n=0;n<t.length;n++)t[n]=o(t[n],e);else if("object"==typeof t)for(var r in t)t[r]=o(t[r],e);return t}var i=n(13),s=n(14),a=Object.prototype.toString,c="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===a.call(Blob),u="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===a.call(File);e.deconstructPacket=function(t){var e=[],n=t.data,o=t;return o.data=r(n,e),o.attachments=e.length,{packet:o,buffers:e}},e.reconstructPacket=function(t,e){return t.data=o(t.data,e),t.attachments=void 0,t},e.removeBlobs=function(t,e){function n(t,a,p){if(!t)return t;if(c&&t instanceof Blob||u&&t instanceof File){r++;var h=new FileReader;h.onload=function(){p?p[a]=this.result:o=this.result,--r||e(o);},h.readAsArrayBuffer(t);}else if(i(t))for(var f=0;f<t.length;f++)n(t[f],f,t);else if("object"==typeof t&&!s(t))for(var l in t)n(t[l],l,t);}var r=0,o=t;n(o),r||e(o);};},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return "[object Array]"==n.call(t)};},function(t,e){function n(t){return r&&Buffer.isBuffer(t)||o&&(t instanceof ArrayBuffer||i(t))}t.exports=n;var r="function"==typeof Buffer&&"function"==typeof Buffer.isBuffer,o="function"==typeof ArrayBuffer,i=function(t){return "function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer};},function(t,e,n){function r(t,e){if(!(this instanceof r))return new r(t,e);t&&"object"==typeof t&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new f({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var n=e.parser||a;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this.autoConnect=e.autoConnect!==!1,this.autoConnect&&this.open();}var o=n(16),i=n(39),s=n(11),a=n(7),c=n(41),u=n(42),p=n(3)("socket.io-client:manager"),h=n(38),f=n(43),l=Object.prototype.hasOwnProperty;t.exports=r,r.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)l.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments);},r.prototype.updateSocketIds=function(){for(var t in this.nsps)l.call(this.nsps,t)&&(this.nsps[t].id=this.generateId(t));},r.prototype.generateId=function(t){return ("/"===t?"":t+"#")+this.engine.id},s(r.prototype),r.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},r.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},r.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},r.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},r.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},r.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},r.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect();},r.prototype.open=r.prototype.connect=function(t,e){if(p("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;p("opening %s",this.uri),this.engine=o(this.uri,this.opts);var n=this.engine,r=this;this.readyState="opening",this.skipReconnect=!1;var i=c(n,"open",function(){r.onopen(),t&&t();}),s=c(n,"error",function(e){if(p("connect_error"),r.cleanup(),r.readyState="closed",r.emitAll("connect_error",e),t){var n=new Error("Connection error");n.data=e,t(n);}else r.maybeReconnectOnOpen();});if(!1!==this._timeout){var a=this._timeout;p("connect attempt will timeout after %d",a);var u=setTimeout(function(){p("connect attempt timed out after %d",a),i.destroy(),n.close(),n.emit("error","timeout"),r.emitAll("connect_timeout",a);},a);this.subs.push({destroy:function(){clearTimeout(u);}});}return this.subs.push(i),this.subs.push(s),this},r.prototype.onopen=function(){p("open"),this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(c(t,"data",u(this,"ondata"))),this.subs.push(c(t,"ping",u(this,"onping"))),this.subs.push(c(t,"pong",u(this,"onpong"))),this.subs.push(c(t,"error",u(this,"onerror"))),this.subs.push(c(t,"close",u(this,"onclose"))),this.subs.push(c(this.decoder,"decoded",u(this,"ondecoded")));},r.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping");},r.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing);},r.prototype.ondata=function(t){this.decoder.add(t);},r.prototype.ondecoded=function(t){this.emit("packet",t);},r.prototype.onerror=function(t){p("error",t),this.emitAll("error",t);},r.prototype.socket=function(t,e){function n(){~h(o.connecting,r)||o.connecting.push(r);}var r=this.nsps[t];if(!r){r=new i(this,t,e),this.nsps[t]=r;var o=this;r.on("connecting",n),r.on("connect",function(){r.id=o.generateId(t);}),this.autoConnect&&n();}return r},r.prototype.destroy=function(t){var e=h(this.connecting,t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close();},r.prototype.packet=function(t){p("writing packet %j",t);var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(n){for(var r=0;r<n.length;r++)e.engine.write(n[r],t.options);e.encoding=!1,e.processPacketQueue();}));},r.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t);}},r.prototype.cleanup=function(){p("cleanup");for(var t=this.subs.length,e=0;e<t;e++){var n=this.subs.shift();n.destroy();}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy();},r.prototype.close=r.prototype.disconnect=function(){p("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close();},r.prototype.onclose=function(t){p("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect();},r.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)p("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();p("will wait %dms before reconnect attempt",e),this.reconnecting=!0;var n=setTimeout(function(){t.skipReconnect||(p("attempting reconnect"),t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open(function(e){e?(p("reconnect attempt error"),t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):(p("reconnect success"),t.onreconnect());}));},e);this.subs.push({destroy:function(){clearTimeout(n);}});}},r.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t);};},function(t,e,n){t.exports=n(17),t.exports.parser=n(24);},function(t,e,n){function r(t,e){return this instanceof r?(e=e||{},t&&"object"==typeof t&&(e=t,t=null),t?(t=p(t),e.hostname=t.host,e.secure="https"===t.protocol||"wss"===t.protocol,e.port=t.port,t.query&&(e.query=t.query)):e.host&&(e.hostname=p(e.host).host),this.secure=null!=e.secure?e.secure:"undefined"!=typeof location&&"https:"===location.protocol,e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.agent=e.agent||!1,this.hostname=e.hostname||("undefined"!=typeof location?location.hostname:"localhost"),this.port=e.port||("undefined"!=typeof location&&location.port?location.port:this.secure?443:80),this.query=e.query||{},"string"==typeof this.query&&(this.query=h.decode(this.query)),this.upgrade=!1!==e.upgrade,this.path=(e.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!e.forceJSONP,this.jsonp=!1!==e.jsonp,this.forceBase64=!!e.forceBase64,this.enablesXDR=!!e.enablesXDR,this.withCredentials=!1!==e.withCredentials,this.timestampParam=e.timestampParam||"t",this.timestampRequests=e.timestampRequests,this.transports=e.transports||["polling","websocket"],this.transportOptions=e.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=e.policyPort||843,this.rememberUpgrade=e.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=e.onlyBinaryUpgrades,this.perMessageDeflate=!1!==e.perMessageDeflate&&(e.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=e.pfx||null,this.key=e.key||null,this.passphrase=e.passphrase||null,this.cert=e.cert||null,this.ca=e.ca||null,this.ciphers=e.ciphers||null,this.rejectUnauthorized=void 0===e.rejectUnauthorized||e.rejectUnauthorized,this.forceNode=!!e.forceNode,this.isReactNative="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),("undefined"==typeof self||this.isReactNative)&&(e.extraHeaders&&Object.keys(e.extraHeaders).length>0&&(this.extraHeaders=e.extraHeaders),e.localAddress&&(this.localAddress=e.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,void this.open()):new r(t,e)}function o(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var i=n(18),s=n(11),a=n(3)("engine.io-client:socket"),c=n(38),u=n(24),p=n(2),h=n(32);t.exports=r,r.priorWebsocketSuccess=!1,s(r.prototype),r.protocol=u.protocol,r.Socket=r,r.Transport=n(23),r.transports=n(18),r.parser=n(24),r.prototype.createTransport=function(t){a('creating transport "%s"',t);var e=o(this.query);e.EIO=u.protocol,e.transport=t;var n=this.transportOptions[t]||{};this.id&&(e.sid=this.id);var r=new i[t]({query:e,socket:this,agent:n.agent||this.agent,hostname:n.hostname||this.hostname,port:n.port||this.port,secure:n.secure||this.secure,path:n.path||this.path,forceJSONP:n.forceJSONP||this.forceJSONP,jsonp:n.jsonp||this.jsonp,forceBase64:n.forceBase64||this.forceBase64,enablesXDR:n.enablesXDR||this.enablesXDR,withCredentials:n.withCredentials||this.withCredentials,timestampRequests:n.timestampRequests||this.timestampRequests,timestampParam:n.timestampParam||this.timestampParam,policyPort:n.policyPort||this.policyPort,pfx:n.pfx||this.pfx,key:n.key||this.key,passphrase:n.passphrase||this.passphrase,cert:n.cert||this.cert,ca:n.ca||this.ca,ciphers:n.ciphers||this.ciphers,rejectUnauthorized:n.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:n.perMessageDeflate||this.perMessageDeflate,extraHeaders:n.extraHeaders||this.extraHeaders,forceNode:n.forceNode||this.forceNode,localAddress:n.localAddress||this.localAddress,requestTimeout:n.requestTimeout||this.requestTimeout,protocols:n.protocols||void 0,isReactNative:this.isReactNative});return r},r.prototype.open=function(){var t;if(this.rememberUpgrade&&r.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{
	if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available");},0)}t=this.transports[0];}this.readyState="opening";try{t=this.createTransport(t);}catch(n){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t);},r.prototype.setTransport=function(t){a("setting transport %s",t.name);var e=this;this.transport&&(a("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.onDrain();}).on("packet",function(t){e.onPacket(t);}).on("error",function(t){e.onError(t);}).on("close",function(){e.onClose("transport close");});},r.prototype.probe=function(t){function e(){if(f.onlyBinaryUpgrades){var e=!this.supportsBinary&&f.transport.supportsBinary;h=h||e;}h||(a('probe transport "%s" opened',t),p.send([{type:"ping",data:"probe"}]),p.once("packet",function(e){if(!h)if("pong"===e.type&&"probe"===e.data){if(a('probe transport "%s" pong',t),f.upgrading=!0,f.emit("upgrading",p),!p)return;r.priorWebsocketSuccess="websocket"===p.name,a('pausing current transport "%s"',f.transport.name),f.transport.pause(function(){h||"closed"!==f.readyState&&(a("changing transport and sending upgrade packet"),u(),f.setTransport(p),p.send([{type:"upgrade"}]),f.emit("upgrade",p),p=null,f.upgrading=!1,f.flush());});}else{a('probe transport "%s" failed',t);var n=new Error("probe error");n.transport=p.name,f.emit("upgradeError",n);}}));}function n(){h||(h=!0,u(),p.close(),p=null);}function o(e){var r=new Error("probe error: "+e);r.transport=p.name,n(),a('probe transport "%s" failed because of error: %s',t,e),f.emit("upgradeError",r);}function i(){o("transport closed");}function s(){o("socket closed");}function c(t){p&&t.name!==p.name&&(a('"%s" works - aborting "%s"',t.name,p.name),n());}function u(){p.removeListener("open",e),p.removeListener("error",o),p.removeListener("close",i),f.removeListener("close",s),f.removeListener("upgrading",c);}a('probing transport "%s"',t);var p=this.createTransport(t,{probe:1}),h=!1,f=this;r.priorWebsocketSuccess=!1,p.once("open",e),p.once("error",o),p.once("close",i),this.once("close",s),this.once("upgrading",c),p.open();},r.prototype.onOpen=function(){if(a("socket open"),this.readyState="open",r.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){a("starting upgrade probes");for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t]);}},r.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(a('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data);}else a('packet received with socket readyState "%s"',this.readyState);},r.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat));},r.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout");},t||e.pingInterval+e.pingTimeout);},r.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){a("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout);},t.pingInterval);},r.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping");});},r.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush();},r.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(a("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"));},r.prototype.write=r.prototype.send=function(t,e,n){return this.sendPacket("message",t,e,n),this},r.prototype.sendPacket=function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){n=n||{},n.compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush();}},r.prototype.close=function(){function t(){r.onClose("forced close"),a("socket closing - telling transport to close"),r.transport.close();}function e(){r.removeListener("upgrade",e),r.removeListener("upgradeError",e),t();}function n(){r.once("upgrade",e),r.once("upgradeError",e);}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var r=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?n():t();}):this.upgrading?n():t();}return this},r.prototype.onError=function(t){a("socket error %j",t),r.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t);},r.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){a('socket close with reason: "%s"',t);var n=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),n.writeBuffer=[],n.prevBufferLen=0;}},r.prototype.filterUpgrades=function(t){for(var e=[],n=0,r=t.length;n<r;n++)~c(this.transports,t[n])&&e.push(t[n]);return e};},function(t,e,n){function r(t){var e,n=!1,r=!1,a=!1!==t.jsonp;if("undefined"!=typeof location){var c="https:"===location.protocol,u=location.port;u||(u=c?443:80),n=t.hostname!==location.hostname||u!==t.port,r=t.secure!==c;}if(t.xdomain=n,t.xscheme=r,e=new o(t),"open"in e&&!t.forceJSONP)return new i(t);if(!a)throw new Error("JSONP disabled");return new s(t)}var o=n(19),i=n(21),s=n(35),a=n(36);e.polling=r,e.websocket=a;},function(t,e,n){var r=n(20);t.exports=function(t){var e=t.xdomain,n=t.xscheme,o=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!e||r))return new XMLHttpRequest}catch(i){}try{if("undefined"!=typeof XDomainRequest&&!n&&o)return new XDomainRequest}catch(i){}if(!e)try{return new(self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(i){}};},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest;}catch(n){t.exports=!1;}},function(t,e,n){function r(){}function o(t){if(c.call(this,t),this.requestTimeout=t.requestTimeout,this.extraHeaders=t.extraHeaders,"undefined"!=typeof location){var e="https:"===location.protocol,n=location.port;n||(n=e?443:80),this.xd="undefined"!=typeof location&&t.hostname!==location.hostname||n!==t.port,this.xs=t.secure!==e;}}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.withCredentials=t.withCredentials,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create();}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort();}var a=n(19),c=n(22),u=n(11),p=n(33),h=n(3)("engine.io-client:polling-xhr");if(t.exports=o,t.exports.Request=i,p(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.withCredentials=this.withCredentials,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new i(t)},o.prototype.doWrite=function(t,e){var n="string"!=typeof t&&void 0!==t,r=this.request({method:"POST",data:t,isBinary:n}),o=this;r.on("success",e),r.on("error",function(t){o.onError("xhr post error",t);}),this.sendXhr=r;},o.prototype.doPoll=function(){h("xhr poll");var t=this.request(),e=this;t.on("data",function(t){e.onData(t);}),t.on("error",function(t){e.onError("xhr poll error",t);}),this.pollXhr=t;},u(i.prototype),i.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var e=this.xhr=new a(t),n=this;try{h("xhr open %s: %s",this.method,this.uri),e.open(this.method,this.uri,this.async);try{if(this.extraHeaders){e.setDisableHeaderCheck&&e.setDisableHeaderCheck(!0);for(var r in this.extraHeaders)this.extraHeaders.hasOwnProperty(r)&&e.setRequestHeader(r,this.extraHeaders[r]);}}catch(o){}if("POST"===this.method)try{this.isBinary?e.setRequestHeader("Content-type","application/octet-stream"):e.setRequestHeader("Content-type","text/plain;charset=UTF-8");}catch(o){}try{e.setRequestHeader("Accept","*/*");}catch(o){}"withCredentials"in e&&(e.withCredentials=this.withCredentials),this.requestTimeout&&(e.timeout=this.requestTimeout),this.hasXDR()?(e.onload=function(){n.onLoad();},e.onerror=function(){n.onError(e.responseText);}):e.onreadystatechange=function(){if(2===e.readyState)try{var t=e.getResponseHeader("Content-Type");(n.supportsBinary&&"application/octet-stream"===t||"application/octet-stream; charset=UTF-8"===t)&&(e.responseType="arraybuffer");}catch(r){}4===e.readyState&&(200===e.status||1223===e.status?n.onLoad():setTimeout(function(){n.onError("number"==typeof e.status?e.status:0);},0));},h("xhr data %s",this.data),e.send(this.data);}catch(o){return void setTimeout(function(){n.onError(o);},0)}"undefined"!=typeof document&&(this.index=i.requestsCount++,i.requests[this.index]=this);},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup();},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess();},i.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0);},i.prototype.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=r:this.xhr.onreadystatechange=r,t)try{this.xhr.abort();}catch(e){}"undefined"!=typeof document&&delete i.requests[this.index],this.xhr=null;}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type");}catch(n){}t="application/octet-stream"===e||"application/octet-stream; charset=UTF-8"===e?this.xhr.response||this.xhr.responseText:this.xhr.responseText;}catch(n){this.onError(n);}null!=t&&this.onData(t);},i.prototype.hasXDR=function(){return "undefined"!=typeof XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup();},i.requestsCount=0,i.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",s);else if("function"==typeof addEventListener){var f="onpagehide"in self?"pagehide":"unload";addEventListener(f,s,!1);}},function(t,e,n){function r(t){var e=t&&t.forceBase64;p&&!e||(this.supportsBinary=!1),o.call(this,t);}var o=n(23),i=n(32),s=n(24),a=n(33),c=n(34),u=n(3)("engine.io-client:polling");t.exports=r;var p=function(){var t=n(19),e=new t({xdomain:!1});return null!=e.responseType}();a(r,o),r.prototype.name="polling",r.prototype.doOpen=function(){this.poll();},r.prototype.pause=function(t){function e(){u("paused"),n.readyState="paused",t();}var n=this;if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(u("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){u("pre-pause polling complete"),--r||e();})),this.writable||(u("we are currently writing - waiting to pause"),r++,this.once("drain",function(){u("pre-pause writing complete"),--r||e();}));}else e();},r.prototype.poll=function(){u("polling"),this.polling=!0,this.doPoll(),this.emit("poll");},r.prototype.onData=function(t){var e=this;u("polling got data %s",t);var n=function(t,n,r){return "opening"===e.readyState&&e.onOpen(),"close"===t.type?(e.onClose(),!1):void e.onPacket(t)};s.decodePayload(t,this.socket.binaryType,n),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():u('ignoring poll - transport state "%s"',this.readyState));},r.prototype.doClose=function(){function t(){u("writing close packet"),e.write([{type:"close"}]);}var e=this;"open"===this.readyState?(u("transport open - closing"),t()):(u("transport not open - deferring close"),this.once("open",t));},r.prototype.write=function(t){var e=this;this.writable=!1;var n=function(){e.writable=!0,e.emit("drain");};s.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,n);});},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",n="";!1!==this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||t.sid||(t.b64=1),t=i.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(n=":"+this.port),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t};},function(t,e,n){function r(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.withCredentials=t.withCredentials,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.isReactNative=t.isReactNative,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress;}var o=n(24),i=n(11);t.exports=r,i(r.prototype),r.prototype.onError=function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},r.prototype.open=function(){return "closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},r.prototype.close=function(){return "opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},r.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t);},r.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open");},r.prototype.onData=function(t){var e=o.decodePacket(t,this.socket.binaryType);this.onPacket(e);},r.prototype.onPacket=function(t){this.emit("packet",t);},r.prototype.onClose=function(){this.readyState="closed",this.emit("close");};},function(t,e,n){function r(t,n){var r="b"+e.packets[t.type]+t.data.data;return n(r)}function o(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=v[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return r(s.buffer)}function i(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=new FileReader;return o.onload=function(){e.encodePacket({type:t.type,data:o.result},n,!0,r);},o.readAsArrayBuffer(t.data)}function s(t,n,r){if(!n)return e.encodeBase64Packet(t,r);if(g)return i(t,n,r);var o=new Uint8Array(1);o[0]=v[t.type];var s=new w([o.buffer,t.data]);return r(s)}function a(t){try{t=d.decode(t,{strict:!1});}catch(e){return !1}return t}function c(t,e,n){for(var r=new Array(t.length),o=l(t.length,n),i=function(t,n,o){e(n,function(e,n){r[t]=n,o(e,r);});},s=0;s<t.length;s++)i(s,t[s],o);}var u,p=n(25),h=n(26),f=n(27),l=n(28),d=n(29);"undefined"!=typeof ArrayBuffer&&(u=n(30));var y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),m="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),g=y||m;e.protocol=3;var v=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},b=p(v),C={type:"error",data:"parser error"},w=n(31);e.encodePacket=function(t,e,n,i){"function"==typeof e&&(i=e,e=!1),"function"==typeof n&&(i=n,n=null);var a=void 0===t.data?void 0:t.data.buffer||t.data;if("undefined"!=typeof ArrayBuffer&&a instanceof ArrayBuffer)return o(t,e,i);if("undefined"!=typeof w&&a instanceof w)return s(t,e,i);if(a&&a.base64)return r(t,i);var c=v[t.type];return void 0!==t.data&&(c+=n?d.encode(String(t.data),{strict:!1}):String(t.data)),i(""+c)},e.encodeBase64Packet=function(t,n){var r="b"+e.packets[t.type];if("undefined"!=typeof w&&t.data instanceof w){var o=new FileReader;return o.onload=function(){var t=o.result.split(",")[1];n(r+t);},o.readAsDataURL(t.data)}var i;try{i=String.fromCharCode.apply(null,new Uint8Array(t.data));}catch(s){for(var a=new Uint8Array(t.data),c=new Array(a.length),u=0;u<a.length;u++)c[u]=a[u];i=String.fromCharCode.apply(null,c);}return r+=btoa(i),n(r)},e.decodePacket=function(t,n,r){if(void 0===t)return C;if("string"==typeof t){if("b"===t.charAt(0))return e.decodeBase64Packet(t.substr(1),n);if(r&&(t=a(t),t===!1))return C;var o=t.charAt(0);return Number(o)==o&&b[o]?t.length>1?{type:b[o],data:t.substring(1)}:{type:b[o]}:C}var i=new Uint8Array(t),o=i[0],s=f(t,1);return w&&"blob"===n&&(s=new w([s])),{type:b[o],data:s}},e.decodeBase64Packet=function(t,e){var n=b[t.charAt(0)];if(!u)return {type:n,data:{base64:!0,data:t.substr(1)}};var r=u.decode(t.substr(1));return "blob"===e&&w&&(r=new w([r])),{type:n,data:r}},e.encodePayload=function(t,n,r){function o(t){return t.length+":"+t}function i(t,r){e.encodePacket(t,!!s&&n,!1,function(t){r(null,o(t));});}"function"==typeof n&&(r=n,n=null);var s=h(t);return n&&s?w&&!g?e.encodePayloadAsBlob(t,r):e.encodePayloadAsArrayBuffer(t,r):t.length?void c(t,i,function(t,e){return r(e.join(""))}):r("0:")},e.decodePayload=function(t,n,r){if("string"!=typeof t)return e.decodePayloadAsBinary(t,n,r);"function"==typeof n&&(r=n,n=null);var o;if(""===t)return r(C,0,1);for(var i,s,a="",c=0,u=t.length;c<u;c++){var p=t.charAt(c);if(":"===p){if(""===a||a!=(i=Number(a)))return r(C,0,1);if(s=t.substr(c+1,i),a!=s.length)return r(C,0,1);if(s.length){if(o=e.decodePacket(s,n,!1),C.type===o.type&&C.data===o.data)return r(C,0,1);var h=r(o,c+i,u);if(!1===h)return}c+=i,a="";}else a+=p;}return ""!==a?r(C,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,function(t){return n(null,t)});}return t.length?void c(t,r,function(t,e){var r=e.reduce(function(t,e){var n;return n="string"==typeof e?e.length:e.byteLength,t+n.toString().length+n+2},0),o=new Uint8Array(r),i=0;return e.forEach(function(t){var e="string"==typeof t,n=t;if(e){for(var r=new Uint8Array(t.length),s=0;s<t.length;s++)r[s]=t.charCodeAt(s);n=r.buffer;}e?o[i++]=0:o[i++]=1;for(var a=n.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var r=new Uint8Array(n),s=0;s<r.length;s++)o[i++]=r[s];}),n(o.buffer)}):n(new ArrayBuffer(0))},e.encodePayloadAsBlob=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);t=r.buffer,e[0]=0;}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,w){var c=new w([e.buffer,a.buffer,t]);n(null,c);}});}c(t,r,function(t,e){return n(new w(e))});},e.decodePayloadAsBinary=function(t,n,r){"function"==typeof n&&(r=n,n=null);for(var o=t,i=[];o.byteLength>0;){for(var s=new Uint8Array(o),a=0===s[0],c="",u=1;255!==s[u];u++){if(c.length>310)return r(C,0,1);c+=s[u];}o=f(o,2+c.length),c=parseInt(c);var p=f(o,0,c);if(a)try{p=String.fromCharCode.apply(null,new Uint8Array(p));}catch(h){var l=new Uint8Array(p);p="";for(var u=0;u<l.length;u++)p+=String.fromCharCode(l[u]);}i.push(p),o=f(o,c);}var d=i.length;i.forEach(function(t,o){r(e.decodePacket(t,n,!0),o,d);});};},function(t,e){t.exports=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var r in t)n.call(t,r)&&e.push(r);return e};},function(t,e,n){function r(t){if(!t||"object"!=typeof t)return !1;if(o(t)){for(var e=0,n=t.length;e<n;e++)if(r(t[e]))return !0;return !1}if("function"==typeof Buffer&&Buffer.isBuffer&&Buffer.isBuffer(t)||"function"==typeof ArrayBuffer&&t instanceof ArrayBuffer||s&&t instanceof Blob||a&&t instanceof File)return !0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return r(t.toJSON(),!0);for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&r(t[i]))return !0;return !1}var o=n(13),i=Object.prototype.toString,s="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===i.call(Blob),a="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===i.call(File);t.exports=r;},function(t,e){t.exports=function(t,e,n){var r=t.byteLength;if(e=e||0,n=n||r,t.slice)return t.slice(e,n);if(e<0&&(e+=r),n<0&&(n+=r),n>r&&(n=r),e>=r||e>=n||0===r)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(n-e),s=e,a=0;s<n;s++,a++)i[a]=o[s];return i.buffer};},function(t,e){function n(t,e,n){function o(t,r){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=n):0!==o.count||i||e(null,r);}var i=!1;return n=n||r,o.count=t,0===t?e():o}function r(){}t.exports=n;},function(t,e){function n(t){for(var e,n,r=[],o=0,i=t.length;o<i;)e=t.charCodeAt(o++),e>=55296&&e<=56319&&o<i?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function r(t){for(var e,n=t.length,r=-1,o="";++r<n;)e=t[r],e>65535&&(e-=65536,o+=d(e>>>10&1023|55296),e=56320|1023&e),o+=d(e);return o}function o(t,e){if(t>=55296&&t<=57343){if(e)throw Error("Lone surrogate U+"+t.toString(16).toUpperCase()+" is not a scalar value");return !1}return !0}function i(t,e){return d(t>>e&63|128)}function s(t,e){if(0==(4294967168&t))return d(t);var n="";return 0==(4294965248&t)?n=d(t>>6&31|192):0==(4294901760&t)?(o(t,e)||(t=65533),n=d(t>>12&15|224),n+=i(t,6)):0==(4292870144&t)&&(n=d(t>>18&7|240),n+=i(t,12),n+=i(t,6)),n+=d(63&t|128)}function a(t,e){e=e||{};for(var r,o=!1!==e.strict,i=n(t),a=i.length,c=-1,u="";++c<a;)r=i[c],u+=s(r,o);return u}function c(){if(l>=f)throw Error("Invalid byte index");var t=255&h[l];if(l++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function u(t){var e,n,r,i,s;if(l>f)throw Error("Invalid byte index");if(l==f)return !1;if(e=255&h[l],l++,0==(128&e))return e;if(192==(224&e)){if(n=c(),s=(31&e)<<6|n,s>=128)return s;throw Error("Invalid continuation byte")}if(224==(240&e)){if(n=c(),r=c(),s=(15&e)<<12|n<<6|r,s>=2048)return o(s,t)?s:65533;throw Error("Invalid continuation byte")}if(240==(248&e)&&(n=c(),r=c(),i=c(),s=(7&e)<<18|n<<12|r<<6|i,s>=65536&&s<=1114111))return s;throw Error("Invalid UTF-8 detected")}function p(t,e){e=e||{};var o=!1!==e.strict;h=n(t),f=h.length,l=0;for(var i,s=[];(i=u(o))!==!1;)s.push(i);return r(s)}/*! https://mths.be/utf8js v2.1.2 by @mathias */
	var h,f,l,d=String.fromCharCode;t.exports={version:"2.1.2",encode:a,decode:p};},function(t,e){!function(){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=new Uint8Array(256),r=0;r<t.length;r++)n[t.charCodeAt(r)]=r;e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(t){var e,r,o,i,s,a=.75*t.length,c=t.length,u=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var p=new ArrayBuffer(a),h=new Uint8Array(p);for(e=0;e<c;e+=4)r=n[t.charCodeAt(e)],o=n[t.charCodeAt(e+1)],i=n[t.charCodeAt(e+2)],s=n[t.charCodeAt(e+3)],h[u++]=r<<2|o>>4,h[u++]=(15&o)<<4|i>>2,h[u++]=(3&i)<<6|63&s;return p};}();},function(t,e){function n(t){return t.map(function(t){if(t.buffer instanceof ArrayBuffer){var e=t.buffer;if(t.byteLength!==e.byteLength){var n=new Uint8Array(t.byteLength);n.set(new Uint8Array(e,t.byteOffset,t.byteLength)),e=n.buffer;}return e}return t})}function r(t,e){e=e||{};var r=new i;return n(t).forEach(function(t){r.append(t);}),e.type?r.getBlob(e.type):r.getBlob()}function o(t,e){return new Blob(n(t),e||{})}var i="undefined"!=typeof i?i:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder&&MozBlobBuilder,s=function(){try{var t=new Blob(["hi"]);return 2===t.size}catch(e){return !1}}(),a=s&&function(){try{var t=new Blob([new Uint8Array([1,2])]);return 2===t.size}catch(e){return !1}}(),c=i&&i.prototype.append&&i.prototype.getBlob;"undefined"!=typeof Blob&&(r.prototype=Blob.prototype,o.prototype=Blob.prototype),t.exports=function(){return s?a?Blob:o:c?r:void 0}();},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]);}return e};},function(t,e){t.exports=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t;};},function(t,e){function n(t){var e="";do e=s[t%a]+e,t=Math.floor(t/a);while(t>0);return e}function r(t){var e=0;for(p=0;p<t.length;p++)e=e*a+c[t.charAt(p)];return e}function o(){var t=n(+new Date);return t!==i?(u=0,i=t):t+"."+n(u++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),a=64,c={},u=0,p=0;p<a;p++)c[s[p]]=p;o.encode=n,o.decode=r,t.exports=o;},function(t,e,n){(function(e){function r(){}function o(){return "undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof e?e:{}}function i(t){if(s.call(this,t),this.query=this.query||{},!c){var e=o();c=e.___eio=e.___eio||[];}this.index=c.length;var n=this;c.push(function(t){n.onData(t);}),this.query.j=this.index,"function"==typeof addEventListener&&addEventListener("beforeunload",function(){n.script&&(n.script.onerror=r);},!1);}var s=n(22),a=n(33);t.exports=i;var c,u=/\n/g,p=/\\n/g;a(i,s),i.prototype.supportsBinary=!1,i.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),s.prototype.doClose.call(this);},i.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e);};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e;var r="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);r&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t);},100);},i.prototype.doWrite=function(t,e){function n(){r(),e();}function r(){if(o.iframe)try{o.form.removeChild(o.iframe);}catch(t){o.onError("jsonp polling iframe removal error",t);}try{var e='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(e);}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0";}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i;}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),c=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=c,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a;}this.form.action=this.uri(),r(),t=t.replace(p,"\\\n"),this.area.value=t.replace(u,"\\n");try{this.form.submit();}catch(h){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===o.iframe.readyState&&n();}:this.iframe.onload=n;};}).call(e,function(){return this}());},function(t,e,n){function r(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=o&&!t.forceNode,this.protocols=t.protocols,this.usingBrowserWebSocket||(l=i),s.call(this,t);}var o,i,s=n(23),a=n(24),c=n(32),u=n(33),p=n(34),h=n(3)("engine.io-client:websocket");if("undefined"!=typeof WebSocket?o=WebSocket:"undefined"!=typeof self&&(o=self.WebSocket||self.MozWebSocket),"undefined"==typeof window)try{i=n(37);}catch(f){}var l=o||i;t.exports=r,u(r,s),r.prototype.name="websocket",r.prototype.supportsBinary=!0,r.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=this.protocols,n={agent:this.agent,perMessageDeflate:this.perMessageDeflate};n.pfx=this.pfx,n.key=this.key,n.passphrase=this.passphrase,n.cert=this.cert,n.ca=this.ca,n.ciphers=this.ciphers,n.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(n.headers=this.extraHeaders),this.localAddress&&(n.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket&&!this.isReactNative?e?new l(t,e):new l(t):new l(t,e,n);}catch(r){return this.emit("error",r)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners();}},r.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen();},this.ws.onclose=function(){t.onClose();},this.ws.onmessage=function(e){t.onData(e.data);},this.ws.onerror=function(e){t.onError("websocket error",e);};},r.prototype.write=function(t){function e(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain");},0);}var n=this;this.writable=!1;for(var r=t.length,o=0,i=r;o<i;o++)!function(t){a.encodePacket(t,n.supportsBinary,function(o){if(!n.usingBrowserWebSocket){var i={};if(t.options&&(i.compress=t.options.compress),n.perMessageDeflate){var s="string"==typeof o?Buffer.byteLength(o):o.length;s<n.perMessageDeflate.threshold&&(i.compress=!1);}}try{n.usingBrowserWebSocket?n.ws.send(o):n.ws.send(o,i);}catch(a){h("websocket closed before onclose event");}--r||e();});}(t[o]);},r.prototype.onClose=function(){s.prototype.onClose.call(this);},r.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close();},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=p()),this.supportsBinary||(t.b64=1),t=c.encode(t),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t},r.prototype.check=function(){return !(!l||"__initialize"in l&&this.name===r.prototype.name)};},function(t,e){},function(t,e){var n=[].indexOf;t.exports=function(t,e){if(n)return t.indexOf(e);for(var r=0;r<t.length;++r)if(t[r]===e)return r;return -1};},function(t,e,n){function r(t,e,n){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,this.flags={},n&&n.query&&(this.query=n.query),this.io.autoConnect&&this.open();}var o=n(7),i=n(11),s=n(40),a=n(41),c=n(42),u=n(3)("socket.io-client:socket"),p=n(32),h=n(26);t.exports=e=r;var f={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},l=i.prototype.emit;i(r.prototype),r.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[a(t,"open",c(this,"onopen")),a(t,"packet",c(this,"onpacket")),a(t,"close",c(this,"onclose"))];}},r.prototype.open=r.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},r.prototype.send=function(){var t=s(arguments);return t.unshift("message"),this.emit.apply(this,t),this},r.prototype.emit=function(t){if(f.hasOwnProperty(t))return l.apply(this,arguments),this;var e=s(arguments),n={type:(void 0!==this.flags.binary?this.flags.binary:h(e))?o.BINARY_EVENT:o.EVENT,data:e};return n.options={},n.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(u("emitting packet with ack id %d",this.ids),this.acks[this.ids]=e.pop(),n.id=this.ids++),this.connected?this.packet(n):this.sendBuffer.push(n),this.flags={},this},r.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t);},r.prototype.onopen=function(){if(u("transport is open - connecting"),"/"!==this.nsp)if(this.query){var t="object"==typeof this.query?p.encode(this.query):this.query;u("sending connect packet with query %s",t),this.packet({type:o.CONNECT,query:t});}else this.packet({type:o.CONNECT});},r.prototype.onclose=function(t){u("close (%s)",t),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t);},r.prototype.onpacket=function(t){var e=t.nsp===this.nsp,n=t.type===o.ERROR&&"/"===t.nsp;if(e||n)switch(t.type){case o.CONNECT:this.onconnect();break;case o.EVENT:this.onevent(t);break;case o.BINARY_EVENT:this.onevent(t);break;case o.ACK:this.onack(t);break;case o.BINARY_ACK:this.onack(t);break;case o.DISCONNECT:this.ondisconnect();break;case o.ERROR:this.emit("error",t.data);}},r.prototype.onevent=function(t){var e=t.data||[];u("emitting event %j",e),null!=t.id&&(u("attaching ack callback to event"),e.push(this.ack(t.id))),this.connected?l.apply(this,e):this.receiveBuffer.push(e);},r.prototype.ack=function(t){var e=this,n=!1;return function(){if(!n){n=!0;var r=s(arguments);u("sending ack %j",r),e.packet({type:h(r)?o.BINARY_ACK:o.ACK,id:t,data:r});}}},r.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e?(u("calling ack %s with %j",t.id,t.data),e.apply(this,t.data),delete this.acks[t.id]):u("bad ack %s",t.id);},r.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered();},r.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)l.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[];},r.prototype.ondisconnect=function(){u("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect");},r.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null;}this.io.destroy(this);},r.prototype.close=r.prototype.disconnect=function(){return this.connected&&(u("performing disconnect (%s)",this.nsp),this.packet({type:o.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},r.prototype.compress=function(t){return this.flags.compress=t,this},r.prototype.binary=function(t){return this.flags.binary=t,this};},function(t,e){function n(t,e){var n=[];e=e||0;for(var r=e||0;r<t.length;r++)n[r-e]=t[r];return n}t.exports=n;},function(t,e){function n(t,e,n){return t.on(e,n),{destroy:function(){t.removeListener(e,n);}}}t.exports=n;},function(t,e){var n=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var r=n.call(arguments,2);return function(){return e.apply(t,r.concat(n.call(arguments)))}};},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0;}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n;}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0;},n.prototype.setMin=function(t){this.ms=t;},n.prototype.setMax=function(t){this.max=t;},n.prototype.setJitter=function(t){this.jitter=t;};}])});

	});
	var socket_io_1 = socket_io.io;

	function objToString(obj) {
	  switch (typeof obj) {
	    case "undefined":
	        return 'undefined';
	    case "object":
	        let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	        switch (type) {
	            case "null":
	                return 'null';
	            case "array":
	                return '[' + obj.map(key => objToString(key)).join(', ') + ']';
	            case 'object':
	                return '{ ' + Object.keys(obj).map(key => key + ': ' + objToString(obj[key])).join(', ') + ' }';
	            default:
	                try {
	                  return obj.toString();
	                } catch (e) {
	                  return '[Unknown type: ' + type + ']';
	                }
	        }
	    default:
	        return obj.toString();
	  }
	}

	var _objToString_1_0_1_objToString = objToString;

	function has(result, key) {
	  return Object.prototype.hasOwnProperty.call(result, key);
	}
	function setStorage(key, value) {
	  return new Promise(function (resolve) {
	    chrome.storage.local.set(defineProperty({}, key, value), function () {
	      resolve(value);
	    });
	  });
	}
	function getStorage(key, defaultValue) {
	  return new Promise(function (resolve) {
	    chrome.storage.local.get([key], function (result) {
	      if (has(result, key)) {
	        resolve(result[key]);
	      } else if (defaultValue) {
	        setStorage(key, defaultValue).then(function (value) {
	          resolve(value);
	        });
	      } else {
	        resolve();
	      }
	    });
	  });
	}
	function storageChange(callback) {
	  chrome.storage.onChanged.addListener(callback);
	}
	var debug = {
	  log: function log(msg) {
	    var logs;
	    return regenerator.async(function log$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return regenerator.awrap(getStorage('debug'));

	          case 2:
	            _context.t0 = _context.sent;

	            if (_context.t0) {
	              _context.next = 5;
	              break;
	            }

	            _context.t0 = [];

	          case 5:
	            logs = _context.t0;
	            logs.push({
	              type: 'log',
	              data: _objToString_1_0_1_objToString(msg)
	            });
	            _context.next = 9;
	            return regenerator.awrap(setStorage('debug', logs));

	          case 9:
	          case "end":
	            return _context.stop();
	        }
	      }
	    });
	  },
	  err: function err(msg) {
	    var logs;
	    return regenerator.async(function err$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return regenerator.awrap(getStorage('debug'));

	          case 2:
	            _context2.t0 = _context2.sent;

	            if (_context2.t0) {
	              _context2.next = 5;
	              break;
	            }

	            _context2.t0 = [];

	          case 5:
	            logs = _context2.t0;
	            logs.push({
	              type: 'error',
	              data: _objToString_1_0_1_objToString(msg)
	            });
	            _context2.next = 9;
	            return regenerator.awrap(setStorage('debug', logs));

	          case 9:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    });
	  },
	  clean: function clean() {
	    return regenerator.async(function clean$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return regenerator.awrap(setStorage('debug', []));

	          case 2:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    });
	  }
	};
	function onMessage(callback) {
	  chrome.runtime.onMessage.addListener(callback);
	}
	function setBadge() {
	  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'red';
	  return new Promise(function (resolve) {
	    chrome.browserAction.setBadgeBackgroundColor({
	      color: color
	    }, function () {
	      chrome.browserAction.setBadgeText({
	        text: text
	      }, function () {
	        resolve();
	      });
	    });
	  });
	}

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var Background =
	/*#__PURE__*/
	function () {
	  function Background() {
	    var _this = this;

	    classCallCheck(this, Background);

	    this.config = null;
	    this.stream = null;
	    this.socket = null;
	    this.mediaRecorder = null;
	    onMessage(function (request) {
	      var type = request.type,
	          data = request.data;

	      switch (type) {
	        case 'start':
	          _this.config = _objectSpread({}, Background.config, {}, data);

	          _this.start();

	          break;

	        case 'stop':
	          _this.stop();

	          break;
	      }
	    });
	    storageChange(function _callee(changes) {
	      return regenerator.async(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (changes.recording) {
	                if (changes.recording.newValue) {
	                  setBadge('ON');
	                } else {
	                  setBadge('');
	                }
	              }

	            case 1:
	            case "end":
	              return _context.stop();
	          }
	        }
	      });
	    });
	  }

	  createClass(Background, [{
	    key: "connectSocket",
	    value: function connectSocket(url) {
	      return new Promise(function (revolve, reject) {
	        var socket = socket_io(url);
	        socket.on('connect_error', function (error) {
	          reject(error);
	        });
	        socket.on('connect', function () {
	          revolve(socket);
	        });
	      });
	    }
	  }, {
	    key: "tabCapture",
	    value: function tabCapture(res) {
	      return new Promise(function (revolve, reject) {
	        var captureOptions = Background.CaptureOptions;
	        var resolution = Background.Resolution[res];
	        captureOptions.videoConstraints.mandatory.maxWidth = resolution.width;
	        captureOptions.videoConstraints.mandatory.minWidth = resolution.width;
	        captureOptions.videoConstraints.mandatory.maxHeight = resolution.height;
	        captureOptions.videoConstraints.mandatory.minHeight = resolution.height;
	        chrome.tabCapture.capture(captureOptions, function (stream) {
	          if (stream) {
	            revolve(stream);
	          } else {
	            reject();
	          }
	        });
	      });
	    }
	  }, {
	    key: "recorder",
	    value: function recorder(stream, videoBitsPerSecond) {
	      return new Promise(function (revolve, reject) {
	        var recorderOptions = Background.RecorderOptions;
	        recorderOptions.videoBitsPerSecond = videoBitsPerSecond;

	        if (MediaRecorder && MediaRecorder.isTypeSupported(recorderOptions.mimeType)) {
	          var mediaRecorder = new MediaRecorder(stream, recorderOptions);
	          revolve(mediaRecorder);
	        } else {
	          reject();
	        }
	      });
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var _this2 = this;

	      var _this$config, socket, rtmp, streamname, resolution, videoBitsPerSecond;

	      return regenerator.async(function start$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              _this$config = this.config, socket = _this$config.socket, rtmp = _this$config.rtmp, streamname = _this$config.streamname, resolution = _this$config.resolution, videoBitsPerSecond = _this$config.videoBitsPerSecond;
	              _context4.prev = 1;
	              _context4.next = 4;
	              return regenerator.awrap(this.connectSocket(socket));

	            case 4:
	              this.socket = _context4.sent;
	              _context4.next = 7;
	              return regenerator.awrap(debug.log('建立socket连接成功'));

	            case 7:
	              this.socket.emit('rtmp', rtmp + streamname);
	              this.socket.on('fail', function _callee2(info) {
	                return regenerator.async(function _callee2$(_context2) {
	                  while (1) {
	                    switch (_context2.prev = _context2.next) {
	                      case 0:
	                        _context2.next = 2;
	                        return regenerator.awrap(debug.err(info));

	                      case 2:
	                        _context2.next = 4;
	                        return regenerator.awrap(_this2.stop());

	                      case 4:
	                      case "end":
	                        return _context2.stop();
	                    }
	                  }
	                });
	              });
	              this.socket.on('log', function _callee3(info) {
	                return regenerator.async(function _callee3$(_context3) {
	                  while (1) {
	                    switch (_context3.prev = _context3.next) {
	                      case 0:
	                        _context3.next = 2;
	                        return regenerator.awrap(debug.log(info));

	                      case 2:
	                      case "end":
	                        return _context3.stop();
	                    }
	                  }
	                });
	              });
	              _context4.next = 19;
	              break;

	            case 12:
	              _context4.prev = 12;
	              _context4.t0 = _context4["catch"](1);
	              _context4.next = 16;
	              return regenerator.awrap(debug.err("\u5EFA\u7ACBsocket\u8FDE\u63A5\u5931\u8D25: ".concat(_context4.t0.message.trim())));

	            case 16:
	              _context4.next = 18;
	              return regenerator.awrap(this.stop());

	            case 18:
	              return _context4.abrupt("return");

	            case 19:
	              _context4.prev = 19;
	              _context4.next = 22;
	              return regenerator.awrap(this.tabCapture(resolution));

	            case 22:
	              this.stream = _context4.sent;
	              _context4.next = 25;
	              return regenerator.awrap(debug.log('获取标签视频流成功'));

	            case 25:
	              _context4.next = 34;
	              break;

	            case 27:
	              _context4.prev = 27;
	              _context4.t1 = _context4["catch"](19);
	              _context4.next = 31;
	              return regenerator.awrap(debug.err('无法获取标签视频流，请重试！'));

	            case 31:
	              _context4.next = 33;
	              return regenerator.awrap(this.stop());

	            case 33:
	              return _context4.abrupt("return");

	            case 34:
	              _context4.prev = 34;
	              _context4.next = 37;
	              return regenerator.awrap(this.recorder(this.stream, videoBitsPerSecond));

	            case 37:
	              this.mediaRecorder = _context4.sent;
	              _context4.next = 40;
	              return regenerator.awrap(debug.log('录制器启动成功'));

	            case 40:
	              this.mediaRecorder.ondataavailable = function (event) {
	                if (event.data && event.data.size > 0) {
	                  _this2.socket.emit('binarystream', event.data);
	                }
	              };

	              this.mediaRecorder.start(1000);
	              _context4.next = 50;
	              break;

	            case 44:
	              _context4.prev = 44;
	              _context4.t2 = _context4["catch"](34);
	              _context4.next = 48;
	              return regenerator.awrap(debug.err('无法录制标签的视频流，请重试！'));

	            case 48:
	              _context4.next = 50;
	              return regenerator.awrap(this.stop());

	            case 50:
	              _context4.next = 52;
	              return regenerator.awrap(debug.log('正在推流中...'));

	            case 52:
	            case "end":
	              return _context4.stop();
	          }
	        }
	      }, null, this, [[1, 12], [19, 27], [34, 44]]);
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      return regenerator.async(function stop$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              setStorage('recording', false);

	              if (this.stream) {
	                this.stream.getTracks().forEach(function (track) {
	                  return track.stop();
	                });
	              }

	              if (this.socket) {
	                this.socket.emit('disconnect');
	                this.socket.close();
	              }

	              if (this.mediaRecorder) {
	                this.mediaRecorder.stop();
	              }

	            case 4:
	            case "end":
	              return _context5.stop();
	          }
	        }
	      }, null, this);
	    }
	  }], [{
	    key: "config",
	    get: function get() {
	      return {
	        activeTab: null,
	        liveTab: null,
	        rtmp: '',
	        streamname: '',
	        socket: '',
	        resolution: 1920,
	        videoBitsPerSecond: 2500000
	      };
	    }
	  }, {
	    key: "CaptureOptions",
	    get: function get() {
	      return {
	        audio: true,
	        video: true,
	        videoConstraints: {
	          mandatory: {
	            chromeMediaSource: 'tab',
	            maxWidth: 1920,
	            minWidth: 1920,
	            maxHeight: 1080,
	            minHeight: 1080
	          }
	        },
	        audioConstraints: {
	          mandatory: {
	            echoCancellation: true
	          }
	        }
	      };
	    }
	  }, {
	    key: "RecorderOptions",
	    get: function get() {
	      return {
	        audioBitsPerSecond: 128000,
	        videoBitsPerSecond: 2500000,
	        mimeType: 'video/webm; codecs="h264, opus"'
	      };
	    }
	  }, {
	    key: "Resolution",
	    get: function get() {
	      return {
	        1920: {
	          width: 1920,
	          height: 1080
	        },
	        720: {
	          width: 1280,
	          height: 720
	        },
	        480: {
	          width: 640,
	          height: 480
	        },
	        360: {
	          width: 640,
	          height: 360
	        },
	        240: {
	          width: 320,
	          height: 240
	        }
	      };
	    }
	  }]);

	  return Background;
	}();

	var index = new Background();

	return index;

}());
//# sourceMappingURL=index.js.map
