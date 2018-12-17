const { codegen } = require('swagger-axios-codegen')
codegen({
    methodNameMode: 'The cats API description',
    type: 'js',
    source:require('./swagger-spec.json')
})