# Extend
## Thin OO and functional extensions to JavaScript

```
Author:   Sebastien Pierre <sebastien@ffctn.com>
Revision: 2015-02-16
Creation: 2007-11-12
```

Extend implements a flexible class-based OOP layer on top of the JavaScript
prototype object model.

Extend allows you to write nice and clean classes in JavaScript, features
introspection and class meta-information, is mature and
[fully-tested](http://www.ivy.fr/js/extend/test.html).

The problem
===========

JavaScript being a prototype-based object language, it does not offer (in
standard) a ''class-based'' OOP layer. This can become a problem when you're
writing medium to large system, where prototypes start to be cumbersome to
manage.

The famous JavaScript [Prototype library](http://www.prototypejs.com)
provides a very basic way to create classes, but does not provide any
inheritance between classes.  Extensions such as [ExtendClass][2] and
[ExtendClassFurther][3] tried to add sub-classing, but fail to have a
flexible and reliable `super`-equivalent, which makes advanced JavaScript
application development difficult.

Moreover, neither of these extensions allow meta-information specification
to classes (such as class name, methods, parent class, etc), while this
information is very useful for debugging and introspection.

Additionally, common cases such as handing an object method to a callback
that may alter the 'this' is not supported ([jQuery](http://www.jquery.com)
callback do that).

Introducing Extend
==================

Extend is a simplified, cleaner version of the Extend 1.X library, with
the same design goals:

- Traditional class-based OOP layer for JavaScript
- Notion of class attributes (shared), methods and class methods (operations)
- Introspection API to list attributes, methods, operations
- Makes the difference between what is inherited and what is not inherited
- Easy wrapping of object methods to be safely given as callbacks

To start using 'Extend', simply add the following line to your HTML head
section:

>   <script type="text/javascript" src="http://www.ivy.fr/extend/extend.js"></script>

Once you've included the script, you can create classed by using the
'extend.Class' function:

>   var A = extend.Class({
>     name:"A",
>     methods:{
>       helloWorld:function(){
>         return "Hello, World !";
>       }
>     }
>   });
>   alert(new A().helloWorld());

The 'extend.Class' takes the following parameters, given in a dictionary:

- 'name' (*required*): a string representing the class name. In case you want
  the class name to reflect a package hierarchy (like 'ui.widget.InputField'),
  you can use dots to join module names and class name.

- 'parent': the parent class (if any) of this class.

- 'initialize': the constructor function for this class.

- 'properties': a dictionary mapping instance declaring attributes
  (properties) (and their optional default values).

- 'methods': a dictionary mapping method names to functions implementing the
   methods, where the 'this' will refer to the current instance.

- 'shared': a dictionary mapping class attributes names to values. Class
  attributes default values are inherited by sub-classes, and can be accessed
  directly (like 'A.foo' if 'foo' is a class attribute of 'A')

- 'operations': a dictionary mapping class methods (operation) names to
   functions. The 'this' in these functions will refer to the class object, as
   returned by 'extend.Class'.

Within methods, 'this' will (obviously) point to the current instance. If you
want to access the method 'foo' defined in class 'A', when you are in class
'B' subclass of 'A', you can do:

>   this.getSuper(A).foo()

or use the faster option:

>   this.A_foo()


Extend API
==========

Extend offers a set of methods that are available to Extend classes and
instances. These methods range from simple
introspection (what is the class of an object, what is this class name, is
this an object an instance of this class, etc) to more complex things
(safely wrapping a method for callback, listing inherited methods, etc).

Extend API
----------

'extend.Class({...})'::
   Declares and returns a new class according to the class description
   given as argument. This description was explained in the previous
   section.

'extend.getClass(name:String)'::
   Returns the class with the given absolute name, if any.

'extend.getClasses()'::
   Returns a dictionary that maps _declared class names_ to actual class
   instances. Extend acts like a global namespace where non-anonymous
   declared classes are registered.

'extend.getChildrenOf(aClass)'::
   Returns a dictionary that maps _declared class names_ to actual class
   instances of classes that inherit from the given class ('aClass'). This
   excludes the given class from the result.

'extend.getMethodOf(instance:Object, methodName:String):Function'::

'extend.getClassOf(instance:Object):Class'::

'extend.invoke(target:Object, f:Function, args:Array<Any>?, extra:Map<String,Any>?):Any'::

Object/Instance API
-------------------

The _object API_ defines the methods which are available to instances
(objects) which were created (instantiated) from a class defined using Extend.

'<Instance>.isClass():Boolean'::
  Tells if the given object is class or not. This returns 'false'

'<Instance>.getClass():extend.Class'::
  Returns the class object associated with this instance. You can use the
  class object to access class operations, class attributes, etc.

'<Instance>.getMethod(name:String):Function'::
  In JavaScript, if you give a method as a callback by simply doing
  'object.method', then you may have problems when the caller changes the
  'this' argument of the method. Using 'getMethod' will ensure that the this
  is preserved. It's actually an equivalent of doing
  'this.getClass().bindMethod(this, name)', except that successive calls to
  'getMethod(...)' will always return the same function object, while
  'bindMethod' will create a new function each time (useful to know when
  you're using jQuery 'bind'/'unbind' functions).

'<Instance>.getCallback(name:String):Function'::
  The 'getCallback' method is similar to 'getMethod', except that it will
  add an extra argument which is the 'this' used when invoking the method.
  Libraries such as [jQuery](<http://www.jquery.com>) change the 'this' of
  callbacks given to events such as 'click' or 'focus' to the DOM node that
  received the event rather than the instance to which  the method is bound.
  Using 'getMethod' insulates you from this change, but you also lose the
  reference to the DOM node that received the event (the event target). When
  using 'getCallback', you'll have the target as an additional argument.

'<Instance>.getSuper(c:Class):Object'::
  Returns a proxy that will use the current object as state, but where every
  operation defined in the proxy will use the implementation defined in the
  given class.

'<Instance>.isInstance(c:Class):Boolean'::
  Returns 'true' if this instance is an instance of the given class, which
  must be either the class of this instance, or an ancestor of this instance
  class.

Class API
---------

The _class API_ defines the methods which are available for class objects
resulting from the use of the Extend API.

  '<Class>.isClass():Boolean'::
  Tells if the given object is class or not. This returns 'true'

'<Class>.getName():String'::
  Returns the class name, as given when creating the class.

'<Class>.getParent():extend.Class'::
  Returns the parent class for this class, or 'undefined'.

'<Class>.hasInstance(o:Object):Boolean'::
  Tells if the given object is an instance of this class. This also includes
  the parent classes.

'<Class>.isSubclassOf(c:Class):Boolean'::
  Tells if this class is a subclass of the given class. This also takes into
  account the  parent classes.

'<Class>.listMethods(own:Boolean=True, inherited:Boolean=True):Array<Function>'::
  Returns a dictionary that maps methods names to unbound methods, including
  by default the 'own' methods and the 'inherited' methods. Settings these
  two parameters to either 'true' or 'false' will allow to return the
  desired subset.

'<Class>.listOperations(own:Boolean=True, inherited:Boolean=True):Array<Function>'::
  Same as 'listMethods', but with class operations.

'<Class>.listShared(own:Boolean=True, inherited:Boolean=True):Array<Function>'::
  Same as 'listMethods', but with class attributes (''shared'').

'<Class>.listProperties(own:Boolean=True, inherited:Boolean=True):Array<Function>'::
  Same as 'listMethods', but with instance attributes (''properties'').

'<Class>.getOperation(name:String):Function'::
  Returns the class operation with the given name wrapped so that the 'this'
  will be preserved even if you use 'operation.apply(other_object,
  arguments)' (pretty much like 'bindMethod').

'<Class>.bindMethod(o:Object, name:String)'::
  Returns the method named 'name' when it is bound to the given object. This
  method can be safely given as a callback, even if the 'this' is
  changed in a 'method.apply(other_object, arguments)'.
  |
  However, it is good to note that 'bindMethod' creates a new function
  object each time you invoke it. So when you're using it with function such
  as jQuery 'bind'/'unbind' you'll have to make sure to keep a reference to
  your function.

'<Class>.proxyWithState(o:Object)'::
  Returns an object that will have the same operations and attributes
  defined in this class, but will use the given object as _state_ (as
  'this' or 'self'). Doing 'o.getClass().getParent().proxyWithState(o)' is
  the equivalent of creating a 'super' keyword where you can invoke methods
  from the parent.


Functional API
--------------

'extend.car(list:Iterable)'::

'extend.cdr(list:Iterable)'::

'extend.cons(list:Iterable)'::

'extend.map(list:Iterable)'::

'extend.filter(list:Iterable)'::

'extend.foldl(list:Iterable)'::

'extend.reduce(list:Iterable)'::

'extend.merge(a:Iterable, b:Iterable):Iterable'::


Collections API
---------------

'extend.find(list:Iterable,value:Any):Int'::

'extend.keys(list:Iterable)'::

'extend.values(list:Iterable)'::

'extend.range(start:Number, end:Number, step:Number?):Array<Number>'::

'extend.iterate(collection:(List|Object|Any), callback:Function, step:Number?):Array<Number>'::

'extend.slice(collection:(List|Object|Any), start:Number, end:Number?):Array<Any>'::

'extend.access(collection:(List|Object|Any), index:Number):Any'::

'extend.copy(list:Iterable)'::

'extend.find(list:Iterable, value:Any)'::

'extend.findLike(list:Iterable, predicate:Function)'::

'extend.first(list:Iterable, prerable)'::

'extend.values(list:Iterable)'::

'extend.range(start:Number, end:Number, step:Number?):Array<Number>'::

'extend.iterate(collection:(List|Object|Any), callback:Function, step:Number?):Array<Number>'::

'extend.slice(collection:(List|Object|Any), start:Number, end:Number?):Array<Any>'::

'extend.access(collection:(List|Object|Any), index:Number):Any'::

'extend.copy(list:Iterable)'::

'extend.find(list:Iterable, value:Any)'::

'extend.findLike(list:Iterable, predicate:Function)'::

'extend.first(list:Iterable, predicate:Function)'::

'extend.isIn(value:Any, collection:(List|Object|Any)):Boolean'::

'extend.len(value:Any):edicate:Function)'::

'extend.isIn(value:Any, collection:(List|Object|Any)):Boolean'::

'extend.len(value:Any):Number'::

Type introspection API
----------------------

'extend.type(value:Any):String'::

'extend.isDefined(value:Any):Boolean'::

'extend.isList(value:Any):Boolean'::

'extend.isNumber(value:Any):Boolean'::

'extend.isString(value:Any):Boolean'::

'extend.isMap(value:Any):Boolean'::

'extend.isFunction(value:Any):Boolean'::

'extend.isObject(value:Any):Boolean'::

'extend.isInstance(value:Any):Boolean'::

'extend.getType(value:Any):String'::
     returns the type of the given value, as a String.

Assestions and logging
----------------------

'extend.assert(expr:Boolean, message:String)'::

'extend.fail(message:String)'::

'extend.print(message:String...)::

'extend.error(message:String...)::

'extend.debug(message:String...)::


Examples
========

Step 1: Create a new class

>   var Shape = extend.Class(
>     name:"Shape",
>     initialize:function(){
>       this.points = [];
>     }
>     methods:{
>       addPoint:function(p){
>         this.points.push(p);
>       }
>       getPoints:function(){
>         return this.points;
>       }
>     }
>   });

Step 2: Create an instance of your class, and do stuff

>   my_shape = new Shape();
>   my_shape.addPoint([0,0]);
>   my_shape.addPoint([1,0]);
>   console.log(my_shape.getPoints().toSource());

Step 3: Create a subclass

>   var Rectangle = extend.Class(
>     name:"Rectangle",
>     parent:Shape,
>     initialize:function(){
>       this.points = [];
>     }
>     methods:{
>       addPoint:function(p){
>         this.points.push(p);
>       }
>       getPoints:function(){
>         return this.points;
>       }
>     }
>   });

Using callbacks with jQuery

>   var MyWidget = extend.Class({
>     name:"MyWidget",
>     methods:{
>       onClick:function(target){
>         $(target).css({background:yello});
>       }
>   })
>   
>   var w = new MyWidget()
>   $("#my-widget").click( w.getCallback("onClick") )

# --
 
 [0]: JavaScript Gotchas, Sebastien Pierre, June 2007
      [tech note](http://www.ivy.fr/notes/javascript-gotchas.html)

 [1]: Object-Oriented Programmming in JavaScript, Mike Moss, January 2006
      [article](http://mckoss.com/jscript/object.htm)

 [2]: Prototype-based Programming Wikipedia Article,
      [wikipedia](http://en.wikipedia.org/wiki/Prototype-based_programming)

 [3]: Java Reflection API
      [tutorial](http://java.sun.com/docs/books/tutorial/reflect/index.html)

 [4]: Extend Class, Prototype library extension to add subclassing
      [wiki page](http://wiki.script.aculo.us/scriptaculous/show/ExtendClass)

 [5]: Extend Class Further, adding Ruby-like OO features to Prototype
      [wiki page](http://wiki.script.aculo.us/scriptaculous/show/ExtendClassFurther)

# EOF vim: syn=kiwi ts=2 sw=2 et
