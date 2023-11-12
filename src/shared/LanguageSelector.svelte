<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { locale, locales, _, dictionary } from "svelte-i18n";
  import { colorScheme } from "../stores";

  let menuOpen = false;
  let button: HTMLButtonElement;

  function toggleMenu(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    menuOpen = !menuOpen;
  }

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target == button) return;
      menuOpen = false;
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div class="option-selector {$colorScheme}">
  <button on:click={toggleMenu} class="subtle-shadow" bind:this={button}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">{@html String($dictionary[$locale ?? ""]["logo"])}</svg>
    &nbsp;
    <span>{$locale?.toUpperCase()}</span>
  </button>
  <div class="option-select subtle-shadow {menuOpen ? 'visible' : ''}">
    {#each $locales as lang}
      <button
        on:click={(e) => {
          locale.set(lang);
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">{@html String($dictionary[lang]["logo"])}</svg>
        &nbsp;
        <span class="locale">{$dictionary[lang]["name"]}</span>
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../style/_globals.scss";
  @import "./OptionSelector.scss";
</style>
