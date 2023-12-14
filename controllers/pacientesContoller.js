const Paciente = require("../models/Paciente")

const deletePacienteById = async (req, res) => {
    const { id } = req.params;
  
    try {
        const PacienteDelete = await Paciente.findOneAndDelete({ _id: id });
  
      if (!PacienteDelete) {
        res.status(404).json({
          message: "Paciente not found",
        });
        return;
      }
  
      res.status(200).json({
        message: "Paciente deleted successfully",
        user: {
          id: PacienteDelete.id,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


module.exports = { deletePacienteById }