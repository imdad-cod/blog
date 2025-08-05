// موجودہ JavaScript کو یہ کوڈ سے تبدیل کریں
document.addEventListener('DOMContentLoaded', function() {
    // ایلیمنٹس کو منتخب کریں
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModals = document.querySelectorAll('.close');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminRegisterForm = document.getElementById('adminRegisterForm');
    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    const adminPanel = document.getElementById('adminPanel');
    const logoutBtn = document.getElementById('logoutBtn');
    const newPostBtn = document.getElementById('newPostBtn');
    const newBookBtn = document.getElementById('newBookBtn');
    const postForm = document.getElementById('postForm');
    const bookForm = document.getElementById('bookForm');
    const addPostForm = document.getElementById('addPostForm');
    const addBookForm = document.getElementById('addBookForm');
    
    // مقامی اسٹوریج میں صارفین کا ڈیٹا (حقیقی ایپلیکیشن میں ڈیٹابیس استعمال کریں)
    let users = JSON.parse(localStorage.getItem('blogUsers')) || [];
    
    // اگر کوئی صارف پہلے سے موجود نہیں ہے تو ڈیفالٹ ایڈمن شامل کریں
    if (users.length === 0) {
        users.push({
            username: 'admin',
            email: 'admin@example.com',
            password: 'password' // حقیقی ایپلیکیشن میں ہمیشہ پاس ورڈ ہیش کریں
        });
        localStorage.setItem('blogUsers', JSON.stringify(users));
    }
    
    // لاگ ان موڈل کو کھولیں
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        registerModal.style.display = 'none';
    });
    
    // رجسٹریشن موڈل کو کھولیں (اگر آپ رجسٹر کا بٹن شامل کرنا چاہتے ہیں)
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'block';
            loginModal.style.display = 'none';
        });
    }
    
    // لاگ ان فارم دکھائیں
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        registerModal.style.display = 'none';
    });
    
    // موڈل کو بند کریں
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // موڈل کے باہر کلک کرنے پر بند ہو
    window.addEventListener('click', function(e) {
        if (e.target === loginModal || e.target === registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });
    
    // ایڈمن لاگ ان فارم
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // صارف کی توثیق کریں
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            loginModal.style.display = 'none';
            adminPanel.style.display = 'block';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            
            // موجودہ صارف کو سیشن میں محفوظ کریں
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            alert('غلط صارف نام یا پاس ورڈ!');
        }
    });
    
    // ایڈمن رجسٹریشن فارم
    adminRegisterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // توثیق کریں
        if (password !== confirmPassword) {
            alert('پاس ورڈ اور تصدیقی پاس ورڈ مماثل نہیں ہیں!');
            return;
        }
        
        if (users.some(u => u.username === username)) {
            alert('یہ صارف نام پہلے سے موجود ہے!');
            return;
        }
        
        if (users.some(u => u.email === email)) {
            alert('یہ ای میل پہلے سے استعمال ہو رہی ہے!');
            return;
        }
        
        // نیا صارف شامل کریں
        users.push({
            username,
            email,
            password // حقیقی ایپلیکیشن میں ہمیشہ پاس ورڈ ہیش کریں
        });
        
        localStorage.setItem('blogUsers', JSON.stringify(users));
        
        alert('کامیابی سے رجسٹر ہو گئے! اب آپ لاگ ان کر سکتے ہیں۔');
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
        this.reset();
    });
    
    // لاگ آؤٹ
    logoutBtn.addEventListener('click', function() {
        adminPanel.style.display = 'none';
        postForm.style.display = 'none';
        bookForm.style.display = 'none';
        sessionStorage.removeItem('currentUser');
    });
    
    // نیا پوسٹ فارم دکھائیں
    newPostBtn.addEventListener('click', function() {
        postForm.style.display = 'block';
        bookForm.style.display = 'none';
    });
    
    // نیا کتاب فارم دکھائیں
    newBookBtn.addEventListener('click', function() {
        bookForm.style.display = 'block';
        postForm.style.display = 'none';
    });
    
    // نیا بلاگ پوسٹ شامل کریں
    addPostForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const imageFile = document.getElementById('postImage').files[0];
        
        // یہاں آپ سرور کو ڈیٹا بھیجیں گے
        console.log('نیا بلاگ پوسٹ:', { title, content, imageFile });
        
        // فارم ری سیٹ کریں
        this.reset();
        alert('بلاگ پوسٹ کامیابی سے شامل ہو گئی!');
    });
    
    // نئی کتاب شامل کریں
    addBookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const coverFile = document.getElementById('bookCover').files[0];
        const bookFile = document.getElementById('bookFile').files[0];
        
        // یہاں آپ سرور کو ڈیٹا بھیجیں گے
        console.log('نئی کتاب:', { title, author, coverFile, bookFile });
        
        // فارم ری سیٹ کریں
        this.reset();
        alert('کتاب کامیابی سے شامل ہو گئی!');
    });
    
    // موبائل مینو ٹوگل
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // اگر صارف پہلے سے لاگ ان ہے تو ایڈمن پینل دکھائیں
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        adminPanel.style.display = 'block';
    }
});