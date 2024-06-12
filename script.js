function generateQRCode() {
    const url = document.getElementById('urlInput').value;
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = "";

    const qrCode = new QRCode(qrCodeContainer, {
        text: url,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById('downloadBtn').style.display = 'block';
    document.getElementById('formatSelect').style.display = 'block';
}

function downloadQRCode() {
    const qrCodeContainer = document.getElementById('qrCode').querySelector('canvas');
    const svgElement = document.getElementById('qrCode').querySelector('svg');
    const format = document.getElementById('formatSelect').value;

    if (format === 'png' && qrCodeContainer) {
        const link = document.createElement('a');
        link.href = qrCodeContainer.toDataURL("image/png");
        link.download = 'qrcode.png';
        link.click();
    } else if (format === 'svg' && svgElement) {
        const svgBlob = new Blob([svgElement.outerHTML], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.svg';
        link.click();
        URL.revokeObjectURL(url);
    }
}