<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const submitted = ref(false);

const onSubmit = () => {
  if (!email.value) return;
  submitted.value = true;
  email.value = '';
};
</script>

<template>
  <section class="newsletter">
    <SectionHeader
      align="center"
      tag="Ưu đãi độc quyền"
      title="Nhận"
      accent="Ưu Đãi Sớm Nhất"
    />

    <p class="nl-desc">
      Đăng ký để cập nhật bộ sưu tập mới, ưu đãi riêng cho thành viên và những
      bài viết chọn lọc về phong cách đàn ông hiện đại.
    </p>

    <form class="nl-form" @submit.prevent="onSubmit">
      <input
        v-model="email"
        type="email"
        required
        placeholder="Email của bạn"
        class="nl-input"
      />
      <AppButton type="submit" variant="filled">Đăng Ký</AppButton>
    </form>

    <p v-if="submitted" class="nl-thanks">
      Cảm ơn bạn đã đăng ký — chúng tôi sẽ liên hệ sớm.
    </p>
  </section>
</template>

<style scoped>
.newsletter {
  padding: 80px 56px;
  background: var(--card);
  text-align: center;
}

.nl-desc {
  max-width: 520px;
  margin: 20px auto 32px;
  color: var(--mid);
  font-size: 0.95rem;
  line-height: 1.7;
}

.nl-form {
  display: flex;
  gap: 12px;
  max-width: 520px;
  margin: 0 auto;
}

.nl-input {
  flex: 1;
  padding: 14px 18px;
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
}
.nl-input::placeholder { color: var(--smoke); }
.nl-input:focus { border-color: var(--accent); }

.nl-thanks {
  margin-top: 20px;
  color: var(--accent);
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .newsletter { padding: 60px 24px; }
  .nl-form { flex-direction: column; }
}
</style>
