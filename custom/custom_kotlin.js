/**
 * @description
 * custom HTTP code snippet generator for Kotlin
 *
 * @author
 * @thibaultCha
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var CodeBuilder = require('httpsnippet/src/helpers/code-builder')

module.exports = function (source, options) {
    var opts = Object.assign({
        indent: '  ',
        pretty: true,
        timeout: '10'
    }, options)

    var code = new CodeBuilder(opts.indent)

    // Markers for headers to be created as litteral objects and later be set on the NSURLRequest if exist
    var req = {
        hasHeaders: false,
        hasBody: false
    }

    code.push('//Just testing that custom template works %s', source.comment)

    return code.join()
}

module.exports.info = {
    key: 'custom',
    title: 'custom',
    link: 'https://www.kotlin.com',
    description: 'custom request'
}