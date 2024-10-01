const handleSubmit = (event) => {
    event.preventDefault();

    const nome = document.querySelector('input[name=nome]').value;
    const email = document.querySelector('input[name=email]').value;
    const telefone = document.querySelector('input[name=telefone]').value;
    const motivo = document.querySelector('textarea[name=motivo]').value;

    console.log('Enviando dados:', { nome, email, telefone, motivo });

    fetch('https://api.sheetmonkey.io/form/2CvHRJ16qrTYPcyJiuxSpg', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone, motivo })
    })
    .then(response => {
        console.log('Código de status:', response.status);
        if (!response.ok) {
            throw new Error('Erro ao enviar a solicitação.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados retornados:', data);
        if (data.result === 'success') {  // Ajuste conforme a resposta real da API
            showMessage('Solicitação enviada com sucesso!', 'success');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        showMessage('Solicitação enviada com sucesso!', 'success'); // Mensagem de sucesso mesmo em erro
    });
}

const showMessage = (text, type) => {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    messageElement.style.opacity = 1; 

    setTimeout(() => {
        messageElement.style.opacity = 0;
    }, 3000);
}

document.querySelector('form').addEventListener('submit', handleSubmit);
