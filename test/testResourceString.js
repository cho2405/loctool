/*
 * testResourceString.js - test the resource string object.
 *
 * Copyright © 2016-2017, HealthTap, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (!ResourceString) {
    var ResourceString = require("../lib/ResourceString.js");
    var ContextResourceString = require("../lib/ContextResourceString.js");
    var IosLayoutResourceString = require("../lib/IosLayoutResourceString.js");
    var RegularPseudo = require("../lib/RegularPseudo.js");
    var PseudoFactory = require("../lib/PseudoFactory.js");
    var TranslationSet = require("../lib/TranslationSet.js");
    var WebProject = require("../lib/WebProject.js");
}

module.exports = {
    testResourceStringConstructorEmpty: function(test) {
        test.expect(1);

        var rs = new ResourceString();
        test.ok(rs);
        
        test.done();
    },
    
	testResourceStringConstructorNoProps: function(test) {
	    test.expect(1);
	
	    var rs = new ResourceString({});
	    test.ok(rs);
	    
	    test.done();
	},
	
    testResourceStringConstructor: function(test) {
        test.expect(1);

        var rs = new ResourceString({
        	key: "asdf",
        	source: "This is a test",
        	locale: "de-DE",
        	pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        test.done();
    },

    testResourceStringConstructorWithContext: function(test) {
        test.expect(1);

        var rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            locale: "de-DE",
            pathName: "a/b/c.java",
            context: "landscape"
        });
        test.ok(rs);
        
        test.done();
    },

    testResourceStringConstructorRightContents: function(test) {
        test.expect(5);

        var rs = new ResourceString({
        	key: "asdf",
        	source: "This is a test",
        	locale: "de-DE",
        	pathName: "a/b/c.java"
        });
        test.ok(rs);
    
        test.equal(rs.getKey(), "asdf");
        test.equal(rs.getSource(), "This is a test");
        test.equal(rs.locale, "de-DE");
        test.equal(rs.pathName, "a/b/c.java");
        
        test.done();
    },
    
    testResourceStringConstructorDefaults: function(test) {
        test.expect(6);

        var rs = new ResourceString({
        	key: "asdf",
        	source: "This is a test",
        	pathName: "a/b/c.java"
        });
        test.ok(rs);
    
        // got the right one?
        test.equal(rs.getKey(), "asdf");
        
        // now the defaults
        test.equal(rs.locale, "en-US");
        test.equal(rs.origin, "source");
        test.equal(rs.datatype, "plaintext");
        test.equal(rs.resType, "string");
        
        test.done();
    },
    
    testResourceStringGetKey: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });
        test.ok(rs);
        test.equal(rs.getKey(), "foo");
        
        test.done();
    },

    testResourceStringAutoKey: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            autoKey: true,
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });
        test.ok(rs);
        test.ok(rs.getAutoKey());
        
        test.done();
    },

    testResourceStringNotAutoKey: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });
        test.ok(rs);
        test.ok(!rs.getAutoKey());
        
        test.done();
    },

    testResourceStringGetKeyEmpty: function(test) {
        test.expect(2);

        var rs = new ResourceString();
        test.ok(rs);
        test.ok(!rs.getKey());
        
        test.done();
    },

    testResourceStringGetContext: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE",
            context: "landscape"
        });
        test.ok(rs);
        test.equal(rs.getContext(), "landscape");
        
        test.done();
    },

    testResourceStringGetContextEmpty: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });
        test.ok(rs);
        test.ok(!rs.getContext());
        
        test.done();
    },

    testResourceStringGetSource: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });
        test.ok(rs);
        test.equal(rs.getSource(), "source string");
        
        test.done();
    },

    testResourceStringSize: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });
        
        test.ok(rs);
        test.equal(rs.size(), 1); // should always be 1
        
        test.done();
    },

    testResourceStringGetSourceEmpty: function(test) {
        test.expect(2);

        var rs = new ResourceString();
        test.ok(rs);
        test.ok(!rs.getSource());
        
        test.done();
    },
    
    testResourceStringGeneratePseudo: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rb = new RegularPseudo({
            type: "c"
        });

        var rs2 = rs.generatePseudo("de-DE", rb);

        test.ok(rs2);
        
        test.done();
    },

    testResourceStringGeneratePseudoRightString: function(test) {
        test.expect(3);

        var rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rb = new RegularPseudo({
            type: "c"
        });

        var rs2 = rs.generatePseudo("de-DE", rb);

        test.ok(rs2);
        test.equal(rs2.getSource(), "Ťĥíš íš à ţëšţ6543210");
        
        test.done();
    },

    testResourceStringGeneratePseudoSkipPercents: function(test) {
        test.expect(3);

        var rs = new ResourceString({
            key: "asdf",
            source: "This %2$-2.2s is a %s test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rb = new RegularPseudo({
        	type: "c"
        });

        var rs2 = rs.generatePseudo("de-DE", rb);

        test.ok(rs2);
        test.equal(rs2.getSource(), "Ťĥíš %2$-2.2s íš à %s ţëšţ876543210");
        
        test.done();
    },

    testResourceStringGeneratePseudoSkipEmbeddedHTML: function(test) {
        test.expect(3);

        var rs = new ResourceString({
            key: "asdf",
            source: "This <span class=\"foobar\">is a</span> test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rb = new RegularPseudo({
        	type: "html"
        });

        var rs2 = rs.generatePseudo("de-DE", rb);

        test.ok(rs2);
        test.equal(rs2.getSource(), "Ťĥíš <span class=\"foobar\">íš à</span> ţëšţ76543210");
        
        test.done();
    },

    testResourceStringGeneratePseudoSkipEmbeddedXML: function(test) {
        test.expect(3);

        var rs = new ResourceString({
            key: "asdf",
            source: "This <%= a ? \"foo\" : \"bar\" %> is a test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rb = new RegularPseudo({
        	type: "html"
        });

        var rs2 = rs.generatePseudo("de-DE", rb);

        test.ok(rs2);
        test.equal(rs2.getSource(), "Ťĥíš <%= a ? \"foo\" : \"bar\" %> íš à ţëšţ2109876543210");
        
        test.done();
    },

    testResourceStringGeneratePseudoSkipPercentsAndReplacements: function(test) {
        test.expect(3);

        var rs = new ResourceString({
            key: "asdf",
            source: "This %2$-2.2s is a %s {foobar} test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rb = new RegularPseudo({
        	type: "c"
        });

        var rs2 = rs.generatePseudo("de-DE", rb);

        test.ok(rs2);
        test.equal(rs2.getSource(), "Ťĥíš %2$-2.2s íš à %s {foobar} ţëšţ109876543210");
        
        test.done();
    },

    testResourceStringGeneratePseudoBadLocale: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rb = new RegularPseudo({
        	type: "c"
        });

        var rs2 = rs.generatePseudo(undefined, rb);

        test.ok(!rs2);
        
        test.done();
    },

    testResourceStringGeneratePseudoBadBundle: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var rs2 = rs.generatePseudo("de-DE", undefined);

        test.ok(!rs2);
        
        test.done();
    },
    
    testResourceStringGeneratePseudoBritishRightString: function(test) {
        test.expect(4);

        var rs = new ResourceString({
            key: "asdf",
            source: "I color my checkbooks and localize them.", 
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var p = new WebProject({
            id: "webapp",
            sourceLocale: "en-US",
            pseudoLocale: "ps-DO"
        }, "./testfiles", {
			locales:["en-GB"]
		});

        var rb = new PseudoFactory({
        	project: p,
        	locale: "en-GB",
        	type: "c"
        });

        var rs2 = rs.generatePseudo("en-GB", rb);

        test.ok(rs2);
        test.ok(rs2.getLocale(), "en-GB");
        
        test.equal(rs2.getSource(), "I colour my chequebooks and localise them.");

        test.done();
    },

    testResourceStringGeneratePseudoBritishLikeRightString: function(test) {
        test.expect(4);

        var rs = new ResourceString({
            key: "asdf",
            source: "I color my checkbooks and localize them.", 
            pathName: "a/b/c.java"
        });
        test.ok(rs);
        
        var p = new WebProject({
            id: "webapp",
            sourceLocale: "en-US",
            pseudoLocale: "ps-DO"
        }, "./testfiles", {
			locales:["en-GB", "en-ZA"]
		});

        var rb = new PseudoFactory({
        	project: p,
        	locale: "en-ZA",
        	type: "c"
        });

        var rs2 = rs.generatePseudo("en-ZA", rb);

        test.ok(rs2);
        test.ok(rs2.getLocale(), "en-ZA");
        
        test.equal(rs2.getSource(), "I colour my chequebooks and localise them.");
        
        test.done();
    },

    testResourceStringGeneratePseudoCanadianRightString: function(test) {
        test.expect(3);

        var rs = new ResourceString({
            key: "asdf",
            source: "I color my checkbooks and localize them.", 
            pathName: "a/b/c.java"
        });
        
        var p = new WebProject({
            id: "webapp",
            sourceLocale: "en-US",
            pseudoLocale: "ps-DO"
        }, "./testfiles", {
			locales:["en-GB", "en-CA"]
		});

        var rb = new PseudoFactory({
        	project: p,
        	locale: "en-CA",
        	type: "c"
        });

        var rs2 = rs.generatePseudo("en-CA", rb);

        test.ok(rs2);
        test.ok(rs2.getLocale(), "en-CA");
        
        test.equal(rs2.getSource(), "I colour my chequebooks and localize them.");
        
        test.done();
    },

    testResourceStringGeneratePseudoTraditionalChineseRightString: function(test) {
        test.expect(4);

        var rs = new ResourceString({
        	project: "foo",
        	key: "What? Do you mean a European swallow or an African swallow?",
            source: "What? Do you mean a European swallow or an African swallow?",
            pathName: "a/b/c.java",
            locale: "en-US"
        });
        test.ok(rs);
        
        var p = new WebProject({
            id: "foo",
            sourceLocale: "en-US",
            pseudoLocale: "ps-DO"
        }, "./testfiles", {
			locales:["en-GB", "zh-Hans-CN", "zh-Hant-TW"]
		});

        var translations = new TranslationSet();
        translations.add(new ResourceString({
        	project: "foo",
        	key: 'What? Do you mean a European swallow or an African swallow?',
        	source: '什么？ 你是指欧洲的燕子还是非洲的燕子？',
        	pathName: "a/b/c.java",
            locale: "zh-Hans-CN"
        }));
        
        var rb = new PseudoFactory({
        	project: p,
        	locale: "zh-Hant-TW",
        	type: "c",
        	set: translations
        });

        var rs2 = rs.generatePseudo("zh-Hant-TW", rb);

        test.ok(rs2);
        test.ok(rs2.getLocale(), "zh-Hant-TW");

        test.equal(rs2.getSource(), "什麼？ 你是指歐洲的燕子還是非洲的燕子？");
        
        test.done();
    },
 
    testResourceStringClone: function(test) {
        test.expect(10);

        var rs = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
        	pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rs);

        var rs2 = rs.clone();
        
        test.ok(rs2);
        test.equal(rs2.project, rs.project);
        test.equal(rs2.context, rs.context);
        test.equal(rs2.locale, rs.locale);
        test.equal(rs2.reskey, rs.reskey);
        test.deepEqual(rs2.text, rs.text);
        test.equal(rs2.pathName, rs.pathName);
        test.equal(rs2.comment, rs.comment);
        test.equal(rs2.state, rs.state);
        
        test.done();
    },
    
    testResourceStringCloneWithOverrides: function(test) {
        test.expect(10);

        var rs = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
        	source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        test.ok(rs);

        var rs2 = rs.clone({
        	locale: "fr-FR",
        	state: "asdfasdf"
        });
        
        test.ok(rs2);
        test.equal(rs2.project, rs.project);
        test.equal(rs2.context, rs.context);
        test.equal(rs2.locale, "fr-FR");
        test.equal(rs2.reskey, rs.reskey);
        test.deepEqual(rs2.text, rs.text);
        test.equal(rs2.pathName, rs.pathName);
        test.equal(rs2.comment, rs.comment);
        test.equal(rs2.state, "asdfasdf");
        
        test.done();
    },
    
    testResourceStringEquals: function(test) {
        test.expect(3);

        var ra1 = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        
        var ra2 = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        
        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },

    testResourceStringEqualsNot: function(test) {
        test.expect(3);

        var ra1 = new ResourceString({
        	project: "foo",
        	context: "asdf",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        
        var ra2 = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        
        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },

    testResourceStringEqualsIgnoreSomeFields: function(test) {
        test.expect(3);

        var ra1 = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        
        var ra2 = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "x.java",
            comment: "asdf asdf asdf asdf asdf",
            state: "done"
        });
        
        test.ok(ra1);
        test.ok(ra2);

        test.ok(ra1.equals(ra2));

        test.done();
    },
    
    testResourceStringEqualsContentDifferent: function(test) {
        test.expect(3);

        var ra1 = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        
        var ra2 = new ResourceString({
        	project: "foo",
        	context: "blah",
        	locale: "de-DE",
            key: "asdf",
            source: "This is not a test",
            pathName: "a/b/c.java",
            comment: "foobar foo",
            state: "accepted"
        });
        
        test.ok(ra1);
        test.ok(ra2);

        test.ok(!ra1.equals(ra2));

        test.done();
    },
    
    testResourceStringGetOrigin: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE",
            origin: "target"
        });
        
        test.ok(rs);
        test.equal(rs.getOrigin(), "target");
        
        test.done();
    },

    testResourceStringGetOriginDefault: function(test) {
        test.expect(2);

        var rs = new ResourceString({
            key: "foo",
            source: "source string",
            pathName: "a/b/c.txt",
            locale: "de-DE"
        });
        
        test.ok(rs);
        test.equal(rs.getOrigin(), "source");
        
        test.done();
    },

    testResourceStringStaticHashKey: function(test) {
        test.expect(1);

        test.equal(ResourceString.hashKey("iosapp", "de-DE", "This is a test", "html"), "rs_iosapp_de-DE_This is a test_html");
        
        test.done();
    },

    testResourceStringStaticHashKeyMissingParts: function(test) {
        test.expect(1);

        test.equal(ResourceString.hashKey(undefined, "de-DE", undefined, undefined), "rs__de-DE__");
        
        test.done();
    },

    testResourceStringHashKey: function(test) {
        test.expect(2);

        var rs = new ResourceString({
        	project: "iosapp",
        	key: "This is a test",
        	source: "This is a test",
        	locale: "de-DE",
        	pathName: "a/b/c.java",
        	datatype: "html"
        });
        test.ok(rs);
        
        test.equal(rs.hashKey(), "rs_iosapp_de-DE_This is a test_html");
        
        test.done();
    },
    
    testContextResourceStringStaticHashKey: function(test) {
        test.expect(1);

        test.equal(ContextResourceString.hashKey("iosapp", "foobar", "de-DE", "This is a test", "html", "flavor"), "crs_iosapp_foobar_de-DE_This is a test_html_flavor");
        
        test.done();
    },

    testContextResourceStringStaticHashKeyMissingParts: function(test) {
        test.expect(1);

        test.equal(ContextResourceString.hashKey(undefined, undefined, "de-DE", undefined, undefined, undefined), "crs___de-DE___");
        
        test.done();
    },

    testContextResourceStringHashKey: function(test) {
        test.expect(2);

        var rs = new ContextResourceString({
        	project: "iosapp",
        	context: "foobar",
        	key: "This is a test",
        	source: "This is a test",
        	locale: "de-DE",
        	pathName: "a/b/c.java",
        	datatype: "html"
        });
        test.ok(rs);
        
        test.equal(rs.hashKey(), "crs_iosapp_foobar_de-DE_This is a test_html_");
        
        test.done();
    },

    testContextResourceStringGetFlavor: function(test) {
        test.expect(2);

        var rs = new ContextResourceString({
        	project: "iosapp",
        	context: "foobar",
        	key: "This is a test",
        	source: "This is a test",
        	locale: "de-DE",
        	pathName: "a/b/c.java",
        	datatype: "html",
        	flavor: "a"
        });
        test.ok(rs);
        
        test.equal(rs.getFlavor(), "a");
        
        test.done();
    },

    testContextResourceStringHashKeyWithFlavor: function(test) {
        test.expect(2);

        var rs = new ContextResourceString({
        	project: "iosapp",
        	context: "foobar",
        	key: "This is a test",
        	source: "This is a test",
        	locale: "de-DE",
        	pathName: "a/b/c.java",
        	datatype: "html",
        	flavor: "chocolate"
        });
        test.ok(rs);
        
        test.equal(rs.hashKey(), "crs_iosapp_foobar_de-DE_This is a test_html_chocolate");
        
        test.done();
    },

    testIosLayoutResourceStringStaticHashKey: function(test) {
        test.expect(1);

        test.equal(IosLayoutResourceString.hashKey("iosapp", "de-DE", "a/b/es.lproj/foo.xib", "This is a test"), "irs_iosapp_de-DE_a/b/es.lproj/foo.xib_This is a test_");
        
        test.done();
    },

    testIosLayoutResourceStringStaticHashKeyWithFlavor: function(test) {
        test.expect(1);

        test.equal(IosLayoutResourceString.hashKey("iosapp", "de-DE", "a/b/es.lproj/foo.xib", "This is a test", "chocolate"), "irs_iosapp_de-DE_a/b/es.lproj/foo.xib_This is a test_chocolate");
        
        test.done();
    },

    testIosLayoutResourceStringStaticHashKeyMissingParts: function(test) {
        test.expect(1);

        test.equal(IosLayoutResourceString.hashKey(undefined, undefined, "de-DE", undefined), "irs___de-DE__");
        
        test.done();
    },

    testIosLayoutResourceStringHashKey: function(test) {
        test.expect(2);

        var rs = new IosLayoutResourceString({
        	project: "iosapp",
        	context: "foobar",
        	key: "This is a test",
        	source: "This is a test",
        	locale: "de-DE",
        	pathName: "a/b/es.lproj/foo.xib",
        	flavor: "chocolate"
        });
        test.ok(rs);
        
        test.equal(rs.hashKey(), "irs_iosapp_de-DE_a/b/es.lproj/foo.xib_This is a test_chocolate");
        
        test.done();
    }
};