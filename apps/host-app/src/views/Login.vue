<script setup lang="ts">
import { ref } from "vue";
import { useAuth, authApi } from "@jonyrepo/auth";
import { useRouter } from "vue-router";
import { GoogleLogin } from "vue3-google-login";

const { login, loginWithGoogle } = useAuth();
const router = useRouter();

const form = ref({ email: "", password: "" });
const isLoading = ref(false);
const errorMsg = ref("");

const handleLogin = async () => {
  isLoading.value = true;
  errorMsg.value = "";
  try {
    const { data } = await authApi.post("/auth/login", form.value);
    login(data);
    router.push("/");
  } catch (err: any) {
    errorMsg.value = "Invalid credentials. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const onGoogleSuccess = async (response: any) => {
  const success = await loginWithGoogle(response.credential);
  if (success) router.push("/dashboard");
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">🚚 Jony<span>Logistics</span></div>
      <h1>Welcome Back</h1>
      <p class="subtitle">Enter your details to manage your loads</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Email Address</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="name@company.com"
            required
          />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

        <button type="submit" :disabled="isLoading" class="login-btn">
          <span v-if="isLoading" class="loader"></span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="divider"><span>OR</span></div>

      <div class="google-btn-wrapper">
        <GoogleLogin :callback="onGoogleSuccess" prompt auto-login />
      </div>

      <div class="footer-links">
        <a href="#">Forgot password?</a>
        <span>Don't have an account? <a href="#">Contact Sales</a></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: "Inter", sans-serif;
}
.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.logo {
  font-size: 24px;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 24px;
}
.logo span {
  color: #3182ce;
}
h1 {
  font-size: 28px;
  color: #2d3748;
  margin-bottom: 8px;
}
.subtitle {
  color: #718096;
  margin-bottom: 32px;
  font-size: 14px;
}
.input-group {
  text-align: left;
  margin-bottom: 20px;
}
label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 6px;
}
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}
input:focus {
  border-color: #3182ce;
}
.login-btn {
  width: 100%;
  background: #3182ce;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
  margin-top: 12px;
}
.login-btn:hover {
  background: #2b6cb0;
}
.error-text {
  color: #e53e3e;
  font-size: 12px;
  margin-bottom: 12px;
}
.footer-links {
  margin-top: 24px;
  font-size: 13px;
  color: #718096;
  display: grid;
  gap: 8px;
}
.footer-links a {
  color: #3182ce;
  text-decoration: none;
}
.divider {
  margin: 24px 0;
  display: flex;
  align-items: center;
  color: #a0aec0;
  font-size: 12px;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}
.divider span {
  padding: 0 10px;
}
.google-btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
