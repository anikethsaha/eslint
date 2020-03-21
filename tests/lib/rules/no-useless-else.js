/**
 * @fileoverview Rule to report when using else statement with no effect
 * @author Aniketh Saha
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-useless-else"),
    { RuleTester } = require("../../../lib/rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-useless-else", rule, {
    valid: [
        "function foo() { if (true) { if (false) { return x; } } else { return y; } }",
        "function foo() { if (true) { return x; } return y; }",
        "function foo() { if (true) { for (;;) { return x; } } else { return y; } }",
        "function foo() { if (true) notAReturn(); else return y; }",
        "function foo() {if (x) { notAReturn(); } else if (y) { return true; } else { notAReturn(); } }",
        "if (0) { if (0) {} else {} } else {}"
    ],
    invalid: [
        {
            code: "function foo1() { if (true) { return x; } else { return y; } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo2() { if (true) { var x = bar; return x; } else { var y = baz; return y; } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo3() { if (true) return x; else return y; }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "ReturnStatement" }]
        },
        {
            code: "function foo4() { if (true) { if (false) return x; else return y; } else { return z; } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "ReturnStatement" }]
        },
        {
            code: "function foo5() { if (true) { if (false) { if (true) return x; else { w = y; } } else { w = x; } } else { return z; } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo6() { if (true) { if (false) { if (true) return x; else return y; } } else { return z; } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "ReturnStatement" }]
        },
        {
            code: "function foo7() { if (true) { if (false) { if (true) return x; else return y; } return w; } else { return z; } }",
            errors: [
                { message: "Using 'else' is unnecessary here.", type: "ReturnStatement" },
                { message: "Using 'else' is unnecessary here.", type: "BlockStatement" }
            ]
        },
        {
            code: "function foo8() { if (true) { if (false) { if (true) return x; else return y; } else { w = x; } } else { return z; } }",
            errors: [
                { message: "Using 'else' is unnecessary here.", type: "ReturnStatement" }
            ]
        },
        {
            code: "function foo9() {if (x) { return true; } else if (y) { return true; } else { notAReturn(); } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "IfStatement" }]
        },
        {
            code: "function foo10() { if (foo) return bar; else (foo).bar(); }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "ExpressionStatement" }]
        },
        {
            code: "function foo11() { if (foo) return bar \nelse { [1, 2, 3].map(foo) } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo12() { if (foo) return bar \nelse { baz() } \n[1, 2, 3].map(foo) }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo13() { if (foo) return bar; \nelse { [1, 2, 3].map(foo) } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo14() { if (foo) return bar \nelse { baz(); } \n[1, 2, 3].map(foo) }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo15() { if (foo) return bar; else { baz() } qaz() }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo16() { if (foo) return bar \nelse { baz() } qaz() }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo17() { if (foo) return bar \nelse { baz() } \nqaz() }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "BlockStatement" }]
        },
        {
            code: "function foo18() { if (foo) return function() {} \nelse [1, 2, 3].map(bar) }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "ExpressionStatement" }]
        },
        {
            code: "while (true) { if (foo) continue; else bar() }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "ExpressionStatement" }]
        },
        {
            code: "while (true) { if (foo) break; else bar() }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "ExpressionStatement" }]
        },
        {
            code: "function foo() { var x = true; if (x) { return x; } else if (x === false) { return false; } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "IfStatement" }]
        },
        {
            code: `function foo() {
                    while (true) {
                        if (bar) break;
                        else if (baz) continue;
                        else if (qux) throw new Baseball();
                        else if (boop) return 5;
                        else beep();
                    }
                }
            `,
            errors: [
                { message: "Using 'else' is unnecessary here.", type: "IfStatement" },
                { message: "Using 'else' is unnecessary here.", type: "IfStatement" },
                { message: "Using 'else' is unnecessary here.", type: "IfStatement" }
            ]
        },
        {
            code: "function foo() {if (x) { return true; } else if (y) { notAReturn() } else { notAReturn(); } }",
            errors: [{ message: "Using 'else' is unnecessary here.", type: "IfStatement" }]
        }

    ]
});
