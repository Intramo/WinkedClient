<script lang="ts">
  import { _ } from "svelte-i18n";
  import { hostOptions } from "../shared/hostOptionsStore";
  import { gameCode } from "../shared/hostOptionsStore";

  export let players: string[] = [];
  export let playerKickCallback: (player: string) => void;
</script>

<section class="relwrap pageWait">
  <div class="header">
    <p class="text"><span>{$_("page.lobby.join1")}</span> <b>play.winked.app</b> <span>{$_("page.lobby.join2")}</span></p>
    <p class="id">{$_("page.lobby.code")}: {$gameCode}</p>
  </div>
  <div class="settings"></div>
  <div class="lobby">
    {#if players.length == 0}
      <p>{$_("page.lobby.waiting")}</p>
    {:else}
      {#each players as player}
        <button
          on:click={(e) => {
            playerKickCallback(player);
          }}>{player}</button>
      {/each}
    {/if}
  </div>
  <div class="stats">
    <div class="players">
      <p>{$_("page.lobby.stats.players")}: {players.length}</p>
    </div>
  </div>
</section>

<style lang="scss">
  @import "../style/globals";
  .pageWait {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 20% 10% 70% 0%;
  }
  .header {
    background-color: #fff;
    @include flexbox(column);
    .text {
      margin: 0;
      font-size: 4.5vh;
      text-overflow: ellipsis;
    }
    .id {
      font-size: 7.5vh;
      margin: 0;
      margin-top: $GAP;
    }
  }

  .lobby {
    padding: $GAP $GAP * 5;
    gap: $GAP;
    @include flexbox-wrap(row);
    p {
      color: #fff;
      font-size: 5vmin;
      margin: 0;
      user-select: none;
    }
    button {
      background-color: #fff;
      border: 0;
      padding: $GAP * 0.5;
      border-radius: 0.5rem;
      font-size: 2rem;
      cursor: pointer;
      user-select: none;
      animation: page-lobby-user-popin 0.5s ease-out;
    }
    @keyframes page-lobby-user-popin {
      0% {
        transform: scale(0.5);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .stats {
    bottom: $GAP;
    right: $GAP;
    position: absolute;
    div {
      background-color: #0000005a;
      padding: $GAP * 0.5;
      border-radius: 0.5rem;
      p {
        margin: 0;
        color: #fff;
        font-size: 1.25rem;
      }
    }
  }

  @media screen and (max-aspect-ratio: 1/1) {
    .lobby {
      padding: $GAP * 0.5;
    }
    .header .text span {
      display: none;
    }
    .header .id {
      font-size: 5vh;
    }
  }
</style>
