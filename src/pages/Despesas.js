
import { useEffect, useState } from "react"
import Item from '../components/Item'
import Rodape from "../components/Rodape"
import Cabecalho from "../components/Cabecalho"
import Botao from '../components/Botao'
import InputText from '../components/InputText';
import { useNavigate } from 'react-router-dom';

export default function Despesas() {
 // const [listaDespesas, setListaDespesas] = useState(despesas.item)
  const [listaDespesas, setListaDespesas] = useState([])
  const [listaTipoDespesas, setTipoListaDespesa] = useState([])
  const [tipoDespesaSelecionada, setTipoDespesaSelecionada] = useState('');
  const [idDespesaAlterar, setIdDespesaAlterar] = useState('');
 // const [idTipoDespesaAlterar, setIdTipoDespesaAlterar] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:5001/listarDespesas')
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setListaDespesas(data.despesas);
      })
      .catch(error => console.error('Erro ao chamar a API:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/listarTipoDespesas')
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      setTipoListaDespesa(data.tipoDespesas);
    })
    .catch(error => console.error('Erro ao chamar a API:', error));
}, []);

  const abrirModal = () => {
    
    var modal = document.getElementById('idmodal');
    var idDespesaAlterar = document.getElementById("despesaIdEditar").value;
    var idTipoDespesaAlterar = document.getElementById("idTipoDespesaAlterar").value;
    if(idDespesaAlterar){
      const idConvertido = Number(idDespesaAlterar);
      const idTipoAlterado = Number(idTipoDespesaAlterar);
      const despesa = listaDespesas.find(despesa => Number(despesa.id_despesa) === idConvertido);
      let options = document.querySelector("#tipoDespesa");
      options[idTipoAlterado].selected = "selected;"
      document.querySelector("#descricao").value = despesa.descricao;
      document.querySelector("#quantidade").value = despesa.quantidade;
      document.querySelector("#valor").value = despesa.valor;
    }

    modal.showModal();
}

const limparModal = () => {
  document.querySelector("#descricao").value = "";
  document.querySelector("#quantidade").value = "";
  document.querySelector("#valor").value = "";
  document.getElementById("tipoDespesa").selectedIndex = 0;
  document.getElementById("despesaIdEditar").value = "";
  document.getElementById("idTipoDespesaAlterar").value = "";
}

const fechaModal = () =>{
    var modal = document.getElementById('idmodal');
    limparModal();
    modal.close();
  } 

const selectTipoDespesa = (event) => {
  setTipoDespesaSelecionada(event.target.value);
  setIdDespesaAlterar(document.getElementById('despesaIdEditar').value);
 // setIdTipoDespesaAlterar(document.getElementById('idTipoDespesaAlterar').value);
};
const submit = (e) => {
  e.preventDefault(); 
    const valores = {
        descricao: e.target.elements.descricao.value,
        quantidade: e.target.elements.quantidade.value,
        valor: e.target.elements.valor.value
    }

//    var combo = document.getElementById("tipoDespesa");
//    var opcaoSelecionada = combo.options[combo.selectedIndex];
//    if (opcaoSelecionada) {
//      var texto = opcaoSelecionada.text;
//    }

//    const despesaTela  = [ {
//        "descricao": valores.descricao,
//        "quantidade": valores.quantidade,
//        "tipo_despesa": {
//          "descricao": texto,
//        },
//        "valor": valores.valor
//     } 
//    ]

    const formData = new FormData();


  if (valores.descricao !== '' || valores.quantidade !== '' || valores.valor !== ''){

   // const despesaIdEditar = document.getElementById("despesaIdEditar").value;

    if (idDespesaAlterar !== '') {
        formData.append('id', idDespesaAlterar);
        formData.append('descricao', valores.descricao);
        formData.append('quantidade', valores.quantidade);
        formData.append('valor', valores.valor);
        formData.append('tipo_despesa_id', tipoDespesaSelecionada);
        editarDespesa(formData);
        window.location.reload();
      } else if (document.getElementById("despesaIdEditar").value !== '') {
        formData.append('id', document.getElementById("despesaIdEditar").value);
        formData.append('descricao', valores.descricao);
        formData.append('quantidade', valores.quantidade);
        formData.append('valor', valores.valor);
        formData.append('tipo_despesa_id', document.getElementById("tipoDespesa").value);
        editarDespesa(formData);
        window.location.reload();
      } else {
        formData.append('descricao', valores.descricao);
        formData.append('quantidade', valores.quantidade);
        formData.append('valor', valores.valor);
        formData.append('tipo_despesa_id', tipoDespesaSelecionada);
        adicionarDespesa(formData);
        window.location.reload();
      }
    }
  }
  
  const adicionarDespesa = (formData) => {

  let descricao = document.querySelector("#descricao").value;
  let quantidade = document.querySelector("#quantidade").value;
  let valor = document.querySelector("#valor").value;
  let tipoDespesa = document.querySelector('#tipoDespesa option:checked').value

  if (descricao === '') {
    alert("Descrição da despesa obrigatória!");
  } else if (quantidade === '') {
    alert("Quantidade deve ser informada!");
  } else if (valor === ''){
    alert("O valor deve ser informado!");
  } else if (tipoDespesa ==='') {
    alert("O tipo de despesa deve ser informado!");
  } else {

    let url = 'http://localhost:5001/adicionaDespesa';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
      alert("Despesa incluida com sucesso!")
  }
}

  const editarDespesa = (formData) => {
    let url = 'http://localhost:5001/editarDespesa';
    fetch(url, {
      method: 'put',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
      alert("Despesa alterada com sucesso!")
  }

const navigate = useNavigate();

const verificarResumo = () => {
  navigate('/Resumo', { state: { listaDespesas } });
};

const removerDespesaDaLista = (idDespesa) => {
  setListaDespesas((listaDespesas) =>
    listaDespesas.filter((despesa) => despesa.id_despesa !== idDespesa)
  );
};

  return (
    <div>
      <Cabecalho titulo="Controle de despesas" />
      <br/>
        <section className="items">
          <table>
            <tbody id="tabela">
                <tr>
                    <th>Tipo de Despesa</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th colSpan="2">Ações</th>
                </tr>
                {listaDespesas.map((despesa, index) => (
                  <Item key={index} despesa={despesa} removerDespesaDaLista={removerDespesaDaLista} abrirModal={abrirModal}/>
                ))}
              </tbody>
          </table>
        </section>
        <div>
            <br/>
            <menu className='menuBotoes'>
                <Botao id="addBtn" className="addBtn" acao={abrirModal} value="Adicionar Despesa"/>
                <Botao id="addBtn" className="addBtn" acao={verificarResumo} value="Verificar Resumo" />
            </menu>
            <dialog className="modal" id="idmodal">
                <div className="modalTitle">Informações da nova despesa</div>
                <div>
                    <form method="dialog" onSubmit={submit}>
                    <input type="hidden" id="despesaIdEditar" value=""/>
                    <input type="hidden" id="idTipoDespesaAlterar" value=""/>
                        <p className="alerta">*Todos os campos são de preenchimento obrigatório</p>
                        <br/>
                        <div className="input">
                            <select id="tipoDespesa" name="tipoDespesa" value={tipoDespesaSelecionada} onChange={selectTipoDespesa}>
                                <option>Tipo de despesa:</option>
                                {listaTipoDespesas.map((tipoDespesa, index) => (
                                  <option key={index} value={tipoDespesa.id}>
                                    {tipoDespesa.descricao}
                                  </option>
                                ))}
                            </select>
                            <InputText id="descricao" placeholder="Descrição" name="descricao"/>
                            <InputText id="quantidade" placeholder="Quantidade" name="quantidade"/>
                            <InputText id="valor" placeholder="Valor" name="valor"/>
                        </div>
                        <menu className='menuBotoes'>
                            <Botao type="button" id="cancelar" className="btnCancelar" acao={fechaModal} value="Cancelar"></Botao>
                            <Botao id="botaoSalvar" className="btnSalvar" value="Salvar" submit={adicionarDespesa}></Botao>
                        </menu>
                    </form>
                </div>
            </dialog>
        </div>
      <Rodape />
  </div>
  )
}
