<script lang="ts">
  import { _ } from "svelte-i18n";
  import { hostOptions } from "../shared/hostOptionsStore";
  import { userName, userPoints } from "../shared/userStore";

  export let data: Question;
  export let answerCallback: (answer: string) => void;

  let questionType: QuestionType = data["type"];
  let questionText = questionType === "normal" ? (data as QuestionTypeNormal).question : questionType === "multiple" ? (data as QuestionTypeMultiple).question : questionType === "truefalse" ? (data as QuestionTypeTrueFalse).question : null;
  let buttonAElement: HTMLButtonElement | null = null;
  let buttonBElement: HTMLButtonElement | null = null;
  let buttonCElement: HTMLButtonElement | null = null;
  let buttonDElement: HTMLButtonElement | null = null;
  let buttonEElement: HTMLButtonElement | null = null;
  let buttonFElement: HTMLButtonElement | null = null;
  let buttonA: string | null = questionType === "normal" ? (data as QuestionTypeNormal).a : questionType === "multiple" ? (data as QuestionTypeMultiple).a : questionType === "truefalse" ? $_("page.answer.truefalse.true") : null;
  let buttonB: string | null = questionType === "normal" ? (data as QuestionTypeNormal).b : questionType === "multiple" ? (data as QuestionTypeMultiple).b : questionType === "truefalse" ? $_("page.answer.truefalse.false") : null;
  let buttonC: string | null = questionType === "normal" ? (data as QuestionTypeNormal).c : questionType === "multiple" ? (data as QuestionTypeMultiple).c : questionType === "truefalse" ? null : null;
  let buttonD: string | null = questionType === "normal" ? (data as QuestionTypeNormal).d : questionType === "multiple" ? (data as QuestionTypeMultiple).d : questionType === "truefalse" ? null : null;
  let buttonE: string | null = questionType === "normal" ? (data as QuestionTypeNormal).e : questionType === "multiple" ? (data as QuestionTypeMultiple).e : questionType === "truefalse" ? null : null;
  let buttonF: string | null = questionType === "normal" ? (data as QuestionTypeNormal).f : questionType === "multiple" ? (data as QuestionTypeMultiple).f : questionType === "truefalse" ? null : null;
  if (!$hostOptions.showAnswersTextOnPlayerDevices && questionType !== "truefalse") {
    if (buttonA != null) buttonA = "A";
    if (buttonB != null) buttonB = "B";
    if (buttonC != null) buttonC = "C";
    if (buttonD != null) buttonD = "D";
    if (buttonE != null) buttonE = "E";
    if (buttonF != null) buttonF = "F";
  }
  let extended: boolean = buttonE !== null || buttonF !== null;

  let pressedButtons = "";

  function onButtonPress(char: string) {
    if (questionType === "multiple") {
      if (pressedButtons.includes(char)) {
        pressedButtons = pressedButtons.replace(char, "");
      } else {
        pressedButtons += char;
      }
      return;
    }
    answerCallback(char);
  }
</script>

<section class="relwrap pagePlayerAnswer">
  <div class="header">
    <span>{questionText}</span>
  </div>
  <div class="main {questionType} {extended ? 'extended' : ''} {$hostOptions.showAnswersTextOnPlayerDevices ? 'showText' : ''}">
    {#if buttonA != null}
      <button class="button a action {pressedButtons.includes('a') ? 'active' : ''}" bind:this={buttonAElement} on:click={(e) => onButtonPress("a")}>{buttonA}</button>
    {/if}

    {#if buttonB != null}
      <button class="button b action {pressedButtons.includes('b') ? 'active' : ''}" bind:this={buttonBElement} on:click={(e) => onButtonPress("b")}>{buttonB}</button>
    {/if}

    {#if buttonC != null}
      <button class="button c action {pressedButtons.includes('c') ? 'active' : ''}" bind:this={buttonCElement} on:click={(e) => onButtonPress("c")}>{buttonC}</button>
    {/if}

    {#if buttonD != null}
      <button class="button d action {pressedButtons.includes('d') ? 'active' : ''}" bind:this={buttonDElement} on:click={(e) => onButtonPress("d")}>{buttonD}</button>
    {/if}

    {#if buttonE != null}
      <button class="button e action {pressedButtons.includes('e') ? 'active' : ''}" bind:this={buttonEElement} on:click={(e) => onButtonPress("e")}>{buttonE}</button>
    {/if}

    {#if buttonF != null}
      <button class="button f action {pressedButtons.includes('f') ? 'active' : ''}" bind:this={buttonFElement} on:click={(e) => onButtonPress("f")}>{buttonF}</button>
    {/if}

    {#if questionType === "multiple"}
      <button class="button send" on:click={(e) => answerCallback(pressedButtons)}>{$_("page.answer.submit")}</button>
    {/if}
  </div>
  <div class="footer">
    <span>{$userName}</span>
    <span>{$userPoints}</span>
  </div>
</section>

<style lang="scss">
  @import "../style/globals.scss";

  .pagePlayerAnswer {
    .header,
    .footer {
      width: 100%;
      height: $PAGE_ANSWER_HEADER_HEIGHT;
      background-color: #fff;
      @include flexbox(row, space-between, center);
      padding: $GAP * 0.5;
      span {
        height: 100%;
        background-color: #333;
        color: #fff;
        border-radius: 0.5rem;
        @include flexbox;
        padding: $GAP * 0.5;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .header {
      span {
        color: #000;
        background-color: #ccc;
      }
      justify-content: center;
    }
    .main {
      width: 100%;
      height: calc(100% - #{$PAGE_ANSWER_HEADER_HEIGHT * 2});
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: $GAP;
      padding: $GAP;
    }
    .button {
      @include button;
      border-radius: 0.5rem;
      font-size: 15vh;
      color: #fff;
      &.a {
        background-color: $COLOR_A;
        border-color: $COLOR_A_DARK;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
      &.b {
        background-color: $COLOR_B;
        border-color: $COLOR_B_DARK;
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }
      &.c {
        background-color: $COLOR_C;
        border-color: $COLOR_C_DARK;
        grid-column: 1 / 2;
        grid-row: 2 / 3;
      }
      &.d {
        background-color: $COLOR_D;
        border-color: $COLOR_D_DARK;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
      &.e {
        background-color: $COLOR_E;
        border-color: $COLOR_E_DARK;
      }
      &.f {
        background-color: $COLOR_F;
        border-color: $COLOR_F_DARK;
      }
    }
    .main.extended {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      button {
        font-size: 10vh;
      }
      button.e {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
      }
      button.f {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
      }
    }
    .main.truefalse {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      button {
        font-size: 20vh;
      }
      button.a {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
      button.b {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }
    }

    .main.multiple {
      grid-template-rows: 1fr 1fr 12vh;
      button.send {
        grid-column: 1 / 3;
        grid-row: 3 / 4;
        font-size: 7.5vh;
      }
      button.action {
        opacity: 25%;
        &.active {
          opacity: 100%;
        }
      }
    }

    .main.extended.multiple {
      grid-template-rows: 1fr 1fr 1fr 12vh;
      button.send {
        grid-column: 1 / 3;
        grid-row: 4 / 5;
      }
    }
  }
</style>
