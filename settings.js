function saveSettings() {
    // نجلب العناصر داخل الدالة لضمان أنها موجودة لحظة الضغط
    const nameInput = document.getElementById('userName');
    const colorInput = document.getElementById('userColor');

    const name = nameInput.value.trim();
    const color = colorInput.value;

    if (name.length < 2) {
        alert("يرجى كتابة اسم لائق (حرفين على الأقل)");
        return;
    }

    localStorage.setItem('user_name', name);
    localStorage.setItem('user_color', color);

    alert("تم حفظ هويتك بنجاح!");
    window.location.href = 'index.html';
}

// تحميل البيانات القديمة عند فتح الصفحة
window.onload = () => {
    const nameInput = document.getElementById('userName');
    const colorInput = document.getElementById('userColor');
    if(nameInput) nameInput.value = localStorage.getItem('user_name') || '';
    if(colorInput) colorInput.value = localStorage.getItem('user_color') || '#ffffff';
};
