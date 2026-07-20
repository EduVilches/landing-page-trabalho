//Consumo da API ViaCEP
const inputCep = document.getElementById('cep');
const inputCidade = document.getElementById('cidade');
const inputEstado = document.getElementById('estado');

inputCep.addEventListener('blur', () => {
  let cep = inputCep.value.replace(/\D/g, ''); //Remove tudo que não é número

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          inputCidade.value = data.localidade;
          inputEstado.value = data.uf;
        } else {
          alert('CEP não encontrado. Verifique o número digitado.');
          inputCidade.value = '';
          inputEstado.value = '';
        }
      })
      .catch(error => {
        console.error('Erro na requisição da API:', error);
        alert('Erro ao buscar o CEP. Tente novamente.');
      });
  }
});

//Ação do Botão e Feedback do Formulário
const form = document.getElementById('form-contato');
const feedback = document.getElementById('mensagem-sucesso');

form.addEventListener('submit', (e) => {
  e.preventDefault(); //Impede o recarregamento da página

  const nome = document.getElementById('nome').value;
  
  //Exibe mensagem de agradecimento
  feedback.textContent = `Obrigado pelo contato, ${nome}! Sua mensagem foi registrada com sucesso.`;
  feedback.classList.remove('hidden');
  
  //Limpa o formulário
  form.reset();
});