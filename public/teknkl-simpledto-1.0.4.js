/*
 @author Sanford Whiteman, TEKNKL (blog.teknkl.com / sandy@teknkl.com) with Revisions/Refinements by Dan Kinsley
 @version v1.0.4
 @copyright Copyright 2016, 2017, 2018, 2019 FigureOne, Inc.
 @license MIT License: You must include this license and the above credits in all uses & reproductions of this software.
*/


Array.prototype.forEach =
  Array.prototype.forEach ||
  function (fn, scope) {
    "use strict";
    var i, len;
    for (i = 0, len = this.length; i < len; ++i) {
      if (i in this) {
        fn.call(scope, this[i], i, this);
      }
    }
  };
Array.prototype.find =
  Array.prototype.find ||
  function (callback) {
    if (this === null) {
      throw new TypeError(
        "Array.prototype.find called on null or undefined"
      );
    } else if (typeof callback !== "function") {
      throw new TypeError("callback must be a function");
    }
    var list = Object(this);
    // Makes sures is always has an positive integer as length.
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var element = list[i];
      if (callback.call(thisArg, element, i, list)) {
        return element;
      }
    }
  };

function SimpleDTO(initObj) {
  var slice = Function.prototype.call.bind(Array.prototype.slice);
  try {
    initObj.debug && console.log("SimpleDTO: Unifying domains " + [document.domain, initObj.domain].join(", ")), document.domain = initObj.domain;
  } catch (b) {
    throw "SimpleDTO: Domain unification error, domain: " + initObj.domain;
  }
  if ("receive" == initObj.mode) {
    var iframe = document.createElement("iframe");
    this.setSource = function(b) {
      iframe.src = b;
    };
    // this.getSource = function() {
    //   return d;
    // };
    iframe.addEventListener("load", function() {
      this.data || this.src ? (initObj.debug && console.log("SimpleDTO: running callback"), initObj.cb && initObj.cb.call(this, f)) : console.warn("SimpleDTO: skipping load event due to empty data src or callback");
    });
    iframe.setAttribute("data-transfer-object", "true");
    [["visibility", "hidden"], ["position", "absolute"], ["height", "0"]].forEach(function(b) {
      iframe.style.setProperty.apply(iframe.style, b);
    });
    var anchor = document.createElement("a");
    anchor.href = initObj.dataSrc || "";
    initObj.noReplaceQuery || (anchor.search = document.location.search);
    window.__mktTokVal && (anchor.search += (1 < anchor.search.length ? "&" : "") + ["mkt_tok", window.__mktTokVal].join("="));
    initObj.noInit || this.setSource(anchor.href);
    document.body.appendChild(iframe);
  }
  var f = this;
  return {
    getGlobal:function() {
      return iframe.contentWindow;
    }, 
    cleanup:function() {
      var b = iframe.contentWindow.frameElement;
      console.log(b)
      b.parentNode.removeChild(b);
    }, 
    parse:function(dataFieldCollectionName) {
      var dataFieldCollection = document.querySelector('.dto-xml[data-field-collection="' + dataFieldCollectionName + '"]').text;
      var parsedXML = (new DOMParser).parseFromString(dataFieldCollection, "application/xml");
      var mktoPreFillFields = parsedXML.querySelector("mktoPreFillFields");
      var tagName = mktoPreFillFields.getAttribute("varName") || mktoPreFillFields.tagName;
      var c = {};
      // console.log(mktoPreFillFields.querySelectorAll("mktoPreFillFields mktoField"));
      slice(parsedXML.querySelectorAll("mktoPreFillFields mktoField")).forEach(function(mktoField,i) {
        // console.log(i + ": ", mktoField);
        c[mktoField.getAttribute("inputName")] = mktoField.textContent;
      });
      return self[tagName] = c;
    },
    slice: slice
  };
}
window.SimpleDTO = SimpleDTO;
