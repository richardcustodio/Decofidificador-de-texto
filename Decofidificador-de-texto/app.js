document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const textarea = document.getElementById('inputText'); // Área de texto para entrada do usuário
    const keyInput = document.getElementById('key'); // Campo de entrada para a chave
    const encryptButton = document.getElementById('encryptButton'); // Botão para criptografar
    const decryptButton = document.getElementById('decryptButton'); // Botão para descriptografar
    const copyButton = document.getElementById('copyButton'); // Botão para copiar o texto criptografado
    const copyMessage = document.getElementById('copyMessage'); // Mensagem de confirmação de cópia
    const encryptErrorMessage = document.getElementById('encryptErrorMessage'); // Mensagem de erro de criptografia
    const decryptErrorMessage = document.getElementById('decryptErrorMessage'); // Mensagem de erro de descriptografia
    let encryptedText = ''; // Variável para armazenar o texto criptografado

    // Função para criptografar o texto usando a Cifra de César
    function criptografar() {
        const text = textarea.value;
        const key = parseInt(keyInput.value);

        // Resetando mensagens de erro
        encryptErrorMessage.style.display = 'none';

        // Verifica se o texto ou a chave estão vazios
        if (text.trim() === '' || isNaN(key)) {
            encryptErrorMessage.textContent = 'Digite um texto e uma chave para criptografar.';
            encryptErrorMessage.style.display = 'inline';
            return;
        }

        // Criptografa o texto e exibe no textarea
        encryptedText = caesarEncrypt(text, key);
        textarea.value = encryptedText;
        textarea.setAttribute('readonly', true);
        keyInput.value = '';

        // Ajusta a visibilidade dos botões
        encryptButton.style.display = 'none';
        decryptButton.style.display = 'inline-block';
        copyButton.style.display = 'inline-block';
    }

    // Função para descriptografar o texto usando a Cifra de César
    function descriptografar() {
        const key = parseInt(keyInput.value);

        // Resetando mensagens de erro
        decryptErrorMessage.style.display = 'none';

        // Verifica se o texto criptografado ou a chave estão vazios
        if (encryptedText.trim() === '' || isNaN(key)) {
            decryptErrorMessage.textContent = 'Digite uma chave para descriptografar.';
            decryptErrorMessage.style.display = 'inline';
            return;
        }

        // Descriptografa o texto e exibe no textarea
        const decryptedText = caesarDecrypt(encryptedText, key);
        textarea.value = decryptedText;
        textarea.removeAttribute('readonly');

        // Ajusta a visibilidade dos botões
        decryptButton.style.display = 'none';
        copyButton.style.display = 'none';
        encryptButton.style.display = 'inline-block';
    }

    // Função para copiar o texto criptografado para a área de transferência
    function copiarTexto() {
        const text = textarea.value;
        navigator.clipboard.writeText(text).then(() => {
            copyMessage.style.display = "inline";
            setTimeout(() => {
                copyMessage.style.display = "none";
            }, 3000);
        }).catch(err => {
            alert('Erro ao copiar texto: ', err);
        });
    }

    // Função para criptografar o texto usando a Cifra de César
    function caesarEncrypt(text, key) {
        return text.replace(/[a-z]/g, function (c) {
            return String.fromCharCode((c.charCodeAt(0) - 97 + key) % 26 + 97);
        });
    }

    // Função para descriptografar o texto usando a Cifra de César
    function caesarDecrypt(text, key) {
        return text.replace(/[a-z]/g, function (c) {
            return String.fromCharCode((c.charCodeAt(0) - 97 - key + 26) % 26 + 97);
        });
    }

    // Adiciona eventos aos botões
    encryptButton.addEventListener('click', criptografar);
    decryptButton.addEventListener('click', descriptografar);
    copyButton.addEventListener('click', copiarTexto);

    // Restringe a entrada de texto para letras minúsculas e espaços
    textarea.addEventListener('input', function () {
        textarea.value = textarea.value.toLowerCase().replace(/[^a-z\s]/g, '');
    });
});

