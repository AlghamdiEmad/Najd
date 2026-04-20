// 1. تعريف العناصر (خارج أي قوس عشان الكل يشوفها)
const nameInput = document.getElementById('userName');
const colorInput = document.getElementById('userColor');

// 2. تحميل البيانات فوراً عند فتح الملف
if (nameInput && colorInput) {
    nameInput.value = localStorage.getItem('user_name') || '';
    colorInput.value = localStorage.getItem('user_color') || '#ffffff';
}

// 3. الدالة اللي يناديها الزر (لازم تكون بره بدون DOMContentLoaded)
function saveSettings() {
    const name = nameInput.value.trim();
    const color = colorInput.value;

    if (name.length < 2) {
        alert("يرجى كتابة اسم لائق (حرفين على الأقل)");
        return;
    }

    // التخزين بالأسماء اللي يفهمها post.js
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_color', color);

    alert("تم حفظ هويتك بنجاح!");
    window.location.href = 'index.html';
}
