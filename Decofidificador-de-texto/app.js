document.addEventListener('DOMContentLoaded', function () {
    // Seleciona os elementos necessários do DOM
    const textarea = document.getElementById('inputText');
    const encryptButton = document.querySelector('button[onclick="criptografar()"]');
    const decryptButton = document.querySelector('button[onclick="descriptografar()"]');
    const encryptedTextElement = document.getElementById('outputMessage');
    const copyButton = document.getElementById('copyButton');
    const copyMessage = document.getElementById('copyMessage');
    let originalText = '';

    // Evento para filtrar a entrada do usuário no textarea
    textarea.addEventListener('input', function () {
        // Remove caracteres que não sejam letras minúsculas ou espaços
        const filteredText = textarea.value.replace(/[^a-z\s]/g, '');
        textarea.value = filteredText; // Atualiza o textarea com o texto filtrado
    });

    // Função para criptografar o texto inserido
    function criptografar() {
        const text = textarea.value;
        if (text.trim() === '') {
            // Se o textarea estiver vazio, exibe uma mensagem padrão
            encryptedTextElement.innerText = 'Digite um texto que você deseja criptografar ou descriptografar.';
            copyButton.style.display = 'none'; // Esconde o botão de copiar
        } else {
            originalText = text; // Armazena o texto original para uso futuro
            // Aplica uma cifra de César com deslocamento de 3 para criptografar
            const encryptedText = text.replace(/[a-z]/g, function (char) {
                return String.fromCharCode((char.charCodeAt(0) - 97 + 3) % 26 + 97);
            });
            encryptedTextElement.innerText = encryptedText; // Exibe o texto criptografado
            copyButton.style.display = 'block'; // Mostra o botão de copiar
        }
    }

    // Função para descriptografar o texto exibido
    function descriptografar() {
        const encryptedText = encryptedTextElement.innerText;
        if (encryptedText.trim() === '' || encryptedText === 'Digite um texto que você deseja criptografar ou descriptografar.') {
            // Se não houver texto para descriptografar, reseta a interface
            textarea.value = '';
            encryptedTextElement.innerText = 'Digite um texto que você deseja criptografar ou descriptografar.';
            copyButton.style.display = 'none'; // Esconde o botão de copiar
        } else {
            // Aplica uma cifra de César com deslocamento inverso de 3 para descriptografar
            const decryptedText = encryptedText.replace(/[a-z]/g, function (char) {
                return String.fromCharCode((char.charCodeAt(0) - 97 - 3 + 26) % 26 + 97);
            });
            textarea.value = decryptedText; // Atualiza o textarea com o texto descriptografado
            encryptedTextElement.innerText = 'Nenhuma mensagem encontrada.'; // Reseta a mensagem criptografada
            copyButton.style.display = 'none'; // Esconde o botão de copiar
        }
    }

    // Função para copiar o texto criptografado para a área de transferência
    function copiarTexto() {
        const encryptedText = encryptedTextElement.innerText;
        if (encryptedText && encryptedText !== 'Digite um texto que você deseja criptografar ou descriptografar.') {
            navigator.clipboard.writeText(encryptedText).then(() => {
                // Mostra a mensagem de confirmação
                copyMessage.style.display = "inline";
                // Esconde a mensagem após 3 segundos
                setTimeout(() => {
                    copyMessage.style.display = "none";
                }, 3000); // A mensagem desaparece após 3 segundos
            }).catch(err => {
                alert('Erro ao copiar texto: ', err);
            });
        }
    }

    // Adiciona eventos de clique aos botões de criptografar, descriptografar e copiar
    encryptButton.addEventListener('click', criptografar);
    decryptButton.addEventListener('click', descriptografar);
    copyButton.addEventListener('click', copiarTexto);
});

