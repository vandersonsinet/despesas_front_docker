export default function Item(props) {

    const { despesa, removerDespesaDaLista, abrirModal } = props;

    const excluirDespesa = (idDespesa) => {
        const url = `http://localhost:5001/removerDespesa?id=${idDespesa}`;
    
        fetch(url, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            alert('Despesa deletada com sucesso!');
            removerDespesaDaLista(idDespesa);
          } else {
            alert('Erro ao deletar a despesa');
          }
        })
        .catch(error => {
          console.error('Erro ao deletar a despesa:', error);
        });
      }

      const editarDespesa = (idDespesaAlterar, idTipoDespesaAlterar) => {
        document.getElementById("despesaIdEditar").value = idDespesaAlterar;
        document.getElementById("idTipoDespesaAlterar").value = idTipoDespesaAlterar;
        abrirModal(abrirModal);
      }

    return (
            <tr>
                <td>
                    <span>{despesa.tipo_despesa?.descricao ?? 'indisponivel'}</span>
                </td>
                <td>
                    <span>{despesa.descricao}</span>
                </td>
                <td>
                    <span>{despesa.quantidade}</span>
                </td>
                <td>
                    <span>R$ {despesa.valor}</span>
                </td>
                <td>
                    <img src="editar.png" width="30" height="35" alt="Editar despesa" onClick={() => editarDespesa(despesa.id_despesa, despesa.tipo_despesa.id)} />
                </td>
                <td>
                     <img src="lixeira.png" width="30" height="35" alt="Excluir despesa" onClick={() => excluirDespesa(despesa.id_despesa)} />
                </td>
            </tr>
    );
}