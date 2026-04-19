document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('user-name-input');
    const colorInput = document.getElementById('user-color-input');
    const saveBtn = document.getElementById('save-settings-btn');

    // تحميل البيانات المحفوظة مسبقاً إن وجدت
    nameInput.value = localStorage.getItem('najd_name') || '';
    colorInput.value = localStorage.getItem('najd_color') || '#d4af37';

    saveBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const color = colorInput.value;

        if (name.length < 2) {
            alert("يرجى كتابة اسم لائق (حرفين على الأقل)");
            return;
        }

        // حفظ في المتصفح
        localStorage.setItem('najd_name', name);
        localStorage.setItem('najd_color', color);

        alert("تم حفظ هويتك بنجاح!");
        window.location.href = 'index.html';
    });
});

