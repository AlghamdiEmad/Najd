document.addEventListener('DOMContentLoaded', () => {
    // التأكد من ربط العناصر بالـ ID الصحيح الموجود في HTML
    const nameInput = document.getElementById('userName'); 
    const colorInput = document.getElementById('userColor');
    const saveBtn = document.querySelector('.save-btn');

    // 1. تحميل البيانات باستخدام المسمى الموحد user_
    nameInput.value = localStorage.getItem('user_name') || '';
    colorInput.value = localStorage.getItem('user_color') || '#ffffff';

    saveBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const color = colorInput.value;

        if (name.length < 2) {
            alert("يرجى كتابة اسم لائق (حرفين على الأقل)");
            return;
        }

        // 2. التخزين باستخدام المسمى الموحد user_ ليتعرف عليه ملف post.js
        localStorage.setItem('user_name', name);
        localStorage.setItem('user_color', color);

        alert("تم حفظ هويتك بنجاح!");
        window.location.href = 'index.html';
    });
});
