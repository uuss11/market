document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const postProductBtn = document.getElementById('postProductBtn');
    const loginModal = document.getElementById('loginModal');
    const postProductModal = document.getElementById('postProductModal');
    const closeButtons = document.querySelectorAll('.close-button');
    const loginForm = document.getElementById('loginForm');
    const postProductForm = document.getElementById('postProductForm');
    const loginMessage = document.getElementById('loginMessage');
    const postProductMessage = document.getElementById('postProductMessage');

    // **ملاحظة هامة:** هذا التحقق هو للمثال فقط على الواجهة الأمامية.
    // في نظام حقيقي، يجب أن يتم التحقق من المستخدم وصلاحياته على الواجهة الخلفية (Backend).
    const OWNER_USERNAME = 'r';
    const OWNER_PASSWORD_HASH = 'mock_hashed_password_for_r'; // هذا يجب أن يكون hash حقيقي لكلمة مرور آمنة.

    let isLoggedIn = false;
    let isOwner = false;

    // دالة لتحديث حالة الواجهة بناءً على تسجيل الدخول والصلاحيات
    function updateUI() {
        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            if (isOwner) {
                postProductBtn.style.display = 'inline-block';
            } else {
                postProductBtn.style.display = 'none';
            }
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            postProductBtn.style.display = 'none';
        }
    }

    // فتح نافذة تسجيل الدخول
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex'; // Use flex to center the modal
        loginMessage.textContent = ''; // Clear previous messages
        loginForm.reset();
    });

    // فتح نافذة نشر المنتج
    postProductBtn.addEventListener('click', () => {
        postProductModal.style.display = 'flex'; // Use flex to center the modal
        postProductMessage.textContent = ''; // Clear previous messages
        postProductForm.reset();
    });

    // إغلاق النوافذ المنبثقة
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.style.display = 'none';
            postProductModal.style.display = 'none';
        });
    });

    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target == postProductModal) {
            postProductModal.style.display = 'none';
        }
    });

    // معالجة نموذج تسجيل الدخول
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // **هذا الجزء يجب أن يتم على الواجهة الخلفية (Backend) بشكل آمن**
        // هذا مجرد مثال على الواجهة الأمامية لتوضيح المفهوم
        if (username === OWNER_USERNAME && password === 'bsx_h0_PLACEHOLDER') { // لا تستخدم رابط تلجرام ككلمة مرور!
            isLoggedIn = true;
            isOwner = true;
            loginMessage.textContent = 'تم تسجيل الدخول بنجاح كمالك!';
            loginMessage.style.color = 'green';
            setTimeout(() => {
                loginModal.style.display = 'none';
                updateUI();
            }, 1000);
        } else if (username !== '' && password !== '') { // مثال لمستخدم عادي (غير مالك)
            isLoggedIn = true;
            isOwner = false;
            loginMessage.textContent = 'تم تسجيل الدخول بنجاح كمستخدم عادي.';
            loginMessage.style.color = 'green';
            setTimeout(() => {
                loginModal.style.display = 'none';
                updateUI();
            }, 1000);
        }
        else {
            isLoggedIn = false;
            isOwner = false;
            loginMessage.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
            loginMessage.style.color = 'red';
        }
    });

    // معالجة تسجيل الخروج
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        isOwner = false;
        // في نظام حقيقي، يجب إرسال طلب للواجهة الخلفية لإنهاء الجلسة (session)
        alert('تم تسجيل الخروج.');
        updateUI();
    });

    // معالجة نموذج نشر المنتج
    postProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productTitle = document.getElementById('productTitle').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImage = document.getElementById('productImage').files[0]; // الملف المحمل

        if (isOwner) {
            // **هنا يجب إرسال البيانات (المنتج والصورة/الفيديو) إلى الواجهة الخلفية (Backend)**
            // الواجهة الخلفية ستقوم بحفظ البيانات في قاعدة البيانات وتخزين الملفات
            postProductMessage.textContent = 'جاري إرسال المنتج... (هذا جزء تجريبي).';
            postProductMessage.style.color = 'blue';

            // مثال بسيط: محاكاة إرسال البيانات
            setTimeout(() => {
                console.log('Product to be posted:', { productTitle, productDescription, productImage: productImage ? productImage.name : 'No file' });
                // في الواقع، ستتلقى ردًا من الخادم هنا
                postProductMessage.textContent = 'تم نشر المنتج بنجاح! (يجب أن يتم الحفظ في قاعدة بيانات حقيقية).';
                postProductMessage.style.color = 'green';
                postProductForm.reset();
                setTimeout(() => {
                    postProductModal.style.display = 'none';
                }, 1500);
            }, 2000);
        } else {
            postProductMessage.textContent = 'ليس لديك صلاحية لنشر المنتجات.';
            postProductMessage.style.color = 'red';
        }
    });

    // تهيئة الواجهة عند التحميل الأولي
    updateUI();
});
