document.addEventListener('DOMContentLoaded', () => {
    // Versi & Premium
    const versionText = document.getElementById('version-text');
    const verifyBtn = document.getElementById('btn-verify');
    const modal = document.getElementById('verify-modal');
    const submitCodeBtn = document.getElementById('btn-submit-code');
    const cancelBtn = document.getElementById('btn-cancel');
    const codeInput = document.getElementById('verify-code');

    let isPremium = localStorage.getItem('foxie_premium') === 'true';

    const validPremiumCodes = [
        "F@XX!3_K0D3#2026%",
        "F0X!E_K0D3^*@25",
        "FOX!E_K0D3_#&@77",
        "K0D3_F@X!3~$^09",
        "F0X13_K0D3!@#%^&",
        "FOX_-$OWNER"
    ];

    function updateVersionUI() {
        if (isPremium) {
            versionText.textContent = 'Versi Premium';
            versionText.classList.remove('free');
            versionText.classList.add('premium');
            verifyBtn.style.display = 'none';
        }
    }
    updateVersionUI();

    verifyBtn.addEventListener('click', () => { modal.classList.remove('hidden'); codeInput.value = ''; });
    cancelBtn.addEventListener('click', () => { modal.classList.add('hidden'); });

    submitCodeBtn.addEventListener('click', () => {
        const enteredCode = codeInput.value.trim();
        if (validPremiumCodes.includes(enteredCode)) {
            isPremium = true;
            localStorage.setItem('foxie_premium', 'true');
            alert('✅ Verifikasi Premium Berhasil!');
            modal.classList.add('hidden');
            updateVersionUI();
        } else {
            alert('❌ Kode salah atau sudah digunakan di device lain!');
        }
    });

    // Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Auto DPI
    const shizukuWarning = document.getElementById('shizuku-warning');
    const dpiContent = document.getElementById('dpi-content');
    const dpiError = document.getElementById('dpi-error');
    const customDpiInput = document.getElementById('custom-dpi');
    const applyDpiBtn = document.getElementById('btn-apply-dpi');

    let isShizukuActive = true;   // Ubah ke false untuk test tampilan gembok

    function checkShizuku() {
        if (!isShizukuActive) {
            shizukuWarning.classList.remove('hidden');
            dpiContent.classList.add('hidden');
        } else {
            shizukuWarning.classList.add('hidden');
            dpiContent.classList.remove('hidden');
        }
    }
    checkShizuku();

    document.querySelectorAll('.preset').forEach(preset => {
        preset.addEventListener('click', () => {
            customDpiInput.value = preset.dataset.dpi;
            applyDPI(parseInt(preset.dataset.dpi));
        });
    });

    applyDpiBtn.addEventListener('click', () => {
        const dpi = parseInt(customDpiInput.value);
        if (isNaN(dpi) || dpi < 300 || dpi > 1000) {
            dpiError.classList.remove('hidden');
            setTimeout(() => dpiError.classList.add('hidden'), 4500);
        } else {
            dpiError.classList.add('hidden');
            applyDPI(dpi);
        }
    });

    function applyDPI(dpi) {
        if (isShizukuActive) {
            alert(`✅ DPI berhasil diubah ke ${dpi}`);
        }
    }

    // Crosshair Preview (sederhana)
    const colorPicker = document.getElementById('color-picker');
    const sizeSlider = document.getElementById('size-slider');
    const opacitySlider = document.getElementById('opacity-slider');

    function updateCrosshair() {
        const color = colorPicker.value;
        document.querySelectorAll('.crosshair-line, .crosshair-dot').forEach(el => {
            el.style.background = color;
            el.style.opacity = opacitySlider.value;
        });
    }

    colorPicker.addEventListener('input', updateCrosshair);
    sizeSlider.addEventListener('input', updateCrosshair);
    opacitySlider.addEventListener('input', updateCrosshair);

    document.getElementById('btn-apply-crosshair').addEventListener('click', () => {
        alert('✅ Crosshair diaktifkan!');
    });

    document.getElementById('btn-hide-crosshair').addEventListener('click', () => {
        alert('❌ Crosshair disembunyikan');
    });

    console.log('%cFoxie Tools siap digunakan', 'color:#00bfff;font-size:16px');
});