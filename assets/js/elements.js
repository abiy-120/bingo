class Element {
    constructor() {
        this.createdElements = [];
        this.methosMap = {
            id: '#',
            class: '.',
            tag: ''
        }
    }

    setIds(len, plus, startingLetter) {
		var IdsArray = [];
		for (let i = 0; i < len; i++) {
			var Id = startingLetter + (i + plus);
			IdsArray.push(Id);
		}
		return IdsArray;
	}

    create(getReferenceMethod, referenceElements, insertMethods, elementTypes, n, elementsId=[], elementsClasses=[], innerHtmls=[], otherAttributes=null) {
        for(let i=0; i<n.length; i++) {
            var getMethod;
            if (getReferenceMethod.length == 0) {
                getMethod = "id";
            } else {
                getMethod = getReferenceMethod[i];
            }
            const referenceElement = $(`${this.methosMap[getMethod]}${referenceElements[i]}`);
            for (let j = 0; j < n[i]; j++) {
                const element = $(`<${elementTypes[i]}></${elementTypes[i]}>`);
                if (!elementsId.length == 0) {
                    element.attr("id", elementsId[i][j]);
                }
                if (!elementsClasses.length == 0) {
                    if (elementsClasses[i].length == 1) {
                        element.addClass(elementsClasses[i][0]);
                    } else {
                        element.addClass(elementsClasses[i][j]);
                    }
                }
                if (!innerHtmls[i] == []) {
                    element.html(innerHtmls[i][j]);
                }
                if (otherAttributes !== null) {
                    if(otherAttributes[i] !== undefined) {
                        element.attr(otherAttributes[i][j]);
                    }
                }
                if (insertMethods.length == 0) {
                    referenceElement.append(element);
                } else {
                    if (insertMethods[i] == 'append') {
                        referenceElement.append(element);            
                    } else if (insertMethods[i] == 'prepend') {
                        referenceElement.prepend(element);            
                    } else if (insertMethods[i] == 'insertBefore') {
                        $(element).insertBefore(referenceElement);
                    } else if (insertMethods[i] == 'insertAfter') {
                        $(element).insertAfter(referenceElement);            
                    } else if (insertMethods[i] == 'replaceWith') {
                        $(referenceElement).replaceWith(element);            
                    }
                }
                this.createdElements.push(element);
            }
        } 
    }

    remove(getReferenceMethod, referenceElement) {
        const element = $(`${this.methosMap[getReferenceMethod]}${referenceElement}`);
        element.remove();
    }

    empty(getReferenceMethod, referenceElement) {
        const element = $(`${this.methosMap[getReferenceMethod]}${referenceElement}`);
        element.empty();
    }

    clear() {
        if(!this.createdElements.length == 0) {
            for(i=0; i<this.createdElements.length; i++) {
                this.createdElements[i].remove();
            }    
        }
    }
}
