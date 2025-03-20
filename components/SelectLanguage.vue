<script setup lang="ts">

interface Locale {
  code: string
  label: string
  flag: string
}
const { locale, locales } = useI18n();
const selected = computed(() =>
  locales.value.find((item) => item.code === locale.value) as Locale
);

</script>
<template>
  <USelectMenu
    v-model="selected"
    :options="locales"
    value-attribute="code"
    variant="outline"
    :popper="{ placement: 'left' }"
    :ui-menu="{ base: 'w-40' }"
  >
    <template #option="{ option: option }">
      <SwitchLocalePathLink :locale="option.code">
        <UButton
          class="w-36"
          color="primary"
          :icon="option.flag"
          :variant="selected.code === option.code ? 'solid' : 'ghost'"
          :disabled="selected.code === option.code"
        >
          {{ option.name }}
        </UButton>
      </SwitchLocalePathLink>
    </template>
    <UButton variant="ghost" block>
      <UIcon :name="selected.flag" size="40" />
    </UButton>
  </USelectMenu>
</template>