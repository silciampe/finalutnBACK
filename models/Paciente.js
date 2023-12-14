const mongoose = require('mongoose');
const { Schema } = require('mongoose'); 

const  pacienteSchema = new Schema({
    nombre:{
        type: 'string',
        required: true,
    },
    fechaNac:{
        type: 'date',
        required: true,
    },
    telefono:{
        type: 'number',
        required: true,
    },
    motivoConsulta:{
        type: 'string',
        required: true,
    },
    medicacionActual:{
        type: 'string',
        required: true,
    },
    laboratorios:{
        type: 'string',
        required: true,
    },
    pedidoRecetas:{
        type: 'string',
        required: true,
    },
});

const Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;

