const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente')
/* const { deletePacienteById } = require('../controllers/pacientesContoller') */



router.get('/encontrados/:id', async (req, res) => {
  try {
    const pacienteId = req.params.id;
  
    const pacientes = await Paciente.find({_id:pacienteId});

    res.json(pacientes);
  } catch (error) {
    console.error('Error al obtener detalles del paciente', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/actualizar/:id', async (req, res) => {
  const pacientes = await Paciente.find();
  res.json({
    pacientes: pacientes
  });

});

router.put('/actualizar/:id', async (req, res) => {
  const { id } = req.params;

  const {
    nombre,
    fechaNac,
    telefono,
    motivoConsulta,
    medicacionActual,
    laboratorios,
    pedidoRecetas,
  } = req.body;

  try {
    const pacienteActualizado = await Paciente.findOneAndUpdate(
      { _id: id }, 
      {
        nombre,
        fechaNac,
        telefono,
        motivoConsulta,
        medicacionActual,
        laboratorios,
        pedidoRecetas,
      },
      {
        new: true,
      }
    );

    if (!pacienteActualizado) {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
      return;
    }

    res.status(200).json(pacienteActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
router.get('/', async (req, res) => {
  const pacientes = await Paciente.find();
  res.json({
    pacientes: pacientes
  });

});

router.get('/buscador', async (req,res) => {
  const {nombre} = req.query;

  console.log(`El cliente busca ${nombre}`);

  const pacientes = await Paciente.find( { nombre:nombre });

  console.log(`La database responde con ${pacientes}`);

  res.json({
    pacientes: pacientes
  });
});



router.post('/nuevo', async (req, res) => {

  const { nombre, fechaNac, telefono, motivoConsulta, medicacionActual, laboratorios, pedidoRecetas } = req.body;

  const paciente = new Paciente({
    nombre: nombre,
    fechaNac: fechaNac,
    telefono: telefono,
    motivoConsulta: motivoConsulta,
    medicacionActual: medicacionActual,
    laboratorios: laboratorios,
    pedidoRecetas: pedidoRecetas

  });

  await Paciente.create(paciente);

  console.log(`Soy el back y recibí estos datos ${nombre}, ${fechaNac}, ${telefono}, ${motivoConsulta}, ${medicacionActual}, ${laboratorios}, ${pedidoRecetas}`)

  res.json({ 
    mensaje: 'Creamos un paciente nuevo en la base de datosmedica'
  });
});


router.get('/buscador', async (req, res) => {

  const { nombre } = req.body;

  console.log(nombre);

  const pacientes = await Paciente.find({ nombre: nombre })

})



router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pacienteEliminado = await Paciente.findOneAndDelete({ _id: id });

    if (!pacienteEliminado) {
      return res.status(404).json({ message: 'Paciente not found' });
    }

    res.json({ message: 'Paciente deleted successfully', paciente: pacienteEliminado });
  } catch (error) {
    console.error('Error al eliminar el paciente', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});




module.exports = router;