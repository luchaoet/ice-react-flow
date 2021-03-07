// import React from 'react';
// import styles from './index.module.scss';
// import MonacoEditor from 'react-monaco-editor';
// // import { UnControlled as CodeMirror } from 'react-codemirror2';

// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/addon/selection/active-line';

// const code = ``;
// const options = {
//   selectOnLineNumbers: true,
// };
// function Canvas(props) {
//   const { onClick } = props;
//   return (
//     <div className={styles.container} onClick={() => onClick && onClick()}>
//       <MonacoEditor
//         width="100%"
//         height="100%"
//         language="python" //
//         theme="vs-dark"
//         value={code}
//         options={options}
//         onChange={(value) => console.log(value)}
//         editorDidMount={(editor, monaco) => {
//           console.log('editorDidMount', editor);
//           editor.focus();
//         }}
//       />
//       {/* <CodeMirror
//         value=""
//         options={{
//           mode: { name: 'text/javascript' },
//           theme: 'material', // material xq-light
//           lineNumbers: true,
//           // styleActiveLine: true,
//         }}
//         onChange={(editor, data, value) => {}}
//       /> */}
//     </div>
//   );
// }

// export default Canvas;

import React, { Component } from 'react';

import MonacoEditor from 'react-monaco-editor';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';

export default class Canvas extends Component {
    editorWillMount(monaco) {
        monaco.languages.register({ id: 'rpp' });
        monaco.languages.setMonarchTokensProvider('rpp', {
            defaultToken: '',
            tokenPostfix: '.java',

            keywords: [
                'abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default',
                'goto', 'package', 'synchronized', 'boolean', 'do', 'if', 'private',
                'this', 'break', 'double', 'implements', 'protected', 'throw', 'byte',
                'else', 'import', 'public', 'throws', 'case', 'enum', 'instanceof', 'return',
                'transient', 'catch', 'extends', 'int', 'short', 'try', 'char', 'final',
                'interface', 'static', 'void', 'class', 'finally', 'long', 'strictfp',
                'volatile', 'const', 'float', 'native', 'super', 'while', 'true', 'false'
            ],

            operators: [
                '=', '>', '<', '!', '~', '?', ':',
                '==', '<=', '>=', '!=', '&&', '||', '++', '--',
                '+', '-', '*', '/', '&', '|', '^', '%', '<<',
                '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
                '^=', '%=', '<<=', '>>=', '>>>='
            ],

            // we include these common regular expressions
            symbols: /[=><!~?:&|+\-*/^%]+/,
            escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
            digits: /\d+(_+\d+)*/,
            octaldigits: /[0-7]+(_+[0-7]+)*/,
            binarydigits: /[0-1]+(_+[0-1]+)*/,
            hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

            // The main tokenizer for our languages
            tokenizer: {
                root: [
                    // identifiers and keywords
                    [/[a-zA-Z_$][\w$]*/, {
                        cases: {
                            '@keywords': { token: 'keyword.$0' },
                            '@default': 'identifier'
                        }
                    }],

                    // whitespace
                    { include: '@whitespace' },

                    // delimiters and operators
                    [/[{}()[\]]/, '@brackets'],
                    [/[<>](?!@symbols)/, '@brackets'],
                    [/@symbols/, {
                        cases: {
                            '@operators': 'delimiter',
                            '@default': ''
                        }
                    }],

                    // @ annotations.
                    [/@\s*[a-zA-Z_$][\w$]*/, 'annotation'],

                    // numbers
                    [/(@digits)[eE]([-+]?(@digits))?[fFdD]?/, 'number.float'],
                    [/(@digits)\.(@digits)([eE][-+]?(@digits))?[fFdD]?/, 'number.float'],
                    [/0[xX](@hexdigits)[Ll]?/, 'number.hex'],
                    [/0(@octaldigits)[Ll]?/, 'number.octal'],
                    [/0[bB](@binarydigits)[Ll]?/, 'number.binary'],
                    [/(@digits)[fFdD]/, 'number.float'],
                    [/(@digits)[lL]?/, 'number'],

                    // delimiter: after number because of .\d floats
                    [/[;,.]/, 'delimiter'],

                    // strings
                    [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                    [/"/, 'string', '@string'],

                    // characters
                    [/'[^\\']'/, 'string'],
                    [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                    [/'/, 'string.invalid']
                ],

                whitespace: [
                    [/[ \t\r\n]+/, ''],
                    [/\/\*\*(?!\/)/, 'comment.doc', '@javadoc'],
                    [/\/\*/, 'comment', '@comment'],
                    [/\/\/.*$/, 'comment'],
                ],

                comment: [
                    [/[^/*]+/, 'comment'],
                    // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
                    // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
                    [/\*\//, 'comment', '@pop'],
                    [/[/*]/, 'comment']
                ],
                //Identical copy of comment above, except for the addition of .doc
                javadoc: [
                    [/[^/*]+/, 'comment.doc'],
                    // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
                    [/\/\*/, 'comment.doc.invalid'],
                    [/\*\//, 'comment.doc', '@pop'],
                    [/[/*]/, 'comment.doc']
                ],

                string: [
                    [/[^\\"]+/, 'string'],
                    [/@escapes/, 'string.escape'],
                    [/\\./, 'string.escape.invalid'],
                    [/"/, 'string', '@pop']
                ],
            },
        });

    }
    editorDidMount(editor) {
    }

    render() {
        const { value, width = '500', height = '300', changeContent } = this.props;
        const option = {
          readOnly: true,
          // find: {
          //   addExtraSpaceOnTop: true
          // },
          // fixedOverflowWidgets: true,
          // contextmenu: false, // 禁止右键
        }
        return (
            <MonacoEditor
                options={option}
                value={value}
                height={height}
                width={width}
                language='python'
                theme="vs-dark"
                // editorDidMount={this.editorDidMount}
                onChange={changeContent}
            />
        );
    }
}