<script lang="ts">
  import { toasts } from "./toastStore";

  let toastsList: Toast[] = [];
  toasts.subscribe(($toasts) => {
    toastsList = $toasts;
  });
</script>

<div class="toasts">
  {#each toastsList as toast}
    <div class="toast {toast.type}" style="--dur: {toast.duration}ms">{toast.message}</div>
  {/each}
</div>

<style lang="scss">
  @import "../style/globals";

  .toasts {
    z-index: 1000;
    position: fixed;
    top: $GAP;
    left: $GAP;
    @include nointeract;
    @include flexbox(column);
    overflow: hidden;
    .toast {
      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeout {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      border-radius: 0.5rem;
      padding: $GAP;
      margin-bottom: $GAP * 0.5;
      font-size: 1.25rem;
      animation:
        fadein 0.5s,
        fadeout 0.5s calc(var(--dur) - 1s) forwards;
      max-width: 540px;
      &.error {
        background-color: #ff004d;
        color: #fff;
      }
      &.info {
        background-color: #6d6d6d;
        color: #fff;
      }
    }
  }
</style>
