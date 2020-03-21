/**
 * @fileoverview Rule to report when using else statement with no effect
 * @author Aniketh Saha
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const CONTROL_FLOW_TYPES = ["ReturnStatement", "ThrowStatement", "BreakStatement", "ContinueStatement"];

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow `else` blocks with no effect",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-useless-else"
        },

        schema: []

    },

    create(context) {

        /**
         * Report 'useless else'
         * @param {ASTNode} node the AST node to report
         * @returns {void}
         */
        function report(node) {
            context.report({
                node: node.alternate,
                message: "Using 'else' is unnecessary here."
            });
        }

        /**
         * check for  useless else statement by searching for CONTROL_FLOW_TYPES
         * @param {ASTNode} node the AST node to check
         * @returns {void}
         */
        function check(node) {
            if (node.consequent.type === "BlockStatement") {
                const { body } = node.consequent;

                if (body.some(nod => !!~CONTROL_FLOW_TYPES.indexOf(nod.type))) {
                    report(node);
                }
            }

            if ((~CONTROL_FLOW_TYPES.indexOf(node.consequent.type))) {
                report(node);
            }
        }


        return {
            IfStatement(node) {
                const parent = context.getAncestors().pop();

                if (node.alternate) {

                    if (node.alternate.type === "IfStatement") {
                        check(node);
                        return;
                    }

                    if (parent.type === "IfStatement") {
                        return;
                    }

                    check(node);
                }
            }
        };
    }
};
