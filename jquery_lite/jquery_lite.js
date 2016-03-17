(function(root) {
	var DOMNodeCollection = function(HTMLElements) {
		this.HTMLElements = HTMLElements;
	};

	root.$l = function(arg) {
		var elArray;
		debugger
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

})(this);
