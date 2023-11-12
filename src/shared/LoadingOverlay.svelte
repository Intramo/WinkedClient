<script lang="ts">
  import loadingSrc from "../assets/loading.svg";
  import { _ } from "svelte-i18n";
  export let text: string | null = null;
  export let visible: boolean = false;
</script>

<div class="loading-overlay {visible ? 'visible' : ''}">
  <img src={loadingSrc} alt="Loading..." />
  {#if text !== null}
    <p style="--l: {text.length}">
      {#each text.split("") as part, index}
        {#if part === " "}
          <span style="--i: {index}">&nbsp;</span>
        {:else}
          <span style="--i: {index}">{part}</span>
        {/if}
      {/each}
    </p>
  {/if}
</div>

<style lang="scss">
  @import "../style/_globals.scss";

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.9);
    @include flexbox(column);
    gap: $GAP;
    color: #fff;
    pointer-events: all;
    img {
      aspect-ratio: 1/1;
      width: 50vw;
      max-width: 200px;
    }
    p {
      position: relative;
      font-size: 2.5rem;
      font-weight: 500;
      filter: drop-shadow(0 0 0.5rem rgba(255, 255, 255, 0.5));
      span {
        $SPEED: 0.1s;
        position: relative;
        display: inline-block;
        color: #fff;
        animation: loading-overlay-wave calc(var(--l) * #{$SPEED}) infinite;
        animation-delay: calc(var(--i) * #{$SPEED});
      }
      @keyframes loading-overlay-wave {
        0%,
        40%,
        100% {
          transform: translateY(0);
        }
        20% {
          transform: translateY(-1rem);
        }
      }
    }
  }
</style>
