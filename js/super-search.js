/* super-search
Author: Kushagra Gour (http://kushagragour.in)
MIT Licensed



 */

(function e (t, n, r) { function s (o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require === 'function' && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); throw new Error("Cannot find module '" + o + "'") } var f = n[o] = {exports: {}}; t[o][0].call(f.exports, function (e) { var n = t[o][1][e]; return s(n || e) }, f, f.exports, e, t, n, r) } return n[o].exports } var i = typeof require === 'function' && require; for (var o = 0; o < r.length; o++)s(r[o]); return s })({1: [function (require, module, exports) {
  'use strict'
  module.exports = {
    load: load
  }

  function load (location, callback) {
    var xhr = getXHR()
    xhr.open('GET', location, true)
    xhr.onreadystatechange = createStateChangeListener(xhr, callback)
    xhr.send()
  }

  function createStateChangeListener (xhr, callback) {
    return function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          callback(null, JSON.parse(xhr.responseText))
        } catch (err) {
          callback(err, null)
        }
      }
    }
  }

  function getXHR () {
    return (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  }
}, {}],
  2: [function (require, module, exports) {
    'use strict'
    module.exports = function OptionsValidator (params) {
      if (!validateParams(params)) {
        throw new Error('-- OptionsValidator: required options missing')
      }
      if (!(this instanceof OptionsValidator)) {
        return new OptionsValidator(params)
      }

      var requiredOptions = params.required

      this.getRequiredOptions = function () {
        return requiredOptions
      }

      this.validate = function (parameters) {
        var errors = []
        requiredOptions.forEach(function (requiredOptionName) {
          if (parameters[requiredOptionName] === undefined) {
            errors.push(requiredOptionName)
          }
        })
        return errors
      }

      function validateParams (params) {
        if (!params) {
          return false
        }
        return params.required !== undefined && params.required instanceof Array
      }
    }
  }, {}],
  3: [function (require, module, exports) {
    'use strict'
    module.exports = {
      put: put,
      clear: clear,
      get: get,
      search: search,
      setOptions: setOptions
    }

    var FuzzySearchStrategy = require('./SearchStrategies/FuzzySearchStrategy')
    var LiteralSearchStrategy = require('./SearchStrategies/LiteralSearchStrategy')

    var data = []
    var opt = {}
    opt.fuzzy = false
    opt.limit = 10
    opt.searchStrategy = opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy

    function put (data) {
      if (isObject(data)) {
        return addObject(data)
      }
      if (isArray(data)) {
        return addArray(data)
      }
      return undefined
    }
    function clear () {
      data.length = 0
      return data
    }

    function get () {
      return data
    }

    function isObject (obj) { return !!obj && Object.prototype.toString.call(obj) === '[object Object]' }
    function isArray (obj) { return !!obj && Object.prototype.toString.call(obj) === '[object Array]' }

    function addObject (_data) {
      data.push(_data)
      return data
    }

    function addArray (_data) {
      var added = []
      for (var i = 0; i < _data.length; i++) {
        if (isObject(_data[i])) {
          added.push(addObject(_data[i]))
        }
      }
      return added
    }

    function search (crit) {
      if (!crit) {
        return []
      }
      return findMatches(data, crit, opt.searchStrategy, opt)
    }

    function setOptions (_opt) {
      opt = _opt || {}

      opt.fuzzy = _opt.fuzzy || false
      opt.limit = _opt.limit || 10
      opt.searchStrategy = _opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
    }

    function findMatches (data, crit, strategy, opt) {
      var matches = []
      for (var i = 0; i < data.length && matches.length < opt.limit; i++) {
        var match = findMatchesInObject(data[i], crit, strategy, opt)
        if (match) {
          matches.push(match)
        }
      }
      return matches
    }

    function findMatchesInObject (obj, crit, strategy, opt) {
      for (var key in obj) {
        if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
          return obj
        }
      }
    }

    function isExcluded (term, excludedTerms) {
      var excluded = false
      excludedTerms = excludedTerms || []
      for (var i = 0; i < excludedTerms.length; i++) {
        var excludedTerm = excludedTerms[i]
        if (!excluded && new RegExp(term).test(excludedTerm)) {
          excluded = true
        }
      }
      return excluded
    }
  }, {'./SearchStrategies/FuzzySearchStrategy': 4, './SearchStrategies/LiteralSearchStrategy': 5}],
  4: [function (require, module, exports) {
    'use strict'
    module.exports = new FuzzySearchStrategy()

    function FuzzySearchStrategy () {
      this.matches = function (string, crit) {
        if (typeof string !== 'string' || typeof crit !== 'string') {
          return false
        }
        var fuzzy = fuzzyFrom(crit)
        return !!fuzzy.test(string)
      }

      function fuzzyFrom (string) {
        var fuzzy = string
              .trim()
              .split('')
              .join('.*?')
              .replace('??', '?')
        return new RegExp(fuzzy, 'gi')
      }
    }
  }, {}],
  5: [function (require, module, exports) {
    'use strict'
    module.exports = new LiteralSearchStrategy()

    function LiteralSearchStrategy () {
      this.matches = function (string, crit) {
        if (typeof string !== 'string') {
          return false
        }
        string = string.trim()
        return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0
      }
    }
  }, {}],
  6: [function (require, module, exports) {
    'use strict'
    module.exports = {
      compile: compile,
      setOptions: setOptions
    }

    var options = {}
    options.pattern = /\{(.*?)\}/g
    options.template = ''
    options.middleware = function () {}

    function setOptions (_options) {
      options.pattern = _options.pattern || options.pattern
      options.template = _options.template || options.template
      if (typeof _options.middleware === 'function') {
        options.middleware = _options.middleware
      }
    }

    function compile (data) {
      return options.template.replace(options.pattern, function (match, prop) {
        var value = options.middleware(prop, data[prop], options.template)
        if (value !== undefined) {
          return value
        }
        return data[prop] || match
      })
    }
  }, {}],
  7: [function (require, module, exports) {
    ;(function (window, document, undefined) {
      'use strict'

      var options = {
        searchInput: null,
        resultsContainer: null,
        json: [],
        searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
        templateMiddleware: function () {},
        noResultsText: 'No results found',
        limit: 10,
        fuzzy: false,
        exclude: []
      }

      var requiredOptions = ['searchInput', 'resultsContainer', 'json']

      var templater = require('./Templater')
      var repository = require('./Repository')
      var jsonLoader = require('./JSONLoader')
      var optionsValidator = require('./OptionsValidator')({
        required: requiredOptions
      })
      var utils = require('./utils')

  /*
    Public API
  */
      window.SimpleJekyllSearch = function SimpleJekyllSearch (_options) {
        var errors = optionsValidator.validate(_options)
        if (errors.length > 0) {
          throwError('You must specify the following required options: ' + requiredOptions)
        }

        options = utils.merge(options, _options)

        templater.setOptions({
          template: options.searchResultTemplate,
          middleware: options.templateMiddleware
        })

        repository.setOptions({
          fuzzy: options.fuzzy,
          limit: options.limit
        })

        if (utils.isJSON(options.json)) {
          initWithJSON(options.json)
        } else {
          initWithURL(options.json)
        }
      }

  // for backwards compatibility
      window.SimpleJekyllSearch.init = window.SimpleJekyllSearch

      function initWithJSON (json) {
        repository.put(json)
        registerInput()
      }

      function initWithURL (url) {
        jsonLoader.load(url, function (err, json) {
          if (err) {
            throwError('failed to get JSON (' + url + ')')
          }
          initWithJSON(json)
        })
      }

      function emptyResultsContainer () {
        options.resultsContainer.innerHTML = ''
      }

      function appendToResultsContainer (text) {
        options.resultsContainer.innerHTML += text
      }

      function registerInput () {
        options.searchInput.addEventListener('keyup', function (e) {
          var key = e.which
          var query = e.target.value
          if (isWhitelistedKey(key) && isValidQuery(query)) {
            emptyResultsContainer()
            render(repository.search(query))
          }
        })
      }

      function render (results) {
        if (results.length === 0) {
          return appendToResultsContainer(options.noResultsText)
        }
        for (var i = 0; i < results.length; i++) {
          appendToResultsContainer(templater.compile(results[i]))
        }
      }

      function isValidQuery (query) {
        return query && query.length > 0
      }

      function isWhitelistedKey (key) {
        return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
      }

      function throwError (message) { throw new Error('SimpleJekyllSearch --- ' + message) }
    })(window, document)
  }, {'./JSONLoader': 1, './OptionsValidator': 2, './Repository': 3, './Templater': 6, './utils': 8}],
  8: [function (require, module, exports) {
    'use strict'
    module.exports = {
      merge: merge,
      isJSON: isJSON
    }

    function merge (defaultParams, mergeParams) {
      var mergedOptions = {}
      for (var option in defaultParams) {
        mergedOptions[option] = defaultParams[option]
        if (mergeParams[option] !== undefined) {
          mergedOptions[option] = mergeParams[option]
        }
      }
      return mergedOptions
    }

    function isJSON (json) {
      try {
        if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
          return true
        }
        return false
      } catch (e) {
        return false
      }
    }
  }, {}]}, {}, [7])


// (function () {
//     var searchFile = '../../sitemap.xml',
//         searchEl,
//         searchInputEl,
//         searchResultsEl,
//         currentInputValue = '',
//         lastSearchResultHash,
//         posts = [];

//     // Changes XML to JSON
//     // Modified version from here: http://davidwalsh.name/convert-xml-json
//     function xmlToJson(xml) {
//         // Create the return object
//         var obj = {};
//         if (xml.nodeType == 3) { // text
//             obj = xml.nodeValue;
//         }

//         // do children
//         // If all text nodes inside, get concatenated text from them.
//         var textNodes = [].slice.call(xml.childNodes).filter(function (node) { return node.nodeType === 3; });
//         if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
//             obj = [].slice.call(xml.childNodes).reduce(function (text, node) { return text + node.nodeValue; }, '');
//         }
//         else if (xml.hasChildNodes()) {
//             for(var i = 0; i < xml.childNodes.length; i++) {
//                 var item = xml.childNodes.item(i);
//                 var nodeName = item.nodeName;
//                 if (typeof(obj[nodeName]) == "undefined") {
//                     obj[nodeName] = xmlToJson(item);
//                 } else {
//                     if (typeof(obj[nodeName].push) == "undefined") {
//                         var old = obj[nodeName];
//                         obj[nodeName] = [];
//                         obj[nodeName].push(old);
//                     }
//                     obj[nodeName].push(xmlToJson(item));
//                 }
//             }
//         }
//         return obj;
//     }

//     function getPostsFromXml(xml) {
//         var json = xmlToJson(xml);
//         // Atom 1.0 format
//         if (json.entry && json.entry instanceof Array) {
//             return json.entry;
//         }
//         // Atom 2.0 format
//         else {
//             return json.channel.item;
//         }
//     }

//     window.toggleSearch = function toggleSearch() {
//         searchEl.classList.toggle('is-active');
//         if (searchEl.classList.contains('is-active')) {
//             // while opening
//             searchInputEl.value = '';
//         } else {
//             // while closing
//             searchResultsEl.classList.add('is-hidden');
//         }
//         setTimeout(function () {
//             searchInputEl.focus();
//         }, 210);
//     }

//     function handleInput() {
//         var currentResultHash, d;

//         currentInputValue = (searchInputEl.value + '').toLowerCase();
//         if (!currentInputValue || currentInputValue.length < 3) {
//             lastSearchResultHash = '';
//             searchResultsEl.classList.add('is-hidden');
//             return;
//         }
//         searchResultsEl.style.offsetWidth;

//         var matchingPosts = posts.filter(function (post) {
//             // Search `description` and `content` both to support 1.0 and 2.0 formats.
//             if ((post.title + '').toLowerCase().indexOf(currentInputValue) !== -1 || ((post.description || post.content) + '').toLowerCase().indexOf(currentInputValue) !== -1) {
//                 return true;
//             }
//         });
//         if (!matchingPosts.length) {
//             searchResultsEl.classList.add('is-hidden');
//         }
//         currentResultHash = matchingPosts.reduce(function(hash, post) { return post.title + hash; }, '');
//         if (matchingPosts.length && currentResultHash !== lastSearchResultHash) {
//             searchResultsEl.classList.remove('is-hidden');
//             searchResultsEl.innerHTML = matchingPosts.map(function (post) {
//                 d = new Date(post.pubDate);
//                 return '<li><a href="' + post.link + '">' + post.title + '<span class="super-search__result-date">' + d.toUTCString().replace(/.*(\d{2})\s+(\w{3})\s+(\d{4}).*/,'$2 $1, $3') + '</span></a></li>';
//             }).join('');
//         }
//         lastSearchResultHash = currentResultHash;
//     }

//     function init(options) {
//         searchFile = options.searchFile || searchFile;
//         searchEl = document.querySelector(options.searchSelector || '#js-super-search');
//         searchInputEl = document.querySelector(options.inputSelector || '#js-super-search__input');
//         searchResultsEl = document.querySelector(options.resultsSelector || '#js-super-search__results');

//         var xmlhttp=new XMLHttpRequest();
//         xmlhttp.open('GET', searchFile);
//         xmlhttp.onreadystatechange = function () {
//             if (xmlhttp.readyState != 4) return;
//             if (xmlhttp.status != 200 && xmlhttp.status != 304) { return; }
//             var node = (new DOMParser).parseFromString(xmlhttp.responseText, 'text/xml');
//             node = node.children[0];
//             posts = getPostsFromXml(node);
//         }
//         xmlhttp.send();

//         // Toggle on ESC key
//         window.addEventListener('keyup', function onKeyPress(e) {
//             if (e.which === 27) {
//                 toggleSearch();
//             }
//         });
//         // Open on '/' key
//         window.addEventListener('keypress', function onKeyPress(e) {
//             if (e.which === 47 && !searchEl.classList.contains('is-active')) {
//                 toggleSearch();
//             }
//         });

//         searchInputEl.addEventListener('input', function onInputChange() {
//             handleInput();
//         });
//     }

//     init.toggle = toggleSearch;

//     window.superSearch = init;

// })();