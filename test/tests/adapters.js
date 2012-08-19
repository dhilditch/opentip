// Generated by CoffeeScript 1.3.3
var $, adapters;

$ = ender;

adapters = ["native", "ender"];

describe("Generic adapter", function() {
  var adapterName, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = adapters.length; _i < _len; _i++) {
    adapterName = adapters[_i];
    _results.push(describe("" + adapterName + " adapter", function() {
      var adapter;
      it("should add itself to Opentip.adapters." + adapterName, function() {
        return expect(Opentip.adapters[adapterName]).to.be.ok();
      });
      adapter = Opentip.adapters[adapterName];
      describe("domReady()", function() {
        return it("should call the callback", function(done) {
          return adapter.domReady(done);
        });
      });
      describe("clone()", function() {
        return it("should create a shallow copy", function() {
          var obj, obj2;
          obj = {
            a: 1,
            b: 2,
            c: {
              d: 3
            }
          };
          obj2 = adapter.clone(obj);
          expect(obj).to.not.equal(obj2);
          expect(obj).to.eql(obj2);
          obj2.a = 10;
          expect(obj).to.not.eql(obj2);
          expect(obj.a).to.equal(1);
          obj2.c.d = 30;
          return expect(obj.c.d).to.equal(30);
        });
      });
      describe("extend()", function() {
        return it("should copy all attributes from sources to target", function() {
          var source1, source2, target;
          target = {
            a: 1,
            b: 2,
            c: 3
          };
          source1 = {
            a: 10,
            b: 20
          };
          source2 = {
            a: 100
          };
          adapter.extend(target, source1, source2);
          return expect(target).to.eql({
            a: 100,
            b: 20,
            c: 3
          });
        });
      });
      return describe("DOM", function() {
        describe("tagName()", function() {
          return it("should return the tagName of passed element", function() {
            var element;
            element = document.createElement("div");
            return expect(adapter.tagName(element)).to.equal("DIV");
          });
        });
        describe("unwrap()", function() {
          return it("should properly return the unwrapped element", function() {
            var element, unwrapped, unwrapped2, wrapped;
            element = document.createElement("div");
            wrapped = adapter.wrap(element);
            unwrapped = adapter.unwrap(element);
            unwrapped2 = adapter.unwrap(wrapped);
            return expect((element === unwrapped && unwrapped === unwrapped2)).to.be.ok();
          });
        });
        describe("attr()", function() {
          it("should return the attribute of passed element", function() {
            var element;
            element = document.createElement("a");
            element.setAttribute("class", "test-class");
            element.setAttribute("href", "http://link");
            expect(adapter.attr(element, "class")).to.equal("test-class");
            return expect(adapter.attr(adapter.wrap(element), "href")).to.equal("http://link");
          });
          return it("should set the attribute of passed element", function() {
            var element;
            element = document.createElement("a");
            adapter.attr(element, "class", "test-class");
            adapter.attr(adapter.wrap(element), "href", "http://link");
            expect(adapter.attr(element, "class")).to.equal("test-class");
            return expect(adapter.attr(element, "href")).to.equal("http://link");
          });
        });
        describe("addClass()", function() {
          return it("should properly add the class", function() {
            var element, val;
            element = document.createElement("div");
            adapter.addClass(element, "test");
            adapter.addClass(adapter.wrap(element), "test2");
            return expect((function() {
              var _j, _len1, _ref, _results1;
              _ref = element.classList;
              _results1 = [];
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                val = _ref[_j];
                _results1.push(val);
              }
              return _results1;
            })()).to.eql(["test", "test2"]);
          });
        });
        describe("removeClass()", function() {
          return it("should properly add the class", function() {
            var element, val;
            element = document.createElement("div");
            adapter.addClass(element, "test");
            adapter.addClass(adapter.wrap(element), "test2");
            adapter.removeClass(element, "test2");
            expect((function() {
              var _j, _len1, _ref, _results1;
              _ref = element.classList;
              _results1 = [];
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                val = _ref[_j];
                _results1.push(val);
              }
              return _results1;
            })()).to.eql(["test"]);
            adapter.removeClass(element, "test");
            return expect((function() {
              var _j, _len1, _ref, _results1;
              _ref = element.classList;
              _results1 = [];
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                val = _ref[_j];
                _results1.push(val);
              }
              return _results1;
            })()).to.eql([]);
          });
        });
        describe("css()", function() {
          return it("should properly set the style", function() {
            var element;
            element = document.createElement("div");
            adapter.css(element, {
              color: "red"
            });
            adapter.css(adapter.wrap(element), {
              background: "green"
            });
            expect(element.style.color).to.be("red");
            return expect(element.style.background).to.be("green");
          });
        });
        describe("dimensions()", function() {
          return it("should return an object with the correct dimensions", function() {
            var dim, dim2, element;
            element = $("<div style=\"display:block; position: absolute; width: 100px; height: 200px;\"></div>").get(0);
            $("body").append(element);
            dim = adapter.dimensions(element);
            dim2 = adapter.dimensions(adapter.wrap(element));
            expect(dim).to.eql(dim2);
            expect(dim).to.eql({
              width: 100,
              height: 200
            });
            return $(element).remove();
          });
        });
        describe("find()", function() {
          it("should properly retrieve child elements", function() {
            var a, b, element;
            element = $("<div><span id=\"a-span\" class=\"a\"></span><div id=\"b-span\" class=\"b\"></div></div>").get(0);
            a = adapter.unwrap(adapter.find(element, ".a"));
            b = adapter.unwrap(adapter.find(adapter.wrap(element), ".b"));
            expect(a.id).to.equal("a-span");
            return expect(b.id).to.equal("b-span");
          });
          return it("should return null if no element", function() {
            var a, element;
            element = $("<div></div>").get(0);
            a = adapter.unwrap(adapter.find(element, ".a"));
            return expect(a).to.be(null);
          });
        });
        describe("findAll()", function() {
          it("should properly retrieve child elements", function() {
            var a, b, element;
            element = $("<div><span id=\"a-span\" class=\"a\"></span><span id=\"b-span\" class=\"b\"></span></div>").get(0);
            a = adapter.findAll(element, "span");
            b = adapter.findAll(adapter.wrap(element), "span");
            expect(a.length).to.equal(2);
            return expect(b.length).to.equal(2);
          });
          return it("should return empty array if no element", function() {
            var a, b, element;
            element = $("<div></div>").get(0);
            a = adapter.findAll(element, "span");
            b = adapter.findAll(adapter.wrap(element), "span");
            expect(a.length).to.be(0);
            return expect(b.length).to.be(0);
          });
        });
        describe("update()", function() {
          it("should escape html if wanted", function() {
            var element;
            element = document.createElement("div");
            adapter.update(element, "abc <div>test</div>", true);
            expect(element.firstChild.textContent).to.be("abc <div>test</div>");
            element = document.createElement("div");
            adapter.update(adapter.wrap(element), "abc <div>test2</div>", true);
            return expect(element.firstChild.textContent).to.be("abc <div>test2</div>");
          });
          it("should not escape html if wanted", function() {
            var element;
            element = document.createElement("div");
            adapter.update(element, "abc<div>test</div>", false);
            expect(element.childNodes.length).to.be(2);
            expect(element.firstChild.textContent).to.be("abc");
            expect(element.childNodes[1].textContent).to.be("test");
            element = document.createElement("div");
            adapter.update(adapter.wrap(element), "abc<div>test</div>", false);
            return expect(element.childNodes.length).to.be(2);
          });
          it("should delete previous content in plain text", function() {
            var element;
            element = document.createElement("div");
            adapter.update(element, "abc", true);
            adapter.update(element, "abc", true);
            expect(element.innerHTML).to.be("abc");
            adapter.update(adapter.wrap(element), "abc", true);
            return expect(element.innerHTML).to.be("abc");
          });
          return it("should delete previous content in HTML", function() {
            var element;
            element = document.createElement("div");
            adapter.update(element, "abc", false);
            adapter.update(element, "abc", false);
            expect(element.innerHTML).to.be("abc");
            adapter.update(adapter.wrap(element), "abc", false);
            return expect(element.innerHTML).to.be("abc");
          });
        });
        describe("append()", function() {
          return it("should properly append child to element", function() {
            var child, element;
            element = document.createElement("div");
            child = document.createElement("span");
            adapter.append(element, child);
            expect(element.innerHTML).to.eql("<span></span>");
            element = document.createElement("div");
            child = document.createElement("span");
            adapter.append(adapter.wrap(element), adapter.wrap(child));
            return expect(element.innerHTML).to.eql("<span></span>");
          });
        });
        describe("observe()", function() {
          it("should attach an event listener", function(done) {
            var element;
            element = document.createElement("a");
            adapter.observe(element, "click", function() {
              return done();
            });
            return element.click();
          });
          return it("should attach an event listener to wrapped", function(done) {
            var element;
            element = document.createElement("a");
            adapter.observe(adapter.wrap(element), "click", function() {
              return done();
            });
            return element.click();
          });
        });
        return describe("stopObserving()", function() {
          it("should remove event listener", function() {
            var element, listener;
            element = document.createElement("a");
            listener = sinon.stub();
            adapter.observe(element, "click", listener);
            element.click();
            element.click();
            expect(listener.callCount).to.equal(2);
            adapter.stopObserving(element, "click", listener);
            element.click();
            return expect(listener.callCount).to.equal(2);
          });
          return it("should remove event listener from wrapped", function() {
            var element, listener;
            element = document.createElement("a");
            listener = sinon.stub();
            adapter.observe(element, "click", listener);
            element.click();
            element.click();
            expect(listener.callCount).to.equal(2);
            adapter.stopObserving(adapter.wrap(element), "click", listener);
            element.click();
            return expect(listener.callCount).to.equal(2);
          });
        });
      });
    }));
  }
  return _results;
});
