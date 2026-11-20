// Ubah daftar kata sandi di bawah ini sesuai keinginan Anda (huruf kecil semua)
const VALID_PASSWORDS = ['020206'];

const loginScreen = document.getElementById('login-screen');
const greetingScreen = document.getElementById('greeting-screen');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password-input');
const togglePasswordBtn = document.getElementById('toggle-password');
const eyeOpen = document.getElementById('eye-open');
const eyeClosed = document.getElementById('eye-closed');
const errorMsg = document.getElementById('error-msg');
const lockBtn = document.getElementById('lock-btn');
const hintChips = document.querySelectorAll('.hint-chip');

function replayAnimation(element) {
  element.style.animation = 'none';
  void element.offsetWidth; // Memicu reflow agar animasi berjalan ulang
  element.style.animation = '';
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
  passwordInput.classList.add('input-error');

  loginScreen.classList.remove('shake');
  void loginScreen.offsetWidth;
  loginScreen.classList.add('shake');
}

function clearError() {
  errorMsg.classList.add('hidden');
  passwordInput.classList.remove('input-error');
}

// Tampilkan / sembunyikan kata sandi
togglePasswordBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  eyeOpen.classList.toggle('hidden', isPassword);
  eyeClosed.classList.toggle('hidden', !isPassword);
});

// Hapus status error saat mengetik ulang
passwordInput.addEventListener('input', () => {
  if (!errorMsg.classList.contains('hidden')) {
    clearError();
  }
});

// Klik chip petunjuk untuk mengisi kata sandi otomatis
hintChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const samplePass = chip.getAttribute('data-pass') || '';
    passwordInput.value = samplePass;
    passwordInput.type = 'text';
    eyeOpen.classList.add('hidden');
    eyeClosed.classList.remove('hidden');
    clearError();
    passwordInput.focus();
  });
});

// Proses submit form login
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const entered = passwordInput.value.trim().toLowerCase();

  if (!entered) {
    showError('Silakan masukkan kata sandinya terlebih dahulu.');
    passwordInput.focus();
    return;
  }

  if (VALID_PASSWORDS.includes(entered)) {
    clearError();
    loginScreen.classList.add('hidden');
    greetingScreen.classList.remove('hidden');
    replayAnimation(greetingScreen);
  } else {
    showError('Kata sandi belum tepat. Coba periksa lagi ya!');
    passwordInput.select();
  }
});

// Kembali ke halaman login
lockBtn.addEventListener('click', () => {
  greetingScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  passwordInput.value = '';
  passwordInput.type = 'password';
  eyeOpen.classList.remove('hidden');
  eyeClosed.classList.add('hidden');
  clearError();
  replayAnimation(loginScreen);
  passwordInput.focus();
});