```css
/* Cute Pink Login Theme */

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(
    135deg,
    #fff0f5,
    #ffe4ec,
    #fff7fa
  );
  font-family: 'Segoe UI', sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 36px 30px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #ffd6e4;
  border-radius: 25px;
  box-shadow: 0 12px 35px rgba(224, 105, 148, 0.15);
}

.login-icon {
  width: 65px;
  height: 65px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffe4ee;
  color: #e75480;
  border-radius: 50%;
  font-size: 38px;
}

.login-card h1 {
  margin: 0;
  color: #bd4775;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
}

.login-subtitle {
  margin: 10px 0 5px;
  color: #e16b96;
  text-align: center;
  font-size: 15px;
}

.login-description {
  margin: 0 0 25px;
  color: #9b7b89;
  text-align: center;
  font-size: 13px;
}

.login-card form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.login-card label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #8f4564;
  font-size: 14px;
  font-weight: 600;
}

.login-card input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 15px;
  border: 1px solid #f3c5d6;
  border-radius: 12px;
  outline: none;
  background: #fff9fb;
  color: #633b4c;
  font-size: 14px;
  transition: 0.2s ease;
}

.login-card input::placeholder {
  color: #c9a5b5;
}

.login-card input:focus {
  border-color: #e879a1;
  box-shadow: 0 0 0 3px rgba(232, 121, 161, 0.15);
  background: #fff;
}

.pink-button {
  width: 100%;
  padding: 14px;
  margin-top: 5px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #f28bb2, #df5f91);
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 12px rgba(223, 95, 145, 0.2);
  transition: 0.2s ease;
}

.pink-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(223, 95, 145, 0.3);
}

.pink-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.login-alert {
  margin-bottom: 18px;
  padding: 12px;
  border: 1px solid #ffc4d1;
  border-radius: 10px;
  background: #fff0f3;
  color: #c03962;
  font-size: 13px;
}

.login-footer {
  margin: 24px 0 0;
  color: #d48aa7;
  text-align: center;
  font-size: 12px;
}
```