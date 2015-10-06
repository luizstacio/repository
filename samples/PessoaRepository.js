'use strict';

var Repository = require('../dist/repository.js');
var RestAdapter = {
  save(data, options) {
    console.log('save');
  },
  remove(data, options) {
    console.log('remove');
  }
}
var PessoaRepository = Repository.create({
  name: 'Luiz',
  adapter: RestAdapter,
  options: {
    url: 'app.simples'
  }
});

PessoaRepository.EventManager.on('save:before', function (data, options) {
  data.name = data.name + ' alterado';
});

PessoaRepository.EventManager.on('save', function (data, options) {
  console.log(data, options);
});


PessoaRepository.EventManager.on('save:after', function (data, options) {
  console.log(data, options);
});

PessoaRepository.save({ name: 'João' });