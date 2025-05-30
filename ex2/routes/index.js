var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET home page: lista das edições */
router.get('/', async (req, res) => {
  try {
    // Pede lista de edições com anoEdicao, organizador e vencedor
    const response = await axios.get('http://localhost:25000/edicoes');
    const edicoes = response.data;

    res.render('index', { edicoes }); // Passa a lista para a view 'index'
  } catch (err) {
    console.error('Erro ao obter edições:', err.message);
    res.status(500).send('Erro ao obter edições');
  }
});

/* GET página de edição por id */
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Obter edição específica incluindo lista de músicas
    const response = await axios.get(`http://localhost:25000/edicoes/${id}`);

    if (!response.data) {
      return res.status(404).send('Edição não encontrada');
    }

    const edicao = response.data;

    res.render('edicao', { edicao }); // Passa a edição para a view 'edicao'
  } catch (err) {
    console.error('Erro ao obter edição:', err.message);
    res.status(500).send('Erro ao obter edição');
  }
});

router.get('/paises/:pais', async (req, res) => {
  try {
    const pais = req.params.pais;

    const orgResponse = await axios.get(`http://localhost:25000/edicoes?org=${pais}`);
    const organizadas = orgResponse.data;

    const vencResponse = await axios.get('http://localhost:25000/edicoes?papel=venc');

    const paisVencedor = vencResponse.data.find(pv => pv.pais === pais);
    const vencidas = paisVencedor ? paisVencedor.anos : [];

    const allEdicoesResponse = await axios.get('http://localhost:25000/edicoes');
    const allEdicoes = allEdicoesResponse.data;

    const vencidasDetalhadas = allEdicoes.filter(e => e.vencedor === pais);

    const participacoesMap = new Map();

    organizadas.forEach(e => participacoesMap.set(e._id || e.id || e.anoEdicao, { ...e, venceu: false }));
    vencidasDetalhadas.forEach(e => {
      const key = e._id || e.id || e.anoEdicao;
      if (participacoesMap.has(key)) {
        participacoesMap.get(key).venceu = true;
      } else {
        participacoesMap.set(key, { ...e, venceu: true });
      }
    });

    const participacoes = Array.from(participacoesMap.values());

    // Passar para render
    res.render('pais', {
      pais,
      organizadas,
      vencidas: vencidasDetalhadas,
      participacoes
    });
  } catch (err) {
    console.error('Erro ao obter dados do país:', err.message);
    res.status(500).send('Erro ao obter dados do país');
  }
});


module.exports = router;
