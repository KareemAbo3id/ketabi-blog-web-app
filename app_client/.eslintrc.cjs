module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {},
    settings: {
        react: {
            createClass: "createReactClass",

            pragma: "React",
            fragment: "Fragment",
            version: "detect",

            flowVersion: "0.53",
        },
        propWrapperFunctions: [
            "forbidExtraProps",
            { property: "freeze", object: "Object" },
            { property: "myFavoriteWrapper" },

            { property: "forbidExtraProps", exact: true },
        ],
        componentWrapperFunctions: [
            "observer",
            { property: "styled" },
            { property: "observer", object: "Mobx" },
            { property: "observer", object: "<pragma>" },
        ],
        formComponents: [
            "CustomForm",
            { name: "Form", formAttribute: "endpoint" },
        ],
        linkComponents: ["Hyperlink", { name: "Link", linkAttribute: "to" }],
    },
};
