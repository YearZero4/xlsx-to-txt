const fileInput = document.getElementById('file-input');
const convertButton = document.getElementById('convert');
const uploadInfo = document.getElementById('upload-info');
const loader = document.getElementsByClassName('contenedor-loader')[0];
fileInput.addEventListener('change', function(event) {
const files = event.target.files;

if (files.length > 0) {
convertButton.disabled = false;
uploadInfo.innerHTML = 'ARCHIVO(S) CARGADOS CORRECTAMENTE';
} else {
convertButton.disabled = true;
uploadInfo.innerHTML = '';
}
});

convertButton.addEventListener('click', async (event) => {
event.preventDefault();

const formData = new FormData();
const files = fileInput.files;
for (let file of files) {
formData.append('files[]', file);
}

loader.style.display = 'flex';

try {
const response = await fetch(uploadUrl, {
method: 'POST',
body: formData,
});

if (response.ok) {
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'archivo.txt';
document.body.appendChild(a);
a.click();
a.remove();
window.URL.revokeObjectURL(url);
loader.style.display = 'none';
uploadInfo.innerHTML = '';
} else {
throw new Error('Error en la conversión');
}
} catch (error) {
console.error(error);
loader.style.display = 'none';
alert('Hubo un error al convertir el archivo.');
}
});
