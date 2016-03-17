(function(root) {
	var DOMNodeCollection = function(HTMLElements) {
		this.HTMLElements = HTMLElements;
	};

	root.$l = function(arg) {
		var elArray;
		if (arg instanceof HTMLElement) {
			elArray = [arg];
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
		
	};

})(this);
