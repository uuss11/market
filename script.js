document.addEventListener('DOMContentLoaded', () => {
    // Buttons for form switching and actions
    const showLoginFormBtn = document.getElementById('showLoginFormBtn');
    const showSignupFormBtn = document.getElementById('showSignupFormBtn');
    const loginBtn = document.getElementById('loginBtn'); // Renamed from header nav button for clarity
    const logoutBtn = document.getElementById('logoutBtn');
    const postProductBtn = document.getElementById('postProductBtn');

    // Form sections
    const authFormsSection = document.getElementById('authForms');
    const loginFormSection = document.getElementById('loginFormSection');
    const signupFormSection = document.getElementById('signupFormSection');
    const productsSection = document.getElementById('productsSection');

    // Forms and messages
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginMessage = document.getElementById('loginMessage');
    const signupMessage = document.getElementById('signupMessage');
    const postProductForm = document.getElementById('postProductForm');
    const postProductMessage = document.getElementById('postProductMessage');

    // Modals
    const postProductModal = document.getElementById('postProductModal');
    const closeButtons = document.querySelectorAll('.close-button');

    // **IMPORTANT SECURITY WARNING:**
    // HARDCODING CREDENTIALS IN CLIENT-SIDE JAVASCRIPT IS HIGHLY INSECURE.
    // ANYONE CAN VIEW THIS CODE. THIS IS FOR DEMONSTRATION PURPOSES ONLY.
    // FOR A REAL WEBSITE, YOU MUST USE A SECURE BACKEND FOR AUTHENTICATION.
    const OWNER_USERNAME = 'rrrr'; // <--- تم تحديث اسم المستخدم هنا
    const OWNER_PASSWORD = 'iioopp112233iioopp'; // <--- تم تحديث كلمة المرور هنا

    let isLoggedIn = false;
    let isOwner = false;

    // Function to update UI based on login status and role
    function updateUI() {
        if (isLoggedIn) {
            showLoginFormBtn.style.display = 'none';
            showSignupFormBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            authFormsSection.style.display = 'none'; // Hide auth forms
            productsSection.style.display = 'block'; // Show products section
            if (isOwner) {
                postProductBtn.style.display = 'inline-block';
            } else {
                postProductBtn.style.display = 'none';
            }
        } else {
            showLoginFormBtn.style.display = 'inline-block';
            showSignupFormBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            postProductBtn.style.display = 'none';
            authFormsSection.style.display = 'flex'; // Show auth forms
            productsSection.style.display = 'none'; // Hide products section
            loginFormSection.style.display = 'block'; // Ensure login form is visible by default
            signupFormSection.style.display = 'none'; // Hide signup form by default
        }
    }

    // Switch between login and signup forms
    showLoginFormBtn.addEventListener('click', () => {
        loginFormSection.style.display = 'block';
        signupFormSection.style.display = 'none';
        loginMessage.textContent = ''; // Clear messages
    });

    showSignupFormBtn.addEventListener('click', () => {
        loginFormSection.style.display = 'none';
        signupFormSection.style.display = 'block';
        signupMessage.textContent = ''; // Clear messages
    });

    // Handle Login Form Submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // **INSECURE CLIENT-SIDE AUTHENTICATION FOR DEMONSTRATION ONLY**
        // In a real application, this request would go to a secure backend.
        if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
            isLoggedIn = true;
            isOwner = true;
            loginMessage.textContent = 'تم تسجيل الدخول بنجاح كمالك!';
            loginMessage.className = 'message success';
            setTimeout(() => {
                updateUI();
                loginForm.reset();
            }, 1000);
        } else if (username && password) { // Assume any other valid credentials are a regular user
            // In a real app, this would involve checking a database for other users.
            isLoggedIn = true;
            isOwner = false;
            loginMessage.textContent = 'تم تسجيل الدخول بنجاح كمستخدم عادي.';
            loginMessage.className = 'message success';
            setTimeout(() => {
                updateUI();
                loginForm.reset();
            }, 1000);
        } else {
            isLoggedIn = false;
            isOwner = false;
            loginMessage.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
            loginMessage.className = 'message error';
        }
    });

    // Handle Signup Form Submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            signupMessage.textContent = 'كلمة المرور وتأكيد كلمة المرور غير متطابقين.';
            signupMessage.className = 'message error';
            return;
        }

        // **WARNING:** This is a frontend-only simulation.
        // Account data WILL NOT be saved or persist.
        // A real signup process requires a secure backend and database.
        signupMessage.textContent = `تم محاكاة إنشاء الحساب لـ "${username}". لا يتم حفظ البيانات فعليًا.`;
        signupMessage.className = 'message success';
        signupForm.reset();
        // Optionally, redirect to login after "signup"
        setTimeout(() => {
            showLoginFormBtn.click();
            signupMessage.textContent = '';
        }, 2000);
    });

    // Handle Logout
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        isOwner = false;
        // In a real system, you would send a request to the backend to invalidate the session.
        alert('تم تسجيل الخروج.');
        updateUI();
    });

    // Open Post Product Modal
    postProductBtn.addEventListener('click', () => {
        if (isOwner) {
            postProductModal.style.display = 'flex';
            postProductMessage.textContent = '';
            postProductForm.reset();
        } else {
            alert('ليس لديك صلاحية لنشر المنتجات.');
        }
    });

    // Close Modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            postProductModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == postProductModal) {
            postProductModal.style.display = 'none';
        }
    });

    // Handle Post Product Form Submission
    postProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productTitle = document.getElementById('productTitle').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImageFile = document.getElementById('productImage').files[0];
        const productExternalLink = document.getElementById('productExternalLink').value;

        if (!isOwner) {
            postProductMessage.textContent = 'ليس لديك صلاحية لنشر المنتجات.';
            postProductMessage.className = 'message error';
            return;
        }

        // **WARNING:** This is a frontend-only simulation.
        // File uploads and data saving require a secure backend.
        postProductMessage.textContent = 'جاري إرسال المنتج... (هذا جزء تجريبي).';
        postProductMessage.className = 'message';

        setTimeout(() => {
            let mediaSource = "لا يوجد";
            if (productImageFile) {
                mediaSource = `ملف محلي: ${productImageFile.name}`;
            } else if (productExternalLink) {
                mediaSource = `رابط خارجي: ${productExternalLink}`;
            }

            console.log('Product to be "posted":', { productTitle, productDescription, mediaSource });
            // In a real application, you would send this data to your backend API.

            postProductMessage.textContent = 'تم محاكاة نشر المنتج بنجاح! (لا يتم الحفظ فعليًا).';
            postProductMessage.className = 'message success';
            postProductForm.reset();
            setTimeout(() => {
                postProductModal.style.display = 'none';
            }, 1500);
        }, 2000);
    });

    // Initial UI update
    updateUI();
});
