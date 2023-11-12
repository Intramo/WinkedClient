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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      {#if $colorScheme === "light"}
        <rect x="0" y="0" width="100" height="100" fill="#fec805" />
      {:else if $colorScheme === "dark"}
        <rect x="0" y="0" width="100" height="100" fill="#000" />
      {:else if $colorScheme === "pink"}
        <rect x="0" y="0" width="100" height="100" fill="#ff00ff" />
      {/if}
    </svg>
    &nbsp;
    <span>{$_("shared.colorSelector.profile")}</span>
  </button>
  <div class="option-select subtle-shadow {menuOpen ? 'visible' : ''}">
    <button
      on:click={(e) => {
        colorScheme.set("light");
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="#fec805" /></svg>
      &nbsp;
      <span>{$_("shared.colorSelector.profile")}</span>
    </button>
    <button
      on:click={(e) => {
        colorScheme.set("dark");
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="#000" /></svg>
      &nbsp;
      <span>{$_("shared.colorSelector.profile")}</span>
    </button>
    <button
      on:click={(e) => {
        colorScheme.set("pink");
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="#ff00ff" /></svg>
      &nbsp;
      <span>{$_("shared.colorSelector.profile")}</span>
    </button>
  </div>
</div>

<style lang="scss">
  @import "../style/_globals.scss";
  @import "./OptionSelector.scss";

  .option-selector button {
    text-transform: capitalize !important;
  }
</style>
