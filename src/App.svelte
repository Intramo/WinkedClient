<script lang="ts">
  import PageClientJoin from "./page/PageClientJoin.svelte";
  import PageClientWait from "./page/PageClientWait.svelte";

  import Background from "./page/Background.svelte";
  import Toast from "./shared/Toast.svelte";

  function onGameJoin() {
    stage = 1;
  }

  let stage = 0;
</script>

<Background />

{#if stage == 0}
  <PageClientJoin connectedCallback={onGameJoin} />
{:else if stage == 1}
  <PageClientWait />
{/if}

<Toast />
