// Extend 2.0 test suite (18-Jun-2007)
// -----------------------------------

/*
Things you cannot do in JavaScript
 - Easily access a class variable from an instance
 - Things get really dirty for methods/attributes/inits with inheritance
   (super)
*/

// TEST SETUP ________________________________________________________________
// TODO: Convert to Sugar
Testing.OnTestStart = function(testId, testName) {
	var test_row = html.tr(
		{"id":"test_" + testId, "class":"test testRunning"},
		html.td({"class":"testID"},"#" + testId),
		html.td({"class":"testName"},"" + testName,
		html.div(html.ul({"class":"assertions empty"}))),
		html.td({"class":"testTime"},"running...")
	)
	$("#result").append(test_row)
}
Testing.OnTestEnd   = function(testId, test) {
	var test_row = $("#test_" + testId)
	$(test_row).removeClass("testRunning");
	if ( test.status == "S" ) {
		$(test_row).addClass("testSucceeded");
	} else {
		$(test_row).addClass("testFailed");
	}
	$(".testTime", test_row).html(test.run + "ms")
}

Testing.OnFailure = function( testId, num, reason ) {
	$("#test_" + testId +" .assertions").removeClass("empty")
	$("#test_" + testId +" .assertions").append(html.li({"class":"assertion assertionFailed"},"Assertion #" + num + " failed: " + reason))
}
// END SETUP

// TEST 0
Testing.test("JavaScript Inheritance Basics")
	// SETUP
	var A = function(){this.isClass=function(){return false}}
	var A_proto={
		isClass:function(){return true},
		hello:function(){return "Hello"}
	}
	A.prototype=A_proto
	A_proto.isClass=function(){return true}
	//A.hello=function(){return "Hello"}
	var a = new A()
	// TEST
	Testing.asTrue(A_proto.isClass())
	Testing.asFalse(a.isClass())
	Testing.value(A_proto.hello(),"Hello")
	Testing.value(a.hello(),"Hello")
	// Now, this is the fun part: when doing a 'new A()', there is no link
	// between A (or A_proto) and 'a'. When invoking new, it seems like the
	// given object is actually cloned.
	Testing.unlike(a,A_proto)
	Testing.unlike(a,A)
	Testing.unlike(a.prototype,A_proto)
	Testing.unlike(a.prototype,A)
	// But strangely, we can add 'otherHello' to "A_proto", and automatically,
	// 'a' will benefit from it.
	A_proto.otherHello=function(){return "Pouet"}
	Testing.value(A_proto.otherHello(),"Pouet")
	Testing.value(a.otherHello(),"Pouet")
	// And we can check that if we modify the 'class', the instance won't be
	// updated
	A.pouet = function(){return "Pouet"}
	Testing.value(A.pouet(),"Pouet")
	Testing.asUndefined(a.pouet)
	// But it will if we modify the prototype
	A.prototype.pouet = A.pouet
	Testing.asDefined(a.pouet)
	Testing.asDefined(a.pouet(),"Pouet")
Testing.end()

// ===========================================================================
// SINGLE CLASS TESTING
// ===========================================================================

// TEST 1
Testing.test("C: Single class declaration: A=Extend.create(...)")
	// SETUP
	var ClassA = Extend.create({
		init:function(){
			this._id=this.getClass().Count++
		},
		methods:{
			basehello:function(){
				return "Hello:" + this._id
			},
			thishello:function(){
				return this.hello()
			},
			hello:function(){
				return "Hello:" + this._id
			}
		},
		operations:{
			otherHello:function(){return "OtherHello"},
			getCount:function(){
				return this.Count
			}
		},
		attributes:{Count:0},
		name:"ClassA"
	})
	// TEST
	Testing.value(ClassA.getName(), "ClassA")
	Testing.asUndefined(ClassA.getParent()) 
	Testing.value(ClassA.isClass(), true) 
Testing.end()

// TEST 2
Testing.test("C: Class attribute access: A.V")
	Testing.value(ClassA.Count, 0) 
Testing.end()

// TEST 3
Testing.test("C: Class operation: A.operation(...)")
	Testing.value(ClassA.otherHello(), "OtherHello") 
	Testing.value(ClassA.getCount(), ClassA.Count)
Testing.end()

// TEST 4
Testing.test("C: Class instanciation: var a = new A()")
	var new_a = new ClassA()
	Testing.value(new_a.getClass(), ClassA) 
	Testing.value(new_a.isClass(), false) 
Testing.end()

// TEST 5
Testing.test("C: Instance attribute: a.v")
	Testing.value(new_a._id,0) 
Testing.end()

// TEST 6
Testing.test("C: Class attribute from instance: a.getClass().V")
	Testing.value(ClassA.Count,1) 
	Testing.value(new_a.getClass().Count,1) 
Testing.end()

// TEST 7
Testing.test("C: Instance method: a.method()")
	Testing.value(new_a._id,0) 
	Testing.value(new_a.hello(),"Hello:0") 
	Testing.value(new_a.basehello(),"Hello:0") 
	Testing.value(new_a.thishello(),"Hello:0") 
Testing.end()

// ===========================================================================
// SUBCLASS TESTING
// ===========================================================================

// TEST 8
Testing.test("SC: Subclass declaration: var B=Extend.create({parent:...})")
	// SETUP
	var ClassB = Extend.create({
		name:"ClassB",
		parent:ClassA,
		methods:{
			hello:function(){return "From B:" + this._id}
		}
	})
	Testing.value(ClassB.getName(), "ClassB")
	Testing.value(ClassB.getParent(), ClassA) 
	Testing.value(ClassB.isClass(), true) 
Testing.end()

// TEST 9
Testing.test("SC: Inhertied class attribute access: B.V ")
	Testing.value(ClassA.Count, 1) 
	Testing.value(ClassB.Count, 0) 
Testing.end()

// TEST 10
Testing.test("SC: Inherited class operation: B.operation(...)")
	Testing.value(ClassB.otherHello(), "OtherHello") 
	Testing.value(ClassB.getCount(), 0)
Testing.end()

// TEST 11
Testing.test("SC: Subclass instanciation: var b = new B()")
	var new_b = new ClassB()
	Testing.value(new_b.isClass(), false) 
	Testing.value(new_b.getClass(), ClassB) 
Testing.end()

// TEST 12
Testing.test("SC: Subclass instance attribute: b.v")
	Testing.value(new_b._id,0) 
Testing.end()

// TEST 13
Testing.test("SC: Class attribute from instance: b.getClass().V")
	Testing.value(ClassB.Count,1) 
	Testing.value(new_b.getClass().Count,1) 
Testing.end()

// TEST 14
Testing.test("SC: Instance method: b.method()")
	Testing.value(new_b.hello(),"From B:0") 

// TEST 15
Testing.test("SC: Inherited method: b.inheritedmethod()")
	Testing.value(new_b.thishello(),"From B:0") 
	Testing.value(new_b.basehello(),"Hello:0") 
	new_b._id=10
	Testing.value(new_b.thishello(),"From B:10") 
	Testing.value(new_b.basehello(),"Hello:10") 
Testing.end()

// ===========================================================================
// SUB/SUB/CLASS TESTING
// ===========================================================================

// TEST 16
Testing.test("SSC: Sub-subclass declaration: var C=Extend.create({parent:B,...})")
	// SETUP
	var ClassC = Extend.create({
		name:"ClassC",
		parent:ClassB,
		methods:{
			hello:function(){return "From C:" + this._id}
		}
	})
	Testing.value(ClassC.getName(), "ClassC")
	Testing.value(ClassC.getParent(), ClassB) 
	Testing.value(ClassC.getParent().getParent(), ClassA) 
	Testing.value(ClassC.isClass(), true) 
Testing.end()

// TEST 17
Testing.test("SSC: Inhertied class attribute access: C.V ")
	Testing.value(ClassA.Count, 1) 
	Testing.value(ClassB.Count, 1) 
	Testing.value(ClassC.Count, 0) 
Testing.end()

// TEST 18
Testing.test("SSC: Inherited class operation: C.operation(...)")
	Testing.value(ClassC.otherHello(), "OtherHello") 
	Testing.value(ClassC.getCount(), 0)
Testing.end()

// TEST 19
Testing.test("SSC: Subclass instanciation: var c = new C()")
	var new_c = new ClassC()
	Testing.value(new_c.isClass(), false) 
	Testing.value(new_c.getClass(), ClassC) 
Testing.end()

// TEST 20
Testing.test("SSC: Subclass instance attribute: c.v")
	Testing.value(new_c._id,0) 
Testing.end()

// TEST 21
Testing.test("SSC: Class attribute from instance: c.getClass().V")
	Testing.value(ClassC.Count,1) 
	Testing.value(new_c.getClass().Count,1) 
Testing.end()

// TEST 22
Testing.test("SSC: Instance method: c.method()")
	Testing.value(new_c.hello(),"From C:0") 

// TEST 23
Testing.test("SSC: Inherited method: c.inheritedmethod()")
	Testing.value(new_c.thishello(),"From C:0") 
	Testing.value(new_c.basehello(),"Hello:0") 
	new_c._id=11
	Testing.value(new_c.thishello(),"From C:11") 
	Testing.value(new_c.basehello(),"Hello:11") 
Testing.end()

// ===========================================================================
// SUPER KEYWORD
// ===========================================================================

// TEST 24
Testing.test("S: Super methods: this.SuperClass_method()")
	var ClassSA = Extend.create({
		name:"ClassSA",
		init:function(){this.a="a"},
		methods:{doThis:function(){return "doThis:SA:" + this.a}}
	})
	var ClassSB = Extend.create({
		name:"ClassSB",
		parent:ClassSA,
		init:function(){this.a="b"},
		methods:{doThis:function(){return this.ClassSA_doThis() + ":SB"}}
	})
	var ClassSC = Extend.create({
		name:"ClassSC",
		parent:ClassSB,
		init:function(){this.a="c"},
		methods:{
			doThis:function(){return this.ClassSB_doThis() + ":SC"},
			doThat:function(){return this.ClassSA_doThis() + ":SC"}
		}
	})
	var new_sa = new ClassSA()
	var new_sb = new ClassSB()
	var new_sc = new ClassSC()
	Testing.value(new_sa.doThis(), "doThis:SA:a")
	Testing.value(new_sb.doThis(), "doThis:SA:b:SB")
	Testing.value(new_sc.doThis(), "doThis:SA:c:SB:SC")
	Testing.value(new_sc.doThat(), "doThis:SA:c:SC")
Testing.end()

// TEST 25
Testing.test("S: Super constructor: this.SuperClass_init()")
	var ClassSA = Extend.create({
		name:"ClassSA",
		init:function(){this.a="a"},
	})
	var ClassSB = Extend.create({
		name:"ClassSB",
		parent:ClassSA,
		init:function(){
			this.ClassSA_init();
			this.b="b"
		}
	})
	var ClassSC = Extend.create({
		name:"ClassSC",
		parent:ClassSB,
		init:function(){
			this.ClassSB_init()
			this.c="c"
		},
		methods:{
			doThis:function(){return this.ClassSB_doThis() + ":SC"},
			doThat:function(){return this.ClassSA_doThis() + ":SC"}
		}
	})
	var new_sa = new ClassSA()
	var new_sb = new ClassSB()
	var new_sc = new ClassSC()
	Testing.value(new_sa.a, "a")
	Testing.asUndefined(new_sa.b)
	Testing.asUndefined(new_sa.c)
	Testing.value(new_sb.a, "a")
	Testing.value(new_sb.b, "b")
	Testing.asUndefined(new_sb.c)
	Testing.value(new_sc.a, "a")
	Testing.value(new_sc.b, "b")
	Testing.value(new_sc.c, "c")

Testing.end()

// TEST 26
Testing.test("S: Super operations: this.SuperClass_operation()")
	var ClassSA = Extend.create({
		name:"ClassSA",
		attributes:{V:"A"},
		operations:{doThis:function(){return this.V}}
	})
	var ClassSB = Extend.create({
		name:"ClassSB",
		parent:ClassSA,
		attributes:{V:"B"},
		operations:{doThat:function(){return this.ClassSA_doThis() +
		this.doThis();}}
	})
	var ClassSC = Extend.create({
		name:"ClassSC",
		parent:ClassSB,
		attributes:{V:"C"},
		operations:{doThat:function(){return this.ClassSB_doThat() +
		this.doThis();}}
	})
	Testing.value(ClassSA.doThis(), "A")
	Testing.value(ClassSB.doThis(), "B")
	Testing.value(ClassSC.doThis(), "C")
	Testing.value(ClassSB.doThat(), "BB")
	Testing.value(ClassSC.doThat(), "CCC")

Testing.end()

// ===========================================================================
// INTROSPECTION
// ===========================================================================

// isInstance

// TEST 27
Testing.test("I: A.hasInstance(a)")
	Testing.asTrue( ClassA.hasInstance(new_a) )
	Testing.asTrue( ClassB.hasInstance(new_b) )
	Testing.asTrue( ClassC.hasInstance(new_c) )
	Testing.asTrue( ClassA.hasInstance(new_b) )
	Testing.asTrue( ClassB.hasInstance(new_c) )
Testing.end()

// TEST 28
Testing.test("I: a.isInstance(A)")
	Testing.asTrue( new_a.isInstance(ClassA) )
	Testing.asTrue( new_b.isInstance(ClassB) )
	Testing.asTrue( new_c.isInstance(ClassC) )
	Testing.asTrue( new_b.isInstance(ClassA) )
	Testing.asTrue( new_c.isInstance(ClassB) )
	Testing.asTrue( new_c.isInstance(ClassC) )
Testing.end()

// TEST 29
Testing.test("I: B.isSubclassOf(A)")
	Testing.asTrue( ClassB.isSubclassOf(ClassA) )
	Testing.asTrue( ClassC.isSubclassOf(ClassB) )
	Testing.asTrue( ClassC.isSubclassOf(ClassA) )
Testing.end()

function get_keys(dict) {
	var res = []
	for ( k in dict ) { res.push(k) }
	return res;
}

function cmp_list(a,b) {
	if ( a.length == b.length ) {
		for ( var i=0 ; i<a.length ; i++ ) {
			if ( a[i] != b[i] ) { return false};
		}
		return true;
	} else {
		return false;
	}
}

function same_keys(a,b) {
	return cmp_list(get_keys(a),get_keys(b))
}

// TEST 30
Testing.test("I: a.listMethods(A)")
	var ClassA = Extend.create({
		name:"ClassA",
		init:function(){this.a="a"},
		attributes:{A:0},
		methods:{ doA:function(){} },
		operations:{ DoA:function(){} }
	})
	var ClassB = Extend.create({
		name:"ClassB",
		parent:ClassA,
		init:function(){this.b="b"},
		attributes:{B:0},
		methods:{ doB:function(){} },
		operations:{ DoB:function(){} }
	})
	var ClassC = Extend.create({
		name:"ClassC",
		parent:ClassB,
		init:function(){this.c="c"},
		attributes:{C:0},
		methods:{ doC:function(){} },
		operations:{ DoC:function(){} }
	})

	var a_all = ClassA.listMethods()
	var a_own = ClassA.listMethods(true,false)
	var a_inh = ClassA.listMethods(false,true)

	Testing.asDefined( a_all.doA )
	Testing.asTrue( same_keys(a_all, a_own) )
	Testing.asTrue( same_keys(a_inh, {}) )

	var b_all = ClassB.listMethods()
	var b_own = ClassB.listMethods(true,false)
	var b_inh = ClassB.listMethods(false,true)

	Testing.asDefined(   b_all.doB )
	Testing.asDefined(   b_all.doA )
	Testing.asUndefined( b_own.doA )
	Testing.asDefined(   b_own.doB )
	Testing.asDefined(   b_inh.doA )
	Testing.asUndefined( b_inh.doB )

	var c_all = ClassC.listMethods()
	var c_own = ClassC.listMethods(true,false)
	var c_inh = ClassC.listMethods(false,true)

	Testing.asDefined(   c_all.doC )
	Testing.asDefined(   c_all.doB )
	Testing.asDefined(   c_all.doA )
	Testing.asDefined(   c_own.doC )
	Testing.asUndefined( c_own.doB )
	Testing.asUndefined( c_own.doA )
	Testing.asDefined(   c_inh.doA )
	Testing.asDefined(   c_inh.doB )
	Testing.asUndefined( c_inh.doC )

Testing.end()

// TEST 31
Testing.test("I: a.listAttributes(A)")
	var a_all = ClassA.listAttributes()
	var a_own = ClassA.listAttributes(true,false)
	var a_inh = ClassA.listAttributes(false,true)

	Testing.asDefined( a_all.A )
	Testing.value( same_keys(a_all, a_own) )
	Testing.value( same_keys(a_inh, {}) )

	var b_all = ClassB.listAttributes()
	var b_own = ClassB.listAttributes(true,false)
	var b_inh = ClassB.listAttributes(false,true)

	Testing.asDefined(   b_all.B )
	Testing.asDefined(   b_all.A )
	Testing.asDefined(   b_own.B )
	Testing.asUndefined( b_own.A )
	Testing.asDefined(   b_inh.A )
	Testing.asUndefined( b_inh.B )

	var c_all = ClassC.listAttributes()
	var c_own = ClassC.listAttributes(true,false)
	var c_inh = ClassC.listAttributes(false,true)

	Testing.asDefined(   c_all.C )
	Testing.asDefined(   c_all.B )
	Testing.asDefined(   c_all.A )
	Testing.asDefined(   c_own.C )
	Testing.asUndefined( c_own.B )
	Testing.asUndefined( c_own.A )
	Testing.asDefined(   c_inh.A )
	Testing.asDefined(   c_inh.B )
	Testing.asUndefined( c_inh.C )
Testing.end()


// TEST 32
Testing.test("I: a.listOperations(A)")
	var a_all = ClassA.listOperations()
	var a_own = ClassA.listOperations(true,false)
	var a_inh = ClassA.listOperations(false,true)

	Testing.asDefined( a_all.DoA )
	Testing.value(  same_keys(a_all, a_own) )
	Testing.value(  same_keys(a_inh, {}) )

	var b_all = ClassB.listOperations()
	var b_own = ClassB.listOperations(true,false)
	var b_inh = ClassB.listOperations(false,true)

	Testing.asDefined(   b_all.DoB )
	Testing.asDefined(   b_all.DoA )
	Testing.asDefined(   b_own.DoB )
	Testing.asUndefined( b_own.DoA )
	Testing.asDefined(   b_inh.DoA )
	Testing.asUndefined( b_inh.DoB )

	var c_all = ClassC.listOperations()
	var c_own = ClassC.listOperations(true,false)
	var c_inh = ClassC.listOperations(false,true)

	Testing.asDefined(   c_all.DoC )
	Testing.asDefined(   c_all.DoB )
	Testing.asDefined(   c_all.DoA )
	Testing.asDefined(   c_own.DoC )
	Testing.asUndefined( c_own.DoB )
	Testing.asUndefined( c_own.DoA )
	Testing.asDefined(   c_inh.DoA )
	Testing.asDefined(   c_inh.DoB )
	Testing.asUndefined( c_inh.DoC )

Testing.end()

// EOF
