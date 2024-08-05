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

    // Função para criptografar o texto usando AES
    function criptografar() {
        const text = textarea.value;
        const key = keyInput.value;

        // Resetando mensagens de erro
        encryptErrorMessage.style.display = 'none';

        // Verifica se o texto ou a chave estão vazios
        if (text.trim() === '' || key.trim() === '') {
            encryptErrorMessage.textContent = 'Digite um texto e uma chave para criptografar.';
            encryptErrorMessage.style.display = 'inline';
            return;
        }

        // Criptografa o texto e exibe no textarea
        encryptedText = aesEncrypt(text, key);
        textarea.value = encryptedText;
        textarea.setAttribute('readonly', true);
        keyInput.value = '';

        // Ajusta a visibilidade dos botões
        encryptButton.style.display = 'none';
        decryptButton.style.display = 'inline-block';
        copyButton.style.display = 'inline-block';
    }

    // Função para descriptografar o texto usando AES
    function descriptografar() {
        const key = keyInput.value;

        // Resetando mensagens de erro
        decryptErrorMessage.style.display = 'none';

        // Verifica se o texto criptografado ou a chave estão vazios
        if (encryptedText.trim() === '' || key.trim() === '') {
            decryptErrorMessage.textContent = 'Digite uma chave para descriptografar.';
            decryptErrorMessage.style.display = 'inline';
            return;
        }

        // Descriptografa o texto e exibe no textarea
        const decryptedText = aesDecrypt(encryptedText, key);
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

    // Função para criptografar o texto usando AES
    function aesEncrypt(text, key) {
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        return encrypted;
    }

    // Função para descriptografar o texto usando AES
    function aesDecrypt(encryptedText, key) {
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // Função para filtrar o texto de entrada, permitindo apenas letras maiúsculas e espaços
    function filterInput(event) {
        const input = event.target.value;
        const filtered = input.replace(/[^A-Z\s]/g, ''); // Apenas letras maiúsculas e espaços
        if (input !== filtered) {
            event.target.value = filtered;
        }
    }

    // Adiciona o evento de input ao textarea para aplicar o filtro enquanto o usuário digita
    textarea.addEventListener('input', filterInput);

    // Adiciona eventos de clique aos botões
    encryptButton.addEventListener('click', criptografar);
    decryptButton.addEventListener('click', descriptografar);
    copyButton.addEventListener('click', copiarTexto);
});

