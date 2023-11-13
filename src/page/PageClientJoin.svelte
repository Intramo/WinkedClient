<script lang="ts">
  import ColorSchemeSelector from "../shared/ColorSchemeSelector.svelte";
  import LanguageSelector from "../shared/LanguageSelector.svelte";
  import LoadingOverlay from "../shared/LoadingOverlay.svelte";
  import { colorScheme } from "../stores";
  import logoSrc from "../assets/logo.svg";
  import { _ } from "svelte-i18n";
  import { addToast } from "../shared/toastStore";
  
  export let connectedCallback: () => void = () => {};

  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  let enteredCode: string = "";
  let enteredName: string | null = null;

  let stage: number = 0;

  let isLoading: boolean = false;
  let loadingString: string | null = null;

  let isCheckingCode: boolean = false;
  let isCheckingName: boolean = false;

  function onType(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    if (event.key == "Enter") {
      button.click();
    }
  }

  function isCodeSyntaxValid(): string {
    if (enteredCode.length == 0) return "page.join.error.code-required";
    if (enteredCode.length < 6) return "page.join.error.code-too-short";
    if (enteredCode.length > 6) return "page.join.error.code-too-long";
    if (enteredCode.match(/[^A-Za-z0-9]/)) return "page.join.error.code-invalid-characters";
    return "";
  }

  function isNameSyntaxValid(): string {
    if (enteredName?.length == 0 || enteredName == null) return "page.join.error.name-required";
    if (enteredName.length < 3) return "page.join.error.name-too-short";
    if (enteredName.length > 16) return "page.join.error.name-too-long";
    if (enteredName.match(/[^A-Za-z0-9]/)) return "page.join.error.name-invalid-characters";
    return "";
  }

  function checkGameCode() {
    let error = isCodeSyntaxValid();
    if (error.length > 0) {
      if (input.classList.contains("error")) {
        input.classList.remove("error");
        input.offsetWidth;
      }
      input.classList.add("error");
      addToast($_(error));
      return;
    }

    if (isCheckingCode) return;
    isCheckingCode = true;
    isLoading = true;
    loadingString = $_("page.join.loading.check-code");

    setTimeout(() => {
      isLoading = false;
      loadingString = null;
      isCheckingCode = false;
      stage = 1;
    }, 1000);
  }

  function checkName() {
    let error = isNameSyntaxValid();
    if (error.length > 0) {
      if (input.classList.contains("error")) {
        input.classList.remove("error");
        input.offsetWidth;
      }
      input.classList.add("error");
      addToast($_(error));
      return;
    }

    if (isCheckingName) return;
    isCheckingName = true;
    isLoading = true;
    loadingString = $_("page.join.loading.check-name");
    setTimeout(() => {
      loadingString = $_("page.join.loading.connecting");
      setTimeout(() => {
        isLoading = false;
        loadingString = null;
        isCheckingName = false;
        connectedCallback();
      }, 1000);
    }, 1000);
  }
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
        <input class="input code" type="text" placeholder={$_("page.join.code")} maxlength="6" minlength="6" bind:this={input} bind:value={enteredCode} on:keydown={onType} />
        <button bind:this={button} on:click={checkGameCode}>{$_("page.join.button.next")}</button>
      {:else}
        <input class="input name" type="text" placeholder={$_("page.join.name")} maxlength="6" minlength="6" bind:this={input} bind:value={enteredName} on:keydown={onType} />
        <button bind:this={button} on:click={checkName}>{$_("page.join.button.join")}</button>
      {/if}
    </div>
  </div>

  <footer class="footer {$colorScheme}">
    <p><a href="#null">{$_("footer.create-quiz")}</a></p>
    <p><a href="#null">{$_("footer.github")}</a> | <a href="#null">{$_("footer.data-protection")}</a></p>
  </footer>

  {#if isLoading}
    <LoadingOverlay text={loadingString} />
  {/if}
</section>

<style lang="scss">
  @import "../style/_globals.scss";

  .footer {
    position: absolute;
    bottom: $GAP;
    left: 50%;
    transform: translateX(-50%);
    @include flexbox(column);
    gap: $GAP * 0.5;
    color: #000;
    p,
    a {
      margin: 0;
      transition: color $COLORSCHEME_TRANSITION;
      white-space: nowrap;
    }
    &.dark a,
    &.dark {
      color: #fff;
    }
  }

  @media screen and (max-height: 450px) {
    .footer {
      display: none;
    }
    .pageJoin {
      align-items: flex-end !important;
      padding-bottom: $GAP;
    }
  }

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

        .input {
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
              }
            }
            animation: 0.4s ease 0s 1 normal none running form-input-error-shake;
            border-color: #ff004d;
            background-color: #ff004d;
            background: url("https://assets-cdn.kahoot.it/controller/v2/assets/icn_field_error-dfdd7c8c.svg") right center / 1.5rem 1.5rem no-repeat scroll rgb(255, 242, 244);
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
