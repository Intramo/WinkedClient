<script lang="ts">
  import PageClientJoin from "./page/PageClientJoin.svelte";
  import PageClientWait from "./page/PageClientWait.svelte";
  import PageClientAnswer from "./page/PageClientAnswer.svelte";

  import Background from "./page/Background.svelte";
  import Toast from "./shared/Toast.svelte";

  function onGameJoin() {
    stage = 1;
  }

  function onAnswer(answer: string) {
    stage = 1;
  }

  let stage = 2;

  let demoQuestionData: QuestionTypeNormal = {
    type: "multiple",
    question: "Question?",
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    e: null,
    f: null,
  };
</script>

<Background isContrast={stage == 2} />

{#if stage == 0}
  <PageClientJoin connectedCallback={onGameJoin} />
{:else if stage == 1}
  <PageClientWait />
{:else if stage == 2}
  <PageClientAnswer data={demoQuestionData} answerCallback={onAnswer} />
{/if}

<Toast />
