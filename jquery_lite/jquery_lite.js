(function(root) {
	var DOMNodeCollection = function(HTMLElements) {
		this.HTMLElements = HTMLElements;
	};

	root.$l = function(arg) {
		var elArray;
		if (arg instanceof HTMLElement) {
			elArray = [arg];
		}
		else if (arg instanceof Function) {

			if ( document.readyState === "complete" ) {
				arg();
			}

			else {
				var tid = setInterval( function () {
					if (document.readyState === "complete") {
						clearInterval(tid);
						arg();
					}
				}, 100);
			}
		}

		else {
			var elementList = document.querySelectorAll(arg);
			elArray = [].slice.call(elementList);
		}

		return new DOMNodeCollection(elArray);
	};

	DOMNodeCollection.prototype.html = function (innerHTML) {
		if (typeof innerHTML === "undefined") {
			return this.HTMLElements[0].innerHTML;
		} else {
			for (var i = 0; i < this.HTMLElements.length; i++) {
				this.HTMLElements[i].innerHTML = innerHTML;
			}
		}
	};

	DOMNodeCollection.prototype.empty = function () {
		for(var i = 0; i < this.HTMLElements.length; i++) {
			this.HTMLElements[i].innerHTML = "";
		}
	};

	DOMNodeCollection.prototype.append = function (arg) {
		if (arg instanceof HTMLElement) {
			this.HTMLElements.forEach( function(el) {
				el.appendChild(arg);
			});
		} else if (arg instanceof DOMNodeCollection) {
			this.HTMLElements.forEach( function(el) {
				el.appendChild(arg.HTMLElements[0]);
			});
		} else {
			this.html(this.html() + arg);
		}
	};

	DOMNodeCollection.prototype.attr = function (name, value) {
		if (typeof value === "undefined") {
			var attribute = this.HTMLElements[0].getAttribute(name);
			return attribute;
		}
		else {
			this.HTMLElements.forEach( function(el) {
				el.setAttribute(name, value);
			});
		}
	};

	DOMNodeCollection.prototype.addClass = function (string) {
		this.HTMLElements.forEach( function(el) {
			var strings = string.split(" ");
			strings.forEach( function(string) {
				el.classList.add(string);
			});
		});
	};

	DOMNodeCollection.prototype.removeClass = function (string) {
		this.HTMLElements.forEach( function(el) {
			var strings = string.split(" ");
			strings.forEach( function(string) {
				el.classList.remove(string);
			});
		});
	};

	DOMNodeCollection.prototype.children = function () {
		var childrenArr = [];

		this.HTMLElements.forEach( function(el, idx) {
			childrenArr[idx] = el.children;
		});



		return new DOMNodeCollection(childrenArr);
	};

	DOMNodeCollection.prototype.parent = function () {
		var parentArr = [];
		this.HTMLElements.forEach( function(el) {
			parentArr.push(el.parentNode);
		});

		return parentArr;
	};

	DOMNodeCollection.prototype.find = function (selector) {
		var results = this.HTMLElements[0].querySelectorAll(selector);
		return new DOMNodeCollection(results);
	};

	DOMNodeCollection.prototype.remove = function () {
		this.HTMLElements.forEach( function(el) {
			el.remove();
		});

		this.HTMLElements = [];
	};

	DOMNodeCollection.prototype.on = function (type, listener) {
		this.HTMLElements.forEach ( function (el) {
			el.addEventListener(type, listener);
		});
	};

	DOMNodeCollection.prototype.off = function (type, listener) {
		this.HTMLElements.forEach ( function (el) {
			el.removeEventListener(type, listener);
		});
	};

	$l.extend = function () {
		var arrArgs = [].slice.call(arguments);
		var obj = arrArgs[0];

		for(var i = 1; i < arrArgs.length; i++) {
			for(var prop in arrArgs[i]) {
				obj[prop] = arrArgs[i][prop];
			}
		}

		return obj;
	};

	$l.ajax = function (options) {

		var defaultSuccess = function (data) {
			console.log(data);
		};

		var defaultError = function() {
			console.log("An error occured.");
		};

		var defaults = {
			success: defaultSuccess,
			error: defaultError,
			url: document.URL,
			method: "GET",
			data: "",
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
		};

		$l.extend(defaults, options);

    var xmlhttp;
		xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function() {
			// console.log(xmlhttp.readyState);
			// debugger;
      // if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      	if(xmlhttp.status == 200){
        	defaults.success(JSON.parse(xmlhttp.responseText));
       	}
       	else {
        	defaults.error();
       	}
			// }
    };

    xmlhttp.open(defaults.method, defaults.url, true);
    xmlhttp.send();

	};

})(this);
