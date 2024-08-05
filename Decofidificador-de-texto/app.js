document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const textarea = document.getElementById('inputText');
    const keyInput = document.getElementById('key');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const copyButton = document.getElementById('copyButton');
    const copyMessage = document.getElementById('copyMessage');
    const encryptErrorMessage = document.getElementById('encryptErrorMessage');
    const decryptErrorMessage = document.getElementById('decryptErrorMessage');
    let encryptedText = '';

    function criptografar() {
        const text = textarea.value;
        const key = keyInput.value;

        // Resetando mensagens de erro
        encryptErrorMessage.style.display = 'none';

        if (text.trim() === '' || key.trim() === '') {
            encryptErrorMessage.textContent = 'Digite um texto e uma chave para criptografar.';
            encryptErrorMessage.style.display = 'inline';
            return;
        }

        encryptedText = aesEncrypt(text, key);
        textarea.value = encryptedText;
        textarea.setAttribute('readonly', true);
        keyInput.value = '';

        encryptButton.style.display = 'none';
        decryptButton.style.display = 'inline-block';
        copyButton.style.display = 'inline-block';
    }

    function descriptografar() {
        const key = keyInput.value;

        // Resetando mensagens de erro
        decryptErrorMessage.style.display = 'none';

        if (encryptedText.trim() === '' || key.trim() === '') {
            decryptErrorMessage.textContent = 'Digite uma chave para descriptografar.';
            decryptErrorMessage.style.display = 'inline';
            return;
        }

        const decryptedText = aesDecrypt(encryptedText, key);
        textarea.value = decryptedText;
        textarea.removeAttribute('readonly');

        decryptButton.style.display = 'none';
        copyButton.style.display = 'none';
        encryptButton.style.display = 'inline-block';
    }

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

    function aesEncrypt(text, key) {
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        return encrypted;
    }

    function aesDecrypt(encryptedText, key) {
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // Função para filtrar o texto de entrada
    function filterInput(event) {
        const input = event.target.value;
        const filtered = input.replace(/[^a-z\s]/g, ''); // Apenas letras minúsculas e espaços
        if (input !== filtered) {
            event.target.value = filtered;
        }
    }

    textarea.addEventListener('input', filterInput);

    encryptButton.addEventListener('click', criptografar);
    decryptButton.addEventListener('click', descriptografar);
    copyButton.addEventListener('click', copiarTexto);
});
