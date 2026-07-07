<script setup lang="ts">
import { useProvincesQuery, useWardsQuery } from '~/composables/useLocations';
import type { AddressInput } from '~/composables/useAddresses';

/**
 * Form nhập địa chỉ dùng chung (sổ địa chỉ + thanh toán).
 * Chọn Tỉnh trước → mới hiện Phường/xã của tỉnh đó (2 cấp theo NĐ 30/2026).
 * v-model là AddressInput; đổi tỉnh sẽ reset phường/xã.
 */
const props = withDefaults(
  defineProps<{
    modelValue: AddressInput;
    showDefaultToggle?: boolean;
  }>(),
  { showDefaultToggle: true },
);

const emit = defineEmits<{ 'update:modelValue': [AddressInput] }>();

// Ghi 1 field vào model (giữ nguyên các field khác).
function patch(part: Partial<AddressInput>) {
  emit('update:modelValue', { ...props.modelValue, ...part });
}

const provinceCode = computed(() => props.modelValue.provinceCode || '');
const { data: provinces, isPending: loadingProvinces } = useProvincesQuery();
const { data: wards, isPending: loadingWards } = useWardsQuery(provinceCode);

function onProvinceChange(e: Event) {
  const code = (e.target as HTMLSelectElement).value;
  // Đổi tỉnh → xoá phường/xã đã chọn để tránh lệch dữ liệu.
  patch({ provinceCode: code, wardCode: '' });
}

const fieldLabel =
  'block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5';
const fieldBase =
  'w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent';
const selectBase = `${fieldBase} appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`;
</script>

<template>
  <div class="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
    <div>
      <label :class="fieldLabel">Họ và tên *</label>
      <input
        :value="modelValue.fullName"
        type="text"
        :class="fieldBase"
        placeholder="Nguyễn Văn A"
        @input="patch({ fullName: ($event.target as HTMLInputElement).value })"
      />
    </div>
    <div>
      <label :class="fieldLabel">Số điện thoại *</label>
      <input
        :value="modelValue.phone"
        type="tel"
        :class="fieldBase"
        placeholder="0901234567"
        @input="patch({ phone: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <div>
      <label :class="fieldLabel">Tỉnh / Thành phố *</label>
      <select
        :value="modelValue.provinceCode"
        :class="selectBase"
        :disabled="loadingProvinces"
        @change="onProvinceChange"
      >
        <option value="" disabled>
          {{ loadingProvinces ? 'Đang tải...' : '— Chọn tỉnh/thành —' }}
        </option>
        <option v-for="p in provinces ?? []" :key="p.code" :value="p.code">
          {{ p.name }}
        </option>
      </select>
    </div>

    <div>
      <label :class="fieldLabel">Phường / Xã *</label>
      <select
        :value="modelValue.wardCode"
        :class="selectBase"
        :disabled="!modelValue.provinceCode || loadingWards"
        @change="patch({ wardCode: ($event.target as HTMLSelectElement).value })"
      >
        <option value="" disabled>
          {{
            !modelValue.provinceCode
              ? '— Chọn tỉnh trước —'
              : loadingWards
                ? 'Đang tải...'
                : '— Chọn phường/xã —'
          }}
        </option>
        <option v-for="w in wards ?? []" :key="w.code" :value="w.code">
          {{ w.name }}
        </option>
      </select>
    </div>

    <div class="col-span-2 max-[560px]:col-span-1">
      <label :class="fieldLabel">Địa chỉ (số nhà, tên đường) *</label>
      <input
        :value="modelValue.line"
        type="text"
        :class="fieldBase"
        placeholder="123 Nguyễn Huệ"
        @input="patch({ line: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <div v-if="showDefaultToggle" class="col-span-2 max-[560px]:col-span-1">
      <label class="flex items-center gap-2 cursor-pointer text-[0.85rem] text-mid select-none">
        <input
          :checked="modelValue.isDefault"
          type="checkbox"
          class="w-4 h-4 accent-[var(--accent)]"
          @change="patch({ isDefault: ($event.target as HTMLInputElement).checked })"
        />
        Đặt làm địa chỉ mặc định
      </label>
    </div>
  </div>
</template>
