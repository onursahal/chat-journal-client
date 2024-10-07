
module.exports = {
   parser: '@typescript-eslint/parser',
   parserOptions: {
     ecmaVersion: 2020,
     sourceType: 'module',
     ecmaFeatures: {
       jsx: true,
     },
     project: './tsconfig.json',
   },
   settings: {
     react: {
       version: 'detect',
     },
     'import/resolver': {
       typescript: {},
     },
   },
   env: {
     browser: true,
     node: true,
     es6: true,
   },
   extends: [
     'eslint:recommended',
     'plugin:@typescript-eslint/recommended',
     'plugin:@typescript-eslint/recommended-requiring-type-checking',
     'plugin:react/recommended',
     'plugin:react-hooks/recommended',
     'plugin:import/errors',
     'plugin:import/warnings',
     'plugin:import/typescript',
     'plugin:jsx-a11y/recommended',
     'plugin:prettier/recommended',
     'next/core-web-vitals',
   ],
   plugins: [
     '@typescript-eslint',
     'react',
     'react-hooks',
     'import',
     'jsx-a11y',
   ],
   rules: {
   },
 };
 