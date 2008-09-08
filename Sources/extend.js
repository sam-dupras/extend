// 8< ---[extend.js]---
// This module implements a complete OOP layer for JavaScript that makes it
// easy to develop highly structured JavaScript applications.
// 
// Classes are created using extend by giving a dictionary that contains the
// following keys:
// 
// - 'name', an optional name for this class
// - 'parent', with a reference to a parent class (created with Extend)
// - 'initialize', with a function to be used as a constructor
// - 'properties', with a dictionary of instance attributes
// - 'methods', with a dictionary of instance methods
// - 'shared', with a dictionary of class attributes
// - 'operations', with a dictionary of class operations
// 
// Extend 2.0 is a rewritten, simplified version of the Extend 1 library. It is
// not compatible with the previous versions, but the API will be stable from
// this release.
// 
// You can get more information at the Extend [project
// page](http://www.ivy.fr/js/extend).

var extend={}
var __this__=extend
extend._VERSION_='2.1.4';
extend.Registry={}
extend.Counters={'Instances':0}
extend.PrintCallback=undefined
extend.Class=	function(declaration){
		// Classes are created using extend by giving a dictionary that contains the
		// following keys:
		// 
		// - 'name', an optional name for this class
		// - 'parent', with a reference to a parent class (created with Extend)
		// - 'initialize', with a function to be used as a constructor
		// - 'properties', with a dictionary of instance attributes
		// - 'methods', with a dictionary of instance methods
		// - 'shared', with a dictionary of class attributes
		// - 'operations', with a dictionary of class operations
		// 
		// Invoking the 'Class' function will return you a _Class Object_ that
		// implements the following API:
		// 
		// - 'isClass()' returns *true*( (because this is an object, not a class)
		// - 'getName()' returns the class name, as a string
		// - 'getParent()' returns a reference to the parent class
		// - 'getOperation(n)' returns the operation with the given name
		// - 'hasInstance(o)' tells if the given object is an instance of this class
		// - 'isSubclassOf(c)' tells if the given class is a subclass of this class
		// - 'listMethods()' returns a dictionary of *methods* available for this class
		// - 'listOperations()' returns a dictionary of *operations* (class methods)
		// - 'listShared()' returns a dictionary of *class attributes*
		// - 'listProperties()' returns a dictionary of *instance attributes*
		// - 'bindMethod(o,n)' binds the method with the given name to the given object
		// - 'proxyWithState(o)' returns a *proxy* that will use the given object as if
		// it was an instance of this class (useful for implementing 'super')
		// 
		// When you instanciate your class, objects will have the following methods
		// available:
		// 
		// - 'isClass()' returns *true*( (because this is an object, not a class)
		// - 'getClass()' returns the class of this instance
		// - 'getMethod(n)' returns the bound method which name is 'n'
		// - 'getCallback(n)' the equivalent of 'getMethod', but will give the 'this' as
		// additional last arguments (useful when you the invoker changes the 'this',
		// which happens in event handlers)
		// - 'isInstance(c)' tells if this object is an instance of the given class
		// 
		// Using the 'Class' function is very easy (in *Sugar*):
		// 
		// >   var MyClass = Extend Class {
		// >      name:"MyClass"
		// >      initialize:{
		// >         self message = "Hello, world !"
		// >      }
		// >      methods:{
		// >        helloWorld:{print (message)}
		// >      }
		// >   }
		// 
		// instanciating the class is very easy too
		// 
		// >   var my_instance = new MyClass()
		var __this__=extend;
		var full_name=declaration.name;
		var class_object=function(){
			if ( (! ((arguments.length == 1) && (arguments[0] == '__Extend_SubClass__'))) )
			{
				 var properties = class_object.listProperties()
				 for ( var prop in properties ) {
				   this[prop] = properties[prop];
				 }
				 this._callbacks  = {}
				
				if ( this.initialize )
				{
					return this.initialize.apply(this, arguments)
				}
			}
		};
		class_object.isClass = function(){
			return true
		};
		class_object._parent = declaration.parent;
		class_object._name = declaration.name;
		class_object._properties = {'all':{}, 'inherited':{}, 'own':{}};
		class_object._shared = {'all':{}, 'inherited':{}, 'own':{}};
		class_object._operations = {'all':{}, 'inherited':{}, 'own':{}, 'fullname':{}};
		class_object._methods = {'all':{}, 'inherited':{}, 'own':{}, 'fullname':{}};
		class_object.getName = function(){
			return class_object._name
		};
		class_object.getParent = function(){
			return class_object._parent
		};
		class_object.isSubclassOf = function(c){
			var parent=this;
			while (parent)
			{
				if ( (parent == c) )
				{
					return true
				}
				parent = parent.getParent();
			}
			return false
		};
		class_object.hasInstance = function(o){
			return o.getClass().isSubclassOf(class_object)
		};
		class_object.bindMethod = function(obj, methodName){
			var this_method=obj[methodName];
			return function(){
				var a=arguments;
				if ( (a.length == 0) )
				{
					return this_method.call(obj)
				}
				else if ( (a.length == 1) )
				{
					return this_method.call(obj, a[0])
				}
				else if ( (a.length == 2) )
				{
					return this_method.call(obj, a[0], a[1])
				}
				else if ( (a.length == 3) )
				{
					return this_method.call(obj, a[0], a[1], a[2])
				}
				else if ( (a.length == 4) )
				{
					return this_method.call(obj, a[0], a[1], a[2], a[3])
				}
				else if ( (a.length == 5) )
				{
					return this_method.call(obj, a[0], a[1], a[2], a[3], a[4])
				}
				else if ( true )
				{
					var args=[];
					args.concat(arguments)
					return this_method.apply(obj, args)
				}
			}
		};
		class_object.bindCallback = function(obj, methodName){
			var this_method=obj[methodName];
			return function(){
				var a=arguments;
				if ( (a.length == 0) )
				{
					return this_method.call(obj, this)
				}
				else if ( (a.length == 1) )
				{
					return this_method.call(obj, a[0], this)
				}
				else if ( (a.length == 2) )
				{
					return this_method.call(obj, a[0], a[1], this)
				}
				else if ( (a.length == 3) )
				{
					return this_method.call(obj, a[0], a[1], a[2], this)
				}
				else if ( (a.length == 4) )
				{
					return this_method.call(obj, a[0], a[1], a[2], a[3], this)
				}
				else if ( (a.length == 5) )
				{
					return this_method.call(obj, a[0], a[1], a[2], a[3], a[4], this)
				}
				else if ( true )
				{
					var args=[];
					args.concat(arguments)
					args.push(this)
					return this_method.apply(obj, args)
				}
			}
		};
		class_object.getOperation = function(name){
			var this_operation=class_object[name];
			return function(){
				return this_operation.apply(class_object, arguments)
			}
		};
		class_object.listMethods = function(o, i){
			if ( (o === undefined) )
			{
				o = true;
			}
			if ( (i === undefined) )
			{
				i = true;
			}
			if ( (o && i) )
			{
				return class_object._methods.all
			}
			else if ( ((! o) && i) )
			{
				return class_object._methods.inherited
			}
			else if ( (o && (! i)) )
			{
				return class_object._methods.own
			}
			else if ( true )
			{
				return {}
			}
		};
		class_object.listOperations = function(o, i){
			if ( (o === undefined) )
			{
				o = true;
			}
			if ( (i === undefined) )
			{
				i = true;
			}
			if ( (o && i) )
			{
				return class_object._operations.all
			}
			else if ( ((! o) && i) )
			{
				return class_object._operations.inherited
			}
			else if ( (o && (! i)) )
			{
				return class_object._operations.own
			}
			else if ( true )
			{
				return {}
			}
		};
		class_object.listShared = function(o, i){
			if ( (o === undefined) )
			{
				o = true;
			}
			if ( (i === undefined) )
			{
				i = true;
			}
			if ( (o && i) )
			{
				return class_object._shared.all
			}
			else if ( ((! o) && i) )
			{
				return class_object._shared.inherited
			}
			else if ( (o && (! i)) )
			{
				return class_object._shared.own
			}
			else if ( true )
			{
				return {}
			}
		};
		class_object.listProperties = function(o, i){
			if ( (o === undefined) )
			{
				o = true;
			}
			if ( (i === undefined) )
			{
				i = true;
			}
			if ( (o && i) )
			{
				return class_object._properties.all
			}
			else if ( ((! o) && i) )
			{
				return class_object._properties.inherited
			}
			else if ( (o && (! i)) )
			{
				return class_object._properties.own
			}
			else if ( true )
			{
				return {}
			}
		};
		class_object.proxyWithState = function(o){
			var proxy={};
			var constr=undefined;
			var wrapper=function(f){
				return function(){
					return f.apply(o, arguments)
				}
			};
			var proxy_object=function(){
				return class_object.prototype.initialize.apply(o, arguments)
			};
			proxy_object.prototype = proxy;
			 for (var key in class_object.prototype) {
			  var w = wrapper(class_object.prototype[key])
			  if (key == "initialize") { constr=w }
			  proxy[key] = w
			  // This should not be necessary
			  proxy_object[key] = w
			 }
			
			proxy_object.getSuper = function(){
				return class_object.getParent().proxyWithState(o)
			};
			return proxy_object
		};
		if ( declaration.parent != undefined ) {
			// We proxy parent operations
			for ( var name in declaration.parent._operations.fullname ) {
				var operation = declaration.parent._operations.fullname[name]
				class_object._operations.fullname[name] = operation
				class_object[name] = operation
			}
			for ( var name in declaration.parent._operations.all ) {
				var operation = declaration.parent[name]
				class_object[name] = operation
				class_object._operations.all[name] = operation
				class_object._operations.inherited[name] = operation
			}
			for ( var name in declaration.parent._methods.all ) {
				var method = declaration.parent._methods.all[name]
				class_object._methods.all[name] = method
				class_object._methods.inherited[name] = method
			}
			// We copy parent class attributes default values
			for ( var name in declaration.parent._shared.all ) {
				var attribute = declaration.parent._shared.all[name]
				class_object[name] = attribute
				class_object._shared.all[name] = attribute
				class_object._shared.inherited[name] = attribute
			}
			// We copy parent instance attributes default values
			for ( var name in declaration.parent._properties.all ) {
				var prop = declaration.parent._properties.all[name]
				class_object._properties.all[name] = prop
				class_object._properties.inherited[name] = prop
			}
		}
		if ( declaration.operations != undefined ) {
			for ( var name in declaration.operations ) {
				var operation = declaration.operations[name]
				class_object[name] = operation
				class_object[full_name + "_" + name] = operation
				class_object._operations.all[name] = operation
				class_object._operations.all[name] = operation
				class_object._operations.own[name] = operation
				class_object._operations.fullname[full_name + "_" + name] = operation
			}
		}
		if ( declaration.methods != undefined ) {
			for ( var name in declaration.methods ) {
				var method = declaration.methods[name]
				class_object._methods.all[name] = method
				class_object._methods.own[name] = method
			}
		}
		if ( declaration.shared != undefined ) {
			for ( var name in declaration.shared ) {
				var attribute = declaration.shared[name]
				class_object[name] = attribute
				class_object._shared.all[name] = attribute
				class_object._shared.own[name] = attribute
			}
		}
		if ( declaration.properties != undefined ) {
			for ( var name in declaration.properties ) {
				var attribute = declaration.properties[name]
				class_object._properties.all[name] = attribute
				class_object._properties.own[name] = attribute
			}
		}
		
		var instance_proto={};
		if ( declaration.parent )
		{
			instance_proto = new declaration.parent('__Extend_SubClass__');
			instance_proto.constructor = class_object;
		}
		instance_proto.isInstance = undefined;
		instance_proto.getClass = function(){
			return class_object
		};
		instance_proto.isClass = function(){
			return false
		};
		instance_proto.getMethod = function(methodName){
			var this_object=this;
			var callback=this._callbacks[('M:' + methodName)];
			if ( (callback === undefined) )
			{
				callback = class_object.bindCallback(this_object, methodName);
				this._callbacks[('M:' + methodName)] = callback;
			}
			return callback
		};
		instance_proto.getCallback = function(methodName){
			var this_object=this;
			var callback=this._callbacks[('C:' + methodName)];
			if ( (callback === undefined) )
			{
				callback = class_object.bindCallback(this_object, methodName);
				this._callbacks[('C:' + methodName)] = callback;
			}
			return callback
		};
		instance_proto.isInstance = function(c){
			return c.hasInstance(this)
		};
		if ( declaration.initialize )
		{
			instance_proto.initialize = declaration.initialize;
		}
		else if ( true )
		{
			instance_proto.instance_proto = {};
		}
		instance_proto.getSuper = function(c){
			return c.proxyWithState(this)
		};
		if ( declaration.operations != undefined ) {
			for ( var name in declaration.operations ) {
				instance_proto[name] = instance_proto[full_name + "_" + name] = class_object.getOperation(name)
		}}
		if ( declaration.methods != undefined ) {
			for ( var name in declaration.methods ) {
				instance_proto[name] = instance_proto[full_name + "_" + name] = declaration.methods[name]
		}}
		if ( declaration.initialize != undefined ) {
			instance_proto.initialize = instance_proto[full_name + "_initialize"] = declaration.initialize
		}
		
		class_object.prototype = instance_proto;
		if ( declaration.name )
		{
			extend.Registry[declaration.name] = class_object;
		}
		return class_object
	}
extend.Protocol=	function(pdata){
		var __this__=extend;
	}
extend.Singleton=	function(sdata){
		var __this__=extend;
	}
extend.getClass=	function(name){
		var __this__=extend;
		return extend.Registry[name]
	}
extend.getClasses=	function(){
		var __this__=extend;
		return extend.Registry
	}
extend.invoke=	function(t, f, args, extra){
		// The 'invoke' method allows advanced invocation (supporting by name, as list
		// and as map invocation schemes) provided the given function 'f' has proper
		// '__meta__' annotation.
		// 
		// These annotations are expected to be like:
		// 
		// >    f __meta__ = {
		// >        arity:2
		// >        arguments:{
		// >           b:2,
		// >           "*":[1]
		// >           "**":{c:3,d:4}
		// >        }
		// >    }
		// 
		var __this__=extend;
		var meta=f['__meta__'];
		var actual_args=[];
		Extend.iterate(extra['*'], function(v){
			args.push(v)
		}, __this__)
		Extend.iterate(extra['**'], function(v, k){
			extra[k] = v;
		}, __this__)
		Extend.iterate(args, function(v){
			actual_args.push(args)
		}, __this__)
		var start=args.length;
		while ((start < meta.arity))
		{
			var arg=meta.arguments[start];
			actual_args.push(extra[arg.name])
			start = (start + 1);
		}
		return f.apply(t, actual_args)
	}
extend.getChildrenOf=	function(aClass){
		var __this__=extend;
		var res={};
		var values = Extend.getClasses()
		for ( key in values ) {
			if ( values[key] != aClass && values[key].isSubclassOf(aClass) )
			{ res[key] = values[key] }
		}
		
		return res
	}
extend.init=	function(){
		var __this__=extend;
	}
extend.init()
