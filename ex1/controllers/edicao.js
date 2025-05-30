const Edicao = require('../models/edicao');

module.exports.findAll = () => Edicao.find();

module.exports.findById = ( id ) => Edicao.findById( id );

module.exports.getEdicoesByOrganizador = async (org) => {
  return Edicao.find({ organizacao: org }, 'anoEdicao organizacao vencedor').exec();
}

module.exports.getPaisesOrganizadores = async () => {
  const result = await Edicao.aggregate([
    {
      $group: {
        _id: "$organizacao",
        anos: { $push: "$anoEdicao" }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        pais: "$_id",
        anos: 1
      }
    }
  ]);
  return result;
}

module.exports.getPaisesVencedores = async () => {
  const result = await Edicao.aggregate([
    {
      $group: {
        _id: "$vencedor",
        anos: { $push: "$anoEdicao" }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        pais: "$_id",
        anos: 1
      }
    }
  ]);
  return result;
}

module.exports.getInterpretes = async () => {
  const result = await Edicao.aggregate([
    { $unwind: "$musicas" },
    {
      $group: {
        _id: {
          interprete: "$musicas.interprete",
          país: "$musicas.pais"
        }
      }
    },
    {
      $project: {
        _id: 0,
        interprete: "$_id.interprete",
        pais: "$_id.pais"
      }
    },
    { $sort: { interprete: 1 } }
  ]);
  return result;
}

module.exports.addEdicao = async (edicaoData) => {
  const edicao = new Edicao(edicaoData);
  return edicao.save();
}

module.exports.deleteEdicaoById = async (id) => {
  return Edicao.findByIdAndDelete(id).exec();
}

module.exports.updateEdicaoById = async (id, updateData) => {
  return Edicao.findByIdAndUpdate({ _id: id }, updateData, { new: true }).exec();
}

