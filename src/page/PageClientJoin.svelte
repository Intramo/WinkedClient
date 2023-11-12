<script lang="ts">
  import ColorSchemeSelector from "../shared/ColorSchemeSelector.svelte";
  import LanguageSelector from "../shared/LanguageSelector.svelte";
  import LoadingOverlay from "../shared/LoadingOverlay.svelte";
  import { colorScheme } from "../stores";
  import logoSrc from "../assets/logo.svg";
  import { _ } from "svelte-i18n";

  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  let enteredCode: string = "";
  let enteredName: string | null = null;

  let stage: number = 0;

  let isLoading: boolean = false;
  let loadingString: string | null = null;

  function checkGameCode() {}
</script>

<section class="relwrap pageJoin">
  <div class="options">
    <ColorSchemeSelector />
    <LanguageSelector />
  </div>

  <div class="wrap {$colorScheme}">
    <img src={logoSrc} alt="Winked" />
    <div class="form">
      {#if stage == 0}
        <input class="code" type="text" placeholder={$_("page.join.code")} maxlength="6" minlength="6" bind:this={input} />
        <button bind:this={button}>{$_("page.join.button.next")}</button>
      {:else}
        <input class="code" type="text" placeholder={$_("page.join.name")} maxlength="6" minlength="6" bind:this={input} />
        <button bind:this={button}>{$_("page.join.button.join")}</button>
      {/if}
    </div>
  </div>

  {#if isLoading}
    <LoadingOverlay text={loadingString} />
  {/if}
</section>

<style lang="scss">
  @import "../style/_globals.scss";

  .options {
    position: absolute;
    top: $GAP;
    right: $GAP;
    display: flex;
    flex-flow: row nowrap;
    gap: $GAP;
  }

  .pageJoin {
    display: flex;
    align-items: center;
    justify-content: center;

    > .wrap {
      max-width: 540px;
      width: 90%;
      overflow: hidden;
      > img {
        width: 100%;
        margin-bottom: $GAP;
        @include nointeract;
        transition: filter $COLORSCHEME_TRANSITION;
      }
      &.dark {
        img {
          filter: invert(100%);
        }
      }
      .form {
        padding: $GAP;
        background-color: #fff;
        border-radius: 0.5rem;
        gap: $GAP;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        width: 100%;
        overflow: hidden;
        position: relative;

        input {
          position: relative;
          color: #000;
          border: 2px #757575 solid;
          transition: border-color $TRANSITION ease;
          &.code {
            text-transform: uppercase;
          }
          &:placeholder-shown {
            text-transform: none;
          }
          &:focus {
            outline: none;
            border-color: #004dff;
          }
          &.error {
            @keyframes form-input-error-shake {
              20%,
              60% {
                transform: translate(-0.5rem, 0px);
              }
              40%,
              80% {
                transform: translate(0.5rem, 0px);
                animation: 0.4s ease 0s 1 normal none running form-input-error-shake;
                border-color: #ff004d;
                background-color: #ff004d;
                background: url("https://assets-cdn.kahoot.it/controller/v2/assets/icn_field_error-dfdd7c8c.svg") right center / 1.5rem 1.5rem no-repeat scroll rgb(255, 242, 244);
              }
            }
          }
        }

        input,
        button {
          width: 100%;
          text-align: center;
          font-size: 1.5rem;
          border-radius: 0.5rem;
          padding: $GAP;
        }

        button {
          @include button;
        }
      }
    }
  }
</style>
